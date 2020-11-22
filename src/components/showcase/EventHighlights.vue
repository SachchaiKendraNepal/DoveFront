<template>
	<div class="events-highlights-wrapper">
		<v-carousel
			cycle
			height="180"
			:show-arrows="false"
			hide-delimiters
		>
			<v-carousel-item
				v-for="(event, index) in events"
				:key="index"
			>
				<v-card
					class="mx-auto py-sm-6 py-md-6 py-lg-6 py-xl-6"
					max-width="1000"
					:color="colors[index]"
				>
					<v-row
						class="ma-0 pa-0"
						align="center"
						justify="center"
					>
						<v-col
							id="avatar-column"
							cols="12"
							xl="3"
							lg="3"
							md="3"
							sm="4"
							class="ma-0 pa-0 d-flex justify-center align-center"
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
										class="ma-0 pa-0"
									>
										<h1>
											{{ event.start_date.day }}<sup>{{
												getSuperScript(event.start_date.day)
											}}</sup>
										</h1>
									</v-col>
									<v-col cols="12"
										class="ma-0 pa-0 month-column"
									>
										<h2>
											{{ event.start_date.month }}
										</h2>
									</v-col>
								</v-row>
							</v-avatar>
						</v-col>
						<v-col
							id="event-column"
							cols="12"
							xl="9"
							lg="9"
							md="9"
							sm="8"
							class="ma-0 pa-0"
						>
							<v-row
								justify="center"
								align="center"
								class="ma-0 pa-0"
							>
								<v-col cols="12">
									<p class="ma-0 pa-0"
										:class="
											$vuetify.breakpoint.smAndDown
												? 'small-title'
												: 'big-title'
										"
									>
										<v-icon>mdi-calendar-star</v-icon>
										<u>{{ event.title }}</u>
									</p>
								</v-col>
								<v-col
									v-show="$vuetify.breakpoint.smAndUp"
									cols="12"
									xl="6"
									lg="6"
									md="6"
									sm="6"
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
									v-show="$vuetify.breakpoint.smAndUp"
									cols="12"
									xl="6"
									lg="6"
									md="6"
									sm="6"
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
							</v-row>
						</v-col>
					</v-row>
				</v-card>
			</v-carousel-item>
		</v-carousel>
	</div>
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
		// eslint-disable-next-line vue/return-in-computed-property
	},
	created() {
		this.initialize();
	},
	methods: {
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
						month: "Mar"
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
						month: "Jun"
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
.events-highlights-wrapper
	margin: -90px 20px 10px 20px
	@media only screen and (max-width: 600px)
		margin: -70px 10px 10px 10px
#avatar-column
	transition: all .2s
	border-right: 3px solid white
	@media only screen and (max-width: 600px)
		padding-top: 5px !important
		border-right: none
	#date-avatar
		transition: all .2s
		@media only screen and (max-width: 375px)
			height: 80px !important
			min-width: 80px !important
			width: 80px !important
		#date-column
			h1
				padding-left: 15px
			@media only screen and (max-width: 375px)
				padding-top: 17px !important
				h1
					font-size: 20px !important
		.month-column
			background: #228396
			border-color: #228396
			@media only screen and (max-width: 375px)
				padding: 6px 0 !important
.small-title
	font-size: 22px
	line-height: 20px
	margin-bottom: 15px
	@media only screen and (max-width: 600px)
		text-align: center
.big-title
	font-size: 26px
	line-height: 26px

#divider
	background-color: aliceblue
	height: 130px
	width: 2px
</style>
