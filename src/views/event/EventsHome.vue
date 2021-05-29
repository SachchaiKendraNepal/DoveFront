<template>
	<v-card :loading="loading"
		flat class="rounded-0 mx-auto"
		color="transparent"
		max-width="1000"
	>
		<add-event-card />
		<v-toolbar
			color="transparent"
			height="60"
			class="mx-3 event-toolbar"
		>
			<v-app-bar-nav-icon>
				<v-icon>mdi-calendar-clock</v-icon>
			</v-app-bar-nav-icon>
			<v-spacer />
			<v-card class="ma-0 pa-0 mx-4"
				width="500"
			>
				<v-text-field
					v-model="searchEvents"
					color="red"
					background-color="lightblue lighten-3"
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
		<v-col v-for="(item, index) in events"
			:key="index"
			cols="12"
		>
			<event-home-card :event="item"
				:card-bg="colors[index % 10]"
			/>
		</v-col>
	</v-card>
</template>
<script>
import {mapGetters} from "vuex";

export default {
	name: "EventsHomeComponent",
	components: {
		EventHomeCard: () => import("@/views/event/EventHomeCard"),
		AddEventCard: () => import("@/views/event/AddEventCard"),
	},
	data: () => ({
		loading: false,
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
		async initEvents() {
			this.loading = true
			await this.$store.dispatch("event/fetchAll")
			await this.$store.dispatch("branch/fetchAll")
			await this.$store.dispatch("location/getAllCountries")
			await this.$store.dispatch("location/getAllProvinces")
			await this.$store.dispatch("location/getAllDistricts")
			await this.$store.dispatch("location/getAllMunicipalities")
			await this.$store.dispatch("location/getAllMunicipalityWards")
			await this.$store.dispatch("location/getAllVdcs")
			await this.$store.dispatch("location/getAllVdcWards")
			await this.$store.dispatch("event/fetchAllApproved")
			this.loading = false
		}
	}
}
</script>
<style lang="sass" scoped>
.event-toolbar
	border-radius: 6px
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
