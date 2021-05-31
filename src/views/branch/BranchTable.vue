<template>
	<v-card v-if="items"
		max-width="1000"
		class="mx-auto rounded-0"
		flat
	>
		<div class="py-6" />
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
			class="elevation-3 mx-2"
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
						class="elevation-2 mr-2"
						size="40"
					>
						<v-icon size="30">
							mdi-city-variant
						</v-icon>
					</v-avatar>
					<v-toolbar-title v-show="$vuetify.breakpoint.smAndUp">
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
						<v-icon
							dark
							:class="$vuetify.breakpoint.smAndUp ? 'mr-2' : ''"
						>
							mdi-plus-circle
						</v-icon>
						<span v-if="$vuetify.breakpoint.smAndUp">Branch</span>
					</v-btn>
					<branch-form-dialog />
				</v-toolbar>
			</template>
			<!-- eslint-disable-next-line vue/valid-v-slot-->
			<template #item.name="{ item }">
				<p
					class="branch-name cursor"
					@click="routeToBranchDetailPage(item.id)"
				>
					{{ item.name }}
				</p>
			</template>
			<!-- eslint-disable-next-line vue/valid-v-slot-->
			<template #item.is_main="{ item }">
				<v-switch
					v-model="item.is_main"
					color="primary"
					hide-details="auto"
					class="mt-0"
					disabled
				/>
			</template>
			<!-- eslint-disable-next-line vue/valid-v-slot-->
			<template #item.is_approved="{ item }">
				<v-switch
					v-model="item.is_approved"
					color="success"
					hide-details="auto"
					class="mt-0"
					disabled
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
					<i>{{ item.district.name }},&nbsp;
						{{ item.province.name }},&nbsp;</i>
					<b>{{ item.country.name }}</b>
				</p>
			</template>
			<!-- eslint-disable-next-line vue/valid-v-slot-->
			<template #item.created_at="{ item }">
				{{ $moment(item.created_at).fromNow() }}
			</template>
			<!-- eslint-disable-next-line vue/valid-v-slot-->
			<template #item.actions="{ item }">
				<v-icon
					v-ripple
					class="mr-2"
					color="success"
					size="22"
					@click="toggleApproval(item)"
				>
					mdi-check
				</v-icon>
				<v-icon
					v-ripple
					class="mr-2"
					color="primary"
					size="20"
					@click="openEditBranchFormDialog(item)"
				>
					mdi-pencil
				</v-icon>
				<v-icon
					v-ripple
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
		<div class="py-6" />
		<admin-delete-item-dialog
			model-name="branch"
			delete-action="branch/delete"
		/>
	</v-card>
</template>

<script>
import router from "@/router";
import {mapGetters} from "vuex";
import AdminTableList from "@/mixins/AdminTableList";
import ToggleApproval from "@/mixins/ToggleApproval";
import AdminTableDeleteItemMixin from "@/mixins/AdminTableDeleteItemMixin";

export default {
	name: "BranchTable",
	components: {
		BranchFormDialog: () => import("@/views/branch/BranchFormDialog")
	},
	mixins: [AdminTableList, AdminTableDeleteItemMixin, ToggleApproval],
	data: () => ({
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
		mixinData: {
			modelName: "branch",
			deleteAction: "branch/delete",
			toggleApprovalAction: "branch/toggleApproval"
		}
	}),
	computed: {
		...mapGetters({
			branches: "branch/list"
		})
	},
	methods: {
		getMunicipalityOrVdcName(item) {
			return (item.vdc !== null) ? item.vdc.name : item.municipality.name
		},
		getWardNameOfItem(item) {
			if (item.vdc_ward) {
				if (item.vdc_ward["name"]) return item.vdc_ward["name"]
			} else if (item.municipality_ward) {
				if (item.municipality_ward["name"]) return item.municipality_ward["name"]
			}
		},
		async initialize(val=null) {
			this.loading = true
			await this.$store.dispatch("branch/filter", {page: val})
			this.items = this.branches
			this.totalItems = this.branches.count
			this.loading = false
		},
		openAddBranchFormDialog() {
			this.$bus.emit("open-branch-form-dialog-add-item")
		},
		openEditBranchFormDialog(item) {
			this.$bus.emit("open-branch-form-dialog-edit-item", {
				editedIndex: this.branches.results.indexOf(item),
				editedItem: Object.assign({}, item),
			})
		},
		routeToBranchDetailPage(itemId) {
			router.push({name: "BRANCH ADMINISTRATION", params: { id: itemId }})
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
