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
						<v-icon
							dark
							:class="$vuetify.breakpoint.smAndUp ? 'mr-2' : ''"
						>
							mdi-plus-circle
						</v-icon>
						<span v-if="$vuetify.breakpoint.smAndUp">Branch</span>
					</v-btn>
					<branch-form-dialog @reload="initialize" />
				</v-toolbar>
			</template>
			<!-- eslint-disable-next-line vue/valid-v-slot-->
			<template #item.name="props">
				<v-edit-dialog v-model:return-value="props.item.name"
					@save="patch(props.item.id, {name: nameToUpdate})"
					@open="nameToUpdate = props.item.name"
				>
					{{ props.item.name }}
					<template #input>
						<v-text-field
							v-model="nameToUpdate"
							label="Update name"
							single-line
							:errors="formErrors"
							counter="64"
						/>
					</template>
				</v-edit-dialog>
			</template>
			<!-- eslint-disable-next-line vue/valid-v-slot-->
			<template #item.contact="props">
				<v-edit-dialog v-model:return-value="props.item.contact"
					@save="patch(props.item.id, {contact: contactToUpdate})"
					@open="contactToUpdate = props.item.contact.substr(4)"
				>
					{{ props.item.contact }}
					<template #input>
						<v-text-field
							v-model="contactToUpdate"
							label="Update contact"
							single-line
							:errors="formErrors"
							counter="64"
						/>
					</template>
				</v-edit-dialog>
			</template>
			<!-- eslint-disable-next-line vue/valid-v-slot-->
			<template #item.slogan="props">
				<v-edit-dialog v-model:return-value="props.item.slogan"
					save-text="save"
					@close="patchSlogan(props.item)"
					@open="sloganToUpdate = props.item.slogan"
				>
					{{ props.item.slogan.substr(0, 120) }}
					<span v-if="props.item.slogan.length > 120">...</span>
					<template #input>
						<v-textarea
							v-model="sloganToUpdate"
							label="Update description"
							auto-grow
							:errors="formErrors"
							counter="512"
						/>
					</template>
				</v-edit-dialog>
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
					@click="openLocationEdiDialog('branch', item)"
				>
					mdi-map-marker-radius
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
		<location-patch-form
			model="branch"
		/>
		<admin-delete-item-dialog
			model-name="branch"
			delete-action="branch/delete"
		/>
	</div>
</template>

<script>
import {mapGetters} from "vuex";
import AdminTableList from "@/mixins/AdminTableList";
import ToggleApproval from "@/mixins/ToggleApproval";
import AdminTableDeleteItemMixin from "@/mixins/AdminTableDeleteItemMixin";
import LocationUpdateMixin from "@/mixins/LocationUpdateMixin.js";
import LocationPatchForm from "@/components/LocationPatchForm.vue";

export default {
	name: "BranchTable",
	components: {
		LocationPatchForm,
		BranchFormDialog: () => import("@/views/branch/BranchFormDialog")
	},
	mixins: [
		AdminTableList,
		AdminTableDeleteItemMixin,
		ToggleApproval,
		LocationUpdateMixin,
	],
	data: () => ({
		selected: [],
		nameToUpdate: null,
		sloganToUpdate: null,
		contactToUpdate: null,
		headers: [
			{ text: "ACTIONS", value: "actions", sortable: false },
			{ text: "NAME", value: "name" },
			{ text: "SLOGAN", value: "slogan" },
			{ text: "CONTACTS", value: "contact" },
			{ text: "IS MAIN BRANCH", value: "is_main" },
			{ text: "IS APPROVED", value: "is_approved" },
			{ text: "LOCATION", value: "location" },
			{ text: "CREATED AT", value: "created_at" }
		],
		model: "branch"
	}),
	computed: {
		...mapGetters({
			branches: "branch/list",
			formErrors: "branch/formErrors"
		})
	},
	created() {
		this.$bus.on("reload", this.initialize)
	},
	beforeUnmount() {
		this.$bus.off("reload")
	},
	methods: {
		async patchSlogan(item) {
			if (item.slogan !== this.sloganToUpdate) {
				await this.patch(item.id, {slogan: this.sloganToUpdate})
			}
		},
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
