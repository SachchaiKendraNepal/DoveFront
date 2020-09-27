<template>
	<v-data-table
		id="member-d-table"
		:loading="isLoading"
		loading-text="Members Loading..."
		calculate-widths
		:headers="headers"
		:items="members"
		:search="search"
		multi-sort
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
						mdi-account-supervisor-circle
					</v-icon>
				</v-avatar>
				<v-toolbar-title v-show="$vuetify.breakpoint.smAndUp">
					Sachchai Members
				</v-toolbar-title>
				<v-divider
					class="mx-4"
					inset
					vertical
				/>
				<v-text-field
					v-model="search"
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
					class="mx-4"
					inset
					vertical
				/>
				<v-dialog
					v-model="dialog"
					max-width="550px"
				>
					<template #activator="{ on, attrs }">
						<v-btn
							dark
							v-bind="attrs"
							color="primary"
							v-on="on"
						>
							<v-icon
								dark
								:class="$vuetify.breakpoint.smAndUp ? 'mr-2' : ''"
							>
								mdi-plus-circle
							</v-icon>
							<span v-if="$vuetify.breakpoint.smAndUp">New Member</span>
						</v-btn>
					</template>
					<v-card color="rgb(251 250 241)">
						<v-card-title>
							<v-icon
								size="40"
								class="mr-4"
							>
								{{ formIcon }}
							</v-icon>
							<span class="headline">{{ formTitle }}</span>
						</v-card-title>
						<v-divider />
						<v-card-text>
							<v-container>
								<v-row>
									<v-col
										v-show="editedIndex !== -1 || viewIndex !== -1"
										cols="12"
										sm="4"
										md="4"
										lg="4"
										xl="4"
										class="text-center"
									>
										<v-avatar
											size="150"
											class="mt-2"
										>
											<v-img :src="editedItem.image" />
										</v-avatar>
									</v-col>
									<v-col
										v-show="editedIndex !== -1 || viewIndex !== -1"
										cols="12"
										sm="8"
										md="8"
										lg="8"
										xl="8"
									>
										<v-card
											id="short-member-detail"
											flat
											class="mx-auto"
											max-width="450"
											tile
										>
											<v-list-item>
												<v-list-item-content>
													<p class="headline">
														<span
															id="follower-full-name-display"
															class="mr-2"
															@click="routeToMemberDetailPage(editedItem.id)"
														>
															{{ editedItem.f_name }} {{ editedItem.l_name }}
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
													<v-divider />
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
													<p class="mb-0 mb-2">
														<v-icon class="small-detail-icon">
															mdi-shape-plus
														</v-icon>
														<b>Date joined:</b>
														<span class="px-1">{{ editedItem.date_joined }}</span>
													</p>
													<p class="mb-0 mb-2">
														<v-icon class="small-detail-icon">
															mdi-account-check
														</v-icon>
														<b>Approved by:</b>
														<span class="px-1"> Kiran Parajuli </span>
													</p>
													<p class="mb-0 mb-2">
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
										</v-card>
									</v-col>
									<v-col
										cols="12"
										class="pl-0"
									>
										<p class="heading ma-0 pa-0">
											<v-icon class="pb-1">
												mdi-account-circle
											</v-icon>
											Personal Information
										</p>
										<v-divider />
									</v-col>
									<v-col
										cols="12"
										md="6"
										class="pl-0 py-0"
									>
										<v-text-field
											id="member-f_name"
											v-model="editedItem.f_name"
											class="ma-0"
											outlined
											dense
											clearable
											label="First Name"
											:disabled="viewIndex !== -1"
											prepend-inner-icon="mdi-form-textbox"
										/>
									</v-col>
									<v-col
										cols="12"
										md="6"
										class="px-0 py-0"
									>
										<v-text-field
											id="member-l_name"
											v-model="editedItem.l_name"
											class="ma-0"
											outlined
											dense
											clearable
											label="Last Name"
											:disabled="viewIndex !== -1"
											prepend-inner-icon="mdi-form-textbox"
										/>
									</v-col>
									<v-col
										cols="12"
										class="ma-0 pa-0"
									>
										<v-text-field
											id="member-username"
											v-model="editedItem.username"
											class="ma-0"
											outlined
											dense
											clearable
											label="Username"
											:disabled="viewIndex !== -1"
											prepend-inner-icon="mdi-card-account-details-outline"
										/>
									</v-col>
									<v-col
										cols="12"
										class="ma-0 pa-0"
									>
										<v-text-field
											id="member-email"
											v-model="editedItem.email"
											class="ma-0"
											outlined
											dense
											clearable
											type="email"
											label="Email"
											:disabled="viewIndex !== -1"
											prepend-inner-icon="mdi-at"
										/>
									</v-col>
									<v-col
										cols="12"
										class="ma-0 pa-0"
									>
										<v-text-field
											id="member-phone"
											v-model="editedItem.phone"
											class="ma-0"
											outlined
											dense
											clearable
											label="Phone"
											type="number"
											:disabled="viewIndex !== -1"
											prepend-inner-icon="mdi-phone-classic"
										/>
									</v-col>
									<v-col
										cols="12"
										class="ma-0 pa-0"
									>
										<v-file-input
											id="member-image-input"
											v-model="editedItem.imageForUpload"
											class="ma-0"
											outlined
											dense
											chips
											show-size
											clearable
											accept="image/*"
											label="Profile Image"
											:disabled="viewIndex !== -1"
											prepend-icon=""
											prepend-inner-icon="mdi-camera"
										/>
									</v-col>
									<v-col
										cols="12"
										class="pl-0"
									>
										<p class="heading ma-0 pa-0">
											<v-icon class="pb-1">
												mdi-shield-key
											</v-icon>
											Permissions Information
										</p>
										<v-divider />
									</v-col>
									<v-col
										cols="12"
										md="6"
										lg="6"
										xl="6"
										class="ma-0 pa-0"
									>
										<v-checkbox
											id="member-is-staff"
											v-model="editedItem.is_staff"
											label="Staff Status"
											:disabled="viewIndex !== -1"
											prepend-icon="mdi-account-tie"
										/>
									</v-col>
									<v-col
										cols="12"
										md="6"
										lg="6"
										xl="6"
										class="ma-0 pa-0"
									>
										<v-checkbox
											id="member-is-superuser"
											v-model="editedItem.is_superuser"
											label="Superuser status"
											:disabled="viewIndex !== -1"
											prepend-icon="mdi-account-cowboy-hat"
										/>
									</v-col>
									<v-col
										cols="12"
										class="pl-0"
									>
										<p class="heading ma-0 pa-0">
											<v-icon class="pb-1">
												mdi-city-variant
											</v-icon>
											Branch Information
										</p>
										<v-divider />
									</v-col>
									<v-col
										cols="12"
										class="ma-0 pa-0"
									>
										<v-select
											id="member-branch"
											v-model="editedItem.branch"
											class="ma-0"
											outlined
											dense
											clearable
											label="Branch"
											:items="branches"
											:disabled="viewIndex !== -1"
											prepend-inner-icon="mdi-home-city"
										/>
									</v-col>
									<v-col
										cols="12"
										class="pl-0"
									>
										<p class="heading ma-0 pa-0">
											<v-icon class="pb-1">
												mdi-map-marker
											</v-icon>
											Location Information
										</p>
										<v-divider />
									</v-col>
									<v-col
										cols="12"
										class="ma-0 pa-0"
									>
										<v-text-field
											id="member-temporary-address"
											v-model="editedItem.temporary_address"
											class="ma-0"
											outlined
											dense
											clearable
											label="Temporary Address"
											:disabled="viewIndex !== -1"
											prepend-inner-icon="mdi-office-building-marker"
										/>
									</v-col>
									<v-col
										cols="12"
										class="ma-0 pa-0"
									>
										<v-text-field
											id="member-permanent-address"
											v-model="editedItem.permanent_address"
											class="ma-0"
											outlined
											dense
											clearable
											label="Permanent Address"
											:disabled="viewIndex !== -1"
											prepend-inner-icon="mdi-crosshairs-gps"
										/>
									</v-col>
								</v-row>
							</v-container>
						</v-card-text>

						<v-card-actions v-if="viewIndex === -1">
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
					</v-card>
				</v-dialog>
			</v-toolbar>
		</template>
		<!-- eslint-disable-next-line vue/valid-v-slot-->
		<template #item.full_name="{ item }">
			<p
				class="ma-0 pa-0 follower-full-name"
				@click="routeToMemberDetailPage(item.id)"
			>
				{{ item.f_name }} {{ item.l_name }}
			</p>
		</template>
		<!-- eslint-disable-next-line vue/valid-v-slot-->
		<template #item.is_staff="{ item }">
			<v-simple-checkbox
				v-model="item.is_staff"
				disabled
			/>
		</template>
		<!-- eslint-disable-next-line vue/valid-v-slot-->
		<template #item.is_superuser="{ item }">
			<v-simple-checkbox
				v-model="item.is_superuser"
				disabled
			/>
		</template>
		<!-- eslint-disable-next-line vue/valid-v-slot-->
		<template #item.is_approved="{ item }">
			<v-switch
				v-model="item.is_approved"
				color="primary"
			/>
		</template>
		<!-- eslint-disable-next-line vue/valid-v-slot-->
		<template #item.actions="{ item }">
			<v-icon
				v-ripple
				class="mr-2"
				color="orange"
				size="20"
				@click="showItem(item)"
			>
				mdi-eye
			</v-icon>
			<v-icon
				v-ripple
				class="mr-2"
				color="primary"
				size="20"
				@click="editItem(item)"
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

export default {
	name: "MembersTable",
	data: () => ({
		branches: ["Polar Branch", "Seiko Branch", "Akiko Branch"],
		isLoading: false,
		search: "",
		dialog: false,
		headers: [
			{
				text: "PK",
				align: "start",
				value: "id"
			},
			{ text: "FULL NAME", value: "full_name" },
			{ text: "USERNAME", value: "username" },
			{ text: "BRANCH", value: "branch" },
			{ text: "PHONE", value: "phone" },
			{ text: "SUPERUSER STATUS", value: "is_superuser" },
			{ text: "STAFF STATUS", value: "is_staff" },
			{ text: "APPROVED STATUS", value: "is_approved" },
			{ text: "DATE JOINED", value: "date_joined" },
			{ text: "ACTIONS", value: "actions", sortable: false }
		],
		members: [],
		editedIndex: -1,
		viewIndex: -1,
		editedItem: {
			username: "",
			email: "",
			f_name: "",
			l_name: "",
			branch: "",
			phone: Number,
			temporary_address: "",
			permanent_address: "",
			is_superuser: false,
			is_staff: false,
			is_approved: false,
			last_login: "",
			imageForUpload: Image,
			date_joined: "",
			approved_at: ""
		},
		defaultItem: {},
		rules: [(value) => !value || value.size < 2000000 || "Image size should be less than 2 MB!"]
	}),

	computed: {
		formTitle() {
			if (this.viewIndex !== -1) return "View Member Detail"
			return this.editedIndex === -1 ? "New Member" : "Edit Member"
		},
		formIcon() {
			if (this.viewIndex !== -1) return "mdi-account-circle"
			return this.editedIndex === -1 ? "mdi-plus-circle" : "mdi-account-edit"
		}
	},

	watch: {
		dialog(val) {
			val || this.close()
		}
	},

	created() {
		this.initialize()
	},

	methods: {
		initialize() {
			const now = new Date().toISOString().replace(/T/, " ").replace(/\..+/, "")
			this.members = [
				{
					id: 1,
					username: "kiran589",
					email: "kiran589@gmail.com",
					f_name: "Kiran",
					l_name: "Parajuli",
					phone: 9843530425,
					branch: "Polar Branch",
					is_approved: true,
					approved_at: now,
					date_joined: now,
					is_superuser: true,
					is_staff: true,
					temporary_address: "ABC, XYZ",
					permanent_address: "DAC, YML",
					last_login: now,
					image:
						"https://prod-ripcut-delivery.disney-plus.net/v1/variant/disney/ED4B1180197DC35F40612607655B3DC0B5CFD688690B99B39B758927373D4C50"
				},
				{
					id: 2,
					username: "bot25",
					email: "bot25@gmail.com",
					f_name: "Bot",
					l_name: "Heikki",
					phone: 985632256,
					branch: "Seiko Branch",
					is_approved: false,
					approved_at: now,
					date_joined: now,
					is_superuser: false,
					is_staff: true,
					temporary_address: "CAB, ZYX",
					permanent_address: "PKC, LMT",
					last_login: now,
					image:
						"https://prod-ripcut-delivery.disney-plus.net/v1/variant/disney/ED4B1180197DC35F40612607655B3DC0B5CFD688690B99B39B758927373D4C50"
				},
				{
					id: 3,
					username: "skshetry101",
					email: "susant@gmail.com",
					f_name: "Susant",
					l_name: "Kshetry",
					phone: 984568953,
					branch: "Akiko Branch",
					is_approved: true,
					approved_at: now,
					date_joined: now,
					is_superuser: true,
					is_staff: true,
					temporary_address: "ABC, XYZ",
					permanent_address: "DAC, YML",
					last_login: now,
					image:
						"https://prod-ripcut-delivery.disney-plus.net/v1/variant/disney/ED4B1180197DC35F40612607655B3DC0B5CFD688690B99B39B758927373D4C50"
				},
				{
					id: 4,
					username: "1996amrit",
					email: "1996amrit@gmail.com",
					f_name: "Amrit",
					l_name: "Neupane",
					phone: 9843530425,
					branch: "Main Branch",
					is_approved: true,
					approved_at: now,
					date_joined: now,
					is_superuser: true,
					is_staff: true,
					temporary_address: "CAB, ZYX",
					permanent_address: "PKC, LMT",
					last_login: now,
					image:
						"https://prod-ripcut-delivery.disney-plus.net/v1/variant/disney/ED4B1180197DC35F40612607655B3DC0B5CFD688690B99B39B758927373D4C50"
				},
			]
		},

		editItem(item) {
			this.editedIndex = this.members.indexOf(item)
			this.editedItem = Object.assign({}, item)
			this.dialog = true
		},

		showItem(item) {
			this.viewIndex = this.members.indexOf(item)
			this.editedItem = Object.assign({}, item)
			this.dialog = true
		},

		deleteItem(item) {
			const index = this.members.indexOf(item)
			confirm("Are you sure you want to delete this member?") && this.members.splice(index, 1)
		},

		close() {
			this.dialog = false
			this.$nextTick(() => {
				this.editedItem = Object.assign({}, this.defaultItem)
				this.editedIndex = -1
				this.viewIndex = -1
			})
		},

		save() {
			if (this.editedIndex > -1) {
				Object.assign(this.members[this.editedIndex], this.editedItem)
			} else {
				this.members.push(this.editedItem)
			}
			this.close()
		},

		routeToMemberDetailPage(itemId) {
			router.push({name: "SACHCHAI NEPAL FOLLOWER", params: { id: itemId }})
		}
	}
}
</script>

<style lang="sass" scoped>
.v-input--selection-controls
	margin-top: 0

#follower-full-name-display
	cursor: pointer

#short-member-detail
	.small-detail-icon
		margin-top: -4px
		margin-right: 4px
.follower-full-name
	font-size: 20px
	color: #474646
	cursor: pointer
</style>
