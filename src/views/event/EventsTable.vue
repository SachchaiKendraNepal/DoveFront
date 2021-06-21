<template>
	<v-card>
		<div class="py-6" />
		<!-- eslint-disable-next-line vue/no-deprecated-v-bind-sync -->
		<v-data-table :options.sync="options"
			:headers="headers"
			:items="items.results"
			:server-items-length="getTotalPaginationData"
			:items-per-page="getItemsPerPageCount"
			:loading="loading"
			loading-text="Loading events..."
			class="elevation-1 mx-4"
			:footer-props="{
				showFirstLastPage: true,
				disableItemsPerPage: true,
				itemsPerPageOptions: [1, 5, 10, 50],
				itemsPerPageText: 'Rows per page:',
				pageText: `${options.page}-${getTotalPaginationData} of ${getTotalPaginationData}`
			}"
		>
			<template #top>
				<v-toolbar
					flat
					color="grey lighten-2"
				>
					<v-avatar
						class="elevation-2 table-avatar"
						size="30"
					>
						<v-icon
							size="20"
							color="white"
						>
							mdi-calendar-text
						</v-icon>
					</v-avatar>
					<v-toolbar-title
						v-show="$vuetify.breakpoint.smAndUp"
						class="pl-1 table-title"
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
						<span v-if="$vuetify.breakpoint.smAndUp">Event</span>
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
				<v-checkbox
					v-model="item.is_main"
					color="primary"
					readonly
				/>
			</template>
			<!-- eslint-disable-next-line vue/valid-v-slot-->
			<template #item.is_approved="{ item }">
				<v-checkbox
					v-model="item.is_approved"
					color="success"
					readonly
				/>
			</template>
			<!--		 eslint-disable-next-line vue/valid-v-slot-->
			<template #item.location="{ item }">
				<p
					class="mb-0 location"
				>
					<span>
						{{ getWardNameOfItem(item) }},&nbsp;
						{{ getMunicipalityOrVdcName(item) }},&nbsp;
					</span>
					<i>{{ item.district.name }},&nbsp;
						{{ item.province.name }},&nbsp;</i>
					<b>{{ item.country.name }}</b>
				</p>
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
					color="success"
					size="22"
					@click="toggleApproval(item)"
				>
					mdi-check
				</v-icon>
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
					@click="openAdminDeleteItemDialog(item.id, item.title)"
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
		<admin-delete-item-dialog
			model-name="event"
			delete-action="event/delete"
		/>
		<div class="py-6" />
	</v-card>
</template>

<script>
import {mapGetters} from "vuex";
import AdminTableList from "@/mixins/AdminTableList";
import ToggleApproval from "@/mixins/ToggleApproval";
import AdminTableDeleteItemMixin from "@/mixins/AdminTableDeleteItemMixin";
const urls = require("@/urls.json");
const util = require("util");

export default {
	name: "EventsTableView",
	components: {
		EventFormDialog: () => import("@/views/event/EventFormDialog")
	},
	mixins: [
		AdminTableList,
		ToggleApproval,
		AdminTableDeleteItemMixin
	],
	data: () => ({
		headers: [
			{ text: "ACTIONS", value: "actions", sortable: false },
			{ text: "TITLE", value: "title" },
			{ text: "Organizer", value: "branch.name" },
			{ text: "MAIN", value: "is_main" },
			{ text: "APPROVED", value: "is_approved" },
			{ text: "LOCATION", value: "location" },
			{ text: "VENUE", value: "venue" },
			{ text: "START DATE", value: "start_date" },
			{ text: "DURATION (days)", value: "duration" },
		],
		mixinData: {
			modelName: "Event",
			toggleApprovalAction: "event/toggleApproval"
		}
	}),
	computed: {
		...mapGetters({
			events: "event/list",
		})
	},
	methods: {
		getDurationChipColor(value) {
			const rem = value % 5
			switch (rem) {
			case 1:
				return "red lighten-3"
			case 2:
				return "indigo lighten-3"
			case 3:
				return "purple lighten-3"
			case 4:
				return "teal lighten-3"
			case 5:
				return "orange lighten-3"
			default:
				return "blue lighten-3"
			}
		},
		getMunicipalityOrVdcName(item) {
			return (item.vdc !== null) ? item.vdc.name : item.municipality.name
		},
		getWardNameOfItem(item) {
			if (item.vdc_ward) {
				if (item.vdc_ward["name"]) return item.vdc_ward["name"]
			} else if (item.municipality_ward) {
				if (item.municipality_ward["name"]) return item.municipality_ward["name"]
			}
		},
		async initialize(val) {
			this.loading = true
			if (!val) val = 1
			await this.$store.dispatch("event/filter", {page: val})
			this.items = this.events
			this.totalItems = this.events.count
			this.loading = false
		},

		openAddEventFormDialog() {
			this.$bus.emit("open-event-form-dialog-add-item")
		},

		openEditEventFormDialog(item) {
			this.$bus.emit("open-event-form-dialog-edit-item", {
				editedIndex: this.events.results.indexOf(item),
				editedItem: Object.assign({}, item),
			})
		},

		routeToEventDetailPage(itemId) {
			this.$router.push({name: "EVENT ADMINISTRATION", params: { id: itemId }})
		}
	},
}
</script>

<style lang="sass" scoped>
.event-name
	margin: 0
	padding: 0
	font-size: .9rem
	font-weight: 500

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
