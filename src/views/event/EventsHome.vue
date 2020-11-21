<template>
	<v-row class="ma-0 pa-0">
		<v-col cols="12"
			class="ma-0 pa-0"
		>
			<v-toolbar color="#9e9e9e">
				<v-app-bar-nav-icon><v-icon>mdi-calendar-clock</v-icon></v-app-bar-nav-icon>
				<v-spacer />
				<v-card class="ma-0 pa-0 mx-4"
					width="500"
				>
					<v-text-field
						v-model="searchEvents"
						outlined
						dense
						hide-details
						label="Search events"
					/>
				</v-card>
				<v-spacer />
				<v-menu offset-y>
					<template #activator="{ on, attrs }">
						<v-btn
							icon
							v-bind="attrs"
							v-on="on"
						>
							<v-icon>mdi-filter</v-icon>
						</v-btn>
					</template>
					<v-list>
						<v-list-item
							v-for="(item, index) in filterMenuItems"
							:key="index"
						>
							<v-list-item-icon><v-icon>{{ item.icon }}</v-icon></v-list-item-icon>
							<v-list-item-title>{{ item.title }}</v-list-item-title>
						</v-list-item>
					</v-list>
				</v-menu>

				<v-menu offset-y>
					<template #activator="{ on, attrs }">
						<v-btn
							icon
							v-bind="attrs"
							v-on="on"
						>
							<v-icon>mdi-sort</v-icon>
						</v-btn>
					</template>
					<v-list>
						<v-list-item
							v-for="(item, index) in sortMenuItems"
							:key="index"
						>
							<v-list-item-icon><v-icon>{{ item.icon }}</v-icon></v-list-item-icon>
							<v-list-item-title>{{ item.title }}</v-list-item-title>
						</v-list-item>
					</v-list>
				</v-menu>
			</v-toolbar>
		</v-col>
		<v-col v-for="(item, index) in events"
			:key="index"
			cols="12"
		>
			<v-card
				:color="colors[index % 10]"
				dark
			>
				<v-row class="ma-0 pa-0"
					align="center"
				>
					<v-col cols="12"
						xl="8"
						lg="8"
					>
						<v-card-title
							class="display-1 cursor-pointer"
							@click="routeToEventDetail(item.id)"
							v-text="item.title"
						/>
						<v-card-subtitle>
							<v-icon size="16">
								mdi-account-circle
							</v-icon> {{ item.created_by }} ●
							<v-icon size="16">
								mdi-city
							</v-icon> Pokhara Kendra Branch ●
							<v-icon size="16">
								mdi-clock
							</v-icon> {{ item.created_at }}
						</v-card-subtitle>
						<v-card-text class="py-0 pb-2">
							{{ $vuetify.breakpoint.lgAndUp
								? item.description.substring(0,200)
								: $vuetify.breakpoint.md
									? item.description.substring(0,140)
									: item.description.substring(0,50)
							}}
							<span>...</span>
						</v-card-text>

						<v-row class="ma-0 pa-0">
							<v-col class="pa-0">
								<v-list two-line
									class="pa-0"
									color="transparent"
								>
									<v-list-item>
										<v-list-item-icon><v-icon>mdi-calendar</v-icon></v-list-item-icon>
										<v-list-item-content>
											<v-list-item-title>Starting On</v-list-item-title>
											<v-list-item-subtitle>
												{{ item.start_date.day }}<sup>{{
													getSuperScript(item.start_date.day)
												}}</sup> for {{ item.duration }} <span v-if="item.duration > 1">days</span> <span v-else>day</span>
											</v-list-item-subtitle>
										</v-list-item-content>
									</v-list-item>
								</v-list>
							</v-col>
							<v-col class="pa-0">
								<v-list two-line
									color="transparent"
									class="pa-0"
								>
									<v-list-item>
										<v-list-item-icon><v-icon>mdi-google-maps</v-icon></v-list-item-icon>
										<v-list-item-content>
											<v-list-item-title>Location</v-list-item-title>
											<v-list-item-subtitle>
												<span v-if="item.municipality">{{ item.municipality_ward }} - {{ item.municipality }}</span>
												<span v-else>{{ item.vdc_ward }} - {{ item.municipality }}</span>
												{{ item.district }}, {{ item.province }}, {{ item.country }}
											</v-list-item-subtitle>
										</v-list-item-content>
									</v-list-item>
								</v-list>
							</v-col>
							<v-col class="pa-0">
								<v-list two-line
									class="pa-0"
									color="transparent"
								>
									<v-list-item>
										<v-list-item-icon><v-icon>mdi-cog</v-icon></v-list-item-icon>
										<v-list-item-content>
											<v-list-item-title>Type</v-list-item-title>
											<v-list-item-subtitle>
												Satsang
											</v-list-item-subtitle>
										</v-list-item-content>
									</v-list-item>
								</v-list>
							</v-col>
						</v-row>

						<v-row class="ma-0 pa-0"
							no-gutters
							align="center"
						>
							<v-card-actions>
								<v-btn depressed>
									<v-icon>mdi-eye</v-icon>
									<span class="button-span">View</span>
								</v-btn>
							</v-card-actions>
							<v-card-actions>
								<v-btn>
									<v-icon>mdi-star-circle</v-icon>
									<span class="button-span">Interested</span>
								</v-btn>
							</v-card-actions>
							<v-card-actions>
								<v-btn>
									<v-icon>mdi-walk</v-icon>
									<span class="button-span">Going</span>
								</v-btn>
							</v-card-actions>
						</v-row>
					</v-col>
					<v-col cols="12"
						xl="4"
						lg="4"
					>
						<v-img :src="item.banner"
							class="event-banner"
						/>
					</v-col>
				</v-row>
			</v-card>
		</v-col>
	</v-row>
</template>
<script>
export default {
	name: "EventsHomeComponent",
	data: () => ({
		searchEvents: "",
		colors: [
			"#1F7087",
			"#731231",
			"#254f0d",
			"#6d190d",
			"#952175",
			"#64410d",
			"#952175",
			"#105414",
			"#60250f",
			"#10405f",
		],
		filterMenuItems: [
			{ title: "By Status", icon: "mdi-check" },
			{ title: "By Type", icon: "mdi-call-merge" },
			{ title: "By Branch", icon: "mdi-city" },
			{ title: "By Location", icon: "mdi-map-marker" },
		],
		sortMenuItems: [
			{ title: "Latest", icon: "mdi-sort-calendar-ascending" },
			{ title: "Most Followed", icon: "mdi-lightning-bolt" },
			{ title: "Alphabetically", icon: "mdi-sort-alphabetical-variant" },
		],
		events: null
	}),
	mounted() {
		this.initEvents()
	},
	methods: {
		routeToEventDetail(eventId) {
			console.log(eventId)
			this.$router.push({name: "EVENT DETAIL HOME"})
		},
		getSuperScript(day) {
			const rem = day % 10
			if ( rem === 1) {
				return "st"
			} else if (rem === 2) {
				return "nd"
			} else if (rem === 3) {
				return "rd"
			} else {
				return "th"
			}
		},
		initEvents() {
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
					start_date: {
						day: 25,
						month: "Feb"
					},
					duration: 1,
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
					start_date: {
						day: 15,
						month: "Nov"
					},
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
					start_date: {
						day: 25,
						month: "Feb"
					},
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
					start_date: {
						day: 25,
						month: "Feb"
					},
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
					start_date: {
						day: 25,
						month: "Feb"
					},
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
					start_date: {
						day: 25,
						month: "Feb"
					},
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
					start_date: {
						day: 25,
						month: "Feb"
					},
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
					start_date: {
						day: 25,
						month: "Feb"
					},
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
					start_date: {
						day: 25,
						month: "Feb"
					},
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
					start_date: {
						day: 25,
						month: "Feb"
					},
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
					start_date: {
						day: 25,
						month: "Feb"
					},
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
					start_date: {
						day: 25,
						month: "Feb"
					},
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
					start_date: {
						day: 25,
						month: "Feb"
					},
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
					start_date: {
						day: 25,
						month: "Feb"
					},
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
					start_date: {
						day: 25,
						month: "Feb"
					},
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
					start_date: {
						day: 25,
						month: "Feb"
					},
					duration: 2,
					timeOfDay: "10AM - 5PM",
					banner:
						"https://prod-ripcut-delivery.disney-plus.net/v1/variant/disney/ED4B1180197DC35F40612607655B3DC0B5CFD688690B99B39B758927373D4C50"
				},
			]
		}
	}
}
</script>
<style lang="sass" scoped>
.cursor-pointer
	cursor: pointer
.event-banner
	border-radius: 10px
.button-span
	visibility: visible
	opacity: 1
	margin-left: 4px
	transition: all .2s
	@media only screen and (max-width: 432px)
		visibility: hidden
		opacity: 0
		width: 0
		margin: 0
		overflow: hidden
::v-deep.v-list-item__content
	padding: 0
	margin-top: -10px
</style>
