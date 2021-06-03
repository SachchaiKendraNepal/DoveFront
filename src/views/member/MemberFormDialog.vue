<template>
	<v-dialog
		v-model="dialog"
		fullscreen
		close-delay="1000"
		open-delay="1000"
		transition="dialog-bottom-transition"
	>
		<v-card
			:loading="loading"
			class="rounded-0"
			color="rgb(251 250 241)"
		>
			<v-card-title class="grey darken-3">
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
						color="grey darken-2"
						fab
						dark
						x-small
						@click="closeCreateEditDialog"
					>
						<v-icon>mdi-close</v-icon>
					</v-btn>
				</span>
			</v-card-title>

			<v-card flat
				max-width="800"
				class="mx-auto"
				color="transparent"
			>
				<v-card color="aliceblue"
					class="round-bottom"
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
											<div class="d-flex justify-center">
												<span
													class="follower-full-name"
													@click="routeToMemberDetailPage(editedItem.id)"
												>
													{{ editedItem.user.first_name }} {{ editedItem.user.last_name }}
												</span>
												<span v-if="editedItem.user.is_superuser">
													<v-tooltip bottom>
														<template #activator="{ on, attrs }">
															<v-icon
																v-ripple
																v-bind="attrs"
																color="orange lighten-2"
																class="mx-1"
																v-on="on"
															>
																mdi-account-cowboy-hat
															</v-icon>
														</template>
														<span>Super User</span>
													</v-tooltip>
												</span>
												<span v-if="editedItem.user.is_staff">
													<v-tooltip bottom>
														<template #activator="{ on, attrs }">
															<v-icon
																v-ripple
																size="26"
																v-bind="attrs"
																color="purple lighten-1"
																class="mx-1"
																v-on="on"
															>
																mdi-account-tie
															</v-icon>
														</template>
														<span>Staff Member</span>
													</v-tooltip>
												</span>
											</div>
											<v-divider class="mb-2" />
											<div class="member-information">
												<admin-form-detail-item
													field-icon="mdi-city"
													field-name="Current Branch"
												>
													<template #content>
														<v-chip color="primary"
															small
														>
															{{ getCurrentBranchName }}
														</v-chip>
													</template>
												</admin-form-detail-item>

												<admin-form-detail-item
													field-icon="mdi-account-key"
													field-name="Current Role"
												>
													<template #content>
														<v-chip color="primary"
															small
														>
															{{ getCurrentRoleName }}
															<v-icon right>
																{{ getCurrentRoleIcon }}
															</v-icon>
														</v-chip>
													</template>
												</admin-form-detail-item>
												<admin-form-detail-item
													field-icon="mdi-shape-plus"
													field-name="Date joined"
													:field-value="formatDate(editedItem.user.date_joined)"
												/>
												<admin-form-detail-item
													v-if="editedItem.is_approved"
													field-icon="mdi-account-check"
													field-name="Approved by"
													:field-value="editedItem.approved_by.username"
												/>
												<admin-form-detail-item
													v-if="editedItem.is_approved"
													field-icon="mdi-account-check"
													field-name="Approved by"
													:field-value="editedItem.approved_by.username"
												/>
												<admin-form-detail-item
													v-if="editedItem.is_approved"
													field-icon="mdi-check"
													field-name="Approved at"
													:field-value="formatDate(editedItem.approved_at)"
												/>
												<admin-form-detail-item
													field-icon="mdi-history"
													field-name="Last logged in"
												>
													<template #content>
														<span v-if="editedItem.user.last_login"
															class="px-1"
														>{{ formatDate(editedItem.user.last_login) }}</span>
														<span v-else
															class="px-1"
														>Haven't logged in.</span>
													</template>
												</admin-form-detail-item>
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
							<admin-form-group-title
								icon="mdi-account-circle"
								text="Follower Information"
							/>
							<follower-field
								id="user"
								v-model="editedItem.user"
								:errors="memberFormErrors"
							/>
							<v-col cols="12"
								class="ma-0 pa-0"
							>
								<v-card-actions class="pa-0 mx-4">
									<v-btn
										color="blue lighten-5"
										class="blue--text"
										block
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
								<admin-form-group-title
									icon="mdi-city-variant"
									text="Branch Information"
								/>
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
																<v-col v-for="(role_item, ini) in item['member_branch_roles']"
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
															<select-field
																id="role-name"
																v-model="editedItemBranchMemberRole.role_name[item.id]"
																:select-items="roleNameItems"
																label="Role name"
																name="role_name"
																:rules="[rules.required]"
																prepend-inner-icon="mdi-account-key"
															/>
															<date-picker-field
																v-model="editedItemBranchMemberRole.from_date[item.id]"
																prepend-inner-icon="mdi-calendar"
																label="From Date"
																name="from_date"
																:rules="[rules.required]"
															/>
															<date-picker-field
																v-model="editedItemBranchMemberRole.to_date[item.id]"
																prepend-inner-icon="mdi-calendar"
																label="To date"
																name="to_date"
																:rules="[rules.required]"
															/>
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
									<branch-field
										id="member-branch"
										v-model="defaultMemberBranch.branch"
									/>
								</v-col>
								<date-picker-field
									v-model="defaultMemberBranch.date_of_membership"
									prepend-inner-icon="mdi-calendar"
									label="Date of membership"
									name="date_of_membership"
									:attach="false"
									:errors="memberBranchFormErrors"
								/>
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
import {mapGetters} from "vuex";
import Snack from "@/mixins/Snack";

export default {
	name: "MemberFormDialog",
	mixins: [Snack],
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
			else if(roleName === "Branch Chief") return "mdi-account-cowboy-hat"
			else if(roleName === "Branch Vice Chief") return "mdi-account-heart"
			else if(roleName === "Leader") return "mdi-account-tie"
			else if(roleName === "Double Star Leader") return "mdi-star"
			else if(roleName === "Single Star Leader") return "mdi-star"
			else if(roleName === "Maintainer") return "mdi-account-hard-hat"
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
			if (currentBranch["member_branch_roles"].length === 0) return "None"
			return currentBranch["member_branch_roles"][0].role_name
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
		formatDate(date) {
			return this.$moment(date).format("MMMM Do YYYY")
		},
		moreRoles(memberBranch) {
			return memberBranch["member_branch_roles"].length !== 0;
		},
		async addAnotherMemberBranch() {
			await this.$store.dispatch("member/clearMemberBranchFormError")
			this.defaultMemberBranch = {
				branch: null,
				date_of_membership: null
			}
		},
		async readyAddingAnotherMemberRole(memberBranchId) {
			delete this.editedItemBranchMemberRole.from_date[memberBranchId]
			delete this.editedItemBranchMemberRole.to_date[memberBranchId]
			delete this.editedItemBranchMemberRole.role_name[memberBranchId]
			await this.$store.dispatch("member/clearMemberRoleFormError")
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

		async closeCreateEditDialog() {
			this.dialog = false
			await this.$store.dispatch("member/clearMemberFormError")
			await this.$store.dispatch("member/clearMemberRoleFormError")
			await this.$store.dispatch("member/clearMemberBranchFormError")
			this.$bus.emit("reload")
		},

		async saveMember() {
			const isSaved = await this.$store.dispatch("member/create", {body: {
				user: this.editedItem.user
			}})
			if (isSaved) await this.closeCreateEditDialog()
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
				await this.addAnotherMemberBranch()
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
				await this.readyAddingAnotherMemberRole(memberBranchId)
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
			this.$router.push({name: "FOLLOWER ADMINISTRATION", params: { id: itemId }})
		}
	},
}
</script>
<style lang="sass" scoped>
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
.member-information
	font-size: .875rem
.round-bottom
	border-radius: 0 0 10px 10px
</style>
