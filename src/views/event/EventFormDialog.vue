<template>
	<v-dialog
		v-model="dialog"
		:fullscreen="fullscreen"
		max-width="500"
		transition="dialog-bottom-transition"
	>
		<v-card
			class="rounded-0"
			color="rgb(251 250 241)"
		>
			<v-card-title class="grey darken-3">
				<v-avatar
					color="grey darken-2"
					size="40"
					class="mr-4 elevation-1"
				>
					<v-icon dark
						size="22"
					>
						{{ formIcon() }}
					</v-icon>
				</v-avatar>
				<span class="form-title">{{ formTitle('Event') }}</span>
				<v-spacer />
				<v-btn
					color="grey darken-2"
					fab
					dark
					x-small
					@click="closeCreateEditDialog"
				>
					<v-icon>mdi-close</v-icon>
				</v-btn>
			</v-card-title>
			<v-card flat
				max-width="800"
				class="mx-auto px-2"
				color="transparent"
			>
				<v-img
					v-if="editedIndex !== -1"
					:src="getBannerImage"
					height="300"
					style="border-radius: 0 0 10px 10px"
				/>
				<v-list
					v-show="editedIndex !== -1"
					class="pa-0 mt-3"
				>
					<v-list-item>
						<v-list-item-content>
							<p
								class="headline cursor"
								@click="routeToEventDetailPage(editedItem.id)"
							>
								{{ editedItem.title }}
								<v-tooltip bottom>
									<template #activator="{ on, attrs }">
										<v-icon
											v-if="editedItem.is_approved"
											v-ripple
											v-bind="attrs"
											color="green darken-1"
											v-on="on"
										>
											mdi-check-decagram
										</v-icon>
									</template>
									<span>Sacchai Event</span>
								</v-tooltip>
								<v-tooltip bottom>
									<template #activator="{ on, attrs }">
										<v-icon
											v-ripple
											v-bind="attrs"
											color="red darken-3"
											v-on="on"
										>
											mdi-map-marker-star
										</v-icon>
									</template>
									<span>Main Event</span>
								</v-tooltip>
							</p>
							<v-divider class="mb-4" />
							<div class="mb-4">
								<v-chip
									v-if="editedItem.is_main"
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
									v-if="editedItem.type === 'General Meeting'"
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
									v-if="editedItem.type === 'Board Meeting'"
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
									v-if="editedItem.type === 'Satsang'"
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
							</div>
							<p class="mb-0 mb-4">
								<v-icon class="small-detail-icon">
									mdi-shape-plus
								</v-icon>
								<b>Date created:</b>
								<span class="px-1">{{ $moment(editedItem.created_at).fromNow() }}</span>
							</p>
							<p class="mb-0 mb-4">
								<v-icon class="small-detail-icon">
									mdi-plus
								</v-icon>
								<b>Created by:</b>
								<span class="px-1"> Kiran Parajuli </span>
							</p>
							<p class="mb-0 mb-4">
								<v-icon class="small-detail-icon">
									mdi-account-network
								</v-icon>
								<b>Total Members:</b>
								<span class="px-1">Not tracked</span>
							</p>
							<p class="mb-0">
								<v-icon class="small-detail-icon">
									mdi-pencil
								</v-icon>
								<b>Last Updated By:</b>
								<span class="px-1">Sam Gellaitry</span>
							</p>
						</v-list-item-content>
					</v-list-item>
				</v-list>
				<v-divider
					v-show="editedIndex !== -1"
					class="mt-3"
				/>
				<div
					v-if="editedIndex === -1"
					class="py-6"
				/>
				<v-row class="ma-0 pa-0">
					<admin-form-group-title
						icon="mdi-calendar-text-outline"
						text="Event Information"
					/>
					<text-field
						id="event-title"
						v-model="editedItem.title"
						label="title"
						name="title"
						icon="mdi-form-textbox"
						:errors="formErrors"
					/>
					<text-area
						id="event-description"
						v-model="editedItem.description"
						auto-grow
						label="description"
						name="description"
						icon="mdi-script-text"
						:errors="formErrors"
					/>
					<branch-field
						id="event-branch"
						v-model="editedItem.branch"
						label="Organizer (Branch)"
						:errors="formErrors"
					/>
					<select-field
						id="event-type"
						v-model="editedItem.type"
						label="Type of event"
						name="type"
						:select-items="eventTypeOptions"
						icon="mdi-call-merge"
						:errors="formErrors"
					/>
					<text-field
						v-model="editedItem.contact"
						label="Contact"
						type="number"
						name="contact"
						icon="mdi-phone-classic"
						:errors="formErrors"
					/>
					<admin-form-group-title
						icon="mdi-calendar-clock"
						text="Timeline Information"
					/>
					<date-picker-field
						v-model="editedItem.start_date"
						icon="mdi-calendar"
						label="Start Date"
						name="start_date"
						:errors="formErrors"
					/>
					<text-field
						v-model="editedItem.duration"
						label="Duration"
						name="duration"
						hint="This is the number of days the event will go on."
						icon="mdi-av-timer"
						:errors="formErrors"
					/>
					<select-field
						id="event-time-of-day"
						v-model="editedItem.time_of_day"
						label="Time Of Day"
						name="time_of_day"
						:select-items="timeOfDayOptions"
						icon="mdi-white-balance-sunny"
						:errors="formErrors"
					/>
					<admin-form-group-title
						icon="mdi-map-marker"
						text="Location Information"
					/>
					<text-field
						id="event-venue"
						v-model="editedItem.venue"
						label="Venue"
						name="venue"
						icon="mdi-home-roof"
						hint="Where is the event going to be organized?"
						:errors="formErrors"
					/>
					<country-field
						id="country"
						v-model="editedItem.country"
						:errors="formErrors"
					/>
					<province-field
						id="province"
						v-model="editedItem.province"
						:errors="formErrors"
					/>
					<district-field
						id="district"
						v-model="editedItem.district"
						:errors="formErrors"
					/>
					<municipality-field
						id="municipality"
						v-model="editedItem.municipality"
						:errors="formErrors"
					/>
					<municipality-ward-field
						id="municipality-ward"
						v-model="editedItem.municipality_ward"
						:errors="formErrors"
					/>
					<vdc-field
						id="vdc"
						v-model="editedItem.vdc"
						:errors="formErrors"
					/>
					<vdc-ward-field
						id="vdc-ward"
						v-model="editedItem.vdc_ward"
						:errors="formErrors"
					/>
					<v-col cols="12"
						class="pa-0 pb-16 text-center"
					>
						<v-btn
							color="red lighten-5"
							class="red--text ma-1"
							depressed
							@click="closeCreateEditDialog"
						>
							Cancel
						</v-btn>
						<v-btn
							color="blue lighten-5"
							class="blue--text ma-1"
							depressed
							@click="save"
						>
							Save
						</v-btn>
					</v-col>
				</v-row>
			</v-card>
		</v-card>
	</v-dialog>
</template>
<script>
import router from "@/router"
import {mapGetters} from "vuex";
import Snack from "@/mixins/Snack";
import {getFormData} from "@/Helper";
import AdminCreateEditFormMixin from "@/mixins/AdminCreateEditFormMixin";

export default {
	name: "EventFormDialog",
	mixins: [
		Snack,
		AdminCreateEditFormMixin,
	],
	props: {
		fullscreen: {
			type: Boolean,
			default: true
		}
	},
	data: () => ({
		timeOfDayOptions: [
			"Morning",
			"Afternoon",
			"Evening"
		],
		eventTypeOptions: [
			"Satsang",
			"Board Meeting",
			"General Meeting",
		],
		editedItem: {
			id: null,
			title: null,
			description: null,
			venue: null,
			start_date: null,
			duration: null,
			time_of_day: null,
			type: null,
			is_approved: null,
			is_main: null,
			banner: null,
			country: null,
			province: null,
			district: null,
			municipality: null,
			municipality_ward: null,
			vdc: null,
			vdc_ward: null,
			contact: null,
			branch: null,
			created_at: null,
			updated_at: null,
			approved_at: null,
			created_by: null,
			updated_by: null,
			approved_by: null,
			video_urls: null,
		},
		defaultItem: {},
		mixinData: {
			clearFormErrorAction: "event/clearFormErrors"
		},
	}),
	computed: {
		...mapGetters({
			formErrors: "event/formErrorsList"
		}),
		getBannerImage() {
			if (this.editedItem.banner) return this.editedItem.banner
			else return require("@/assets/default_event_image.jpeg")
		}
	},

	async created() {
		this.$bus.on("open-event-form-dialog-add-item", this.openCreateDialog)
		this.$bus.on("open-event-form-dialog-edit-item", this.openEditDialog)
	},
	beforeUnmount() {
		this.$bus.off("open-event-form-dialog-add-item")
		this.$bus.off("open-event-form-dialog-edit-item")
	},
	methods: {
		async createEvent(eventData) {
			const created = await this.$store.dispatch("event/create", {body: eventData})
			if (created) {
				this.closeCreateEditDialog()
				this.$bus.emit("reload")
				await this.openSnack("Event added.", "success")
			} else {
				if (this.formErrors["non_field_errors"]) {
					await this.openSnack(this.formErrors["non_field_errors"][0])
				} else {
					await this.openSnack("Event create failed. Try again")
				}
			}
		},

		async updateEvent(eventData) {
			const updated = await this.$store.dispatch(
				"event/update",
				{
					id: this.editedItem.id,
					body: eventData
				}
			)
			if (updated) {
				this.closeCreateEditDialog()
				this.$bus.emit("reload")
				await this.openSnack("Event updated.", "success")
			} else {
				if (this.formErrors["non_field_errors"]) {
					await this.openSnack(this.formErrors["non_field_errors"][0])
				} else {
					await this.openSnack("Event update failed. Try again")
				}
			}
		},

		async save() {
			const eventData = getFormData(this.editedItem)
			if (this.editedIndex > -1) {
				await this.updateEvent(eventData)
			}
			else {
				await this.createEvent(eventData)
			}
		},
		routeToEventDetailPage(itemId) {
			router.push({name: "SACHCHAI NEPAL EVENT", params: { id: itemId }})
		}
	}
}
</script>
<style lang="sass" scoped>
.small-detail-icon
	margin-top: -4px
	margin-right: 4px
</style>
