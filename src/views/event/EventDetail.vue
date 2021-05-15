<template>
	<div id="event-detail-container">
		<v-row id="event-top-row"
			class="ma-0 pa-0"
		>
			<v-col
				id="cover-column"
				cols="12"
				class="pa-0"
			>
				<v-img
					id="event-banner"
					src="https://cdn.vuetifyjs.com/images/parallax/material.jpg"
					height="300"
					max-width="1000"
					class="mx-auto"
				/>
			</v-col>
			<v-col
				id="date-row"
				cols="12"
				class="pa-0"
			>
				<v-card
					id="date-peek-box"
					width="100"
					height="100"
					class="mx-auto"
				>
					<v-card color="red"
						height="25"
					>
						<v-card-text class="date-month">
							Nov
						</v-card-text>
					</v-card>
					<v-card-text class="text-center display-3 pa-0 pt-1 text--darken-3 blue--text">
						<b>15</b>
					</v-card-text>
				</v-card>
			</v-col>
			<v-col cols="12"
				class="pa-0"
			>
				<v-card
					class="mx-auto"
					max-width="1000"
					flat
					color="transparent"
				>
					<v-card-title class="event-title">
						{{ event.title }}
					</v-card-title>
					<v-card-subtitle>
						{{ event.description.substr(0, 150) }} <span>...</span> <span><i>See more in <code>about</code> section.</i></span>
					</v-card-subtitle>
					<v-card-subtitle class="event-subtitle">
						{{ event.start_date }} ●
						{{ event.timeOfDay }} ●
						{{ event.duration }} days ●
						{{ event.venue }}
					</v-card-subtitle>
					<v-row class="ma-0 pa-0"
						justify="center"
						align="center"
					>
						<v-card-actions>
							<v-btn rounded
								color="pink lighten-4"
							>
								<v-icon color="pink">
									mdi-hand-heart
								</v-icon>
								<span class="event-action-btn-text">Satsang</span>
							</v-btn>
						</v-card-actions>
						<v-card-actions>
							<v-btn rounded
								color="blue-grey lighten-3"
							>
								<v-icon color="blue-grey">
									mdi-star-circle
								</v-icon>
								<span class="event-action-btn-text">Interested</span>
							</v-btn>
						</v-card-actions>
						<v-card-actions>
							<v-btn rounded
								color="green lighten-3"
							>
								<v-icon color="green">
									mdi-check-circle
								</v-icon>
								<span class="event-action-btn-text">Approve</span>
							</v-btn>
						</v-card-actions>
						<v-card-actions>
							<v-btn rounded
								color="indigo lighten-3"
							>
								<v-icon color="indigo">
									mdi-walk
								</v-icon>
								<span class="event-action-btn-text">Going</span>
							</v-btn>
						</v-card-actions>
						<v-spacer />
						<v-card-actions>
							<v-tooltip bottom>
								<template #activator="{ on, attrs }">
									<v-btn icon v-bind="attrs"
										v-on="on"
									>
										<v-icon color="red darken-2">
											mdi-delete
										</v-icon>
									</v-btn>
								</template>
								<span>Delete Event</span>
							</v-tooltip>
						</v-card-actions>
					</v-row>
				</v-card>
				<v-col cols="12"
					class="pa-0"
				>
					<v-divider class="mx-auto" />
				</v-col>
				<v-col cols="12"
					class="pa-0"
				>
					<v-card
						max-width="1000"
						class="mx-auto"
						flat
						color="transparent"
					>
						<v-toolbar
							max-width="1000"
							color="transparent"
							class="mx-auto elevation-0"
						>
							<v-avatar class="detail-toolbar-avatar"
								color="primary"
								size="42"
							>
								<v-icon color="white"
									size="24"
								>
									mdi-calendar-clock
								</v-icon>
							</v-avatar>
							<v-spacer />
							<v-tabs
								v-show="$vuetify.breakpoint.mdAndUp"
								v-model="tab"
								background-color="transparent"
								centered
								icons-and-text
								slider-size="3"
								slider-color="red"
								active-class="event-detail-active-tab"
							>
								<v-tab
									v-for="(item, index) in eventTabItems"
									:key="index"
									:href="'#tab-' + item.title"
								>
									{{ item.title }}
									<v-icon>{{ item.icon }}</v-icon>
								</v-tab>
							</v-tabs>
							<v-spacer />
							<v-menu offset-y
								nudge-left="30"
								transition="slide-y-transition"
							>
								<template #activator="{ on, attrs }">
									<v-btn
										color="primary"
										dark
										v-bind="attrs"
										icon
										v-on="on"
									>
										<v-icon>mdi-dots-vertical</v-icon>
									</v-btn>
								</template>
								<v-list>
									<v-list-item
										v-for="(item, index) in eventActions"
										:key="index"
									>
										<v-list-item-title>{{ item.title }}</v-list-item-title>
									</v-list-item>
								</v-list>
							</v-menu>
						</v-toolbar>
						<v-tabs
							v-show="$vuetify.breakpoint.smAndDown"
							v-model="tab"
							background-color="transparent"
							centered
							show-arrows
							icons-and-text
							slider-size="3"
							slider-color="red"
							active-class="event-detail-active-tab"
						>
							<v-tab
								v-for="(item, index) in eventTabItems"
								:key="index"
								:href="'#tab-' + item.title"
							>
								{{ item.title }}
								<v-icon>{{ item.icon }}</v-icon>
							</v-tab>
						</v-tabs>
					</v-card>
				</v-col>
			</v-col>
		</v-row>
		<v-row class="ma-0 pa-0">
			<v-card
				flat
				max-width="1000"
				class="mx-auto ma-2 elevation-24"
			>
				<v-tabs-items v-model="tab">
					<event-about-tab-content :event="event" />
					<event-discussions-tab-content :event="event" />
					<event-photos-tab-content :event="event" />
					<event-multimedia-tab-content :event="event" />
				</v-tabs-items>
			</v-card>
		</v-row>
	</div>
</template>
<script>
export default {
	name: "EventDetailView",
	components: {
		EventAboutTabContent: () => import("@/views/event/detail_tab/About"),
		EventDiscussionsTabContent: () => import("@/views/event/detail_tab/Discussion"),
		EventPhotosTabContent: () => import("@/views/event/detail_tab/Photos"),
		EventMultimediaTabContent: () => import("@/views/event/detail_tab/Multimedia")
	},
	data: () => ({
		tab: null,
		event: {
			id: 16,
			title: "Dashain - Tihar Event",
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
			type: "SATSANG",
			created_by: "bot25",
			created_at: "Nov 2, 2020",
			updated_by: "bot25",
			updated_at: "Nov 2, 2020",
			venue: "Deep Housing Auditorium",
			organizer: "Hero Branch",
			contacts: [9845689652, 6158965],
			start_date: "Nov 5, 2020",
			duration: 2,
			timeOfDay: "10AM - 5PM",
			banner:
				"https://prod-ripcut-delivery.disney-plus.net/v1/variant/disney/ED4B1180197DC35F40612607655B3DC0B5CFD688690B99B39B758927373D4C50",
			no_of_responses: 5
		},
		eventTabItems: [
			{ title: "about", icon: "mdi-information-variant" },
			{ title: "discussion", icon: "mdi-account-multiple" },
			{ title: "photos", icon: "mdi-image" },
			{ title: "multimedia", icon: "mdi-video-vintage" },
		],
		eventActions: [
			{ title: "Click Me" },
			{ title: "Click Me" },
			{ title: "Click Me" },
			{ title: "Click Me 2" }
		]
	}),
	computed: {
		aboutEventInfo() {
			return [
				{index: 0, icon: "mdi-account-group", field: "Audiences", value: this.event.no_of_responses + " people responded"},
				{index: 1, icon: "mdi-clock", field: "Date-Time", value: this.event.start_date + " for " + this.event.duration + " days"},
				{index: 2, icon: "mdi-home", field: "Venue", value: this.event.venue},
				{index: 3, icon: "mdi-earth", field: "Organizer", value: "Registred by " + this.event.created_by + " from " + this.event.organizer},
				{index: 4, icon: "mdi-web", field: "Event Type", value: this.event.type}
			]
		}
	},
}
</script>
<style lang="sass" scoped>
#event-top-row
	background: linear-gradient(180deg, #9575cd, #eeaaaa, #efcece, #cee7f9)
#event-banner
	border-radius: 0 0 10px 10px
#date-peek-box
	margin-top: -30px
	border: 4px solid aliceblue
	background-color: lightgrey
.event-title
	font-size: 38px
	line-height: 38px
	color: black
.event-subtitle
	padding-bottom: 5px
	font-size: 18px
	color: #f32828 !important
	font-weight: 500
.date-month
	margin: 0
	padding: 1px 0 0 0
	text-align: center
	color: white !important
	font-size: 24px
	font-family: 'Lemonada', serif
	font-weight: 600 !important
.event-detail-active-tab
	color: #fa3e3b
.event-action-btn-text
	visibility: visible
	opacity: 1
	padding-left: 6px
	transition: all .2s ease-in-out
	@media only screen and (max-width: 642px)
		visibility: hidden
		opacity: 0
		overflow: hidden
		width: 0
		padding: 0
</style>
