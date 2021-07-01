<template>
	<div>
		<!-- eslint-disable-next-line vue/no-deprecated-v-bind-sync -->
		<v-data-table :options.sync="options"
			:headers="headers"
			:items="items.results"
			:server-items-length="getTotalPaginationData"
			:items-per-page="getItemsPerPageCount"
			:loading="loading"
			loading-text="Loading members..."
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
							mdi-account-supervisor-circle
						</v-icon>
					</v-avatar>
					<v-toolbar-title
						v-show="$vuetify.breakpoint.smAndUp"
						class="table-title pl-1"
					>
						Sachchai Members
					</v-toolbar-title>
					<v-divider
						class="mx-4 search-member"
						inset
						vertical
					/>
					<v-text-field
						v-model="search"
						class="search-member"
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
						class="mx-4 search-member"
						inset
						vertical
					/>
					<v-btn
						dark
						color="primary"
						@click.stop="openAddMemberFormDialog"
					>
						<v-icon
							dark
						>
							mdi-plus-circle
						</v-icon>
					</v-btn>
					<member-form-dialog @reload="initialize" />
				</v-toolbar>
			</template>
			<!-- eslint-disable-next-line vue/valid-v-slot-->
			<template #item.branch="{ item }">
				{{ getCurrentMemberBranchName(item) }}
			</template>
			<!-- eslint-disable-next-line vue/valid-v-slot-->
			<template #item.role="{ item }">
				{{ getCurrentRole(item) }}
			</template>
			<!-- eslint-disable-next-line vue/valid-v-slot-->
			<template #item.is_approved="{ item }">
				<v-checkbox
					v-model="item.is_approved"
					color="success"
					readonly
				/>
			</template>
			<!-- eslint-disable-next-line vue/valid-v-slot-->
			<template #item.created_at="{ item }">
				{{ $moment(item.created_at).format("MMMM Do YYYY") }}
			</template>
			<!-- eslint-disable-next-line vue/valid-v-slot-->
			<template #item.actions="{ item }">
				<v-icon
					v-if="!item.is_approved"
					v-ripple
					class="ma-1"
					color="green"
					small
					@click.stop="approve(item)"
				>
					mdi-check
				</v-icon>
				<v-icon
					v-else
					v-ripple
					class="ma-1"
					color="error"
					small
					@click.stop="revokeApprove(item)"
				>
					mdi-close
				</v-icon>
				<v-icon
					v-ripple
					class="ma-1"
					color="primary"
					small
					@click.stop="openEditMemberFormDialog(item)"
				>
					mdi-pencil
				</v-icon>
				<v-icon
					v-ripple
					color="red"
					class="ma-1"
					small
					@click="openAdminDeleteItemDialog(item.id, item.user.username)"
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
		<admin-delete-item-dialog
			model-name="member"
			delete-action="member/delete"
			@reload="initialize"
		/>
	</div>
</template>

<script>
import {mapGetters} from "vuex";
import AdminTableList from "@/mixins/AdminTableList";
import AdminTableDeleteItemMixin from "@/mixins/AdminTableDeleteItemMixin";
import ToggleApproval from "@/mixins/ToggleApproval";

export default {
	name: "MembersTable",
	components: {
		MemberFormDialog: () => import("@/views/member/MemberFormDialog")
	},
	mixins: [
		AdminTableList,
		ToggleApproval,
		AdminTableDeleteItemMixin
	],
	data: () => ({
		model: "member",
		headers: [
			{ text: "Actions", value: "actions", sortable: false },
			{ text: "Id", value: "id" },
			{ text: "User", value: "user.username" },
			{ text: "Branch", value: "branch" },
			{ text: "Role", value: "role" },
			{ text: "Approval", value: "is_approved" },
			{ text: "Created at", value: "created_at" },
		]
	}),

	computed: {
		...mapGetters({
			members: "member/list"
		})
	},
	methods: {
		getCurrentMemberBranch(item) {
			if (item.member_branches.length === 0) return false
			return item.member_branches[0]
		},
		getCurrentMemberBranchName(item) {
			const currentBranch = this.getCurrentMemberBranch(item)
			if (currentBranch) return currentBranch.branch.name
			return "None"
		},
		getCurrentRole(item) {
			const currentBranch = this.getCurrentMemberBranch(item)
			if (!currentBranch) return "None"
			if (currentBranch["member_branch_roles"].length === 0) return "None"
			return currentBranch["member_branch_roles"][0].role_name
		},
		async initialize(val = null) {
			this.loading = true
			if (!val) val = this.options.page
			await this.$store.dispatch("member/filter", {page: val})
			this.items = this.members
			this.totalItems = this.members.count
			this.loading = false
		},

		openAddMemberFormDialog() {
			this.$bus.emit("open-member-form-dialog-add-item")
		},

		openEditMemberFormDialog(item) {
			this.$bus.emit("open-member-form-dialog-edit-item", {
				editedIndex: this.items.results.indexOf(item),
				editedItem: Object.assign({}, item),
			})
		},

		routeToMemberDetailPage(itemId) {
			this.$router.push({name: "MEMBER ADMINISTRATION", params: { id: itemId }})
		}
	}
}
</script>
<style lang="sass" scoped>
.search-member
	display: block
	@media only screen and (max-width: 315px)
		display: none
</style>
