<template>
	<div class="container">
		<v-data-table
			:loading="isLoading"
			loading-text="Members Loading..."
			calculate-widths
			:headers="headers"
			:items="members"
			:search="search"
			multi-sort
			:items-per-page="12"
			class="elevation-3 mx-lg-6 mx-xl-12"
		>
			<template v-slot:top>
				<v-toolbar flat color="grey lighten-2">
					<v-icon size="30" class="mr-2">mdi-account-supervisor-circle</v-icon>
					<v-toolbar-title>Sachchai Members</v-toolbar-title>
					<v-divider class="mx-4" inset vertical></v-divider>
					<v-text-field
						solo
						dense
						hide-details
						v-model="search"
						label=""
						name="search"
						prepend-inner-icon="mdi-magnify"
						clearable
						placeholder="Search"
					/>
					<v-spacer />
					<v-divider class="mx-4" inset vertical></v-divider>
					<v-dialog v-model="dialog" max-width="500px">
						<template v-slot:activator="{ on, attrs }">
							<v-btn dark v-on="on" v-bind="attrs" color="primary">
								<v-icon dark :class="$vuetify.breakpoint.smAndUp ? 'mr-2' : ''">
									mdi-plus-circle</v-icon
								>
								<span v-if="$vuetify.breakpoint.smAndUp">New Member</span>
							</v-btn>
						</template>
						<v-card color="rgb(251 250 241)">
							<v-card-title>
								<v-icon size="40" class="mr-4">{{ formIcon }}</v-icon>
								<span class="headline">{{ formTitle }}</span>
							</v-card-title>
							<v-divider />
							<v-card-text>
								<v-container>
									<v-row>
										<v-col cols="12" class="pl-0">
											<p class="heading ma-0 pa-0">
												<v-icon class="pb-1">mdi-account-circle</v-icon>
												Personal Information
											</p>
											<v-divider />
										</v-col>
										<v-col cols="12" md="6" class="pl-0 py-0">
											<v-text-field
												id="member-f_name"
												prepend-inner-icon="mdi-form-textbox"
												class="ma-0"
												outlined
												dense
												v-model="editedItem.full_name"
												label="First Name"
											/>
										</v-col>
										<v-col cols="12" md="6" class="px-0 py-0">
											<v-text-field
												id="member-l_name"
												prepend-inner-icon="mdi-form-textbox"
												class="ma-0"
												outlined
												dense
												v-model="editedItem.l_name"
												label="Last Name"
											/>
										</v-col>
										<v-col cols="12" class="ma-0 pa-0">
											<v-text-field
												prepend-inner-icon="mdi-card-account-details-outline"
												class="ma-0"
												outlined
												dense
												v-model="editedItem.username"
												label="Username"
											/>
										</v-col>
										<v-col cols="12" class="ma-0 pa-0">
											<v-text-field
												prepend-inner-icon="mdi-at"
												class="ma-0"
												outlined
												dense
												v-model="editedItem.email"
												type="email"
												label="Email"
											/>
										</v-col>
										<v-col cols="12" class="ma-0 pa-0">
											<v-text-field
												prepend-inner-icon="mdi-phone-classic"
												class="ma-0"
												outlined
												dense
												v-model="editedItem.phone"
												label="Phone"
												type="number"
											/>
										</v-col>
										<v-col cols="12" class="pl-0">
											<p class="heading ma-0 pa-0">
												<v-icon class="pb-1">mdi-shield-key</v-icon>
												Permissions Information
											</p>
											<v-divider />
										</v-col>
										<v-col cols="12" md="6" lg="6" xl="6" class="ma-0 pa-0">
											<v-checkbox
												prepend-icon="mdi-account-tie"
												v-model="editedItem.is_staff"
												label="Staff Status"
											/>
										</v-col>
										<v-col cols="12" md="6" lg="6" xl="6" class="ma-0 pa-0">
											<v-checkbox
												prepend-icon="mdi-account-cowboy-hat"
												v-model="editedItem.is_superuser"
												label="Superuser status"
											/>
										</v-col>
										<v-col cols="12" class="pl-0">
											<p class="heading ma-0 pa-0">
												<v-icon class="pb-1">mdi-city-variant</v-icon>
												Branch Information
											</p>
											<v-divider />
										</v-col>
										<v-col cols="12" class="ma-0 pa-0">
											<v-select
												prepend-inner-icon="mdi-home-city"
												class="ma-0"
												:items="branches"
												v-model="editedItem.branch"
												label="Branch"
												dense
												outlined
											></v-select>
										</v-col>
										<v-col cols="12" class="pl-0">
											<p class="heading ma-0 pa-0">
												<v-icon class="pb-1">mdi-map-marker</v-icon>
												Location Information
											</p>
											<v-divider />
										</v-col>
										<v-col cols="12" class="ma-0 pa-0">
											<v-text-field
												prepend-inner-icon="mdi-office-building-marker"
												class="ma-0"
												outlined
												dense
												v-model="editedItem.temporary_address"
												label="Temporary Address"
											/>
										</v-col>
										<v-col cols="12" class="ma-0 pa-0">
											<v-text-field
												prepend-inner-icon="mdi-crosshairs-gps"
												class="ma-0"
												outlined
												dense
												v-model="editedItem.permanent_address"
												label="Permanent Address"
											/>
										</v-col>
									</v-row>
								</v-container>
							</v-card-text>

							<v-card-actions>
								<v-spacer></v-spacer>
								<v-btn
									color="red lighten-5"
									class="red--text"
									depressed
									@click="close"
									>Cancel</v-btn
								>
								<v-btn
									color="blue lighten-5"
									class="blue--text"
									depressed
									@click="save"
									>Save</v-btn
								>
							</v-card-actions>
						</v-card>
					</v-dialog>
				</v-toolbar>
			</template>
			<template v-slot:item.is_staff="{ item }">
				<v-simple-checkbox v-model="item.is_staff" disabled></v-simple-checkbox>
			</template>
			<template v-slot:item.is_superuser="{ item }">
				<v-simple-checkbox
					v-model="item.is_superuser"
					disabled
				></v-simple-checkbox>
			</template>
			<template v-slot:item.is_approved="{ item }">
				<v-switch v-model="item.is_approved" color="primary" />
			</template>
			<template v-slot:item.actions="{ item }">
				<v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
				<v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
			</template>
			<template v-slot:no-data>
				<v-btn color="primary" @click="initialize">Reset</v-btn>
			</template>
		</v-data-table>
	</div>
</template>
<style lang="sass" scoped>
.v-input--selection-controls
	margin-top: 0
</style>
<script>
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
			{ text: "USERNAME", value: "username" },
			{ text: "EMAIL", value: "email" },
			{ text: "FULL NAME", value: "full_name" },
			{ text: "BRANCH", value: "branch" },
			{ text: "PHONE", value: "phone" },
			{ text: "TEMPORARY ADDRESS", value: "temporary_address" },
			{ text: "PERMANENT ADDRESS", value: "permanent_address" },
			{ text: "SUPERUSER STATUS", value: "is_superuser" },
			{ text: "STAFF STATUS", value: "is_staff" },
			{ text: "APPROVED STATUS", value: "is_approved" },
			{ text: "APPROVED AT", value: "approved_at" },
			{ text: "DATE JOINED", value: "date_joined" },
			{ text: "ACTIONS", value: "actions", sortable: false }
		],
		members: [],
		editedIndex: -1,
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
			is_approved: false
		},
		defaultItem: {}
	}),

	computed: {
		formTitle() {
			return this.editedIndex === -1 ? "New Member" : "Edit Member"
		},
		formIcon() {
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
					full_name: "Kiran Parajuli",
					phone: 9843530425,
					branch: "Polar Branch",
					is_approved: true,
					approved_at: now,
					date_joined: now,
					is_superuser: true,
					is_staff: true,
					temporary_address: "ABC, XYZ",
					permanent_address: "DAC, YML"
				},
				{
					id: 2,
					username: "bot25",
					email: "bot25@gmail.com",
					full_name: "Bot Heikki",
					phone: 985632256,
					branch: "Seiko Branch",
					is_approved: false,
					approved_at: now,
					date_joined: now,
					is_superuser: false,
					is_staff: true,
					temporary_address: "CAB, ZYX",
					permanent_address: "PKC, LMT"
				},
				{
					id: 3,
					username: "skshetry101",
					email: "susant@gmail.com",
					full_name: "Susant Kshetry",
					phone: 984568953,
					branch: "Akiko Branch",
					is_approved: true,
					approved_at: now,
					date_joined: now,
					is_superuser: true,
					is_staff: true,
					temporary_address: "ABC, XYZ",
					permanent_address: "DAC, YML"
				},
				{
					id: 4,
					username: "kiran589",
					email: "kiran589@gmail.com",
					full_name: "Kiran Parajuli",
					phone: 9843530425,
					branch: "Polar Branch",
					is_approved: true,
					approved_at: now,
					date_joined: now,
					is_superuser: true,
					is_staff: true,
					temporary_address: "CAB, ZYX",
					permanent_address: "PKC, LMT"
				},
				{
					id: 5,
					username: "bot25",
					email: "bot25@gmail.com",
					full_name: "Bot Heikki",
					phone: 985632256,
					branch: "Seiko Branch",
					is_approved: false,
					approved_at: now,
					date_joined: now,
					is_superuser: false,
					is_staff: true,
					temporary_address: "CAB, ZYX",
					permanent_address: "PKC, LMT"
				},
				{
					id: 6,
					username: "skshetry101",
					email: "susant@gmail.com",
					full_name: "Susant Kshetry",
					phone: 984568953,
					branch: "Akiko Branch",
					is_approved: true,
					approved_at: now,
					date_joined: now,
					is_superuser: true,
					is_staff: true,
					temporary_address: "CAB, ZYX",
					permanent_address: "DAC, YML"
				},
				{
					id: 7,
					username: "kiran589",
					email: "kiran589@gmail.com",
					full_name: "Kiran Parajuli",
					phone: 9843530425,
					branch: "Polar Branch",
					is_approved: true,
					approved_at: now,
					date_joined: now,
					is_superuser: true,
					is_staff: true,
					temporary_address: "CAB, ZYX",
					permanent_address: "DAC, YML"
				},
				{
					id: 8,
					username: "bot25",
					email: "bot25@gmail.com",
					full_name: "Bot Heikki",
					phone: 985632256,
					branch: "Seiko Branch",
					is_approved: false,
					approved_at: now,
					date_joined: now,
					is_superuser: false,
					is_staff: true,
					temporary_address: "AJX, YHJ",
					permanent_address: "NYF, NJY"
				},
				{
					id: 9,
					username: "skshetry101",
					email: "susant@gmail.com",
					full_name: "Susant Kshetry",
					phone: 984568953,
					branch: "Akiko Branch",
					is_approved: true,
					approved_at: now,
					date_joined: now,
					is_superuser: true,
					is_staff: true,
					temporary_address: "NUH, HBV",
					permanent_address: "HJU, JKI"
				},
				{
					id: 10,
					username: "kiran589",
					email: "kiran589@gmail.com",
					full_name: "Kiran Parajuli",
					phone: 9843530425,
					branch: "Polar Branch",
					is_approved: true,
					approved_at: now,
					date_joined: now,
					is_superuser: true,
					is_staff: true,
					temporary_address: "NUH, HBV",
					permanent_address: "HJU, JKI"
				},
				{
					id: 11,
					username: "bot25",
					email: "bot25@gmail.com",
					full_name: "Bot Heikki",
					phone: 985632256,
					branch: "Seiko Branch",
					is_approved: false,
					approved_at: now,
					date_joined: now,
					is_superuser: false,
					is_staff: true,
					temporary_address: "NUH, HBV",
					permanent_address: "HJU, JKI"
				},
				{
					id: 12,
					username: "skshetry101",
					email: "susant@gmail.com",
					full_name: "Susant Kshetry",
					phone: 984568953,
					branch: "Akiko Branch",
					is_approved: true,
					approved_at: now,
					date_joined: now,
					is_superuser: true,
					is_staff: true,
					temporary_address: "NUI, KUH",
					permanent_address: "HYW, QPO"
				}
			]
		},

		editItem(item) {
			this.editedIndex = this.members.indexOf(item)
			this.editedItem = Object.assign({}, item)
			this.dialog = true
		},

		deleteItem(item) {
			const index = this.members.indexOf(item)
			confirm("Are you sure you want to delete this member?") &&
				this.members.splice(index, 1)
		},

		close() {
			this.dialog = false
			this.$nextTick(() => {
				this.editedItem = Object.assign({}, this.defaultItem)
				this.editedIndex = -1
			})
		},

		save() {
			if (this.editedIndex > -1) {
				Object.assign(this.members[this.editedIndex], this.editedItem)
			} else {
				this.members.push(this.editedItem)
			}
			this.close()
		}
	}
}
</script>
