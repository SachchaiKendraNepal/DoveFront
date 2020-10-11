<template>
	<v-data-table
		id="event-d-table"
		:loading="isLoading"
		loading-text="Events Loading..."
		calculate-widths
		:headers="headers"
		:items="events"
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
					color="grey lighten-3"
				>
					<v-icon size="25">
						mdi-calendar-text
					</v-icon>
				</v-avatar>
				<v-toolbar-title v-show="$vuetify.breakpoint.smAndUp">
					Sachchai Events
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
					max-width="600px"
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
							<span v-if="$vuetify.breakpoint.smAndUp">New Event</span>
						</v-btn>
					</template>
					<v-card color="rgb(251 250 241)">
						<v-card-title>
							<v-avatar
								size="40"
								class="mr-4 elevation-3"
							>
								<v-icon
									dark
									size="30"
								>
									{{ formIcon }}
								</v-icon>
							</v-avatar>
							<span class="headline white--text">{{ formTitle }}</span>
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
											<v-img :src="editedItem.banner" />
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
													<p
														class="headline cursor"
														@click="routeToEventDetailPage(editedItem.id)"
													>
														{{ editedItem.title }}
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
															<span>Sacchai Event</span>
														</v-tooltip>
														<v-tooltip bottom>
															<template #activator="{ on, attrs }">
																<v-icon
																	v-ripple
																	v-bind="attrs"
																	color="red darken-3"
																	v-on="on"
																>
																	mdi-map-marker-star
																</v-icon>
															</template>
															<span>Main Event</span>
														</v-tooltip>
													</p>
													<v-divider class="mb-2" />
													<div class="mb-2">
														<v-chip
															label
															color="blue lighten-5"
															class="mr-1 mb-1"
														>
															<v-icon left>
																mdi-map-marker-star
															</v-icon>
															<b>Main Event</b>
															<v-icon right>
																mdi-church
															</v-icon>
														</v-chip>
														<v-chip
															label
															dark
															class="mb-1"
														>
															<v-icon
																left
																color="white"
															>
																mdi-dove
															</v-icon>
															<b>Sacchai Event</b>
															<v-icon right>
																mdi-city
															</v-icon>
														</v-chip>
													</div>
													<p class="mb-0 mb-2">
														<v-icon class="small-detail-icon">
															mdi-shape-plus
														</v-icon>
														<b>Date created:</b>
														<span class="px-1">{{ editedItem.created_at }}</span>
													</p>
													<p class="mb-0 mb-2">
														<v-icon class="small-detail-icon">
															mdi-plus
														</v-icon>
														<b>Created by:</b>
														<span class="px-1"> Kiran Parajuli </span>
													</p>
													<p class="mb-0 mb-2">
														<v-icon class="small-detail-icon">
															mdi-account-network
														</v-icon>
														<b>Total Members:</b>
														<span class="px-1">558</span>
													</p>
													<p class="mb-0">
														<v-icon class="small-detail-icon">
															mdi-pencil
														</v-icon>
														<b>Last Updated By:</b>
														<span class="px-1">Sam Gellaitry</span>
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
												mdi-calendar-text-outline
											</v-icon>
											Event Information
										</p>
										<v-divider />
									</v-col>
									<v-col
										cols="12"
										class="ma-0 pa-0"
									>
										<v-text-field
											id="event-title"
											v-model="editedItem.title"
											class="ma-0"
											outlined
											dense
											counter="255"
											label="Title"
											:clearable="editedIndex !== -1"
											:readonly="viewIndex !== -1"
											prepend-inner-icon="mdi-form-textbox"
										/>
									</v-col>
									<v-col
										cols="12"
										class="ma-0 pa-0"
									>
										<v-textarea
											id="event-description"
											v-model="editedItem.description"
											class="ma-0 pa-0"
											name="description"
											label="Description"
											outlined
											:clearable="editedIndex !== -1"
											:readonly="viewIndex !== -1"
											counter="512"
											prepend-inner-icon="mdi-script-text"
										/>
									</v-col>
									<v-col
										cols="12"
										class="ma-0 pa-0"
									>
										<v-autocomplete
											id="event-organizer"
											v-model="editedItem.organizer"
											class="ma-0"
											allow-overflow
											dense
											outlined
											label="Organizer (Branch)"
											:items="branches"
											:clearable="editedIndex !== -1"
											:readonly="viewIndex !== -1"
											prepend-inner-icon="mdi-city"
										/>
									</v-col>
									<v-col
										cols="12"
										class="ma-0 pa-0"
									>
										<v-combobox
											v-model="editedItem.contacts"
											class="ma-0 pa-0"
											:items="[]"
											hide-selected
											hint="Provide contacts of organizers"
											label="Contacts"
											multiple
											small-chips
											deletable-chips
											type="number"
											outlined
											dense
											:clearable="editedIndex !== -1"
											:readonly="viewIndex !== -1"
											prepend-inner-icon="mdi-phone-classic"
										>
											<template #no-data>
												<v-list-item>
													<v-list-item-content>
														<v-list-item-title>
															Type contact number and press <kbd>enter</kbd> to add a new one.
														</v-list-item-title>
													</v-list-item-content>
												</v-list-item>
											</template>
										</v-combobox>
									</v-col>
									<v-col
										id="is-main-col"
										cols="12"
										class="ma-0 pa-0"
									>
										<v-checkbox
											id="is_main"
											v-model="editedItem.is_main"
											label="Is Main Event?"
											:readonly="viewIndex !== -1"
											append-icon="mdi-calendar-star"
											hide-details
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
											small-chips
											show-size
											accept="image/*"
											label="Banner Image"
											:clearable="editedIndex !== -1"
											:readonly="viewIndex !== -1"
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
												mdi-calendar-clock
											</v-icon>
											Timeline Information
										</p>
										<v-divider />
									</v-col>
									<v-col
										cols="12"
										class="ma-0 pa-0"
									>
										<v-menu
											v-model="startDateMenu"
											:nudge-bottom="50"
											transition="scale-transition"
											close-on-click
											offset-overflow
											max-width="290"
										>
											<template #activator="{ on, attrs }">
												<v-text-field
													dense
													class="ma-0 pa-0"
													prepend-inner-icon="mdi-calendar"
													:value="computedDateFormattedMomentJs"
													:clearable="editedIndex !== -1"
													:readonly="viewIndex !== -1"
													outlined
													v-bind="attrs"
													label="Start Date"
													v-on="on"
													@click:clear="editedItem.start_date = null"
												/>
											</template>
											<v-date-picker
												v-model="editedItem.start_date"
												@change="startDateMenu = false"
											/>
										</v-menu>
									</v-col>
									<v-col
										cols="12"
										class="ma-0 pa-0"
									>
										<v-text-field
											v-model="editedItem.duration"
											:clearable="editedIndex !== -1"
											:readonly="viewIndex !== -1"
											dense
											outlined
											class="ma-0 pa-0"
											label="Duration"
											hint="This is the number of days the event will go on."
											prepend-inner-icon="mdi-av-timer"
										/>
									</v-col>
									<v-col
										cols="12"
										class="ma-0 pa-0"
									>
										<v-autocomplete
											id="event-time-of-day"
											v-model="editedItem.timeOfDay"
											class="ma-0"
											allow-overflow
											dense
											outlined
											label="Time Of Day"
											:items="timeOfDayOptions"
											:clearable="editedIndex !== -1"
											:readonly="viewIndex !== -1"
											prepend-inner-icon="mdi-white-balance-sunny"
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
										<v-autocomplete
											id="event-country"
											v-model="editedItem.country"
											class="ma-0"
											allow-overflow
											dense
											outlined
											label="Country"
											:items="countries"
											:clearable="editedIndex !== -1"
											:readonly="viewIndex !== -1"
											prepend-inner-icon="mdi-web"
										/>
									</v-col>
									<v-col
										cols="12"
										class="ma-0 pa-0"
									>
										<v-autocomplete
											id="event-province"
											v-model="editedItem.province"
											class="ma-0"
											allow-overflow
											dense
											outlined
											label="Province"
											:items="provinces"
											:clearable="editedIndex !== -1"
											:readonly="viewIndex !== -1"
											prepend-inner-icon="mdi-office-building-marker-outline"
										/>
									</v-col>
									<v-col
										cols="12"
										class="ma-0 pa-0"
									>
										<v-autocomplete
											id="event-districts"
											v-model="editedItem.district"
											class="ma-0"
											allow-overflow
											dense
											outlined
											:items="districts"
											label="District"
											:clearable="editedIndex !== -1"
											:readonly="viewIndex !== -1"
											prepend-inner-icon="mdi-map-marker-multiple-outline"
										/>
									</v-col>
									<v-col
										v-if="!editedItem.vdc"
										cols="12"
										class="ma-0 pa-0"
									>
										<v-autocomplete
											id="event-municipality"
											v-model="editedItem.municipality"
											class="ma-0"
											allow-overflow
											dense
											outlined
											label="Municipality"
											:items="municipalities"
											:clearable="editedIndex !== -1"
											:readonly="viewIndex !== -1"
											prepend-inner-icon="mdi-google-maps"
										/>
									</v-col>
									<v-col
										v-if="editedItem.municipality"
										cols="12"
										class="ma-0 pa-0"
									>
										<v-autocomplete
											id="event-municipality-ward"
											v-model="editedItem.municipality_ward"
											class="ma-0"
											allow-overflow
											dense
											outlined
											label="Municipality Ward"
											:items="municipality_wards"
											:clearable="editedIndex !== -1"
											:readonly="viewIndex !== -1"
											prepend-inner-icon="mdi-numeric"
										/>
									</v-col>
									<v-col
										v-if="!editedItem.municipality"
										cols="12"
										class="ma-0 pa-0"
									>
										<v-autocomplete
											id="event-vdc"
											v-model="editedItem.vdc"
											allow-overflow
											class="ma-0"
											dense
											outlined
											label="VDC"
											:items="vdcs"
											:clearable="editedIndex !== -1"
											:readonly="viewIndex !== -1"
											prepend-inner-icon="mdi-home-map-marker"
										/>
									</v-col>
									<v-col
										v-if="editedItem.vdc"
										cols="12"
										class="ma-0 pa-0"
									>
										<v-autocomplete
											id="event-vdc-ward"
											v-model="editedItem.vdc_ward"
											allow-overflow
											class="ma-0"
											dense
											outlined
											label="VDC Ward"
											:items="vdc_wards"
											:clearable="editedIndex !== -1"
											:readonly="viewIndex !== -1"
											prepend-inner-icon="mdi-numeric"
										/>
									</v-col>
									<v-col
										cols="12"
										class="ma-0 pa-0"
									>
										<v-text-field
											id="event-venue"
											v-model="editedItem.venue"
											class="ma-0"
											dense
											outlined
											counter="255"
											label="Venue"
											:clearable="editedIndex !== -1"
											:readonly="viewIndex !== -1"
											prepend-inner-icon="mdi-home-roof"
											hint="Where is the event going to be organized?"
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
		<template #item.name="{ item }">
			<p
				class="event-name cursor"
				@click="routeToEventDetailPage(item.id)"
			>
				{{ item.name }}
			</p>
		</template>
		<!-- eslint-disable-next-line vue/valid-v-slot-->
		<template #item.duration="{ item }">
			<v-chip>
				{{ item.duration }}
			</v-chip>
		</template>
		<!-- eslint-disable-next-line vue/valid-v-slot-->
		<template #item.is_main="{ item }">
			<v-checkbox
				v-model="item.is_main"
				color="primary"
				disabled
			/>
		</template>
		<!-- eslint-disable-next-line vue/valid-v-slot-->
		<template #item.location="{ item }">
			<p
				class="mb-0"
			>
				<span style="color: #545454">
					{{ (item.vdc_ward) ? item.vdc_ward : item.municipality_ward }},&nbsp;
					{{ (item.vdc) ? item.vdc : item.municipality }},&nbsp;
				</span>
				<i>{{ item.district }},&nbsp;
					{{ item.province }},&nbsp;</i>
				<b>{{ item.country }}</b>
			</p>
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
import moment from "moment"

export default {
	name: "EventsTableView",
	data: () => ({
		startDateMenu: false,
		lang: {
			formatLocale: {
				months: [
					"बैशाख", "जेष्ठ", "आषाढ", "श्रावन", "भाद्र", "अशोज", "कर्तिक", "मंग्शिर", "पौष", "फाल्गुन", "चैत्र"
				],
				monthsShort: [
					"बैशाख", "जेष्ठ", "आषाढ", "श्रावन", "भाद्र", "अशोज", "कर्तिक", "मंग्शिर", "पौष", "फाल्गुन", "चैत्र"
					// "बैशा", "जेष्ठ", "आषा", "श्राव", "भाद्र", "अशो", "कर्ति", "मंग्शि", "पौष", "फाल्गु", "चैत्र"
				],
				weekdays: [
					"आईतबार", "सोमबार", "मंगलबार", "बुधबार", "बिहिबार", "शुक्रबार", "शनिबार"
				],
				weekdaysShort: [
					"आईत", "सोम", "मंगल", "बुध", "बिहि", "शुक्र", "शनि"
				],
				firstDayOfWeek: 0,
				// the calendar header, default formatLocale.weekdaysMin
				days: [],
				// the calendar title of year
				yearFormat: "YYYY",
				// the calendar title of month
				monthFormat: "MM",
				// the calendar title of month before year
				monthBeforeYear: false
			}
		},
		timeOfDayOptions: [
			"Morning",
			"Day",
			"Evening"
		],
		countries: ["Nepal", "India", "Bhutan", "Pakistan", "Singapore", "HongKong"],
		provinces: ["Bagmati Pradesh", "Gandaki Pradesh", "Uttar Pradesh", "Goa", "Province 1"],
		districts: ["Kaski", "Kathmandu", "Humla", "Jhapa", "Chitwan", "Sarlahi", "Nepalgunj"],
		municipalities: ["Pokhara", "Kathmandu", "Panchkhal", "Banepa"],
		municipality_wards: ["Amarsingh", "Tinpiple", "Lamachaur", "Chaukot"],
		vdcs: [
			"Barai",
			"Bargaun",
			"Badalkot",
			"Photu",
			"Aaglung",
			"Siddhara",
			"Simalapani",
			"Aruchaur",
			"Arukharka",
			"Armala",
			"Deurali"
		],
		vdc_wards: [
			"alskdf",
			"sldkf",
			"sldkf",
			"sldkf",
			"sldkfjs",
			"sldkfs",
			"owiek",
			"mndkjf",
			"woeik"
		],
		branches: ["Pokhara Kendra Branch", "Kathmandu Branch", "Amarsingh Branch", "Lekhnath Branch", "Palpa Branch"],
		search: "",
		isLoading: false,
		dialog: false,
		events: [],
		headers: [
			{
				text: "PK",
				align: "start",
				value: "id"
			},
			{ text: "ACTIONS", value: "actions", sortable: false },
			{ text: "TITLE", value: "title" },
			{ text: "Organizer", value: "organizer" },
			{ text: "IS MAIN EVENT", value: "is_main" },
			{ text: "LOCATION", value: "location" },
			{ text: "VENUE", value: "venue" },
			{ text: "START DATE", value: "start_date" },
			{ text: "DURATION (days)", value: "duration" },
		],
		editedIndex: -1,
		viewIndex: -1,
		editedItem: {
			id: "",
			title: "",
			description: "",
			country: "",
			province: "",
			district: "",
			municipality: "",
			municipality_ward: "",
			vdc: "",
			vdc_ward: "",
			venue: "",
			organizer: "",
			contacts: [],
			start_date: null,
			duration: null,
			timeOfDay: "",
			banner: Image,
			is_main: false,
			imageForUpload: Image,
		},
		defaultItem: {},
		rules: [(value) => !value || value.size < 2000000 || "Image size should be less than 2 MB!"]
	}),

	computed: {
		formTitle() {
			if (this.viewIndex !== -1) return "View Event Detail"
			return this.editedIndex === -1
				? "New Event"
				: "Edit Event"
		},
		formIcon() {
			if (this.viewIndex !== -1) return "mdi-home-city"
			return this.editedIndex === -1
				? "mdi-calendar-plus"
				: "mdi-calendar-edit"
		},
		computedDateFormattedMomentJs() {
			return this.editedItem.start_date
				? moment(this.editedItem.start_date).format("dddd, MMMM Do YYYY")
				: ""
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
			this.events = [
				{
					id: 1,
					title: "Guru Purnima 2020",
					description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, " +
						"sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut " +
						"enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut " +
						"aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit " +
						"in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur " +
						"sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt " +
						"mollit anim id est laborum.",
					country: "Nepal",
					province: "Gandaki Pradesh",
					district: "Kaski",
					municipality: "Pokhara",
					municipality_ward: "Lamachaur",
					vdc: null,
					vdc_ward: null,
					organizer: "Pokhara Kendra Branch",
					venue: "Deep Housing, Bagar",
					contacts: [9845689652, 6158965],
					start_date: now,
					duration: 5,
					timeOfDay: "10AM - 5PM",
					is_main: true,
					created_by: "kiran589",
					created_at: now,
					updated_by: "bot25",
					updated_at: now,
					banner:
						"https://prod-ripcut-delivery.disney-plus.net/v1/variant/disney/ED4B1180197DC35F40612607655B3DC0B5CFD688690B99B39B758927373D4C50"
				},
				{
					id: 2,
					title: "After Lockdown Gathering",
					description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, " +
						"sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut " +
						"enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut " +
						"aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit " +
						"in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur " +
						"sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt " +
						"mollit anim id est laborum.",
					country: "Nepal",
					province: "Gandaki Pradesh",
					district: "Kaski",
					municipality: "Pokhara",
					municipality_ward: "Lamachaur",
					vdc: null,
					vdc_ward: null,
					is_main: true,
					created_by: "bot25",
					created_at: now,
					updated_by: "bot25",
					updated_at: now,
					venue: "Deep Housing",
					organizer: "Pokhara Kendra Branch",
					contacts: [9845689652, 6158965],
					start_date: now,
					duration: 5,
					timeOfDay: "10AM - 5PM",
					banner:
						"https://prod-ripcut-delivery.disney-plus.net/v1/variant/disney/ED4B1180197DC35F40612607655B3DC0B5CFD688690B99B39B758927373D4C50"
				},
				{
					id: 3,
					title: "Hungama Event",
					description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, " +
						"sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut " +
						"enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut " +
						"aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit " +
						"in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur " +
						"sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt " +
						"mollit anim id est laborum.",
					country: "Nepal",
					province: "Bagmati Pradesh",
					district: "Kathmandu",
					municipality: "Kathmandu",
					municipality_ward: "Maitighar",
					vdc: null,
					vdc_ward: null,
					is_main: true,
					created_by: "bot25",
					created_at: now,
					updated_by: "bot25",
					updated_at: now,
					venue: "Maiti Ghar Mandala",
					organizer: "Pokhara Kendra Branch",
					contacts: [9845689652, 6158965],
					start_date: now,
					duration: 2,
					timeOfDay: "10AM - 5PM",
					banner:
						"https://prod-ripcut-delivery.disney-plus.net/v1/variant/disney/ED4B1180197DC35F40612607655B3DC0B5CFD688690B99B39B758927373D4C50"
				},
				{
					id: 4,
					title: "Dashai Tihar Event",
					description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, " +
						"sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut " +
						"enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut " +
						"aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit " +
						"in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur " +
						"sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt " +
						"mollit anim id est laborum.",
					country: "Nepal",
					province: "Province No 2",
					district: "BXABCY",
					municipality: null,
					municipality_ward: null,
					vdc: "HariyoKharka",
					vdc_ward: "AadhiBeri Gaaupalika",
					is_main: false,
					created_by: "bot25",
					created_at: now,
					updated_by: "bot25",
					updated_at: now,
					venue: "Saili Ko Pasal",
					organizer: "Hero Branch",
					contacts: [9845689652, 6158965],
					start_date: now,
					duration: 2,
					timeOfDay: "10AM - 5PM",
					banner:
						"https://prod-ripcut-delivery.disney-plus.net/v1/variant/disney/ED4B1180197DC35F40612607655B3DC0B5CFD688690B99B39B758927373D4C50"
				},
				{
					id: 5,
					title: "Guru Purnima 2020",
					description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, " +
						"sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut " +
						"enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut " +
						"aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit " +
						"in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur " +
						"sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt " +
						"mollit anim id est laborum.",
					country: "Nepal",
					province: "Gandaki Pradesh",
					district: "Kaski",
					municipality: "Pokhara",
					municipality_ward: "Lamachaur",
					vdc: null,
					vdc_ward: null,
					organizer: "Pokhara Kendra Branch",
					venue: "Deep Housing, Bagar",
					contacts: [9845689652, 6158965],
					start_date: now,
					duration: 5,
					timeOfDay: "10AM - 5PM",
					is_main: true,
					created_by: "kiran589",
					created_at: now,
					updated_by: "bot25",
					updated_at: now,
					banner:
						"https://prod-ripcut-delivery.disney-plus.net/v1/variant/disney/ED4B1180197DC35F40612607655B3DC0B5CFD688690B99B39B758927373D4C50"
				},
				{
					id: 6,
					title: "After Lockdown Gathering",
					description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, " +
						"sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut " +
						"enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut " +
						"aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit " +
						"in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur " +
						"sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt " +
						"mollit anim id est laborum.",
					country: "Nepal",
					province: "Gandaki Pradesh",
					district: "Kaski",
					municipality: "Pokhara",
					municipality_ward: "Lamachaur",
					vdc: null,
					vdc_ward: null,
					is_main: true,
					created_by: "bot25",
					created_at: now,
					updated_by: "bot25",
					updated_at: now,
					venue: "Deep Housing",
					organizer: "Pokhara Kendra Branch",
					contacts: [9845689652, 6158965],
					start_date: now,
					duration: 5,
					timeOfDay: "10AM - 5PM",
					banner:
						"https://prod-ripcut-delivery.disney-plus.net/v1/variant/disney/ED4B1180197DC35F40612607655B3DC0B5CFD688690B99B39B758927373D4C50"
				},
				{
					id: 7,
					title: "Hungama Event",
					description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, " +
						"sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut " +
						"enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut " +
						"aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit " +
						"in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur " +
						"sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt " +
						"mollit anim id est laborum.",
					country: "Nepal",
					province: "Bagmati Pradesh",
					district: "Kathmandu",
					municipality: "Kathmandu",
					municipality_ward: "Maitighar",
					vdc: null,
					vdc_ward: null,
					is_main: true,
					created_by: "bot25",
					created_at: now,
					updated_by: "bot25",
					updated_at: now,
					venue: "Maiti Ghar Mandala",
					organizer: "Pokhara Kendra Branch",
					contacts: [9845689652, 6158965],
					start_date: now,
					duration: 2,
					timeOfDay: "10AM - 5PM",
					banner:
						"https://prod-ripcut-delivery.disney-plus.net/v1/variant/disney/ED4B1180197DC35F40612607655B3DC0B5CFD688690B99B39B758927373D4C50"
				},
				{
					id: 8,
					title: "Dashai Tihar Event",
					description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, " +
						"sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut " +
						"enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut " +
						"aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit " +
						"in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur " +
						"sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt " +
						"mollit anim id est laborum.",
					country: "Nepal",
					province: "Province No 2",
					district: "BXABCY",
					municipality: null,
					municipality_ward: null,
					vdc: "HariyoKharka",
					vdc_ward: "AadhiBeri Gaaupalika",
					is_main: false,
					created_by: "bot25",
					created_at: now,
					updated_by: "bot25",
					updated_at: now,
					venue: "Saili Ko Pasal",
					organizer: "Hero Branch",
					contacts: [9845689652, 6158965],
					start_date: now,
					duration: 2,
					timeOfDay: "10AM - 5PM",
					banner:
						"https://prod-ripcut-delivery.disney-plus.net/v1/variant/disney/ED4B1180197DC35F40612607655B3DC0B5CFD688690B99B39B758927373D4C50"
				},
				{
					id: 9,
					title: "Guru Purnima 2020",
					description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, " +
						"sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut " +
						"enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut " +
						"aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit " +
						"in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur " +
						"sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt " +
						"mollit anim id est laborum.",
					country: "Nepal",
					province: "Gandaki Pradesh",
					district: "Kaski",
					municipality: "Pokhara",
					municipality_ward: "Lamachaur",
					vdc: null,
					vdc_ward: null,
					organizer: "Pokhara Kendra Branch",
					venue: "Deep Housing, Bagar",
					contacts: [9845689652, 6158965],
					start_date: now,
					duration: 5,
					timeOfDay: "10AM - 5PM",
					is_main: true,
					created_by: "kiran589",
					created_at: now,
					updated_by: "bot25",
					updated_at: now,
					banner:
						"https://prod-ripcut-delivery.disney-plus.net/v1/variant/disney/ED4B1180197DC35F40612607655B3DC0B5CFD688690B99B39B758927373D4C50"
				},
				{
					id: 10,
					title: "After Lockdown Gathering",
					description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, " +
						"sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut " +
						"enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut " +
						"aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit " +
						"in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur " +
						"sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt " +
						"mollit anim id est laborum.",
					country: "Nepal",
					province: "Gandaki Pradesh",
					district: "Kaski",
					municipality: "Pokhara",
					municipality_ward: "Lamachaur",
					vdc: null,
					vdc_ward: null,
					is_main: true,
					created_by: "bot25",
					created_at: now,
					updated_by: "bot25",
					updated_at: now,
					venue: "Deep Housing",
					organizer: "Pokhara Kendra Branch",
					contacts: [9845689652, 6158965],
					start_date: now,
					duration: 5,
					timeOfDay: "10AM - 5PM",
					banner:
						"https://prod-ripcut-delivery.disney-plus.net/v1/variant/disney/ED4B1180197DC35F40612607655B3DC0B5CFD688690B99B39B758927373D4C50"
				},
				{
					id: 11,
					title: "Hungama Event",
					description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, " +
						"sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut " +
						"enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut " +
						"aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit " +
						"in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur " +
						"sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt " +
						"mollit anim id est laborum.",
					country: "Nepal",
					province: "Bagmati Pradesh",
					district: "Kathmandu",
					municipality: "Kathmandu",
					municipality_ward: "Maitighar",
					vdc: null,
					vdc_ward: null,
					is_main: true,
					created_by: "bot25",
					created_at: now,
					updated_by: "bot25",
					updated_at: now,
					venue: "Maiti Ghar Mandala",
					organizer: "Pokhara Kendra Branch",
					contacts: [9845689652, 6158965],
					start_date: now,
					duration: 2,
					timeOfDay: "10AM - 5PM",
					banner:
						"https://prod-ripcut-delivery.disney-plus.net/v1/variant/disney/ED4B1180197DC35F40612607655B3DC0B5CFD688690B99B39B758927373D4C50"
				},
				{
					id: 12,
					title: "Dashai Tihar Event",
					description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, " +
						"sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut " +
						"enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut " +
						"aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit " +
						"in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur " +
						"sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt " +
						"mollit anim id est laborum.",
					country: "Nepal",
					province: "Province No 2",
					district: "BXABCY",
					municipality: null,
					municipality_ward: null,
					vdc: "HariyoKharka",
					vdc_ward: "AadhiBeri Gaaupalika",
					is_main: false,
					created_by: "bot25",
					created_at: now,
					updated_by: "bot25",
					updated_at: now,
					venue: "Saili Ko Pasal",
					organizer: "Hero Branch",
					contacts: [9845689652, 6158965],
					start_date: now,
					duration: 2,
					timeOfDay: "10AM - 5PM",
					banner:
						"https://prod-ripcut-delivery.disney-plus.net/v1/variant/disney/ED4B1180197DC35F40612607655B3DC0B5CFD688690B99B39B758927373D4C50"
				},
				{
					id: 13,
					title: "Guru Purnima 2020",
					description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, " +
						"sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut " +
						"enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut " +
						"aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit " +
						"in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur " +
						"sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt " +
						"mollit anim id est laborum.",
					country: "Nepal",
					province: "Gandaki Pradesh",
					district: "Kaski",
					municipality: "Pokhara",
					municipality_ward: "Lamachaur",
					vdc: null,
					vdc_ward: null,
					organizer: "Pokhara Kendra Branch",
					venue: "Deep Housing, Bagar",
					contacts: [9845689652, 6158965],
					start_date: now,
					duration: 5,
					timeOfDay: "10AM - 5PM",
					is_main: true,
					created_by: "kiran589",
					created_at: now,
					updated_by: "bot25",
					updated_at: now,
					banner:
						"https://prod-ripcut-delivery.disney-plus.net/v1/variant/disney/ED4B1180197DC35F40612607655B3DC0B5CFD688690B99B39B758927373D4C50"
				},
				{
					id: 14,
					title: "After Lockdown Gathering",
					description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, " +
						"sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut " +
						"enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut " +
						"aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit " +
						"in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur " +
						"sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt " +
						"mollit anim id est laborum.",
					country: "Nepal",
					province: "Gandaki Pradesh",
					district: "Kaski",
					municipality: "Pokhara",
					municipality_ward: "Lamachaur",
					vdc: null,
					vdc_ward: null,
					is_main: true,
					created_by: "bot25",
					created_at: now,
					updated_by: "bot25",
					updated_at: now,
					venue: "Deep Housing",
					organizer: "Pokhara Kendra Branch",
					contacts: [9845689652, 6158965],
					start_date: now,
					duration: 5,
					timeOfDay: "10AM - 5PM",
					banner:
						"https://prod-ripcut-delivery.disney-plus.net/v1/variant/disney/ED4B1180197DC35F40612607655B3DC0B5CFD688690B99B39B758927373D4C50"
				},
				{
					id: 15,
					title: "Hungama Event",
					description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, " +
						"sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut " +
						"enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut " +
						"aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit " +
						"in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur " +
						"sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt " +
						"mollit anim id est laborum.",
					country: "Nepal",
					province: "Bagmati Pradesh",
					district: "Kathmandu",
					municipality: "Kathmandu",
					municipality_ward: "Maitighar",
					vdc: null,
					vdc_ward: null,
					is_main: true,
					created_by: "bot25",
					created_at: now,
					updated_by: "bot25",
					updated_at: now,
					venue: "Maiti Ghar Mandala",
					organizer: "Pokhara Kendra Branch",
					contacts: [9845689652, 6158965],
					start_date: now,
					duration: 2,
					timeOfDay: "10AM - 5PM",
					banner:
						"https://prod-ripcut-delivery.disney-plus.net/v1/variant/disney/ED4B1180197DC35F40612607655B3DC0B5CFD688690B99B39B758927373D4C50"
				},
				{
					id: 16,
					title: "Dashai Tihar Event",
					description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, " +
						"sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut " +
						"enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut " +
						"aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit " +
						"in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur " +
						"sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt " +
						"mollit anim id est laborum.",
					country: "Nepal",
					province: "Province No 2",
					district: "BXABCY",
					municipality: null,
					municipality_ward: null,
					vdc: "HariyoKharka",
					vdc_ward: "AadhiBeri Gaaupalika",
					is_main: false,
					created_by: "bot25",
					created_at: now,
					updated_by: "bot25",
					updated_at: now,
					venue: "Saili Ko Pasal",
					organizer: "Hero Branch",
					contacts: [9845689652, 6158965],
					start_date: now,
					duration: 2,
					timeOfDay: "10AM - 5PM",
					banner:
						"https://prod-ripcut-delivery.disney-plus.net/v1/variant/disney/ED4B1180197DC35F40612607655B3DC0B5CFD688690B99B39B758927373D4C50"
				},
			]
		},

		editItem(item) {
			this.editedIndex = this.events.indexOf(item)
			this.editedItem = Object.assign({}, item)
			this.dialog = true
		},

		showItem(item) {
			this.viewIndex = this.events.indexOf(item)
			this.editedItem = Object.assign({}, item)
			this.dialog = true
		},

		deleteItem(item) {
			const index = this.events.indexOf(item)
			confirm("Are you sure you want to delete this event?") && this.events.splice(index, 1)
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
				Object.assign(this.events[this.editedIndex], this.editedItem)
			} else {
				this.events.push(this.editedItem)
			}
			this.close()
		},

		routeToEventDetailPage(itemId) {
			router.push({name: "SACHCHAI NEPAL EVENT", params: { id: itemId }})
		}
	},
}
</script>

<style lang="sass" scoped>
.v-input--selection-controls
	margin-top: 0

.small-detail-icon
	margin-top: -4px
	margin-right: 4px

.v-card__title
	background-color: #535151 !important

.event-name
	margin: 0
	padding: 0
	font-size: 18px
	font-weight: 300

.cursor
	cursor: pointer

#is-main-col
	::v-deep.v-input--checkbox
		margin: -5px 0 20px
		padding: 10px 10px
		border: 1px solid rgb(156 155 150)
		border-radius: 3px
	::v-deep.v-input--checkbox:hover
		border: 1px solid black
::v-deep.mx-calendar
	margin: 0
	padding: 3px
	::v-deep.mx-calendar-header
		background-color: blue

</style>
