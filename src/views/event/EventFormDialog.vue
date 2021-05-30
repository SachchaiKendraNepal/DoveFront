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
			<v-toolbar
				fixed
				dark
				height="60"
			>
				<v-avatar
					:size="
						$vuetify.breakpoint.smAndUp
							? 35
							: 25
					"
					color="grey darken-3"
					class="elevation-4"
				>
					<v-icon
						:size="
							$vuetify.breakpoint.smAndUp
								? 22
								: 16
						"
					>
						{{ formIcon }}
					</v-icon>
				</v-avatar>
				<v-toolbar-title class="toolbar-title">
					{{ formTitle }}
				</v-toolbar-title>
				<v-spacer />
				<v-avatar
					class="cursor"
					color="grey darken-3"
					:size="30"
					@click="close"
				>
					<v-icon
						:size="16"
					>
						mdi-close
					</v-icon>
				</v-avatar>
			</v-toolbar>
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
						prepend-inner-icon="mdi-form-textbox"
						:error-messages="formErrors"
					/>
					<text-area
						id="event-description"
						v-model="editedItem.description"
						auto-grow
						label="description"
						name="description"
						prepend-inner-icon="mdi-script-text"
						:error-messages="formErrors"
					/>
					<branch-field
						id="event-branch"
						v-model="editedItem.branch"
						label="Organizer (Branch)"
						:error-messages="formErrors"
					/>
					<select-field
						id="event-type"
						v-model="editedItem.type"
						label="Type of event"
						name="type"
						:select-items="eventTypeOptions"
						prepend-inner-icon="mdi-call-merge"
						:error-messages="formErrors"
					/>
					<text-field
						v-model="editedItem.contact"
						label="Contact"
						type="number"
						name="contact"
						prepend-inner-icon="mdi-phone-classic"
						:error-messages="formErrors"
					/>
					<v-col
						cols="12"
					>
						<v-file-input
							id="member-image-input"
							v-model="editedItem.imageForUpload"
							class="ma-0"
							solo
							small-chips
							show-size
							accept="image/*"
							label="Banner Image"
							clearable
							multiple
							prepend-icon=""
							prepend-inner-icon="mdi-camera"
							:error-messages="formErrors.banner"
						/>
					</v-col>
					<admin-form-group-title
						icon="mdi-calendar-clock"
						text="Timeline Information"
					/>
					<date-picker-field
						v-model="editedItem.start_date"
						prepend-inner-icon="mdi-calendar"
						label="Start Date"
						name="start_date"
						:error-messages="formErrors"
					/>
					<v-col
						cols="12"
						class="ma-0 pa-0"
					>
						<v-text-field
							v-model="editedItem.duration"
							clearable
							dense
							outlined
							class="ma-0 pa-0"
							label="Duration"
							hint="This is the number of days the event will go on."
							prepend-inner-icon="mdi-av-timer"
							:error-messages="formErrors.duration"
						/>
					</v-col>
					<v-col
						cols="12"
						class="ma-0 pa-0"
					>
						<v-autocomplete
							id="event-time-of-day"
							v-model="editedItem.time_of_day"
							class="ma-0"
							allow-overflow
							attach=""
							dense
							outlined
							label="Time Of Day"
							:items="timeOfDayOptions"
							clearable
							prepend-inner-icon="mdi-white-balance-sunny"
							:error-messages="formErrors.time_of_day"
						/>
					</v-col>



					<admin-form-group-title
						icon="mdi-map-marker"
						text="Location Information"
					/>




					<text-field
						id="event-venue"
						v-model="editedItem.venue"
						label="Venue"
						name="venue"
						prepend-inner-icon="mdi-home-roof"
						hint="Where is the event going to be organized?"
						:error-messages="formErrors.venue"
					/>
					<v-col
						cols="12"
						class="ma-0 pa-0"
					>
						<country-field
							v-model="editedItem.country"
							:errors="formErrors"
						/>
					</v-col>
					<v-col
						cols="12"
						class="ma-0 pa-0"
					>
						<province-field
							v-model="editedItem.province"
							:errors="formErrors"
						/>
					</v-col>
					<v-col
						cols="12"
						class="ma-0 pa-0"
					>
						<district-field
							v-model="editedItem.district"
							:errors="formErrors"
						/>
					</v-col>
					<v-col
						cols="12"
						class="ma-0 pa-0"
					>
						<municipality-field
							v-model="editedItem.municipality"
							:error-messages="formErrors"
						/>
					</v-col>
					<v-col
						cols="12"
						class="ma-0 pa-0"
					>
						<municipality-ward-field
							v-model="editedItem.municipality_ward"
							:error-messages="formErrors"
						/>
					</v-col>
					<v-col
						cols="12"
						class="ma-0 pa-0"
					>
						<vdc-field
							v-model="editedItem.vdc"
							:error-messages="formErrors"
						/>
					</v-col>
					<v-col
						cols="12"
						class="ma-0 pa-0"
					>
						<vdc-ward-field
							id="vdc-ward"
							v-model="editedItem.vdc_ward"
							:error-messages="formErrors"
						/>
					</v-col>
					<v-col cols="12"
						class="pa-0 pb-16 text-center"
					>
						<v-btn
							color="red lighten-5"
							class="red--text ma-1"
							depressed
							@click="close"
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
import moment from "moment"
import router from "@/router"
import {mapGetters} from "vuex";
import {cookCreateData, cookEditData, getFormData} from "@/Helper"
import CountryAutocomplete from "@/mixins/CountryAutocomplete";
import ProvinceAutocomplete from "@/mixins/ProvinceAutocomplete";
import Snack from "@/mixins/Snack";
import DistrictAutocomplete from "@/mixins/DistrictAutocomplete";

export default {
	name: "EventFormDialog",
	mixins: [
		CountryAutocomplete,
		ProvinceAutocomplete,
		DistrictAutocomplete,
		Snack
	],
	props: {
		fullscreen: {
			type: Boolean,
			default: true
		}
	},
	data: () => ({
		dialog: false,
		startDateMenu: false,
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
		editedIndex: -1,
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
			images: null,
			video_urls: null,
			imageForUpload: [],
		},
		defaultItem: {
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
			images: null,
			video_urls: null,
			imageForUpload: [],
		},
	}),
	computed: {
		...mapGetters({
			formErrors: "event/formErrorsList"
		}),
		formTitle() {
			return (this.editedIndex === -1)
				? "New Event"
				: "Edit Event"
		},
		formIcon() {
			return this.editedIndex === -1
				? "mdi-calendar-plus"
				: "mdi-calendar-edit"
		},
		computedDateFormattedMomentJs() {
			return this.editedItem.start_date
				? moment(this.editedItem.start_date).format("dddd, MMMM Do YYYY")
				: ""
		},
		getBannerImage() {
			if (this.editedItem.banner) return this.editedItem.banner
			else return require("@/assets/defaultEventImage.jpeg")
		}
	},

	async created() {
		this.$bus.on("open-event-form-dialog-add-item", this.openCreateDialog)
		this.$bus.on("open-event-form-dialog-edit-item", this.edit)
	},
	beforeUnmount() {
		this.$bus.off("open-event-form-dialog-add-item")
		this.$bus.off("open-event-form-dialog-edit-item")
	},
	methods: {
		openDialog() {
			this.dialog = true
		},
		async openCreateDialog() {
			await this.$store.dispatch("event/clearFormErrors")
			this.editedItem = this.defaultItem
			this.openDialog()
		},

		async edit(args) {
			this.editedIndex = args.editedIndex
			this.editedItem = args.editedItem
			if (this.editedItem.contact) {
				this.editedItem.contact = this.editedItem.contact.substring(4)
			}
			this.openDialog()
		},

		close() {
			this.dialog = false
			this.$nextTick(() => {
				this.editedItem = Object.assign({}, this.defaultItem)
				this.editedIndex = -1
			})
		},

		async save() {
			// Lets update an event
			if (this.editedIndex > -1) {
				const body = cookEditData("event", this.editedItem, "banner")
				const eventData = getFormData(body)
				const updated = await this.$store.dispatch(
					"event/update",
					{
						id: this.editedItem.id,
						body: eventData
					}
				)
				if (updated) {
					this.close()
					this.$bus.emit("reload-events")
					await this.openSnack("Event updated.", "success")
				} else {
					if (this.formErrors.non_field_errors) {
						await this.openSnack(this.formErrors.non_field_errors[0])
					} else {
						await this.openSnack("Event update failed. Try again")
					}
				}
			}
			// Lets create an event
			else {
				const body = cookCreateData("banner", this.editedItem)
				const eventData = getFormData(body)
				const created = await this.$store.dispatch("event/create", {body: eventData})
				if (created) {
					this.close()
					this.$bus.emit("reload-events")
					await this.openSnack("Event added.", "success")
				} else {
					if (this.formErrors.non_field_errors) {
						await this.openSnack(this.formErrors.non_field_errors[0])
					} else {
						await this.openSnack("Event create failed. Try again")
					}
				}
			}
		},
		routeToEventDetailPage(itemId) {
			router.push({name: "SACHCHAI NEPAL EVENT", params: { id: itemId }})
		}
	}
}
</script>
<style lang="scss" scoped>
#event-form {
	overflow: hidden !important;
}
</style>
<style lang="sass" scoped>
.cursor
	cursor: pointer
.sticky-dialog-top
	position: sticky
	position: -webkit-sticky
	top: 0
	z-index: 205
.v-input--selection-controls
	margin-top: 0
.small-detail-icon
	margin-top: -4px
	margin-right: 4px
.v-card__title
	background-color: #535151 !important
.cursor
	cursor: pointer
.form-title
	color: white
	display: block
	@media only screen and (max-width: 260px)
		display: none
#is-main-col
	::v-deep.v-input--checkbox
		margin: -5px 0 25px
		padding: 10px 10px
		border: 1px solid rgb(156 155 150)
		border-radius: 3px
	::v-deep.v-input--checkbox:hover
		border: 1px solid black
::v-deep.mx-calendar
	margin: 0
	padding: 3px
	::v-deep.mx-calendar-header
		background-color: blue
::v-deep.v-autocomplete__content
	z-index: 10 !important
.toolbar-title
	font-weight: 300 !important
	margin-left: 10px !important
	@media only screen and (max-width: 600px)
		margin-left: 5px !important
		font-size: 14px !important
</style>
