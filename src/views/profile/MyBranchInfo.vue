<template>
	<div>
		<header-toolbar />
		<v-list
			v-if="isApprovedMember"
			two-line
		>
			<v-card
				v-if="currentUser['member']['member_branches'].length === 0"
			>
				<v-list-item>
					<v-list-item-content>
						<v-chip class="d-flex justify-center">
							You are not connected to any <strong class="px-1">Branch</strong> yet. Please contact <strong class="px-1">Kendra Administrators</strong> for a branch membership.
						</v-chip>
					</v-list-item-content>
				</v-list-item>
			</v-card>
			<v-list-item-group
				v-for="(item, i) in currentUser['member']['member_branches']"
				v-else
				:key="i"
			>
				<v-chip label
					color="indigo lighten-4"
					class="ma-2"
				>
					Branch ({{ i+1 }}) <span><v-icon right>mdi-chevron-right</v-icon></span>
				</v-chip>
				<v-divider class="mx-2" />
				<v-list-item-group>
					<v-list-item>
						<v-list-item-icon>
							<v-icon color="indigo">
								mdi-city
							</v-icon>
						</v-list-item-icon>

						<v-list-item-content>
							<v-list-item-title>{{ item['branch']['name'] }}</v-list-item-title>
							<v-list-item-subtitle>{{ "Branch".toUpperCase() }}</v-list-item-subtitle>
						</v-list-item-content>
					</v-list-item>
					<v-divider
						inset
					/>
					<v-list-item>
						<v-list-item-icon>
							<v-icon color="indigo">
								mdi-calendar-start
							</v-icon>
						</v-list-item-icon>

						<v-list-item-content>
							<v-list-item-title>
								{{ $moment(item['date_of_membership']).format("Do MMM YYYY") }}
							</v-list-item-title>
							<v-list-item-subtitle>{{ "Date of membership".toUpperCase() }}</v-list-item-subtitle>
						</v-list-item-content>
					</v-list-item>
					<v-divider
						inset
					/>
				</v-list-item-group>
				<v-list-item-group>
					<v-list-item
						v-if="item['member_branch_roles'].length === 0"
					>
						<v-list-item-content>
							<v-chip>
								No any <strong class="px-1">Roles</strong> assigned yet for this <strong class="px-1">Branch</strong>.
								Please contact <strong class="px-1">Kendra Administrators</strong> for Branch Role assignment.
							</v-chip>
						</v-list-item-content>
					</v-list-item>
					<v-list-item v-for="(branch_role, index) in item['member_branch_roles']"
						v-else
						:key="parseInt(branch_role)"
					>
						<v-list-item-group>
							<v-chip class="ma-2"
								label
								color="teal lighten-4"
							>
								Role ({{ index + 1 }}) <span><v-icon right>mdi-chevron-right</v-icon></span>
							</v-chip>
							<v-list-item>
								<v-list-item-icon>
									<v-icon color="teal">
										mdi-key
									</v-icon>
								</v-list-item-icon>
								<v-list-item-content>
									<v-list-item-title>
										{{ branch_role.role_name }}
									</v-list-item-title>
									<v-list-item-subtitle>
										{{ "Role Name".toUpperCase() }}
									</v-list-item-subtitle>
								</v-list-item-content>
							</v-list-item>
							<v-list-item>
								<v-list-item-icon>
									<v-icon color="teal">
										mdi-calendar-start
									</v-icon>
								</v-list-item-icon>
								<v-list-item-content>
									<v-list-item-title>
										{{ $moment(branch_role.from_date).format("Do MMM YYYY") }}
									</v-list-item-title>
									<v-list-item-subtitle>
										FROM DATE
									</v-list-item-subtitle>
								</v-list-item-content>
							</v-list-item>
							<v-list-item>
								<v-list-item-icon>
									<v-icon color="teal">
										mdi-calendar-end
									</v-icon>
								</v-list-item-icon>
								<v-list-item-content>
									<v-list-item-title>
										{{ $moment(branch_role.to_date).format("Do MMM YYYY") }}
									</v-list-item-title>
									<v-list-item-subtitle>
										{{ "To Date".toUpperCase() }}
									</v-list-item-subtitle>
								</v-list-item-content>
							</v-list-item>
						</v-list-item-group>
					</v-list-item>
				</v-list-item-group>
			</v-list-item-group>
		</v-list>
		<v-card v-else-if="isMember"
			class="ma-2 pa-4 d-flex justify-center"
		>
			<v-chip>You approval status is under review. You can see your branch information after approval.</v-chip>
		</v-card>
		<v-card v-else
			class="ma-2 pa-4 d-flex justify-center"
		>
			<v-chip>Not a member yet. Please contact sachchai leaders or administration for a membership.</v-chip>
		</v-card>
	</div>
</template>

<script>
import HeaderToolbar from "@/views/profile/HeaderToolbar";
export default {
	name: "MyBranchInfo",
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
		}
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
