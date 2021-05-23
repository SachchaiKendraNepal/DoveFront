<template>
	<v-row class="ma-0 pa-0">
		<v-col cols="12"
			class="ma-0 pa-0"
		>
			<v-toolbar color="transparent"
				height="60"
			>
				<v-app-bar-nav-icon><v-icon>mdi-calendar-clock</v-icon></v-app-bar-nav-icon>
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
						label="Search events"
						prepend-inner-icon="mdi-calendar-search"
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
							</v-icon>
							{{ getEventCreatorFullName(item.created_by) }}
							<v-icon size="16">
								mdi-city
							</v-icon> Pokhara Kendra Branch
							<v-icon size="16">
								mdi-clock
							</v-icon> {{ item.created_at }}
						</v-card-subtitle>
						<v-card-text class="py-0 pb-2">
							{{ item.description.substring(0,140) }}
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
											<v-list-item-title>Starts from</v-list-item-title>
											<v-list-item-subtitle>
												{{ item.start_date }}
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
												<span v-if="item.municipality">{{ item.municipality_ward.name }} - {{ item.municipality.name }}</span>
												<span v-else>{{ item.vdc_ward.name }} - {{ item.vdc.name }}</span>
												{{ item.district.name }}, {{ item.province.name }}, {{ item.country.name }}
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
							max-height="400"
						/>
					</v-col>
				</v-row>
			</v-card>
		</v-col>
	</v-row>
</template>
<script>
import {mapGetters} from "vuex";

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
	}),
	computed: {
		...mapGetters({
			events: "event/list"
		})
	},
	created() {
		this.initEvents()
	},
	methods: {
		getEventCreatorFullName(creator) {
			if (creator!==null) {
				return creator.first_name + creator.last_name
			} else return "Kiran Parajuli"
		},
		routeToEventDetail(eventId) {
			this.$router.push({name: "EVENT DETAIL HOME", params: { id: eventId}})
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
			this.$store.dispatch("event/fetchAll")
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
