<template>
	<v-card flat
		min-height="85vh"
	>
		<div class="py-6" />
		<header-toolbar />
		<v-card v-if="isApprovedMember"
			class="mt-4"
		>
			<v-list two-line>
				<v-list-item-group
					v-for="(item, i) in branchItems"
					:key="i"
				>
					<v-list-item>
						<v-list-item-icon>
							<v-icon color="indigo">
								{{ item.icon }}
							</v-icon>
						</v-list-item-icon>

						<v-list-item-content>
							<v-list-item-title>{{ item.value }}</v-list-item-title>
							<v-list-item-subtitle>{{ item.field }}</v-list-item-subtitle>
						</v-list-item-content>
					</v-list-item>
					<v-divider
						v-if="i < branchItems.length - 1"
						:key="i"
						inset
					/>
				</v-list-item-group>
			</v-list>
		</v-card>
		<v-card v-else-if="isMember"
			class="ma-2 pa-4 d-flex justify-center"
		>
			<v-chip>You approval status is under review. You can see your <strong class="px-1">Branch</strong> information after an approval.</v-chip>
		</v-card>
		<v-card v-else
			class="ma-2 pa-4 d-flex justify-center"
		>
			<v-chip>Not a member yet. Please contact <strong class="px-1">Leaders</strong> or the <strong class="px-1">Administration</strong> for a membership.</v-chip>
		</v-card>
	</v-card>
</template>

<script>
import HeaderToolbar from "@/views/profile/HeaderToolbar";
export default {
	name: "MembershipView",
	components: {HeaderToolbar},
	data: () => ({
		actionItems: [
			{icon: "mdi-pencil", text: "Edit", color: "primary"},
			{icon: "mdi-delete", text: "Reset", color: "red"}
		],
	}),
	computed: {
		currentUser() {
			return this.$helper.getCurrentUser()
		},
		isMember() {
			return (this.currentUser.member !== null)
		},
		isApprovedMember() {
			if (this.currentUser.member) {
				return this.currentUser.member.is_approved
			} else return false
		},
		branchItems() {
			if (!this.isMember) return []
			const member = this.currentUser.member
			return [
				{icon: "mdi-check-bold", field: "Status", value: (member.is_approved) ? "Approved" : "Not Approved"},
				{icon: "mdi-calendar-check", field: "Approved at", value: (member.is_approved) ? this.$moment(member.approved_at).format("Do MMM YYYY") : "Not Approved"},
				{icon: "mdi-account-check", field: "Approved by", value: this.getValue(member.approved_by.username)},
				{icon: "mdi-city", field: "Current Branch", value: (typeof this.currentBranch === "string") ? this.currentBranch : this.currentBranch.branch.name },
				{icon: "mdi-account-cowboy-hat", field: "Current Role", value: (typeof this.currentRole === "string") ? this.currentRole : this.currentRole.role_name},
			]
		},
		currentRole() {
			if (this.isMember) {
				const memberBranchRoles = this.currentBranch["member_branch_roles"]
				if (memberBranchRoles.length === 0) return "Not set"
				let latestRole
				let tempRoleFrom
				memberBranchRoles.forEach(memberBranchRole => {
					if (!tempRoleFrom) {
						tempRoleFrom = memberBranchRole.from_date
						latestRole = memberBranchRole
					} else {
						if (tempRoleFrom < memberBranchRole.from_date) {
							tempRoleFrom = memberBranchRole.from_date
							latestRole = memberBranchRole
						}
					}
				})
				return latestRole
			} else return "Not set"
		},
		currentBranch() {
			if (this.isMember) {
				let latestBranch
				let tempDateOfMembership
				this.currentUser.member["member_branches"].forEach(memberBranch => {
					if (!tempDateOfMembership) {
						tempDateOfMembership = memberBranch.date_of_membership
						latestBranch = memberBranch
					} else {
						if (tempDateOfMembership < memberBranch.date_of_membership) {
							tempDateOfMembership = memberBranch.date_of_membership
							latestBranch = memberBranch
						}
					}
				})
				return latestBranch
			} return "Not set"
		},
	},
	methods: {
		getValue(value) {
			if (!value) return "Not Set"
			return value
		},
	}
}
</script>

<style scoped>

</style>
