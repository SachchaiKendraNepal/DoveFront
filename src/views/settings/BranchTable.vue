<template>
	<div>
		<!-- eslint-disable-next-line vue/no-deprecated-v-bind-sync -->
		<v-data-table v-model="selected" :options.sync="options"
			loading-text="Branches Loading..."
			:headers="headers"
			:items="items.results"
			:server-items-length="getTotalPaginationData"
			:items-per-page="getItemsPerPageCount"
			:loading="loading"
			:search="search"
			multi-sort
			calculate-widths
			show-select
			:single-select="false"
			class="elevation-1"
			:footer-props="{
				showFirstLastPage: true,
				disableItemsPerPage: true,
				itemsPerPageOptions: [1, 5, 10, 50],
				itemsPerPageText: 'Rows per page:',
				pageText: `${options.page}-${getTotalPaginationData} of ${getTotalPaginationData}`
			}"
		>
			<template #top>
				<v-toolbar
					flat
					color="grey lighten-2"
				>
					<v-avatar
						class="elevation-2 table-avatar"
						size="30"
					>
						<v-icon size="20"
							color="white"
						>
							mdi-city-variant
						</v-icon>
					</v-avatar>
					<v-toolbar-title v-show="$vuetify.breakpoint.smAndUp"
						class="table-title pl-1"
					>
						Sachchai Branches
					</v-toolbar-title>
					<v-divider
						class="mx-4 search-branch"
						inset
						vertical
					/>
					<v-text-field
						v-model="search"
						class="search-branch"
						solo
						dense
						hide-details
						label=""
						name="search"
						prepend-inner-icon="mdi-magnify"
						clearable
						placeholder="Search"
					/>
					<v-spacer />
					<v-divider
						class="mx-4 search-branch"
						inset
						vertical
					/>
					<v-btn
						dark
						color="primary"
						@click="openAddBranchFormDialog"
					>
						<v-icon dark>
							mdi-plus-circle
						</v-icon>
					</v-btn>
					<branch-form-dialog @reload="initialize" />
				</v-toolbar>
			</template>
			<!-- eslint-disable-next-line vue/valid-v-slot-->
			<template #item.is_main="{ item }">
				<v-checkbox
					v-model="item.is_main"
					color="primary"
					hide-details="auto"
					class="mt-0"
					readonly
				/>
			</template>
			<!-- eslint-disable-next-line vue/valid-v-slot-->
			<template #item.is_approved="{ item }">
				<v-checkbox
					v-model="item.is_approved"
					color="success"
					hide-details="auto"
					class="mt-0"
					readonly
				/>
			</template>
			<!--		 eslint-disable-next-line vue/valid-v-slot-->
			<template #item.location="{ item }">
				<p
					class="mb-0 location"
				>
					<span>
						{{ getWardNameOfItem(item) }},&nbsp;
						{{ getMunicipalityOrVdcName(item) }},&nbsp;
					</span>
					<i>{{ (item.district) ? item.district.name : '' }},&nbsp;
						{{ (item.province) ? item.province.name : '' }},&nbsp;</i>
					<b>{{ (item.country) ? item.country.name : '' }}</b>
				</p>
			</template>
			<!-- eslint-disable-next-line vue/valid-v-slot-->
			<template #item.created_at="{ item }">
				{{ $moment(item.created_at).fromNow() }}
			</template>
			<!-- eslint-disable-next-line vue/valid-v-slot-->
			<template #item.actions="{ item }">
				<v-icon
					v-if="item.is_approved"
					v-ripple
					class="ma-1"
					color="error"
					size="22"
					@click="revokeApprove(item)"
				>
					mdi-close
				</v-icon>
				<v-icon
					v-else
					v-ripple
					color="success"
					size="22"
					class="ma-1"
					@click="approve(item)"
				>
					mdi-check
				</v-icon>
				<v-icon
					v-ripple
					color="primary"
					size="20"
					class="ma-1"
					@click="openEditForm(item)"
				>
					mdi-pencil
				</v-icon>
				<v-icon
					v-ripple
					class="ma-1"
					color="red"
					size="20"
					@click="openAdminDeleteItemDialog(item.id, item.name)"
				>
					mdi-delete
				</v-icon>
			</template>
			<template #no-data>
				<v-btn
					color="primary"
					@click="initialize"
				>
					Reset
				</v-btn>
			</template>
		</v-data-table>
		<location-update-dialog model-name="branch" />
		<admin-delete-item-dialog
			model-name="branch"
			delete-action="branch/delete"
			@reload="initialize"
		/>
	</div>
</template>

<script>
import {mapGetters} from "vuex";
import AdminTableList from "@/mixins/AdminTableList";
import ToggleApproval from "@/mixins/ToggleApproval";
import AdminTableDeleteItemMixin from "@/mixins/AdminTableDeleteItemMixin";
import LoadLocationFormMixin from "@/mixins/LoadLocationFormMixin.js";

export default {
	name: "BranchTable",
	components: {
		BranchFormDialog: () => import("@/views/branch/BranchFormDialog")
	},
	mixins: [
		AdminTableList,
		AdminTableDeleteItemMixin,
		ToggleApproval,
		LoadLocationFormMixin
	],
	data: () => ({
		model: "branch",
		selected: [],
		headers: [
			{ text: "ACTIONS", value: "actions", sortable: false },
			{ text: "NAME", value: "name" },
			{ text: "CONTACTS", value: "contact" },
			{ text: "IS MAIN BRANCH", value: "is_main" },
			{ text: "IS APPROVED", value: "is_approved" },
			{ text: "LOCATION", value: "location" },
			{ text: "CREATED AT", value: "created_at" }
		],
	}),
	computed: {
		...mapGetters({
			branches: "branch/list",
		})
	},
	methods: {
		getMunicipalityOrVdcName(item) {
			return (item.vdc !== null)
				? item.vdc.name
				: (item.municipality)
					? item.municipality.name
					: ""
		},
		getWardNameOfItem(item) {
			return (item.vdc_ward)
				? item.vdc_ward.name
				: (item.municipality_ward)
					? item.municipality_ward.name
					: ""
		},
		async initialize(val = null) {
			this.loading = true
			if(!val) val = this.options.page
			await this.$store.dispatch("branch/filter", {page: val})
			this.items = this.branches
			this.totalItems = this.branches.count
			this.loading = false
		},
		openAddBranchFormDialog() {
			this.$bus.emit("open-branch-form-dialog-add-item")
		},
		async openEditForm(item) {
			await this.loadLocationItems(item)
			this.$bus.emit("open-branch-form-dialog-edit-item", {
				editedIndex: this.branches.results.indexOf(item),
				editedItem: Object.assign({}, item),
			})
		},
		routeToBranchDetailPage(itemId) {
			this.$router.push({name: "BRANCH ADMINISTRATION", params: { id: itemId }})
		}
	}
}
</script>

<style lang="sass" scoped>
.branch-name
	margin: 0
	padding: 0
	font-size: .9rem
	font-weight: 400

.cursor
	cursor: pointer
.search-branch
	display: block
	@media only screen and (max-width: 315px)
		display: none
.contact-chip-item
	font-size: 12px
	height: 22px
	margin: 2px
</style>
