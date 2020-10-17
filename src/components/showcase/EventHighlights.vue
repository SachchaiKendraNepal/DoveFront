<template>
	<v-card
		id="event-highlights-card"
		max-width="1100"
		class="mx-auto"
	>
		<v-carousel
			cycle
			height="170"
			:show-arrows="false"
			hide-delimiters
		>
			<v-carousel-item
				v-for="(event, index) in events"
				:key="index"
			>
				<v-card
					:color="colors[index]"
					height="100%"
				>
					<v-row
						no-gutters
						class="fill-height px-2"
						align="center"
						justify="center"
					>
						<v-col
							id="avatar-column"
							cols="3"
							xl="2"
							lg="2"
							md="2"
							sm="3"
							class="ma-0 pa-0 d-flex justify-center"
						>
							<v-avatar
								id="date-avatar"
								color="#e88c04"
								class="elevation-12"
								size="120"
							>
								<v-row
									class="ma-0 pa-0"
									justify="center"
									align="center"
								>
									<v-col
										id="date-column"
										cols="12"
										class="ma-0 pa-0 mt-1 pb-2"
									>
										<h1>{{ event.start_date.day }}</h1>
									</v-col>
									<v-col cols="12"
										class="ma-0 pa-0 pt-4 pb-4 month-column"
									>
										<h2>
											{{ event.start_date.month }}
										</h2>
									</v-col>
								</v-row>
							</v-avatar>
						</v-col>
						<v-col
							v-if="$vuetify.breakpoint.smAndUp"
							class="ma-0 pa-0 d-flex justify-center"
							cols="1"
						>
							<div id="divider" />
						</v-col>
						<v-col
							id="event-column"
							cols="10"
							xl="9"
							lg="9"
							md="9"
							sm="8"
							class="ma-0 pa-0"
						>
							<v-row
								no-gutters
								justify="center"
								align="center"
								class="px-2 pb-2"
							>
								<v-col
									xl="6"
									lg="6"
									md="6"
									sm="12"
									class="ma-0 pa-0"
								>
									<p class="ma-0 pa-0"
										:class="
											$vuetify.breakpoint.smAndDown
												? 'small-title'
												: 'big-title'
										"
									>
										<v-icon>mdi-calendar-star</v-icon>
										{{ event.title }}
									</p>
								</v-col>
								<v-col
									v-if="$vuetify.breakpoint.smAndUp"
									xl="3"
									lg="3"
									md="3"
									sm="6"
									class="ma-0 pa-0 pt-3"
								>
									<p class="subtitle-2 ma-0 pa-0 text-start">
										<span><v-icon>mdi-sort-clock-descending</v-icon></span>
										Friday 5:00 AM
									</p>
									<p class="subtitle-2 ma-0 pa-0">
										<v-icon>mdi-sort-clock-ascending</v-icon>
										Friday 8:00 PM
									</p>
								</v-col>
								<v-col
									v-if="$vuetify.breakpoint.smAndUp"
									xl="3"
									lg="3"
									md="3"
									sm="6"
									class="ma-0 pa-0  pt-3"
								>
									<p class="ma-0 pa-0 subtitle-2 text-start">
										<v-icon>mdi-home</v-icon>
										Deep Housing
									</p>
									<p class="subtitle-2 ma-0 pa-0">
										<v-icon>mdi-google-maps</v-icon>
										Lamachaur-16, Pokhara
									</p>
								</v-col>
								<v-col
									v-if="$vuetify.breakpoint.smAndUp"
									xl="12"
									lg="12"
									md="12"
									sm="12"
									class="ma-0 pa-0"
								>
									<p
										class="subtitle-1 ma-0 pa-0 text-start"
										:class="
											$vuetify.breakpoint.mdAndUp
												? 'mt-4'
												: ''
										"
									>
										<v-icon>mdi-card-text</v-icon>
										{{ $vuetify.breakpoint.lgAndUp
											? event.description.substring(0,200)
											: $vuetify.breakpoint.md
												? event.description.substring(0,140)
												: event.description.substring(0,50)
										}}
										<span>...</span>
										<span><v-btn
											text
											color="light-blue lighten-1"
											class="float-right mr-6"
										>
											Read More
										</v-btn></span>
									</p>
								</v-col>
							</v-row>
						</v-col>
					</v-row>
				</v-card>
			</v-carousel-item>
		</v-carousel>
	</v-card>
</template>
<script>
export default {
	name: "EventHighlightsSwiperComponent",
	data: () => ({
		colors: [
			"grey darken-3",
			"#1F7087",
			"#385F73",
		],
		events: []
	}),
	computed: {

	},
	created() {
		this.initialize();
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
						day: 1,
						month: "March"
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
						day: 30,
						month: "June"
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
#date-column
	padding-top: 10px !important
.month-column
	background: #5b5555
	border-color: #5b5555
.small-title
	font-size: 24px
	margin-top: 7px !important
	@media only screen and (max-width: 600px)
		text-align: center
.big-title
	padding-top: 15px !important
	font-size: 26px

#divider
	background-color: aliceblue
	height: 130px
	width: 2px
</style>
