<template>
	<v-card flat>
		<v-list v-if="branchItems.length > 0"
			two-line
		>
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
		<div v-else
			class="ma-2"
		>
			<v-chip>Not a member</v-chip>
		</div>
	</v-card>
</template>

<script>
export default {
	name: "MyBranchInfo",
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
			console.log(this.currentUser["member"])
			return (this.currentUser.member !== null)
		},
		currentRole() {
			if (this.isMember) {
				const memberBranchRoles = this.currentBranch["member_branch_roles"]
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
				const memberBranches = this.currentUser.member["member_branches"]
				let latestBranch
				let tempDateOfMembership
				memberBranches.forEach(memberBranch => {
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
		branchItems() {
			if (!this.isMember) return []
			console.log("here")
			return [
				{icon: "mdi-check-bold", field: "Status", value: (this.currentUser.member.is_approved) ? "Approved" : "Not Approved"},
				{icon: "mdi-calendar-check", field: "Approved at", value: this.getValue(this.currentUser.member.approved_at)},
				{icon: "mdi-account-check", field: "Approved by", value: this.getValue(this.currentUser.member.approved_by.username)},
				{icon: "mdi-city", field: "Branch", value: this.currentBranch["branch"]["name"]},
				{icon: "mdi-account-cowboy-hat", field: "Position", value: this.currentRole["role_name"]},
			]
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
