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
			class="rounded-0"
			color="rgb(251 250 241)"
		>
			<v-toolbar
				fixed
				dark
				height="auto"
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
				</v-toolbar-title>>
				<v-spacer />
				<v-avatar
					class="cursor"
					color="grey darken-3"
					:size="
						$vuetify.breakpoint.smAndUp
							? 30
							: 25
					"
					@click="close"
				>
					<v-icon
						:size="
							$vuetify.breakpoint.smAndUp
								? 22
								: 16
						"
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
						class="ma-0 pa-0 organizer-col"
					>
						<v-autocomplete
							id="event-organizer"
							v-model="editedItem.organizer"
							class="ma-0"
							allow-overflow
							attach=""
							dense
							outlined
							label="Organizer (Branch)"
							item-text="name"
							item-value="id"
							:items="branches"
							clearable
							prepend-inner-icon="mdi-city"
						>
							<template #no-data>
								<v-list-item>
									<v-list-item-title>
										No <code>branch</code> found.
									</v-list-item-title>
								</v-list-item>
							</template>
							<template #item="{ item }">
								<v-list-item-avatar>
									<v-avatar size="24"
										color="grey darken-2"
										class="white--text"
									>
										{{ item.name.charAt(0) }}
									</v-avatar>
								</v-list-item-avatar>
								<v-list-item-content>
									<v-list-item-title
										v-text="item.name"
									/>
								</v-list-item-content>
							</template>
						</v-autocomplete>
					</v-col>
					<v-col
						cols="12"
						class="ma-0 pa-0"
					>
						<v-autocomplete
							id="event-type"
							v-model="editedItem.type"
							class="ma-0"
							allow-overflow
							attach=""
							dense
							outlined
							label="Type of event"
							:items="eventTypeOptions"
							clearable
							prepend-inner-icon="mdi-call-merge"
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
							hint="Add contact number and hit Enter to add a new one."
							label="Contacts"
							multiple
							small-chips
							deletable-chips
							type="number"
							outlined
							dense
							attach=""
							clearable
							prepend-inner-icon="mdi-phone-classic"
						/>
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
							attach=""
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
					<v-col
						cols="12"
						class="ma-0 pa-0"
					>
						<v-autocomplete
							id="country"
							v-model="editedItem.country"
							:loading="countriesLoading"
							class="ma-0"
							allow-overflow
							dense
							item-text="name"
							item-value="id"
							:items="countries"
							attach=""
							outlined
							label="Country"
							clearable
							prepend-inner-icon="mdi-web"
						>
							<template #no-data>
								<v-list-item>
									<v-list-item-title>
										No <code>country</code> found.
									</v-list-item-title>
								</v-list-item>
							</template>
						</v-autocomplete>
					</v-col>
					<v-col
						cols="12"
						class="ma-0 pa-0"
					>
						<v-autocomplete
							id="province"
							v-model="editedItem.province"
							:loading="provincesLoading"
							class="ma-0"
							allow-overflow
							dense
							outlined
							attach=""
							label="Province"
							item-text="name"
							item-value="id"
							:items="provinces"
							clearable
							prepend-inner-icon="mdi-office-building-marker-outline"
						>
							<template #no-data>
								<v-list-item>
									<v-list-item-title>
										No <code>provinces</code> found.
									</v-list-item-title>
								</v-list-item>
							</template>
						</v-autocomplete>
					</v-col>
					<v-col
						cols="12"
						class="ma-0 pa-0"
					>
						<v-autocomplete
							id="districts"
							v-model="editedItem.district"
							:loading="districtsLoading"
							item-text="name"
							item-value="id"
							class="ma-0"
							allow-overflow
							dense
							outlined
							attach=""
							:items="districts"
							label="District"
							clearable
							prepend-inner-icon="mdi-map-marker-multiple-outline"
						>
							<template #no-data>
								<v-list-item>
									<v-list-item-title>
										No <code>district</code> found.
									</v-list-item-title>
								</v-list-item>
							</template>
						</v-autocomplete>
					</v-col>
					<v-col
						cols="12"
						class="ma-0 pa-0"
					>
						<v-autocomplete
							id="municipality"
							v-model="editedItem.municipality"
							:loading="municipalitiesLoading"
							item-text="name"
							item-value="id"
							class="ma-0"
							allow-overflow
							dense
							outlined
							attach=""
							label="Municipality"
							:items="municipalities"
							clearable
							prepend-inner-icon="mdi-google-maps"
							:disabled="editedItem.vdc > 0"
						>
							<template #no-data>
								<v-list-item>
									<v-list-item-title>
										No <code>municipality</code> found.
									</v-list-item-title>
								</v-list-item>
							</template>
						</v-autocomplete>
					</v-col>
					<v-col
						cols="12"
						class="ma-0 pa-0"
					>
						<v-autocomplete
							id="municipality-ward"
							v-model="editedItem.municipality_ward"
							:loading="municipalityWardsLoading"
							item-text="name"
							item-value="id"
							class="ma-0"
							allow-overflow
							dense
							outlined
							clearable
							attach=""
							label="Municipality Ward"
							:items="municipality_wards"
							:disabled="editedItem.vdc > 0"
							prepend-inner-icon="mdi-numeric"
						>
							<template #no-data>
								<v-list-item>
									<v-list-item-title>
										No <code>municipality ward</code> found.
									</v-list-item-title>
								</v-list-item>
							</template>
						</v-autocomplete>
					</v-col>
					<v-col
						cols="12"
						class="ma-0 pa-0"
					>
						<v-autocomplete
							id="vdc"
							v-model="editedItem.vdc"
							:loading="vdcsLoading"
							item-text="name"
							item-value="id"
							allow-overflow
							class="ma-0"
							dense
							attach=""
							outlined
							label="VDC"
							:items="vdcs"
							clearable
							prepend-inner-icon="mdi-home-map-marker"
							:disabled="editedItem.municipality > 0"
						>
							<template #no-data>
								<v-list-item>
									<v-list-item-title>
										No <code>vdc</code> found.
									</v-list-item-title>
								</v-list-item>
							</template>
						</v-autocomplete>
					</v-col>
					<v-col
						cols="12"
						class="ma-0 pa-0"
					>
						<v-autocomplete
							id="vdc-ward"
							v-model="editedItem.vdc_ward"
							:loading="vdcWardsLoading"
							item-text="name"
							item-value="id"
							class="ma-0"
							allow-overflow
							dense
							outlined
							clearable
							attach=""
							label="VDC Ward"
							:items="vdc_wards"
							:disabled="editedItem.municipality > 0"
							prepend-inner-icon="mdi-numeric"
						>
							<template #no-data>
								<v-list-item>
									<v-list-item-title>
										No <code>vdc ward</code> found.
									</v-list-item-title>
								</v-list-item>
							</template>
						</v-autocomplete>
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

export default {
	name: "EventFormDialog",
	data: () => ({
		dialog: false,
		startDateMenu: false,
		countriesLoading: false,
		provincesLoading: false,
		districtsLoading: false,
		municipalitiesLoading: false,
		municipalityWardsLoading: false,
		branchesLoading: false,
		vdcsLoading: false,
		vdcWardsLoading: false,
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
			id: "",
			title: "",
			description: "",
			country: "",
			province: "",
			district: "",
			municipality: null,
			municipality_ward: null,
			vdc: null,
			vdc_ward: null,
			venue: "",
			organizer: "",
			contacts: [],
			start_date: null,
			duration: null,
			time_of_day: "",
			banner: "",
			type: "",
			is_main: false,
			imageForUpload: [],
		},
		defaultItem: {},
		rules: [(value) => !value || value.size < 2000000 || "Image size should be less than 2 MB!"],
	}),
	computed: {
		...mapGetters({
			countries: "location/allCountries",
			provinces: "location/allProvinces",
			districts: "location/allDistricts",
			municipalities: "location/allMunicipalities",
			municipality_wards: "location/allMunicipalityWards",
			vdcs: "location/allVdcs",
			vdc_wards: "location/allVdcWards",
			branches: "branch/allBranches"
		}),
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

	async created() {
		this.$bus.on("open-event-form-dialog-add-item", this.openDialog)
		this.$bus.on("open-event-form-dialog-edit-item", this.edit)
		await this.initCountries()
		await this.initProvinces()
		await this.initDistricts()
		await this.initMunicipalities()
		await this.initMunicipalityWards()
		await this.initVdcs()
		await this.initVdcWards()
		await this.initBranches()
	},
	beforeUnmount() {
		this.$bus.off("open-event-form-dialog-add-item")
		this.$bus.off("open-event-form-dialog-edit-item")
	},
	methods: {
		async initBranches() {
			this.branchesLoading = true
			await this.$store.dispatch("branch/getAll")
			this.branchesLoading = false
		},
		async initCountries() {
			this.countriesLoading = true
			await this.$store.dispatch("location/getAllCountries")
			this.countriesLoading = false
		},
		async initProvinces() {
			this.provincesLoading = true
			await this.$store.dispatch("location/getAllProvinces")
			this.provincesLoading = false
		},
		async initDistricts() {
			this.districtsLoading = true
			await this.$store.dispatch("location/getAllDistricts")
			this.districtsLoading = false
		},
		async initMunicipalities() {
			this.municipalitiesLoading = true
			await this.$store.dispatch("location/getAllMunicipalities")
			this.municipalitiesLoading = false
		},
		async initMunicipalityWards() {
			this.municipalityWardsLoading = true
			await this.$store.dispatch("location/getAllMunicipalityWards")
			this.municipalitiesLoading = false
		},
		async initVdcs() {
			this.vdcsLoading = true
			await this.$store.dispatch("location/getAllVdcs")
			this.vdcsLoading = false
		},
		async initVdcWards() {
			this.vdcWardsLoading = true
			await this.$store.dispatch("location/getAllVdcWards")
			this.vdcWardsLoading = false
		},
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

		async save() {
			const body = {}
			// Lets update an event
			if (this.editedIndex > -1) {
				const body = cookEditData("event", this.editedItem, "banner")
				const eventData = getFormData(body)
				await this.$store.dispatch(
					"event/update",
					{
						id: this.editedItem.id,
						body: eventData
					}
				)
			}
			// Lets create an event
			else {
				const body = cookCreateData("banner", this.editedItem)
				const eventData = getFormData(body)
				await this.$store.dispatch("event/create", eventData)
			}
			this.$bus.emit("reload-events")
			this.close()
		},
		routeToEventDetailPage(itemId) {
			router.push({name: "SACHCHAI NEPAL EVENT", params: { id: itemId }})
		}
	}
}
</script>
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
	margin-left: 10px !important
	@media only screen and (max-width: 600px)
		margin-left: 5px !important
		font-size: 14px !important
</style>
