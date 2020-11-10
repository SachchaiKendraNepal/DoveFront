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
					size="40"
					class="mr-4 elevation-3"
				>
					<v-icon
						dark
						size="22"
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
				class="mx-auto" color="transparent"
			>
				<v-img
					v-show="editedIndex !== -1"
					:src="editedItem.image"
					height="350"
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
								@click="routeToBranchDetailPage(editedItem.id)"
							>
								{{ editedItem.name }}
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
									<span>Sacchai Branch</span>
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
									<span>Main Branch</span>
								</v-tooltip>
							</p>
							<v-divider class="mb-2" />
							<div class="mb-2">
								<v-chip
									label
									color="blue lighten-5"
									class="mr-1 mb-1"
								>
									<v-icon left>
										mdi-map-marker-star
									</v-icon>
									<b>Main Branch</b>
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
									<b>Sacchai Branch</b>
									<v-icon right>
										mdi-city
									</v-icon>
								</v-chip>
							</div>
							<p class="mb-0 mb-2">
								<v-icon class="small-detail-icon">
									mdi-shape-plus
								</v-icon>
								<b>Date created:</b>
								<span class="px-1">{{ editedItem.created_at }}</span>
							</p>
							<p class="mb-0 mb-2">
								<v-icon class="small-detail-icon">
									mdi-plus
								</v-icon>
								<b>Created by:</b>
								<span class="px-1"> Kiran Parajuli </span>
							</p>
							<p class="mb-0 mb-2">
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
				<v-row class="ma-0 pa-0 px-4">
					<v-col
						cols="12"
						class="pl-0"
					>
						<p class="heading ma-0 pa-0">
							<v-icon class="pb-1"
								size="30"
							>
								mdi-city-variant
							</v-icon>
							Branch Information
						</p>
						<v-divider class="pb-2" />
					</v-col>
					<v-col
						cols="12"
						class="ma-0 pa-0"
					>
						<v-text-field
							id="branch-name"
							v-model="editedItem.name"
							class="ma-0"
							outlined
							dense
							clearable
							label="Name"
							prepend-inner-icon="mdi-form-textbox"
						/>
					</v-col>
					<v-col
						cols="12"
						class="ma-0 pa-0"
					>
						<v-text-field
							id="branch-phone"
							v-model="editedItem.phone"
							class="ma-0"
							dense
							outlined
							clearable
							label="Phone"
							type="number"
							hide-details="auto"
							prepend-inner-icon="mdi-phone-classic"
						/>
					</v-col>
					<v-col
						cols="12"
						class="ma-0 pa-0"
					>
						<v-checkbox
							id="is_main"
							v-model="editedItem.is_main"
							label="Is Main Branch?"
							append-icon="mdi-map-marker-star-outline"
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
							chips
							show-size
							clearable
							accept="image/*"
							label="Branch Image"
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
								mdi-map-marker
							</v-icon>
							Location Information
						</p>
						<v-divider class="pb-2" />
					</v-col>
					<v-col
						cols="12"
						class="ma-0 pa-0"
					>
						<v-select
							id="branch-country"
							v-model="editedItem.country"
							class="ma-0"
							dense
							outlined
							clearable
							label="Country"
							:items="countries"
							prepend-inner-icon="mdi-web"
						/>
					</v-col>
					<v-col
						cols="12"
						class="ma-0 pa-0"
					>
						<v-select
							id="branch-province"
							v-model="editedItem.province"
							class="ma-0"
							dense
							outlined
							clearable
							label="Province"
							:items="provinces"
							prepend-inner-icon="mdi-office-building-marker-outline"
						/>
					</v-col>
					<v-col
						cols="12"
						class="ma-0 pa-0"
					>
						<v-select
							id="branch-districts"
							v-model="editedItem.district"
							class="ma-0"
							dense
							outlined
							clearable
							:items="districts"
							label="District"
							prepend-inner-icon="mdi-map-marker-multiple-outline"
						/>
					</v-col>
					<v-col
						v-if="!editedItem.vdc"
						cols="12"
						class="ma-0 pa-0"
					>
						<v-select
							id="branch-municipality"
							v-model="editedItem.municipality"
							class="ma-0"
							dense
							outlined
							clearable
							label="Municipality"
							:items="municipalities"
							prepend-inner-icon="mdi-google-maps"
						/>
					</v-col>
					<v-col
						v-if="editedItem.municipality"
						cols="12"
						class="ma-0 pa-0"
					>
						<v-select
							id="branch-municipality-ward"
							v-model="editedItem.municipality_ward"
							class="ma-0"
							dense
							outlined
							clearable
							label="Municipality Ward"
							:items="municipality_wards"
							prepend-inner-icon="mdi-numeric"
						/>
					</v-col>
					<v-col
						v-if="!editedItem.municipality"
						cols="12"
						class="ma-0 pa-0"
					>
						<v-select
							id="branch-vdc"
							v-model="editedItem.vdc"
							class="ma-0"
							dense
							outlined
							clearable
							label="VDC"
							:items="vdcs"
							prepend-inner-icon="mdi-home-map-marker"
						/>
					</v-col>
					<v-col
						v-if="editedItem.vdc"
						cols="12"
						class="ma-0 pa-0"
					>
						<v-select
							id="branch-vdc-ward"
							v-model="editedItem.vdc_ward"
							class="ma-0"
							dense
							outlined
							clearable
							label="VDC Ward"
							:items="vdc_wards"
							prepend-inner-icon="mdi-numeric"
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
import router from "@/router";

export default {
	name: "BranchFormDialog",
	data: () => ({
		dialog: false,
		countries: ["Nepal", "India", "Bhutan", "Pakistan", "Singapore", "HongKong"],
		provinces: ["Bagmati Pradesh", "Gandaki Pradesh", "Uttar Pradesh", "Goa", "Province 1"],
		districts: ["Kaski", "Kathmandu", "Humla", "Jhapa", "Chitwan", "Sarlahi", "Nepalgunj"],
		municipalities: ["Pokhara-Lekhnath", "Kathmandu", "Panchkhal", "Banepa"],
		municipality_wards: ["Amarsingh", "Tinpiple", "Chauthe", "Chaukot"],
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
		editedIndex: -1,
		editedItem: {
			id: "",
			name: "",
			country: "",
			province: "",
			district: "",
			municipality: "",
			municipality_ward: "",
			vdc: "",
			vdc_ward: "",
			phone: Number,
			is_main: false,
			imageForUpload: []
		},
		defaultItem: {},
		rules: [(value) => !value || value.size < 2000000 || "Image size should be less than 2 MB!"]
	}),
	computed: {
		formTitle() {
			return this.editedIndex === -1 ? "New Branch" : "Edit Branch"
		},
		formIcon() {
			return this.editedIndex === -1 ? "mdi-home-modern" : "mdi-home-edit"
		}
	},
	created() {
		this.$bus.on("open-branch-form-dialog-add-item", this.openDialog)
		this.$bus.on("open-branch-form-dialog-edit-item", this.openEditDialog)
	},
	beforeUnmount() {
		this.$bus.off("open-branch-form-dialog-add-item")
		this.$bus.off("open-branch-form-dialog-edit-item")
	},
	methods: {
		openDialog() {
			this.dialog = true
		},

		openEditDialog(args) {
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
				Object.assign(this.branches[this.editedIndex], this.editedItem)
			} else {
				this.branches.push(this.editedItem)
			}
			this.close()
		},

		routeToBranchDetailPage(itemId) {
			router.push({name: "SACHCHAI NEPAL BRANCH", params: { id: itemId }})
		}
	},
}
</script>
<style lang="sass" scoped>
.zero-border-radius
	border-radius: 0

.form-title
	color: white
	display: block
	@media only screen and (max-width: 255px)
		display: none

.v-input--selection-controls
	margin-top: 0

.small-detail-icon
	margin-top: -4px
	margin-right: 4px

.v-card__title
	background-color: #535151 !important

.branch-name
	margin: 0
	padding: 0
	font-size: 18px
	font-weight: 300

.cursor
	cursor: pointer
</style>
