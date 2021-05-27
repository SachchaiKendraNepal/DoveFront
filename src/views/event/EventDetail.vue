<template>
	<div v-if="event"
		id="event-detail-container"
	>
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
							{{ $moment(event.start_date).format("MMM") }}
						</v-card-text>
					</v-card>
					<v-card-text class="text-center display-3 pa-0 pt-1 text--darken-3 blue--text">
						<b>{{ $moment(event.start_date).format("DD") }}</b>
					</v-card-text>
				</v-card>
			</v-col>
			<v-col cols="12"
				class="pa-0"
			>
				<v-card
					:loading="loading"
					class="mx-auto"
					max-width="1000"
					flat
					color="transparent"
				>
					<v-card-title class="event-title">
						{{ event.title }}
						<span>
							<v-card-actions>
								<v-chip
									v-if="event.is_main"
									label
									dark
									color="blue"
									class="mr-2 mb-1"
								>
									<v-icon left>
										mdi-map-marker-star
									</v-icon>
									<b v-show="$vuetify.breakpoint.smAndUp">Main Event</b>
									<v-icon right>
										mdi-church
									</v-icon>
								</v-chip>
								<v-chip
									v-if="event.type === 'General Meeting'"
									label
									dark
									class="mb-1"
									color="green lighten-1"
								>
									<v-icon
										left
										color="white"
									>
										mdi-clipboard-account
									</v-icon>
									<b v-show="$vuetify.breakpoint.smAndUp">General Meeting</b>
									<v-icon right>
										mdi-city
									</v-icon>
								</v-chip>
								<v-chip
									v-if="event.type === 'Board Meeting'"
									label
									dark
									class="mb-1"
									color="indigo lighten-1"
								>
									<v-icon
										left
										color="white"
									>
										mdi-clock-time-eleven
									</v-icon>
									<b v-show="$vuetify.breakpoint.smAndUp">Board Meeting</b>
									<v-icon right>
										mdi-city
									</v-icon>
								</v-chip>
								<v-chip
									v-if="event.type === 'Satsang'"
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
									<b v-show="$vuetify.breakpoint.smAndUp">Satsang</b>
									<v-icon right>
										mdi-city
									</v-icon>
								</v-chip>
							</v-card-actions>
						</span>
					</v-card-title>
					<v-card-subtitle v-if="event.description"
						class="event-description"
					>
						{{ event.description.substr(0, 150) }} <span>...</span> <span><i>See more in <code>about</code> section.</i></span>
					</v-card-subtitle>
					<v-card-subtitle class="event-subtitle">
						{{ $moment(event.start_date).format('MMMM Do YYYY') }} ●
						{{ event.timeOfDay }} ●
						{{ event.duration }} days ●
						{{ event.venue }}
					</v-card-subtitle>
					<v-row class="ma-0 pa-0"
						justify="center"
						align="center"
					>
						<v-card-actions>
							<v-btn rounded small
								color="blue-grey lighten-3"
								@click="toggleInterestedStatus"
							>
								<v-icon color="blue-grey"
									small
								>
									mdi-star-circle
								</v-icon>
								<span class="event-action-btn-text">Interested</span>
								<span>({{ statistics['interested_count'] }})</span>
							</v-btn>
						</v-card-actions>
						<v-card-actions>
							<v-btn rounded small
								:color="(event.is_approved) ? 'red lighten-3' : 'green lighten-3'"
								@click="toggleApproval"
							>
								<v-icon
									:color="(event.is_approved) ? 'red' : 'green'"
									small
								>
									mdi-check-circle
								</v-icon>
								<span v-if="event.is_approved"
									class="event-action-btn-text"
								>Dis-approve</span>
								<span v-else>Approve</span>
							</v-btn>
						</v-card-actions>
						<v-card-actions>
							<v-btn rounded small
								color="indigo lighten-3"
								@click="toggleGoingStatus"
							>
								<v-icon color="indigo"
									small
								>
									mdi-walk
								</v-icon>
								<span class="event-action-btn-text">Going</span>
								<span>({{ statistics['going_count'] }})</span>
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
import {mapGetters} from "vuex";

export default {
	name: "EventDetailView",
	components: {
		EventAboutTabContent: () => import("@/views/event/detail_tab/About"),
		EventDiscussionsTabContent: () => import("@/views/event/detail_tab/Discussion"),
		EventPhotosTabContent: () => import("@/views/event/detail_tab/Photos"),
		EventMultimediaTabContent: () => import("@/views/event/detail_tab/Multimedia")
	},
	data: () => ({
		loading: true,
		tab: null,
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
		...mapGetters({
			event: "event/detail",
			statistics: "event/statisticsDetail",
			comments: "event/commentsList"
		}),
	},
	async created() {
		await this.init()
	},
	methods: {
		async init() {
			this.loading=true
			await this.$store.dispatch("event/fetchSingle", { id: this.$route.params.id})
			await this.$store.dispatch("event/fetchStatistics", { id: this.$route.params.id})
			await this.$store.dispatch("event/fetchCommentsFor", { id: this.$route.params.id})
			this.loading=false
		},
		async openSnack(text, color="error") {
			await this.$store.dispatch("snack/setSnackState", true)
			await this.$store.dispatch("snack/setSnackColor", color)
			await this.$store.dispatch("snack/setSnackText", text)
		},
		async toggleInterestedStatus() {
			const toggled = await this.$store.dispatch("event/toggleInterestedStatus", {id: this.event.id})
			if (toggled) await this.$store.dispatch("event/fetchStatistics", { id: this.$route.params.id})
			else await this.openSnack("Added interest to event failed.")
		},
		async toggleGoingStatus() {
			const toggled = await this.$store.dispatch("event/toggleGoingStatus", {id: this.event.id})
			if (toggled) await this.$store.dispatch("event/fetchStatistics", { id: this.$route.params.id})
			else await this.openSnack("Added interest to event failed.")
		},
		async toggleApproval() {
			const toggled = await this.$store.dispatch("event/toggleApproval", {id: this.event.id})
			if (toggled) await this.$store.dispatch("event/fetchSingle", { id: this.$route.params.id})
			else await this.openSnack("Added interest to event failed.")
		},
	}
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
	display: flex
	flex-wrap: wrap
	align-content: center
	justify-content: center
	text-align: center
	font-size: 38px
	line-height: 38px
	color: black
.event-subtitle
	text-align: center
	padding-bottom: 5px
	font-size: 16px
	color: #1566a6 !important
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
	font-size: .7rem !important
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
.event-description
	max-width: 770px
	margin: auto auto
	text-align: center
</style>
