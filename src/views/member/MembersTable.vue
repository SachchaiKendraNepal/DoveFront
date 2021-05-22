<template>
	<v-data-table
		v-model="selected"
		multi-sort
		show-select
		calculate-widths
		:single-select="false"
		:items="members"
		:search="search"
		:headers="headers"
		:items-per-page="12"
		:loading="loading"
		loading-text="Members Loading..."
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
						mdi-account-supervisor-circle
					</v-icon>
				</v-avatar>
				<v-toolbar-title v-show="$vuetify.breakpoint.smAndUp">
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
					@click.stop="openAddBranchFormDialog"
				>
					<v-icon
						dark
						:class="$vuetify.breakpoint.smAndUp ? 'mr-2' : ''"
					>
						mdi-plus-circle
					</v-icon>
					<span v-if="$vuetify.breakpoint.smAndUp">New Member</span>
				</v-btn>
				<member-form-dialog />
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
			<v-switch
				v-model="item.is_approved"
				color="primary"
				hide-details="auto"
				class="mt-0"
				disabled
			/>
		</template>
		<!-- eslint-disable-next-line vue/valid-v-slot-->
		<template #item.actions="{ item }">
			<v-icon
				v-ripple
				class="mr-2"
				color="green"
				size="22"
				@click.stop="toggleApprovalStatus(item)"
			>
				mdi-check
			</v-icon>
			<v-icon
				v-ripple
				class="mr-2"
				color="primary"
				size="20"
				@click.stop="openEditMemberFormDialog(item)"
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
	name: "MembersTable",
	components: {
		MemberFormDialog: () => import("@/views/member/MemberFormDialog")
	},
	data: () => ({
		loading: false,
		selected: [],
		search: "",
		headers: [
			{ text: "Actions", value: "actions", sortable: false },
			{ text: "Id", value: "id" },
			{ text: "User", value: "user.username" },
			{ text: "Branch", value: "branch" },
			{ text: "Role", value: "role" },
			{ text: "Approval status", value: "is_approved" },
			{ text: "Created at", value: "created_at" },
		]
	}),

	computed: {
		...mapGetters({
			members: "member/list"
		})
	},

	async created() {
		this.$bus.on("reload-members", this.initialize)
		await this.initialize()
	},

	beforeUnmount() {
		this.$bus.off("reload-members")
	},

	methods: {
		async openSnack(text, color = "error") {
			await this.$store.dispatch("snack/setSnackState", true)
			await this.$store.dispatch("snack/setSnackColor", color)
			await this.$store.dispatch("snack/setSnackText", text)
		},
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
			if (currentBranch.member_branch_roles.length === 0) return "None"
			return currentBranch.member_branch_roles[0].role_name
		},
		async initialize() {
			this.loading = true
			await this.$store.dispatch("member/fetchMembers")
			await this.$store.dispatch("user/list")
			await this.$store.dispatch("branch/fetchAll")
			this.loading = false
		},

		openAddBranchFormDialog() {
			this.$bus.emit("open-member-form-dialog-add-item")
		},

		openEditMemberFormDialog(item) {
			this.$bus.emit("open-member-form-dialog-edit-item", {
				editedIndex: this.members.indexOf(item),
				editedItem: Object.assign({}, item),
			})
		},

		async toggleApprovalStatus(item) {
			const response = await this.$store.dispatch("member/toggleApprovalStatus", {id: item.id})
			if (response) {
				await this.openSnack("Member approval status toggled successfully.", "success")
				await this.initialize()
			}
			else await this.openSnack("Toggle failed. Try again.")
		},

		async deleteItem(item) {
			const response = await this.$store.dispatch("member/delete", {id: item.id})
			if (response) {
				await this.openSnack("Member deleted successfully.", "success")
				await this.initialize()
			}
			else await this.openSnack("Delete failed. Try again.")
		},

		routeToMemberDetailPage(itemId) {
			router.push({name: "MEMBER ADMINISTRATION", params: { id: itemId }})
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
