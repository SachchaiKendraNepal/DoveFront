<template>
	<v-dialog
		v-model="dialog"
		fullscreen
		hide-overlay
		close-delay="1000"
		open-delay="1000"
		transition="dialog-bottom-transition"
	>
		<v-card
			class="zero-border-radius"
			color="rgb(251 250 241)"
		>
			<v-card-title>
				<v-avatar
					color="grey"
					size="40"
					class="mr-4 elevation-1"
				>
					<v-icon
						size="22"
						color="grey darken-4"
					>
						{{ formIcon }}
					</v-icon>
				</v-avatar>
				<span class="form-title">{{ formTitle }}</span>
				<v-spacer />
				<span>
					<v-btn
						icon
						style="background: grey;"
						@click="close"
					>
						<v-icon color="white">mdi-close</v-icon>
					</v-btn>
				</span>
			</v-card-title>
			<v-card flat
				max-width="800"
				class="mx-auto"
				color="transparent"
			>
				<v-img
					v-show="editedIndex !== -1"
					:src="editedItem.banner"
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
									label
									color="blue lighten-5"
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
									<b v-show="$vuetify.breakpoint.smAndUp">Sacchai Event</b>
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
								<span class="px-1">{{ editedItem.created_at }}</span>
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
								<span class="px-1">558</span>
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
				<v-row class="ma-0 pa-0">
					<v-col
						cols="12"
						class="pl-0"
					>
						<p class="header ma-0 pa-0">
							<v-icon class="pb-1"
								size="30"
							>
								mdi-calendar-text-outline
							</v-icon>
							Event Information
						</p>
						<v-divider />
					</v-col>
					<v-col
						cols="12"
						class="ma-0 pa-0"
					>
						<v-text-field
							id="event-title"
							v-model="editedItem.title"
							class="ma-0"
							outlined
							dense
							counter="255"
							label="Title"
							clearable
							prepend-inner-icon="mdi-form-textbox"
						/>
					</v-col>
					<v-col
						cols="12"
						class="ma-0 pa-0"
					>
						<v-textarea
							id="event-description"
							v-model="editedItem.description"
							auto-grow
							class="ma-0 pa-0"
							name="description"
							label="Description"
							outlined
							clearable
							counter="512"
							prepend-inner-icon="mdi-script-text"
						/>
					</v-col>
					<v-col
						cols="12"
						class="ma-0 pa-0"
					>
						<v-autocomplete
							id="event-organizer"
							v-model="editedItem.organizer"
							class="ma-0"
							allow-overflow
							dense
							outlined
							label="Organizer (Branch)"
							:items="branches"
							clearable
							prepend-inner-icon="mdi-city"
						/>
					</v-col>
					<v-col
						cols="12"
						class="ma-0 pa-0"
					>
						<v-combobox
							v-model="editedItem.contacts"
							class="ma-0 pa-0"
							:items="[]"
							hide-selected
							hint="Provide contacts of organizers"
							label="Contacts"
							multiple
							small-chips
							deletable-chips
							type="number"
							outlined
							dense
							clearable
							prepend-inner-icon="mdi-phone-classic"
						>
							<template #no-data>
								<v-list-item>
									<v-list-item-content>
										<v-list-item-title>
											Type contact number and press <kbd>enter</kbd> to add a new one.
										</v-list-item-title>
									</v-list-item-content>
								</v-list-item>
							</template>
						</v-combobox>
					</v-col>
					<v-col
						id="is-main-col"
						cols="12"
						class="ma-0 pa-0"
					>
						<v-checkbox
							id="is_main"
							v-model="editedItem.is_main"
							label="Is Main Event?"
							append-icon="mdi-calendar-star"
							hide-details
						/>
					</v-col>
					<v-col
						cols="12"
						class="ma-0 pa-0"
					>
						<v-file-input
							id="member-image-input"
							v-model="editedItem.imageForUpload"
							class="ma-0"
							outlined
							dense
							small-chips
							show-size
							accept="image/*"
							label="Banner Image"
							clearable
							multiple
							prepend-icon=""
							prepend-inner-icon="mdi-camera"
						/>
					</v-col>
					<v-col
						cols="12"
						class="pl-0"
					>
						<p class="heading ma-0 pa-0">
							<v-icon class="pb-1"
								size="30"
							>
								mdi-calendar-clock
							</v-icon>
							Timeline Information
						</p>
						<v-divider />
					</v-col>
					<v-col
						cols="12"
						class="ma-0 pa-0"
					>
						<v-menu
							v-model="startDateMenu"
							:nudge-bottom="50"
							transition="scale-transition"
							close-on-click
							offset-overflow
							max-width="290"
						>
							<template #activator="{ on, attrs }">
								<v-text-field
									dense
									class="ma-0 pa-0"
									prepend-inner-icon="mdi-calendar"
									:value="computedDateFormattedMomentJs"
									clearable
									outlined
									v-bind="attrs"
									label="Start Date"
									v-on="on"
									@click:clear="editedItem.start_date = null"
								/>
							</template>
							<v-date-picker
								v-model="editedItem.start_date"
								@change="startDateMenu = false"
							/>
						</v-menu>
					</v-col>
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
						/>
					</v-col>
					<v-col
						cols="12"
						class="ma-0 pa-0"
					>
						<v-autocomplete
							id="event-time-of-day"
							v-model="editedItem.timeOfDay"
							class="ma-0"
							allow-overflow
							dense
							outlined
							label="Time Of Day"
							:items="timeOfDayOptions"
							clearable
							prepend-inner-icon="mdi-white-balance-sunny"
						/>
					</v-col>
					<v-col
						cols="12"
						class="pl-0"
					>
						<p class="heading ma-0 pa-0">
							<v-icon class="pb-1"
								size="30"
							>
								mdi-map-marker
							</v-icon>
							Location Information
						</p>
						<v-divider />
					</v-col>
					<v-col
						cols="12"
						class="ma-0 pa-0"
					>
						<v-autocomplete
							id="event-country"
							v-model="editedItem.country"
							class="ma-0"
							allow-overflow
							dense
							outlined
							label="Country"
							:items="countries"
							clearable
							prepend-inner-icon="mdi-web"
						/>
					</v-col>
					<v-col
						cols="12"
						class="ma-0 pa-0"
					>
						<v-autocomplete
							id="event-province"
							v-model="editedItem.province"
							class="ma-0"
							allow-overflow
							dense
							outlined
							label="Province"
							:items="provinces"
							clearable
							prepend-inner-icon="mdi-office-building-marker-outline"
						/>
					</v-col>
					<v-col
						cols="12"
						class="ma-0 pa-0"
					>
						<v-autocomplete
							id="event-districts"
							v-model="editedItem.district"
							class="ma-0"
							allow-overflow
							dense
							outlined
							:items="districts"
							label="District"
							clearable
							prepend-inner-icon="mdi-map-marker-multiple-outline"
						/>
					</v-col>
					<v-col
						v-if="!editedItem.vdc"
						cols="12"
						class="ma-0 pa-0"
					>
						<v-autocomplete
							id="event-municipality"
							v-model="editedItem.municipality"
							class="ma-0"
							allow-overflow
							dense
							outlined
							label="Municipality"
							:items="municipalities"
							clearable
							prepend-inner-icon="mdi-google-maps"
						/>
					</v-col>
					<v-col
						v-if="editedItem.municipality"
						cols="12"
						class="ma-0 pa-0"
					>
						<v-autocomplete
							id="event-municipality-ward"
							v-model="editedItem.municipality_ward"
							class="ma-0"
							allow-overflow
							dense
							outlined
							label="Municipality Ward"
							:items="municipality_wards"
							clearable
							prepend-inner-icon="mdi-numeric"
						/>
					</v-col>
					<v-col
						v-if="!editedItem.municipality"
						cols="12"
						class="ma-0 pa-0"
					>
						<v-autocomplete
							id="event-vdc"
							v-model="editedItem.vdc"
							allow-overflow
							class="ma-0"
							dense
							outlined
							label="VDC"
							:items="vdcs"
							clearable
							prepend-inner-icon="mdi-home-map-marker"
						/>
					</v-col>
					<v-col
						v-if="editedItem.vdc"
						cols="12"
						class="ma-0 pa-0"
					>
						<v-autocomplete
							id="event-vdc-ward"
							v-model="editedItem.vdc_ward"
							allow-overflow
							class="ma-0"
							dense
							outlined
							label="VDC Ward"
							:items="vdc_wards"
							clearable
							prepend-inner-icon="mdi-numeric"
						/>
					</v-col>
					<v-col
						cols="12"
						class="ma-0 pa-0"
					>
						<v-text-field
							id="event-venue"
							v-model="editedItem.venue"
							class="ma-0"
							dense
							outlined
							counter="255"
							label="Venue"
							clearable
							prepend-inner-icon="mdi-home-roof"
							hint="Where is the event going to be organized?"
						/>
					</v-col>
					<v-col cols="12"
						class="pb-16"
					>
						<v-card-actions>
							<v-spacer />
							<v-btn
								color="red lighten-5"
								class="red--text"
								depressed
								@click="close"
							>
								Cancel
							</v-btn>
							<v-btn
								color="blue lighten-5"
								class="blue--text"
								depressed
								@click="save"
							>
								Save
							</v-btn>
						</v-card-actions>
					</v-col>
				</v-row>
			</v-card>
		</v-card>
	</v-dialog>
</template>
<script>
import moment from "moment"
import router from "@/router"

export default {
	name: "EventFormDialog",
	data: () => ({
		dialog: false,
		startDateMenu: false,
		timeOfDayOptions: [
			"Morning",
			"Day",
			"Evening"
		],
		countries: ["Nepal", "India", "Bhutan", "Pakistan", "Singapore", "HongKong"],
		provinces: ["Bagmati Pradesh", "Gandaki Pradesh", "Uttar Pradesh", "Goa", "Province 1"],
		districts: ["Kaski", "Kathmandu", "Humla", "Jhapa", "Chitwan", "Sarlahi", "Nepalgunj"],
		municipalities: ["Pokhara", "Kathmandu", "Panchkhal", "Banepa"],
		municipality_wards: ["Amarsingh", "Tinpiple", "Lamachaur", "Chaukot"],
		vdcs: [
			"Barai",
			"Bargaun",
			"Badalkot",
			"Photu",
			"Aaglung",
			"Siddhara",
			"Simalapani",
			"Aruchaur",
			"Arukharka",
			"Armala",
			"Deurali"
		],
		vdc_wards: [
			"alskdf",
			"sldkf",
			"sldkf",
			"sldkf",
			"sldkfjs",
			"sldkfs",
			"owiek",
			"mndkjf",
			"woeik"
		],
		branches: ["Pokhara Kendra Branch", "Kathmandu Branch", "Amarsingh Branch", "Lekhnath Branch", "Palpa Branch"],
		editedIndex: -1,
		editedItem: {
			id: "",
			title: "",
			description: "",
			country: "",
			province: "",
			district: "",
			municipality: "",
			municipality_ward: "",
			vdc: "",
			vdc_ward: "",
			venue: "",
			organizer: "",
			contacts: [],
			start_date: null,
			duration: null,
			timeOfDay: "",
			banner: "",
			is_main: false,
			imageForUpload: [],
		},
		defaultItem: {},
		rules: [(value) => !value || value.size < 2000000 || "Image size should be less than 2 MB!"]
	}),
	computed: {
		formTitle() {
			return this.editedIndex === -1
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
		}
	},

	created() {
		this.$bus.on("open-event-form-dialog-add-item", this.openDialog)
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

		edit(args) {
			this.editedIndex = args.editedIndex
			this.editedItem = args.editedItem
			this.openDialog()
		},

		close() {
			this.dialog = false
			this.$nextTick(() => {
				this.editedItem = Object.assign({}, this.defaultItem)
				this.editedIndex = -1
			})
		},

		save() {
			if (this.editedIndex > -1) {
				Object.assign(this.events[this.editedIndex], this.editedItem)
			} else {
				this.events.push(this.editedItem)
			}
			this.close()
		},
		routeToEventDetailPage(itemId) {
			router.push({name: "SACHCHAI NEPAL EVENT", params: { id: itemId }})
		}
	}
}
</script>
<style lang="sass" scoped>
.zero-border-radius
	border-radius: 0
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
		margin: -5px 0 20px
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
</style>
