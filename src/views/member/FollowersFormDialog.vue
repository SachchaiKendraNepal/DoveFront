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
							<v-img
								:src="fetchCurrentCoverImage"
								height="200"
							/>
							<div class="d-flex justify-center">
								<v-avatar
									id="profile-img-avatar"
									size="180"
								>
									<v-img :src="getCurrentProfileImage" />
								</v-avatar>
							</div>
						</v-col>
						<v-col
							cols="12"
						>
							<v-card
								id="short-member-detail"
								flat
								class="mx-auto my-auto text-center"
								tile
							>
								<v-list>
									<v-list-item>
										<v-list-item-content>
											<p class="headline">
												<span
													id="follower-full-name-display"
													class="mr-2"
													@click="routeToFollowerDetailPage(editedItem.id)"
												>
													{{ editedItem.first_name }} {{ editedItem.last_name }}
												</span>
												<v-tooltip bottom>
													<template #activator="{ on, attrs }">
														<v-icon
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
											<p>
												<v-icon class="small-detail-icon">
													mdi-account-key
												</v-icon>
												<b>Role assigned:</b>
												<span class="px-1">
													<v-chip
														small
														class="ma-2"
														color="primary"
														text-color="white"
													>
														MAINTAINER
														<v-icon right>mdi-hammer</v-icon>
													</v-chip>
												</span>
											</p>
											<p class="mb-0 mb-4">
												<v-icon class="small-detail-icon">
													mdi-shape-plus
												</v-icon>
												<b>Date joined:</b>
												<span class="px-1">{{ editedItem.date_joined }}</span>
											</p>
											<p class="mb-0 mb-4">
												<v-icon class="small-detail-icon">
													mdi-account-check
												</v-icon>
												<b>Approved by:</b>
												<span class="px-1"> Kiran Parajuli </span>
											</p>
											<p class="mb-0 mb-4">
												<v-icon class="small-detail-icon">
													mdi-check
												</v-icon>
												<b>Approved at:</b>
												<span class="px-1">{{ editedItem.date_joined }}</span>
											</p>
											<p class="mb-0">
												<v-icon class="small-detail-icon">
													mdi-history
												</v-icon>
												<b>Last logged in:</b>
												<span class="px-1">{{ editedItem.last_login }}</span>
											</p>
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
									Personal Information
								</p>
								<v-divider class="pb-4" />
							</v-col>
							<v-col
								cols="12"
								md="6"
								class="ma-0 pa-0 pr-md-2 pr-lg-2 pr-xl-2"
							>
								<v-text-field
									id="first-name"
									v-model="editedItem.first_name"
									class="ma-0"
									outlined
									dense
									clearable
									label="First Name"
									prepend-inner-icon="mdi-form-textbox"
									:error-messages="userFieldErrors.first_name"
								/>
							</v-col>
							<v-col
								cols="12"
								md="6"
								class="ma-0 pa-0 pl-md-2 pl-lg-2 pl-xl-2"
							>
								<v-text-field
									id="last-name"
									v-model="editedItem.last_name"
									class="ma-0"
									outlined
									dense
									clearable
									label="Last Name"
									prepend-inner-icon="mdi-form-textbox"
									:error-messages="userFieldErrors.last_name"
								/>
							</v-col>
							<v-col
								cols="12"
								class="ma-0 pa-0"
							>
								<v-text-field
									id="username"
									v-model="editedItem.username"
									class="ma-0"
									outlined
									dense
									clearable
									label="Username"
									prepend-inner-icon="mdi-card-account-details-outline"
									:error-messages="userFieldErrors.username"
								/>
							</v-col>
							<v-col
								cols="12"
								class="ma-0 pa-0"
							>
								<v-text-field
									id="email"
									v-model="editedItem.email"
									class="ma-0"
									outlined
									dense
									clearable
									type="email"
									label="Email"
									prepend-inner-icon="mdi-at"
									:error-messages="userFieldErrors.email"
								/>
							</v-col>
							<v-col
								cols="12"
								class="ma-0 pa-0"
							>
								<v-text-field
									id="phone"
									v-model="editedItem.phone"
									class="ma-0"
									outlined
									dense
									clearable
									label="Phone"
									type="number"
									prepend-inner-icon="mdi-phone-classic"
									:error-messages="profileFieldErrors.contact"
								/>
							</v-col>
							<v-col
								cols="12"
								class="pl-0"
							>
								<p class="heading ma-0 pa-0">
									<v-icon class="pb-1"
										size="30"
									>
										mdi-shield-key
									</v-icon>
									Permissions Information
								</p>
								<v-divider />
							</v-col>
							<v-col
								cols="12"
								class="ma-0 pa-0"
							>
								<v-checkbox
									id="is-staff"
									v-model="editedItem.is_staff"
									label="Staff Status"
									prepend-icon="mdi-account-tie"
								/>
							</v-col>
							<v-col
								cols="12"
								class="pl-0"
							>
								<p class="heading ma-0 pa-0">
									<v-icon class="pb-1"
										size="30"
									>
										mdi-map-marker
									</v-icon>
									Location Information
								</p>
								<v-divider class="pb-2" />
							</v-col>
							<v-col
								cols="12"
								class="ma-0 pa-0"
							>
								<v-text-field
									id="current-city"
									v-model="editedItem.profile.current_city"
									class="ma-0"
									outlined
									dense
									clearable
									label="Current city"
									prepend-inner-icon="mdi-city"
									:error-messages="profileFieldErrors.current_city"
								/>
							</v-col>
							<v-col cols="12"
								class="pa-0 pb-16"
							>
								<v-card-actions class="pa-0">
									<v-spacer />
									<v-btn
										color="red lighten-5"
										class="red--text"
										depressed
										@click="close"
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

export default {
	name: "FollowerFormDialog",
	data: () => ({
		defaultProfileImage: "https://prod-ripcut-delivery.disney-plus.net/v1/variant/disney/ED4B1180197DC35F40612607655B3DC0B5CFD688690B99B39B758927373D4C50",
		dialog: false,
		countriesLoading: false,
		provincesLoading: false,
		districtsLoading: false,
		editedIndex: -1,
		editedItem: {
			id: "",
			email: "",
			first_name: "",
			last_name: "",
			username: "",
			is_staff: null,
			profile: {
				current_city: "",
				contact: "",
			}
		},
		defaultItem: {
			id: "",
			email: "",
			first_name: "",
			last_name: "",
			username: "",
			is_staff: null,
			profile: {
				current_city: "",
				contact: "",
			}
		},
	}),
	computed: {
		...mapGetters({
			userFieldErrors: "user/userCreateFormErrors",
			profileFieldErrors: "profile/profileUpdateFormErrors"
		}),
		formTitle() {
			return this.editedIndex === -1 ? "Add New Follower" : "Edit Follower"
		},
		formIcon() {
			return this.editedIndex === -1 ? "mdi-plus-circle" : "mdi-account-edit"
		},
		getCurrentProfileImage() {
			if (this.editedIndex === -1) return this.defaultProfileImage
			if (this.editedItem.profile["profile_images"].length === 0) return this.defaultProfileImage
			return this.editedItem.profile["profile_images"][0].image
		},
		fetchCurrentCoverImage() {
			return "https://cdn.vuetifyjs.com/images/parallax/material.jpg"
		}
	},
	async created() {
		this.$bus.on("open-follower-form-dialog-add-item", this.openDialog)
		this.$bus.on("open-follower-form-dialog-edit-item", this.openEditDialog)
		await this.$store.dispatch("user/clearUserCreateFormErrors")
		await this.$store.dispatch("profile/clearUserProfileFormErrors")
	},
	beforeUnmount() {
		this.$bus.off("open-follower-form-dialog-add-item")
		this.$bus.off("open-follower-form-dialog-edit-item")
	},
	methods: {
		async openSnack(text, color = "error") {
			await this.$store.dispatch("snack/setSnackState", true)
			await this.$store.dispatch("snack/setSnackColor", color)
			await this.$store.dispatch("snack/setSnackText", text)
		},
		openDialog() {
			this.dialog = true
		},

		openEditDialog(args) {
			this.editedIndex = args.editedIndex
			this.editedItem = args.editedItem
			this.openDialog()
		},

		close() {
			this.dialog = false
			this.$nextTick(() => {
				this.editedItem = Object.assign({}, this.defaultItem)
				this.editedIndex = -1
			})
		},

		async save() {
			const userData = {
				first_name: this.editedItem.first_name,
				last_name: this.editedItem.last_name,
				contact: this.editedItem.contact,
				email: this.editedItem.email,
				username: this.editedItem.username,
				is_staff: this.editedItem.is_staff,
				password: "Cartoon-Duck-14-Coffee-Glvs"
			}
			const profileData = {
				current_city: this.editedItem.profile.current_city,
			}
			if (this.editedIndex > -1) {
				const editUser = await this.$store.dispatch(
					"user/update",
					{id: this.editedItem.id, body: userData}
				)
				if (editUser) {
					await this.$store.dispatch("profile/update", {
						id: editUser.profile.id,
						body: profileData
					})
				}
				await this.openSnack("Follower updated successfully.", "success")
				this.close()
			} else {
				const newUser = await this.$store.dispatch("user/create", {body: userData})
				if (newUser) {
					await this.$store.dispatch("profile/update", {
						id: newUser.profile.id,
						body: profileData
					})
				}
				await this.openSnack("Follower created successfully.", "success")
				this.close()
			}
		},

		routeToFollowerDetailPage(itemId) {
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

</style>
