<template>
	<v-dialog
		v-model="dialog"
		fullscreen
		hide-overlay
		close-delay="1000"
		open-delay="1000"
		transition="dialog-bottom-transition"
	>
		<v-card
			:loading="loading"
			class="zero-border-radius"
			color="rgb(251 250 241)"
		>
			<v-card-title class="sticky-dialog-top">
				<v-avatar
					color="grey darken-1"
					size="40"
					class="mr-4 elevation-1"
				>
					<v-icon
						size="22"
						color="white"
					>
						{{ formIcon }}
					</v-icon>
				</v-avatar>
				<span class="form-title">{{ formTitle }}</span>
				<v-spacer />
				<span>
					<v-btn
						icon
						style="background: grey;"
						@click="close"
					>
						<v-icon color="white">mdi-close</v-icon>
					</v-btn>
				</span>
			</v-card-title>

			<v-card flat
				max-width="800"
				class="mx-auto"
				color="transparent"
			>
				<v-card color="aliceblue"
					style="border-radius: 0 0 10px 10px;"
				>
					<v-row
						v-show="editedIndex !== -1"
						class="ma-0 pa-0"
					>
						<v-col
							cols="12"
						>
							<v-card
								id="short-member-detail"
								flat
								class="mx-auto my-auto text-center"
								tile
							>
								<v-list v-if="editedItem.user">
									<v-list-item>
										<v-list-item-content>
											<p class="headline">
												<span
													id="follower-full-name-display"
													class="mr-2"
													@click="routeToMemberDetailPage(editedItem.id)"
												>
													{{ editedItem.user.first_name }} {{ editedItem.user.last_name }}
												</span>
												<v-tooltip bottom>
													<template #activator="{ on, attrs }">
														<v-icon
															v-if="editedItem.is_approved"
															v-ripple
															v-bind="attrs"
															color="green darken-1"
															v-on="on"
														>
															mdi-check-decagram
														</v-icon>
													</template>
													<span>Approved</span>
												</v-tooltip>
												<v-tooltip bottom>
													<template #activator="{ on, attrs }">
														<v-icon
															v-if="editedItem.user.is_superuser"
															v-ripple
															v-bind="attrs"
															color="black lighten-2"
															v-on="on"
														>
															mdi-account-cowboy-hat
														</v-icon>
													</template>
													<span>Super User</span>
												</v-tooltip>
												<v-tooltip bottom>
													<template #activator="{ on, attrs }">
														<v-icon
															v-if="editedItem.user.is_staff"
															v-ripple
															size="26"
															v-bind="attrs"
															color="orange darken-2"
															v-on="on"
														>
															mdi-account-tie
														</v-icon>
													</template>
													<span>Staff Member</span>
												</v-tooltip>
											</p>
											<v-divider class="mb-2" />
											<div class="member-information">
												<p class="ma-0 pt-1">
													<v-icon class="small-detail-icon">
														mdi-city
													</v-icon>
													<b>Current Branch:</b>
													<span class="px-1">
														<v-chip
															small
															color="primary"
															text-color="white"
														>
															{{ getCurrentBranchName }}
															<v-icon right>mdi-city-star</v-icon>
														</v-chip>
													</span>
												</p>
												<p class="ma-1 py-2">
													<v-icon class="small-detail-icon">
														mdi-account-key
													</v-icon>
													<b>Current Role:</b>
													<span class="px-1">
														<v-chip
															small
															color="primary"
															text-color="white"
														>
															{{ getCurrentRoleName }}
															<v-icon right>{{ getCurrentRoleIcon }}</v-icon>
														</v-chip>
													</span>
												</p>
												<p class="mb-0 mb-4">
													<v-icon class="small-detail-icon">
														mdi-shape-plus
													</v-icon>
													<b>Date joined:</b>
													<span class="px-1">{{ editedItem.user.date_joined }}</span>
												</p>
												<p v-if="editedItem.is_approved"
													class="mb-0 mb-4"
												>
													<v-icon class="small-detail-icon">
														mdi-account-check
													</v-icon>
													<b>Approved by:</b>
													<span class="px-1">{{ editedItem.approved_by.username }}</span>
												</p>
												<p v-if="editedItem.is_approved"
													class="mb-0 mb-4"
												>
													<v-icon class="small-detail-icon">
														mdi-check
													</v-icon>
													<b>Approved at:</b>
													<span class="px-1">{{ editedItem.approved_at }}</span>
												</p>
												<p
													class="mb-0"
												>
													<v-icon class="small-detail-icon">
														mdi-history
													</v-icon>
													<b>Last logged in:</b>
													<span v-if="editedItem.user.last_login"
														class="px-1"
													>{{ editedItem.user.last_login }}</span>
													<span v-else
														class="px-1"
													>Haven't logged in.</span>
												</p>
											</div>
										</v-list-item-content>
									</v-list-item>
								</v-list>
							</v-card>
						</v-col>
					</v-row>
				</v-card>

				<v-card-text>
					<v-container>
						<v-row class="ma-0 pa-0">
							<v-col
								cols="12"
								class="ma-0 pa-0"
							>
								<p class="heading ma-0 pa-0">
									<v-icon class="pb-1"
										size="30"
									>
										mdi-account-circle
									</v-icon>
									Follower Information
								</p>
								<v-divider class="pb-4" />
							</v-col>
							<v-col
								cols="12"
								class="ma-0 pa-0"
							>
								<v-select
									id="user"
									v-model="editedItem.user"
									class="ma-0"
									outlined
									dense
									label="Follower"
									:items="users"
									item-text="username"
									item-value="id"
									prepend-inner-icon="mdi-card-account-details-outline"
									:error-messages="memberFormErrors.user"
								/>
							</v-col>
							<v-col cols="12"
								class="ma-0 pa-0"
							>
								<v-card-actions class="pa-0">
									<v-btn
										color="blue lighten-5"
										class="blue--text"
										block
										:disabled="editedIndex > -1"
										@click="saveMember"
									>
										Save
									</v-btn>
								</v-card-actions>
							</v-col>

							<v-col
								v-if="editedIndex > -1"
								cols="12"
							>
								<v-col
									cols="12"
									class="pl-0"
								>
									<p class="heading ma-0 pa-0">
										<v-icon class="pb-1"
											size="30"
										>
											mdi-city-variant
										</v-icon>
										Branch Information
									</p>
									<v-divider class="pb-2" />
								</v-col>
								<v-scale-transition>
									<v-row v-if="moreBranches"
										class="ma-0 pa-0"
									>
										<v-col cols="12"
											class="ma-0 pa-0 py-1"
										>
											<h3 class="assigned-branches">
												Assigned Branches
											</h3>
										</v-col>
										<v-col v-for="(item, index) in editedItem.member_branches"
											:key="item.id"
											cols="12"
											class="px-0"
											:class="(index === 0) ? 'ma-0 pt-0' : ''"
										>
											<v-col cols="12"
												class="ma-0 pa-0"
											>
												<div class="d-flex justify-space-between pb-1">
													<v-icon small
														class="ma-0 pa-0"
													>
														mdi-home-city-outline
													</v-icon>
													<h4 class="pl-2">
														{{ item.branch.name }}
													</h4>
													<div class="date-of-membership px-1">
														<v-icon small>
															mdi-calendar
														</v-icon> {{ item.date_of_membership }}
													</div>
													<v-spacer />
													<v-tooltip bottom>
														<template #activator="{on, attrs}">
															<v-btn x-small dark
																color="red"
																icon
																v-bind="attrs"
																v-on="on"
																@click="stripBranch(item.id)"
															>
																<v-icon>mdi-delete</v-icon>
															</v-btn>
														</template>
														<span>Strip Branch</span>
													</v-tooltip>
												</div>

												<v-col cols="12">
													<v-col
														cols="12"
														class="pl-0"
													>
														<p class="heading ma-0 pa-0">
															<v-icon class="pb-1"
																size="24"
															>
																mdi-map-marker
															</v-icon>
															Role Information
														</p>
														<v-divider class="pb-2" />

														<v-scale-transition>
															<v-row v-if="moreRoles(item)"
																class="ma-0 pa-0"
															>
																<v-col cols="12"
																	class="pt-0 px-0"
																>
																	<h3 class="assigned-roles">
																		Assigned Roles
																	</h3>
																</v-col>
																<v-col v-for="(role_item, ini) in item.member_branch_roles"
																	:key="role_item.id"
																	cols="12"
																	class="px-0"
																	:class="(ini ===0) ? 'ma-0 pt-0' : ''"
																>
																	<v-col cols="12"
																		class="ma-0 pa-0"
																	>
																		<div class="d-flex justify-space-between pb-1">
																			<div class="d-flex align-items-center">
																				<v-icon small
																					class="ma-0 pa-0"
																				>
																					mdi-key
																				</v-icon>
																				<h4>{{ role_item.role_name }}</h4>
																			</div>
																			<v-tooltip bottom>
																				<template #activator="{on, attrs}">
																					<v-btn x-small dark
																						color="red"
																						icon
																						v-bind="attrs"
																						v-on="on"
																						@click="stripRole(role_item.id)"
																					>
																						<v-icon>mdi-delete</v-icon>
																					</v-btn>
																				</template>
																				<span>Strip Role</span>
																			</v-tooltip>
																		</div>
																		<div class="date-of-mem px-1">
																			From: {{ role_item.from_date }}
																			To: {{ role_item.to_date }}
																		</div>
																	</v-col>
																</v-col>
															</v-row>
														</v-scale-transition>
														<v-col cols="12"
															class="pt-0 px-0"
														>
															<h3 class="assigned-roles">
																Assign New Roles
															</h3>
														</v-col>
														<v-form v-model="memberBranchRoleFormValid[index]">
															<v-col
																cols="12"
																class="ma-0 pa-0"
															>
																<v-select
																	id="role-name"
																	v-model="editedItemBranchMemberRole.role_name[item.id]"
																	:items="roleNameItems"
																	label="Role name"
																	filled
																	:rules="[rules.required]"
																	prepend-inner-icon="mdi-account-key"
																	dense
																/>
															</v-col>
															<v-col
																cols="12"
																class="ma-0 pa-0"
															>
																<v-menu
																	v-model="fromDateMenu[index]"
																	:close-on-content-click="false"
																	transition="scale-transition"
																	offset-y
																	min-width="auto"
																>
																	<template #activator="{ on, attrs }">
																		<v-text-field
																			v-model="editedItemBranchMemberRole.from_date[item.id]"
																			label="From date"
																			prepend-inner-icon="mdi-calendar"
																			readonly
																			v-bind="attrs"
																			dense
																			filled
																			:rules="[rules.required]"
																			v-on="on"
																		/>
																	</template>
																	<v-date-picker
																		v-model="editedItemBranchMemberRole.from_date[item.id]"
																		@input="fromDateMenu[index] = false"
																	/>
																</v-menu>
															</v-col>
															<v-col
																cols="12"
																class="ma-0 pa-0"
															>
																<v-menu
																	v-model="toDateMenu[index]"
																	:close-on-content-click="false"
																	transition="scale-transition"
																	offset-y
																	min-width="auto"
																>
																	<template #activator="{ on, attrs }">
																		<v-text-field
																			v-model="editedItemBranchMemberRole.to_date[item.id]"
																			label="To date"
																			prepend-inner-icon="mdi-calendar"
																			readonly
																			v-bind="attrs"
																			dense
																			filled
																			:rules="[rules.required]"
																			v-on="on"
																		/>
																	</template>
																	<v-date-picker
																		v-model="editedItemBranchMemberRole.to_date[item.id]"
																		@input="toDateMenu[index] = false"
																	/>
																</v-menu>
															</v-col>
															<v-col cols="12"
																class="pa-0"
															>
																<v-card-actions class="pa-0">
																	<v-btn
																		color="blue lighten-5"
																		class="blue--text"
																		block
																		:disabled="!memberBranchRoleFormValid[index]"
																		@click="saveMemberRole(item.id)"
																	>
																		Save
																	</v-btn>
																</v-card-actions>
															</v-col>
														</v-form>
													</v-col>
												</v-col>
											</v-col>
										</v-col>
									</v-row>
								</v-scale-transition>
								<v-col cols="12"
									class="px-0 ma-0"
								>
									<h3 class="assigned-branches">
										Assign new branch
									</h3>
								</v-col>
								<v-col
									cols="12"
									class="ma-0 pa-0"
								>
									<v-select
										id="member-branch"
										v-model="defaultMemberBranch.branch"
										class="ma-0"
										outlined
										dense
										clearable
										label="Branch"
										:items="branches"
										item-text="name"
										item-value="id"
										prepend-inner-icon="mdi-home-city"
									/>
								</v-col>
								<v-col
									cols="12"
									class="ma-0 pa-0"
								>
									<v-menu
										v-model="menu"
										:close-on-content-click="false"
										transition="scale-transition"
										offset-y
										min-width="auto"
									>
										<template #activator="{ on, attrs }">
											<v-text-field
												v-model="defaultMemberBranch.date_of_membership"
												label="Date of membership"
												prepend-inner-icon="mdi-calendar"
												readonly
												v-bind="attrs"
												dense
												outlined
												v-on="on"
											/>
										</template>
										<v-date-picker
											v-model="defaultMemberBranch.date_of_membership"
											@input="menu = false"
										/>
									</v-menu>
								</v-col>
								<v-col cols="12"
									class="pa-0 ma-0"
								>
									<v-card-actions class="pa-0">
										<v-btn
											color="blue lighten-5"
											class="blue--text"
											block
											@click="saveMemberBranch"
										>
											Save
										</v-btn>
									</v-card-actions>
								</v-col>
							</v-col>
						</v-row>
					</v-container>
				</v-card-text>
			</v-card>
		</v-card>
	</v-dialog>
</template>
<script>
import router from "@/router";
import {mapGetters} from "vuex";

export default {
	name: "MemberFormDialog",
	data: () => ({
		loading: null,
		memberBranchRoleFormValid: [],
		roleNameItems: [
			"Branch Chief",
			"Branch Vice Chief",
			"Leader",
			"Double Star Leader",
			"Single Star Leader",
			"Maintainer",
		],
		menu: false,
		fromDateMenu: [],
		toDateMenu: [],
		dialog: false,
		editedIndex: -1,
		editedItem: {
			id: null,
			user: {
				username: null,
				last_login: null,
				first_name: null,
				last_name: null,
				contact: null,
				date_joined: null
			},
			member_branches: [],
			is_approved: null,
			approved_by: {
				username: null
			},
			approved_at: null
		},
		defaultItem: {
			user: {
				username: null,
				last_login: null,
				first_name: null,
				last_name: null,
				contact: null,
				date_joined: null
			},
			member_branches: [],
			is_approved: null,
			approved_by: {
				username: null
			},
			approved_at: null
		},
		defaultMemberBranch: {
			branch: null,
			date_of_membership: null
		},
		editedItemBranchMemberRole: {
			role_name: [],
			from_date: [],
			to_date: []
		},
		rules: {
			required: value => !!value || "This field is required.",
		}
	}),
	computed: {
		...mapGetters({
			users: "user/usersList",
			branches: "branch/allBranches",
			member: "member/detail",
			memberFormErrors: "member/memberFormErrors",
			memberRoleFormErrors: "member/memberRoleFormErrors",
			memberBranchFormErrors: "member/memberBranchFormErrors"
		}),
		formTitle() {
			return this.editedIndex === -1 ? "Add New Member" : "Edit Member"
		},
		formIcon() {
			return this.editedIndex === -1 ? "mdi-plus-circle" : "mdi-account-edit"
		},
		getCurrentRoleIcon() {
			const roleName = this.getCurrentRoleName
			if (roleName === "None") return "mdi-close"
			else if(roleName === "Branch Chief") return "mdi-sth"
			else if(roleName === "Branch Vice Chief") return "mdi-sth"
			else if(roleName === "Leader") return "mdi-sth"
			else if(roleName === "Double Star Leader") return "mdi-sth"
			else if(roleName === "Single Star Leader") return "mdi-sth"
			else if(roleName === "Maintainer") return "mdi-sth"
			else return "None"
		},
		getCurrentBranchName() {
			const currentBranch = this.getCurrentMemberBranch
			if (currentBranch) return currentBranch.branch.name
			return "None"
		},
		getCurrentMemberBranch() {
			if (this.editedItem.member_branches.length === 0) return false
			return this.editedItem.member_branches[0]
		},
		getCurrentRoleName() {
			const currentBranch = this.getCurrentMemberBranch
			if (!currentBranch) return "None"
			if (currentBranch.member_branch_roles.length === 0) return "None"
			return currentBranch.member_branch_roles[0].role_name
		},
		moreBranches() {
			return this.editedItem.member_branches.length !== 0;
		},
	},
	async created() {
		this.$bus.on("open-member-form-dialog-add-item", this.openCreateDialog)
		this.$bus.on("open-member-form-dialog-edit-item", this.openEditDialog)
	},
	beforeUnmount() {
		this.$bus.off("open-member-form-dialog-add-item")
		this.$bus.off("open-member-form-dialog-edit-item")
	},
	methods: {
		moreRoles(memberBranch) {
			return memberBranch.member_branch_roles.length !== 0;
		},
		addAnotherMemberBranch() {
			this.defaultMemberBranch = {
				branch: null,
				date_of_membership: null
			}
		},
		readyAddingAnotherMemberRole(memberBranchId) {
			delete this.editedItemBranchMemberRole.from_date[memberBranchId]
			delete this.editedItemBranchMemberRole.to_date[memberBranchId]
			delete this.editedItemBranchMemberRole.role_name[memberBranchId]
		},
		async init() {
			this.loading = true
			await this.$store.dispatch("member/clearMemberFormError")
			await this.$store.dispatch("member/clearMemberRoleFormError")
			await this.$store.dispatch("member/clearMemberBranchFormError")
			this.loading = false
		},

		async openDialog() {
			await this.init()
			this.dialog = true
		},

		async openCreateDialog() {
			this.editedIndex = -1
			this.editedItem = this.defaultItem
			await this.openDialog()
		},

		async openEditDialog(args) {
			this.editedIndex = args.editedIndex
			this.editedItem = args.editedItem
			await this.openDialog()
		},

		async close() {
			this.dialog = false
			await this.$store.dispatch("member/clearMemberFormError")
			await this.$store.dispatch("member/clearMemberRoleFormError")
			await this.$store.dispatch("member/clearMemberBranchFormError")
			this.$bus.emit("reload-members")
		},

		async openSnack(text, color = "error") {
			await this.$store.dispatch("snack/setSnackState", true)
			await this.$store.dispatch("snack/setSnackColor", color)
			await this.$store.dispatch("snack/setSnackText", text)
		},

		async saveMember() {
			await this.$store.dispatch("member/create", {body: {
				user: this.editedItem.user
			}})
			await this.close()
		},
		async saveMemberBranch() {
			const response =  await this.$store.dispatch("member/assignBranch", {
				userId: this.editedItem.id,
				body: this.defaultMemberBranch
			})
			if (response) {
				await this.openSnack("Member branch assigned.", "success")
				await this.$store.dispatch("member/fetchMemberDetail", {id: this.editedItem.id})
				this.editedItem = this.member
				this.addAnotherMemberBranch()
			} else {
				await this.openSnack("Member branch assign failed.")
			}
		},
		async stripBranch(itemId) {
			const response = await this.$store.dispatch("member/stripBranch", {
				id: itemId
			})
			if (response) {
				await this.openSnack("Member branch removed.", "success")
				await this.$store.dispatch("member/fetchMemberDetail", {id: this.editedItem.id})
				this.editedItem = this.member
			} else {
				await this.openSnack("Member branch remove failed.")
			}
		},
		async saveMemberRole(memberBranchId) {
			const memberRoleBody = {
				role_name: this.editedItemBranchMemberRole.role_name[memberBranchId],
				from_date: this.editedItemBranchMemberRole.from_date[memberBranchId],
				to_date: this.editedItemBranchMemberRole.to_date[memberBranchId],
				member_branch: memberBranchId
			}
			const response =  await this.$store.dispatch("member/assignRole", {
				userId: this.editedItem.id,
				body: memberRoleBody
			})
			if (response) {
				await this.openSnack("Member role assigned.", "success")
				await this.$store.dispatch("member/fetchMemberDetail", {id: this.editedItem.id})
				this.editedItem = this.member
				this.readyAddingAnotherMemberRole(memberBranchId)
			} else {
				await this.openSnack(this.memberRoleFormErrors["non_field_errors"][0])
			}
		},

		async stripRole(itemId) {
			const response = await this.$store.dispatch("member/stripRole", {
				id: itemId
			})
			if (response) {
				await this.openSnack("Member role removed.", "success")
				await this.$store.dispatch("member/fetchMemberDetail", {id: this.editedItem.id})
				this.editedItem = this.member
			} else {
				await this.openSnack("Member role strip failed.")
			}
		},

		routeToMemberDetailPage(itemId) {
			router.push({name: "FOLLOWER ADMINISTRATION", params: { id: itemId }})
		}
	},
}
</script>
<style lang="sass" scoped>
.zero-border-radius
	border-radius: 0
	.sticky-dialog-top
		position: sticky
		position: -webkit-sticky
		top: 0
		z-index: 200
	.v-card__title
		background-color: #535151 !important
	.form-title
		color: white
		font-weight: 400
		display: block
		@media only screen and (max-width: 325px)
			display: none

	.v-input--selection-controls
		margin-top: 0

	#short-member-detail
		.small-detail-icon
			margin-top: -4px
			margin-right: 4px
	.follower-full-name
		font-size: 18px
		font-weight: 300
		color: #474646
		cursor: pointer

	#profile-img-avatar
		transition: all .5s
		margin-top: -90px
		border: 4px solid white
		@media only screen and (max-width: 245px)
			height: 100px !important
			min-width: 100px !important
			width: 100px !important
			margin-top: -50px !important
			border: 2px solid white !important
.date-of-membership
	font-size: .7rem
.assigned-branches
	background-color: #f8f3c2
	padding: 10px
	border-radius: 10px
	margin-bottom: 10px

.assigned-roles
	background-color: #c2f8e5
	padding: 10px
	border-radius: 10px
	margin-bottom: 10px
</style>
<style lang="scss">
.v-label {
	font-size: 14px !important;
}
.v-input {
	font-size: 14px !important;
}
.member-information {
	font-size: .875rem;
}
</style>
