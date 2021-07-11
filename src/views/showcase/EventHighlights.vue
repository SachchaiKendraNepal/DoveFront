<template>
	<div class="events-highlights-wrapper">
		<v-carousel
			cycle
			:show-arrows="false"
			hide-delimiters
			reverse-transition="fade-transition"
			transition="fade-transition"
			style="max-height: 280px;"
		>
			<v-carousel-item
				v-for="(event, index) in events"
				:key="index"
			>
				<v-card
					flat
					class="mx-auto overflow-hidden"
					max-width="1000"
					height="100%"
					color="transparent"
				>
					<v-list max-width="800"
						class="mx-auto"
						height="100%"
						style="position: relative;"
						color="transparent"
					>
						<v-list-item-avatar
							id="date-avatar"
							color="#e88c04"
							class="elevation-12"
							:class="($vuetify.breakpoint.width < 400) ? 'mx-auto': ''"
							size="120"
							style="border: 2px solid white; position: absolute; top: 0; left: 5%; z-index: 2"
						>
							<v-row no-gutters
								justify="center" align="center"
							>
								<v-col cols="12">
									<h1 class="text-center">
										{{ event.start_date.day }}<sup>{{
											getSuperScript(event.start_date.day)
										}}</sup>
									</h1>
								</v-col>
								<v-col cols="12"
									class="month-column elevation-4 py-2"
								>
									<h2 class="text-center">
										{{ event.start_date.month }}
									</h2>
								</v-col>
							</v-row>
						</v-list-item-avatar>
						<v-fade-transition>
							<v-list-item-content
								style="position: absolute; top: 70px; padding: 70px 20px 20px 20px; background: darkslategrey; border-radius: 4px;"
							>
								<v-list-item-title
									class="py-2"
									:class="
										$vuetify.breakpoint.smAndDown
											? 'small-title'
											: 'big-title'
									"
								>
									<v-icon class="pr-2">
										mdi-calendar-star
									</v-icon>
									<u>{{ event.title }}</u>
								</v-list-item-title>
								<v-list-item-subtitle v-show="$vuetify.breakpoint.smAndUp"
									class="d-flex justify-space-between align-center"
								>
									<p class="subtitle-2 ma-0 pa-0 text-start">
										<span><v-icon>mdi-sort-clock-descending</v-icon></span>
										Friday 5:00 AM
									</p>
									<p class="subtitle-2 ma-0 pa-0">
										<v-icon>mdi-sort-clock-ascending</v-icon>
										Friday 8:00 PM
									</p>
								</v-list-item-subtitle>
								<v-list-item-subtitle
									v-show="$vuetify.breakpoint.smAndUp"
									class="d-flex justify-space-between align-center"
								>
									<p class="ma-0 pa-0 subtitle-2 text-start">
										<v-icon>mdi-home</v-icon>
										Deep Housing
									</p>
									<p class="subtitle-2 ma-0 pa-0">
										<v-icon>mdi-google-maps</v-icon>
										Lamachaur-16, Pokhara
									</p>
								</v-list-item-subtitle>
							</v-list-item-content>
						</v-fade-transition>
						<v-list-item />
					</v-list>
					<v-fade-transition>
						<v-card-title v-if="$vuetify.breakpoint.width < 400"
							class="text-center d-flex justify-center pt-0"
						>
							{{ event.title }}
						</v-card-title>
					</v-fade-transition>
				</v-card>
			</v-carousel-item>
		</v-carousel>
	</div>
</template>
<script>
export default {
	name: "EventHighlights",
	data: () => ({
		events: [],
		colors: [
			"grey darken-3",
			"#1F7087",
			"#385F73",
		],
	}),
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
	margin-top: -170px
	padding: 10px
.month-column
	background: rgba(0,0,0,.15)
.small-title
	font-size: 22px
	line-height: 22px
.big-title
	font-size: 26px
	line-height: 26px
</style>
