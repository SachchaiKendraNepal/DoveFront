<template>
	<div v-if="event"
		id="event-detail-container"
	>
		<v-row id="event-top-row"
			class="ma-0 pa-0"
		>
			<banner-column :event="event"
				@refresh-event="init"
			/>
			<date-column :event="event" />
			<top-info-column :event="event" />
			<actions :event="event" />
			<v-col cols="12"
				class="pa-0"
			>
				<v-divider class="mx-auto" />
			</v-col>
			<v-col cols="12"
				class="pa-0"
			>
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
								v-model="tab"
								background-color="transparent"
								centered
								icons-and-text
								slider-size="3"
								slider-color="primary"
							>
								<v-tab
									v-for="(item, index) in eventTabItems"
									:key="index"
								>
									{{ item.title }}
									<v-icon>{{ item.icon }}</v-icon>
								</v-tab>
							</v-tabs>
							<v-spacer />
						</v-toolbar>
					</v-card>
				</v-col>
				<v-col cols="12">
					<v-card max-width="1000"
						class="mx-auto"
						color="transparent"
					>
						<v-tabs-items v-model="tab">
							<v-tab-item>
								<about-event />
							</v-tab-item>
							<v-tab-item>
								<event-discussion />
							</v-tab-item>
							<v-tab-item>
								<event-photos />
							</v-tab-item>
							<v-tab-item>
								<event-multimedias />
							</v-tab-item>
						</v-tabs-items>
					</v-card>
				</v-col>
			</v-col>
		</v-row>
	</div>
</template>
<script>
import {mapGetters} from "vuex";
import BannerColumn from "@/views/event/detail_views/BannerColumn.vue";
import DateColumn from "@/views/event/detail_views/DateColumn.vue";
import TopInfoColumn from "@/views/event/detail_views/TopInfoColumn.vue";
import Actions from "@/views/event/detail_views/Actions.vue";
import AboutEvent from "@/views/event/detail_tab/About.vue";
import EventDiscussion from "@/views/event/detail_tab/Discussion.vue";
import EventPhotos from "@/views/event/detail_tab/Photos.vue";
import EventMultimedias from "@/views/event/detail_tab/Multimedia.vue";

export default {
	name: "EventDetailView",
	components: {
		EventMultimedias,
		EventPhotos,
		EventDiscussion,
		AboutEvent,
		Actions,
		TopInfoColumn,
		DateColumn,
		BannerColumn
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
	}),
	computed: {
		...mapGetters({
			event: "event/detail",
			comments: "event/commentsList"
		}),
	},
	async created() {
		this.$bus.on("reload", async () => await this.init())
		await this.init()
	},
	beforeUnmount() {
		this.$bus.off("reload")
	},
	methods: {
		async init() {
			this.loading=true
			if (this.$route.params) {
				const eventId = this.$route.params.id
				await this.$store.dispatch("event/fetchSingle", {id: eventId})
				await this.$store.dispatch("event/fetchStatistics", {id: eventId})
				await this.$store.dispatch("event/fetchCommentsFor", {id: eventId})
				this.loading = false
			}
		},
	}
}
</script>
<style lang="sass">
#event-top-row
	background: linear-gradient(180deg, #9575cd, #eeaaaa, #efcece, #cee7f9)

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
.event-action-btn-text
	font-size: .79rem !important
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
.event-tab
	background: #fff9fe !important

</style>
<style lang="scss">
.why-idk {
	opacity: 0;
	height: 0;
	padding: 0;
}
</style>
