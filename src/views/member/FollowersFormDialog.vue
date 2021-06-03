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
			class="rounded-0"
			color="rgb(251 250 241)"
		>
			<v-card-title class="grey darken-3">
				<v-avatar
					color="grey darken-2"
					size="40"
					class="mr-4 elevation-1"
				>
					<v-icon dark
						size="22"
					>
						{{ formIcon() }}
					</v-icon>
				</v-avatar>
				<span class="form-title">{{ formTitle('Follower') }}</span>
				<v-spacer />
				<v-btn
					color="grey darken-2"
					fab
					dark
					x-small
					@click="closeCreateEditDialog"
				>
					<v-icon>mdi-close</v-icon>
				</v-btn>
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
							<v-img
								:src="fetchCurrentCoverImage"
								height="200"
							/>
						</v-col>
						<v-col cols="12"
							class="profile-av-row pb-0"
						>
							<v-avatar
								class="profile-img-avatar"
								size="180"
							>
								<v-img :src="getCurrentProfileImage" />
							</v-avatar>
						</v-col>
						<v-col
							cols="12"
						>
							<v-card
								id="short-member-detail"
								class="mx-auto text-center"
								flat
								tile
							>
								<v-list class="pt-0">
									<v-list-item>
										<v-list-item-content>
											<div class="d-flex justify-center">
												<span
													class="follower-full-name"
													@click="routeToFollowerDetailPage(editedItem.id)"
												>
													{{ editedItem.first_name }} {{ editedItem.last_name }}
												</span>
												<span v-if="editedItem.is_superuser">
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
												<span v-if="editedItem.is_staff">
													<v-tooltip bottom>
														<template #activator="{ on, attrs }">
															<v-icon
																v-if="editedItem.is_staff"
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
											<p class="mb-0 mb-4 mt-2">
												<v-icon class="small-detail-icon">
													mdi-shape-plus
												</v-icon>
												<b>Date joined:</b>
												<span class="px-1">{{ $moment(editedItem.date_joined).fromNow() }}</span>
											</p>
											<p class="mb-0">
												<v-icon class="small-detail-icon">
													mdi-history
												</v-icon>
												<b>Last logged in:</b>
												<span v-if="editedItem.last_login"
													class="px-1"
												>{{ formatDate(editedItem.last_login) }}</span>
												<span v-else
													class="px-1"
												>Haven't logged in.</span>
											</p>
											<!--TODO: add profile details-->
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
								text="Personal Information"
							/>
							<text-field
								id="first-name"
								v-model="editedItem.first_name"
								label="First Name"
								name="first_name"
								prepend-inner-icon="mdi-form-textbox"
								:errors="formErrors"
							/>
							<text-field
								id="last-name"
								v-model="editedItem.last_name"
								label="Last Name"
								name="last_name"
								prepend-inner-icon="mdi-form-textbox"
								:errors="formErrors"
							/>
							<text-field
								id="username"
								v-model="editedItem.username"
								label="Username"
								name="username"
								prepend-inner-icon="mdi-card-account-details-outline"
								:errors="formErrors"
							/>
							<text-field
								id="email"
								v-model="editedItem.email"
								type="email"
								label="Email"
								name="email"
								prepend-inner-icon="mdi-at"
								:errors="formErrors"
							/>
							<admin-form-group-title
								icon="mdi-shield-key"
								text="Permission Information"
							/>
							<!--TODO: add permissions-->
							<v-col cols="12">
								<v-card-actions class="pa-0">
									<v-spacer />
									<v-btn
										color="red lighten-5"
										class="red--text"
										depressed
										@click="closeCreateEditDialog"
									>
										Cancel
									</v-btn>
									<v-btn
										color="blue lighten-5"
										class="blue--text"
										depressed
										@click="save"
									>
										Save
									</v-btn>
								</v-card-actions>
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
import AdminCreateEditFormMixin from "@/mixins/AdminCreateEditFormMixin";
import Snack from "@/mixins/Snack";

export default {
	name: "FollowerFormDialog",
	mixins: [AdminCreateEditFormMixin, Snack],
	data: () => ({
		defaultProfileImage: require("@/assets/defaultProfileImage.png"),
		userData: null,
		profileData: null,
		editedItem: {
			id: "",
			email: "",
			first_name: "",
			last_name: "",
			username: "",
			is_superuser: null,
			is_staff: null
		},
		defaultItem: {},
		mixinData: {
			clearFormErrorAction: "user/clearCreateFormErrors"
		},
	}),
	computed: {
		...mapGetters({
			formErrors: "user/userCreateFormErrors",
		}),
		getCurrentProfileImage() {
			if (
				this.editedIndex === -1 ||
				this.editedItem.profile["profile_images"].length === 0
			)
				return this.defaultProfileImage
			return this.editedItem.profile["profile_images"][0].image
		},
		fetchCurrentCoverImage() {
			return "https://cdn.vuetifyjs.com/images/parallax/material.jpg"
		}
	},
	async created() {
		this.$bus.on("open-follower-form-dialog-add-item", this.openCreateDialog)
		this.$bus.on("open-follower-form-dialog-edit-item", this.openEditDialog)
	},
	beforeUnmount() {
		this.$bus.off("open-follower-form-dialog-add-item")
		this.$bus.off("open-follower-form-dialog-edit-item")
	},
	methods: {
		async updateFollower() {
			const editUser = await this.$store.dispatch(
				"user/update",
				{id: this.editedItem.id, body: this.userData}
			)
			if (editUser) {
				await this.openSnack("Follower updated successfully.", "success")
				this.$bus.emit("reload")
				this.closeCreateEditDialog()
			}
			else await this.openSnack("Follower update failed.")
		},
		async createFollower() {
			const newUser = await this.$store.dispatch("user/create", {
				body: this.userData
			})
			if (newUser) {
				await this.openSnack("Follower created successfully.", "success")
				this.$bus.emit("reload")
				this.closeCreateEditDialog()
			} else {
				await this.openSnack("Follower create failed.")
			}
		},
		async save() {
			this.userData = {
				first_name: this.editedItem.first_name,
				last_name: this.editedItem.last_name,
				email: this.editedItem.email,
				username: this.editedItem.username,
				is_staff: this.editedItem.is_staff,
				// default password set for follower added from admin
				password: "Cartoon-Duck-14-Coffee-Glvs"
			}
			if (this.editedIndex > -1) {
				await this.updateFollower()
			} else {
				await this.createFollower()
			}
		},

		routeToFollowerDetailPage(itemId) {
			router.push({name: "FOLLOWER ADMINISTRATION", params: { id: itemId }})
		}
	},
}
</script>
<style lang="sass" scoped>
#short-member-detail
	.small-detail-icon
		margin-top: -4px
		margin-right: 4px
.follower-full-name
	font-size: 1.5rem
	font-weight: 400
	color: #474646
	cursor: pointer

.profile-av-row
	display: flex
	justify-content: center
	margin-top: -90px
	.profile-img-avatar
		transition: all .5s
		border: 4px solid white
		@media only screen and (max-width: 245px)
			height: 100px !important
			min-width: 100px !important
			width: 100px !important
			margin-top: -50px !important
			border: 2px solid white !important
.round-bottom
	border-radius: 0 0 10px 10px
</style>
