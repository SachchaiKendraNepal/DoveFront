<template>
	<v-row class="ma-0 pa-0">
		<v-col cols="12"
			class="ma-0 pa-0"
		>
			<v-toolbar color="transparent"
				height="60"
			>
				<v-app-bar-nav-icon><v-icon>mdi-home-city</v-icon></v-app-bar-nav-icon>
				<v-spacer />
				<v-card class="ma-0 pa-0 mx-4"
					width="500"
				>
					<v-text-field
						v-model="searchEvents"
						dark
						solo
						dense
						hide-details
						label="Search branches"
						prepend-inner-icon="mdi-home-search"
					/>
				</v-card>
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
		<v-col v-for="(item, index) in branches"
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
							@click="routeToBranchDetail(item.id)"
							v-text="item.name"
						/>
						<v-card-subtitle>
							<v-icon size="16">
								mdi-account-circle
							</v-icon> {{ item.created_by }}
							<v-icon size="16">
								mdi-city
							</v-icon> Pokhara Kendra Branch
							<v-icon size="16">
								mdi-clock
							</v-icon> {{ item.created_at }}
						</v-card-subtitle>
						<v-card-text class="py-0 pb-2">
							{{ description_mock.substr(200) }}
							<span>...</span>
						</v-card-text>

						<v-row class="ma-0 pa-0">
							<v-col class="pa-0">
								<v-list two-line
									class="pa-0"
									color="transparent"
								>
									<v-list-item>
										<v-list-item-icon><v-icon>mdi-account-cowboy-hat</v-icon></v-list-item-icon>
										<v-list-item-content>
											<v-list-item-title>Muhammad Ali</v-list-item-title>
											<v-list-item-subtitle>Branch Chief</v-list-item-subtitle>
										</v-list-item-content>
									</v-list-item>
									<v-list-item>
										<v-list-item-icon><v-icon>mdi-account-tie</v-icon></v-list-item-icon>
										<v-list-item-content>
											<v-list-item-title>Joe Frasier</v-list-item-title>
											<v-list-item-subtitle>Branch Vice Chief</v-list-item-subtitle>
										</v-list-item-content>
									</v-list-item>
									<v-list-item v-show="$vuetify.breakpoint.xlOnly">
										<v-list-item-icon><v-icon>mdi-account-hard-hat</v-icon></v-list-item-icon>
										<v-list-item-content>
											<v-list-item-title>50</v-list-item-title>
											<v-list-item-subtitle>
												Double Star Leaders
												<v-icon small>
													mdi-star-circle
												</v-icon><v-icon small>
													mdi-star-circle
												</v-icon>
											</v-list-item-subtitle>
										</v-list-item-content>
									</v-list-item>
									<v-list-item v-show="$vuetify.breakpoint.xlOnly">
										<v-list-item-icon><v-icon>mdi-account-hard-hat</v-icon></v-list-item-icon>
										<v-list-item-content>
											<v-list-item-title>50</v-list-item-title>
											<v-list-item-subtitle>
												Single Star Leaders
												<v-icon small>
													mdi-star-circle
												</v-icon>
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
									<v-list-item v-show="$vuetify.breakpoint.xlOnly">
										<v-list-item-icon><v-icon>mdi-office-building-marker</v-icon></v-list-item-icon>
										<v-list-item-content>
											<v-list-item-title>{{ item.province }}</v-list-item-title>
											<v-list-item-subtitle>
												Province
											</v-list-item-subtitle>
										</v-list-item-content>
									</v-list-item>
									<v-list-item v-show="$vuetify.breakpoint.xlOnly">
										<v-list-item-icon><v-icon>mdi-map-marker-multiple</v-icon></v-list-item-icon>
										<v-list-item-content>
											<v-list-item-title>{{ item.district }}</v-list-item-title>
											<v-list-item-subtitle>
												District
											</v-list-item-subtitle>
										</v-list-item-content>
									</v-list-item>
									<v-list-item v-if="item.municipality">
										<v-list-item-icon><v-icon>mdi-google-maps</v-icon></v-list-item-icon>
										<v-list-item-content>
											<v-list-item-title>{{ item.municipality }}</v-list-item-title>
											<v-list-item-subtitle>
												Municipality
											</v-list-item-subtitle>
										</v-list-item-content>
									</v-list-item>
									<v-list-item v-else>
										<v-list-item-icon><v-icon>mdi-home-map-marker</v-icon></v-list-item-icon>
										<v-list-item-content>
											<v-list-item-title>{{ item.vdc }}</v-list-item-title>
											<v-list-item-subtitle>
												VDC
											</v-list-item-subtitle>
										</v-list-item-content>
									</v-list-item>
									<v-list-item>
										<v-list-item-icon><v-icon>mdi-numeric</v-icon></v-list-item-icon>
										<v-list-item-content>
											<v-list-item-title v-if="item.municipality_ward">
												{{ item.municipality_ward }}
											</v-list-item-title>
											<v-list-item-title v-else>
												{{ item.vdc_ward }}
											</v-list-item-title>
											<v-list-item-subtitle>
												Municipality
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
										<v-list-item-icon><v-icon>mdi-phone</v-icon></v-list-item-icon>
										<v-list-item-content>
											<v-list-item-title>{{ item.phone }}</v-list-item-title>
											<v-list-item-subtitle>
												Contact
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
									<v-icon>mdi-account-multiple</v-icon>
									<span class="button-span">Members</span>
								</v-btn>
							</v-card-actions>
							<v-card-actions>
								<v-btn>
									<v-icon>mdi-post</v-icon>
									<span class="button-span">Articles</span>
								</v-btn>
							</v-card-actions>
							<v-card-actions>
								<v-btn>
									<v-icon>mdi-video-box</v-icon>
									<span class="button-span">Videos</span>
								</v-btn>
							</v-card-actions>
						</v-row>
					</v-col>
					<v-col cols="12"
						xl="4"
						lg="4"
					>
						<v-img :src="item.image"
							max-height="400"
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
		description_mock: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, " +
			"sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut " +
			"enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut " +
			"aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit " +
			"in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur " +
			"sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt " +
			"mollit anim id est laborum.",
		searchEvents: "",
		colors: [
			"#F44336",
			"#009688",
			"#9C27B0",
			"#b16e0c",
			"#673AB7",
			"#E91E63",
			"#253380",
			"#105414",
			"#d84212",
			"#952175",
		],
		filterMenuItems: [
			{ title: "By Status", icon: "mdi-check" },
			{ title: "By Type", icon: "mdi-call-merge" },
			{ title: "By Province", icon: "mdi-office-building-marker" },
			{ title: "By District", icon: "mdi-map-marker-multiple" },
			{ title: "By Municipality", icon: "mdi-map-marker" },
			{ title: "By VDC", icon: "mdi-home-map-marker" },
		],
		sortMenuItems: [
			{ title: "Latest", icon: "mdi-sort-calendar-ascending" },
			{ title: "Alphabetically", icon: "mdi-sort-alphabetical-variant" },
		],
		branches: null
	}),
	mounted() {
		this.initBranches()
	},
	methods: {
		routeToBranchDetail(eventId) {
			console.log(eventId)
			this.$router.push({name: "SACHCHAI NEPAL BRANCH"})
		},
		initBranches() {
			const now = new Date().toISOString().replace(/T/, " ").replace(/\..+/, "")
			this.branches = [
				{
					id: 1,
					name: "Pokhara Branch",
					country: "Nepal",
					province: "Gandaki Pradesh",
					district: "Kaski",
					municipality: "Pokhara-Lekhnath",
					municipality_ward: "Amarsingh",
					vdc: null,
					vdc_ward: null,
					phone: 9856325632,
					is_main: false,
					created_by: "kiran589",
					created_at: now,
					updated_by: "bot25",
					updated_at: now,
					image:
						"https://prod-ripcut-delivery.disney-plus.net/v1/variant/disney/ED4B1180197DC35F40612607655B3DC0B5CFD688690B99B39B758927373D4C50"
				},
				{
					id: 2,
					name: "Kathmandu Branch",
					country: "Nepal",
					province: "Bagmati Pradesh",
					district: "Kathmandu",
					municipality: "Kathmandu",
					municipality_ward: "Baneshowr",
					vdc: null,
					vdc_ward: null,
					phone: 9858325632,
					is_main: true,
					created_by: "bot25",
					created_at: now,
					updated_by: "bot25",
					updated_at: now,
					image:
						"https://prod-ripcut-delivery.disney-plus.net/v1/variant/disney/ED4B1180197DC35F40612607655B3DC0B5CFD688690B99B39B758927373D4C50"
				},
				{
					id: 3,
					name: "Humla Branch",
					country: "Nepal",
					province: "Province No. 1",
					district: "Humla",
					municipality: null,
					municipality_ward: null,
					vdc: "Aaglung",
					vdc_ward: "sldkf",
					phone: 9858325578,
					is_main: false,
					created_by: "raymz584",
					created_at: now,
					updated_by: "raymz584",
					updated_at: now,
					image:
						"https://prod-ripcut-delivery.disney-plus.net/v1/variant/disney/ED4B1180197DC35F40612607655B3DC0B5CFD688690B99B39B758927373D4C50"
				},
				{
					id: 4,
					name: "Pokhara Branch",
					country: "Nepal",
					province: "Gandaki Pradesh",
					district: "Kaski",
					municipality: "Pokhara-Lekhnath",
					municipality_ward: "Amarsingh",
					vdc: null,
					vdc_ward: null,
					phone: 9856325632,
					is_main: false,
					created_by: "kiran589",
					created_at: now,
					updated_by: "bot25",
					updated_at: now,
					image:
						"https://prod-ripcut-delivery.disney-plus.net/v1/variant/disney/ED4B1180197DC35F40612607655B3DC0B5CFD688690B99B39B758927373D4C50"
				},
				{
					id: 5,
					name: "Kathmandu Branch",
					country: "Nepal",
					province: "Bagmati Pradesh",
					district: "Kathmandu",
					municipality: "Kathmandu",
					municipality_ward: "Baneshowr",
					vdc: null,
					vdc_ward: null,
					phone: 9858325632,
					is_main: true,
					created_by: "bot25",
					created_at: now,
					updated_by: "bot25",
					updated_at: now,
					image:
						"https://prod-ripcut-delivery.disney-plus.net/v1/variant/disney/ED4B1180197DC35F40612607655B3DC0B5CFD688690B99B39B758927373D4C50"
				},
				{
					id: 6,
					name: "Humla Branch",
					country: "Nepal",
					province: "Province No. 1",
					district: "Humla",
					municipality: null,
					municipality_ward: null,
					vdc: "Aaglung",
					vdc_ward: "sldkf",
					phone: 9858325578,
					is_main: false,
					created_by: "raymz584",
					created_at: now,
					updated_by: "raymz584",
					updated_at: now,
					image:
						"https://prod-ripcut-delivery.disney-plus.net/v1/variant/disney/ED4B1180197DC35F40612607655B3DC0B5CFD688690B99B39B758927373D4C50"
				},
				{
					id: 7,
					name: "Pokhara Branch",
					country: "Nepal",
					province: "Gandaki Pradesh",
					district: "Kaski",
					municipality: "Pokhara-Lekhnath",
					municipality_ward: "Amarsingh",
					vdc: null,
					vdc_ward: null,
					phone: 9856325632,
					is_main: false,
					created_by: "kiran589",
					created_at: now,
					updated_by: "bot25",
					updated_at: now,
					image:
						"https://prod-ripcut-delivery.disney-plus.net/v1/variant/disney/ED4B1180197DC35F40612607655B3DC0B5CFD688690B99B39B758927373D4C50"
				},
				{
					id: 8,
					name: "Kathmandu Branch",
					country: "Nepal",
					province: "Bagmati Pradesh",
					district: "Kathmandu",
					municipality: "Kathmandu",
					municipality_ward: "Baneshowr",
					vdc: null,
					vdc_ward: null,
					phone: 9858325632,
					is_main: true,
					created_by: "bot25",
					created_at: now,
					updated_by: "bot25",
					updated_at: now,
					image:
						"https://prod-ripcut-delivery.disney-plus.net/v1/variant/disney/ED4B1180197DC35F40612607655B3DC0B5CFD688690B99B39B758927373D4C50"
				},
				{
					id: 9,
					name: "Humla Branch",
					country: "Nepal",
					province: "Province No. 1",
					district: "Humla",
					municipality: null,
					municipality_ward: null,
					vdc: "Aaglung",
					vdc_ward: "sldkf",
					phone: 9858325578,
					is_main: false,
					created_by: "raymz584",
					created_at: now,
					updated_by: "raymz584",
					updated_at: now,
					image:
						"https://prod-ripcut-delivery.disney-plus.net/v1/variant/disney/ED4B1180197DC35F40612607655B3DC0B5CFD688690B99B39B758927373D4C50"
				},
				{
					id: 10,
					name: "Pokhara Branch",
					country: "Nepal",
					province: "Gandaki Pradesh",
					district: "Kaski",
					municipality: "Pokhara-Lekhnath",
					municipality_ward: "Amarsingh",
					vdc: null,
					vdc_ward: null,
					phone: 9856325632,
					is_main: false,
					created_by: "kiran589",
					created_at: now,
					updated_by: "bot25",
					updated_at: now,
					image:
						"https://prod-ripcut-delivery.disney-plus.net/v1/variant/disney/ED4B1180197DC35F40612607655B3DC0B5CFD688690B99B39B758927373D4C50"
				},
				{
					id: 11,
					name: "Kathmandu Branch",
					country: "Nepal",
					province: "Bagmati Pradesh",
					district: "Kathmandu",
					municipality: "Kathmandu",
					municipality_ward: "Baneshowr",
					vdc: null,
					vdc_ward: null,
					phone: 9858325632,
					is_main: true,
					created_by: "bot25",
					created_at: now,
					updated_by: "bot25",
					updated_at: now,
					image:
						"https://prod-ripcut-delivery.disney-plus.net/v1/variant/disney/ED4B1180197DC35F40612607655B3DC0B5CFD688690B99B39B758927373D4C50"
				},
				{
					id: 12,
					name: "Humla Branch",
					country: "Nepal",
					province: "Province No. 1",
					district: "Humla",
					municipality: null,
					municipality_ward: null,
					vdc: "Aaglung",
					vdc_ward: "sldkf",
					phone: 9858325578,
					is_main: false,
					created_by: "raymz584",
					created_at: now,
					updated_by: "raymz584",
					updated_at: now,
					image:
						"https://prod-ripcut-delivery.disney-plus.net/v1/variant/disney/ED4B1180197DC35F40612607655B3DC0B5CFD688690B99B39B758927373D4C50"
				},
				{
					id: 13,
					name: "Pokhara Branch",
					country: "Nepal",
					province: "Gandaki Pradesh",
					district: "Kaski",
					municipality: "Pokhara-Lekhnath",
					municipality_ward: "Amarsingh",
					vdc: null,
					vdc_ward: null,
					phone: 9856325632,
					is_main: false,
					created_by: "kiran589",
					created_at: now,
					updated_by: "bot25",
					updated_at: now,
					image:
						"https://prod-ripcut-delivery.disney-plus.net/v1/variant/disney/ED4B1180197DC35F40612607655B3DC0B5CFD688690B99B39B758927373D4C50"
				},
				{
					id: 14,
					name: "Kathmandu Branch",
					country: "Nepal",
					province: "Bagmati Pradesh",
					district: "Kathmandu",
					municipality: "Kathmandu",
					municipality_ward: "Baneshowr",
					vdc: null,
					vdc_ward: null,
					phone: 9858325632,
					is_main: true,
					created_by: "bot25",
					created_at: now,
					updated_by: "bot25",
					updated_at: now,
					image:
						"https://prod-ripcut-delivery.disney-plus.net/v1/variant/disney/ED4B1180197DC35F40612607655B3DC0B5CFD688690B99B39B758927373D4C50"
				},
				{
					id: 15,
					name: "Humla Branch",
					country: "Nepal",
					province: "Province No. 1",
					district: "Humla",
					municipality: null,
					municipality_ward: null,
					vdc: "Aaglung",
					vdc_ward: "sldkf",
					phone: 9858325578,
					is_main: false,
					created_by: "raymz584",
					created_at: now,
					updated_by: "raymz584",
					updated_at: now,
					image:
						"https://prod-ripcut-delivery.disney-plus.net/v1/variant/disney/ED4B1180197DC35F40612607655B3DC0B5CFD688690B99B39B758927373D4C50"
				}
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
