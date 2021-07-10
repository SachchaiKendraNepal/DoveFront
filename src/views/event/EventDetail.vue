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
				<v-toolbar
					max-width="1000"
					color="transparent"
					class="mx-auto"
					rounded
				>
					<v-avatar
						v-if="$vuetify.breakpoint.smAndUp"
						class="detail-toolbar-avatar"
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
						show-arrows
					>
						<v-tab
							v-for="(item, index) in eventTabItems"
							:key="index"
							:to="item.to"
						>
							<span>{{ item.title }}</span>
							<v-icon v-if="$vuetify.breakpoint.smAndUp">
								{{ item.icon }}
							</v-icon>
						</v-tab>
					</v-tabs>
					<v-spacer />
				</v-toolbar>
			</v-col>
			<v-col cols="12">
				<v-card max-width="1000"
					class="mx-auto"
					color="transparent"
				>
					<v-tabs-items v-model="tab">
						<router-view />
					</v-tabs-items>
				</v-card>
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

export default {
	name: "EventDetailView",
	components: {
		Actions,
		TopInfoColumn,
		DateColumn,
		BannerColumn
	},
	data: () => ({
		loading: true,
		tab: null,
	}),
	computed: {
		...mapGetters({
			event: "event/detail",
			comments: "event/commentsList"
		}),
		eventTabItems() {
			if (!this.$route) return  []
			if (!this.$route.params) return  []
			if (!this.$route.params.id) return  []
			return [
				{title: "about", icon: "mdi-information-variant", to: `/home/event/${this.$route.params.id}/about`},
				{title: "discussion", icon: "mdi-account-multiple", to: `/home/event/${this.$route.params.id}/discussion`},
				{title: "photos", icon: "mdi-image", to: `/home/event/${this.$route.params.id}/images`},
				{title: "multimedia", icon: "mdi-video-vintage", to: `/home/event/${this.$route.params.id}/multimedias`},
			]
		},
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
