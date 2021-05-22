<template>
	<v-data-table
		id="branch-d-table"
		v-model="selected"
		:loading="isLoading"
		loading-text="Branches Loading..."
		calculate-widths
		:headers="headers"
		:items="branches"
		:search="search"
		multi-sort
		show-select
		:single-select="false"
		:items-per-page="12"
		class="elevation-3 mx-2 mx-sm-6 mx-md-6 mx-lg-6 mx-xl-12 my-6"
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
					<span v-if="$vuetify.breakpoint.smAndUp">New Branch</span>
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
			<v-simple-checkbox
				v-model="item.is_main"
				color="primary"
				:readonly="true"
			/>
		</template>
		<!-- eslint-disable-next-line vue/valid-v-slot-->
		<template #item.is_approved="{ item }">
			<v-simple-checkbox
				v-model="item.is_approved"
				color="success"
				:readonly="true"
			/>
		</template>
		<!--		 eslint-disable-next-line vue/valid-v-slot-->
		<template #item.location="{ item }">
			<p
				class="mb-0 location"
			>
				<span>
					{{ (item.vdc_ward !== null) ? item.vdc_ward.name : item.municipality_ward.name }},&nbsp;
					{{ (item.vdc !== null) ? item.vdc.name : item.municipality.name }},&nbsp;
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
				@click="deleteItem(item)"
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
</template>

<script>
import router from "@/router";
import {mapGetters} from "vuex";

export default {
	name: "BranchTable",
	components: {
		BranchFormDialog: () => import("@/views/branch/BranchFormDialog")
	},
	data: () => ({
		search: "",
		selected: [],
		isLoading: false,
		headers: [
			{ text: "ACTIONS", value: "actions", sortable: false },
			{ text: "NAME", value: "name" },
			{ text: "CONTACTS", value: "contact" },
			{ text: "IS MAIN BRANCH", value: "is_main" },
			{ text: "IS APPROVED", value: "is_approved" },
			{ text: "LOCATION", value: "location" },
			{ text: "CREATED AT", value: "created_at" }
		]
	}),

	computed: {
		...mapGetters({
			branches: "branch/allBranches"
		})
	},

	created() {
		this.$bus.on("reload-branches", this.initialize)
		this.initialize()
	},

	beforeUnmount() {
		this.$bus.off("reload-branches")
	},

	methods: {
		initialize() {
			this.isLoading = true
			this.$store.dispatch("branch/getAll")
			this.isLoading = false
		},

		openAddBranchFormDialog() {
			this.$bus.emit("open-branch-form-dialog-add-item")
		},

		openEditBranchFormDialog(item) {
			this.$bus.emit("open-branch-form-dialog-edit-item", {
				editedIndex: this.branches.indexOf(item),
				editedItem: Object.assign({}, item),
			})
		},

		async deleteItem(item) {
			const index = this.branches.indexOf(item)
			const reaction = confirm(`Are you sure you want to delete branch "${item.name}"?`);
			if (reaction === true) {
				await this.$store.dispatch(
					"branch/delete",
					{
						id: item.id,
					})
				this.branches.splice(index, 1)
			}
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
	font-size: 18px
	font-weight: 300

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
