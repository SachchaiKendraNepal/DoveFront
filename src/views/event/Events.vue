<template>
	<v-data-table
		id="event-d-table"
		v-model="selected"
		:loading="isLoading"
		loading-text="Events Loading ..."
		calculate-widths
		:headers="headers"
		:items="events"
		:search="search"
		multi-sort
		show-select
		:single-select="false"
		:items-per-page="12"
		class="elevation-3 mx-2 mx-sm-6 mx-md-6 mx-lg-6 mx-xl-12 my-6"
	>
		<template #top>
			<v-toolbar
				flat
				color="grey lighten-2"
			>
				<v-avatar
					class="elevation-2 mr-2"
					size="40"
					color="grey darken-3"
				>
					<v-icon size="25"
						color="white"
					>
						mdi-calendar-text
					</v-icon>
				</v-avatar>
				<v-toolbar-title v-show="$vuetify.breakpoint.smAndUp"
					class="d-table-title"
				>
					Sachchai Events
				</v-toolbar-title>
				<v-divider
					class="mx-4 search-event"
					inset
					vertical
				/>
				<v-text-field
					id="events-table-search"
					v-model="search"
					class="search-event"
					solo
					dense
					hide-details
					label=""
					name="search"
					prepend-inner-icon="mdi-magnify"
					clearable
					placeholder="Search"
				/>
				<v-spacer />
				<v-divider
					class="mx-4 search-event"
					inset
					vertical
				/>
				<v-btn
					dark
					color="primary"
					@click.stop="openAddEventFormDialog"
				>
					<v-icon
						dark
						:class="$vuetify.breakpoint.smAndUp ? 'mr-2' : ''"
					>
						mdi-plus-circle
					</v-icon>
					<span v-if="$vuetify.breakpoint.smAndUp">New Event</span>
				</v-btn>
				<event-form-dialog />
			</v-toolbar>
		</template>
		<!-- eslint-disable-next-line vue/valid-v-slot-->
		<template #item.title="{ item }">
			<p
				class="event-name cursor"
				@click="routeToEventDetailPage(item.id)"
			>
				{{ item.title }}
			</p>
		</template>
		<!-- eslint-disable-next-line vue/valid-v-slot-->
		<template #item.duration="{ item }">
			<v-chip :color="getDurationChipColor(item.duration)">
				{{ item.duration }}
			</v-chip>
		</template>
		<!-- eslint-disable-next-line vue/valid-v-slot-->
		<template #item.is_main="{ item }">
			<v-simple-checkbox
				v-model="item.is_main"
				color="primary"
				disabled
			/>
		</template>
		<!--		 eslint-disable-next-line vue/valid-v-slot-->
		<template #item.location="{ item }">
			<p
				class="mb-0 location"
			>
				<span>
					{{ (item.vdc_ward !== null) ? item.vdc_ward.name : item.municipality_ward.name }},&nbsp;
					{{ (item.vdc !== null) ? item.vdc.name : item.municipality.name }},&nbsp;
				</span>
				<i>{{ item.district.name }},&nbsp;
					{{ item.province.name }},&nbsp;</i>
				<b>{{ item.country.name }}</b>
			</p>
		</template>
		<!--		 eslint-disable-next-line vue/valid-v-slot-->
		<template #item.organizer="{ item }">
			{{ item.organizer.name }}
		</template>
		<!-- eslint-disable-next-line vue/valid-v-slot-->
		<template #item.start_date="{ item }">
			{{ $moment(item.start_date).fromNow() }}
		</template>
		<!-- eslint-disable-next-line vue/valid-v-slot-->
		<template #item.actions="{ item }">
			<v-icon
				v-ripple
				class="mr-2"
				color="primary"
				size="20"
				@click="openEditEventFormDialog(item)"
			>
				mdi-pencil
			</v-icon>
			<v-icon
				v-ripple
				color="red"
				size="20"
				@click="deleteItem(item)"
			>
				mdi-delete
			</v-icon>
		</template>
		<template #no-data>
			<v-btn
				color="primary"
				@click="initialize"
			>
				Reset
			</v-btn>
		</template>
	</v-data-table>
</template>

<script>
import router from "@/router";
import {mapGetters} from "vuex";

export default {
	name: "EventsTableView",
	components: {
		EventFormDialog: () => import("@/views/event/EventFormDialog")
	},
	data: () => ({
		search: "",
		selected: [],
		isLoading: false,
		dialog: false,
		headers: [
			{ text: "ACTIONS", value: "actions", sortable: false },
			{ text: "TITLE", value: "title" },
			{ text: "Organizer", value: "organizer" },
			{ text: "IS MAIN EVENT", value: "is_main" },
			{ text: "LOCATION", value: "location" },
			{ text: "VENUE", value: "venue" },
			{ text: "START DATE", value: "start_date" },
			{ text: "DURATION (days)", value: "duration" },
		],
	}),
	computed: {
		...mapGetters({
			events: "event/list",
		})
	},
	async created() {
		this.$bus.on("reload-events", this.initialize)
		await this.initialize()
	},
	beforeUnmount() {
		this.$bus.off("reload-events")
	},
	methods: {
		getDurationChipColor(value) {
			if (value === 1) {
				return "red lighten-2"
			} else if (value === 2 || value === 3) {
				return "orange"
			} else if (value === 4 || value === 5) {
				return "primary"
			} else return ""
		},
		initialize() {
			this.isLoading = true
			this.$store.dispatch("event/getAll")
			this.isLoading = false
		},

		openAddEventFormDialog() {
			this.$bus.emit("open-event-form-dialog-add-item")
		},

		openEditEventFormDialog(item) {
			this.$bus.emit("open-event-form-dialog-edit-item", {
				editedIndex: this.events.indexOf(item),
				editedItem: Object.assign({}, item),
			})
		},

		async deleteItem(item) {
			const index = this.events.indexOf(item)
			const reaction = confirm(`Are you sure you want to delete event "${item.title}"?`);
			if (reaction === true) {
				await this.$store.dispatch(
					"event/delete",
					{
						id: item.id,
					})
				this.events.splice(index, 1)
			}
		},

		routeToEventDetailPage(itemId) {
			router.push({name: "EVENT ADMINISTRATION", params: { id: itemId }})
		}
	},
}
</script>

<style lang="sass" scoped>
.event-name
	margin: 0
	padding: 0
	font-size: 16px
	font-weight: 300

.cursor
	cursor: pointer

.search-event
	display: block
	@media only screen and (max-width: 315px)
		display: none
.d-table-title
	font-size: 16px
.location
	font-size: 14px
	span
		color: #353535
</style>
