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
			<v-card-title class="sticky-dialog-top">
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
					v-if="editedIndex !== -1 && editedItem.cover_image"
					:src="editedItem.cover_image"
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
								<span class="px-1">{{ $moment(editedItem.created_at).format("MMMM Do YYYY") }}</span>
							</p>
							<p class="mb-0 mb-2">
								<v-icon class="small-detail-icon">
									mdi-plus
								</v-icon>
								<b>Created by:</b>
								<span v-if="editedItem.created_by"
									class="px-1"
								> {{ editedItem.created_by.username }} </span>
							</p>
							<p class="mb-0 mb-2">
								<v-icon class="small-detail-icon">
									mdi-account-network
								</v-icon>
								<b>Total Members:</b>
								<span class="px-1">Not implemented yet</span>
							</p>
							<p class="mb-0">
								<v-icon class="small-detail-icon">
									mdi-pencil
								</v-icon>
								<b>Last Updated By:</b>
								<span v-if="editedItem.updated_by"
									class="px-1"
								>{{ editedItem.updated_by.username }}</span>
								<span v-else
									class="px-1"
								>None</span>
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
							:error-messages="formErrors.name"
						/>
					</v-col>
					<v-col
						cols="12"
						class="ma-0 pa-0"
					>
						<v-text-field
							v-model="editedItem.contact"
							class="ma-0 pa-0"
							label="Contact"
							type="number"
							outlined
							dense
							clearable
							prepend-inner-icon="mdi-phone-classic"
							:error-messages="formErrors.contact"
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
							label="Cover Image"
							clearable
							multiple
							prepend-icon=""
							prepend-inner-icon="mdi-camera"
							:error-messages="formErrors.cover_image"
						/>
					</v-col>
					<v-col
						cols="12"
						class="ma-0 pa-0"
					>
						<v-textarea
							v-model="editedItem.slogan"
							clearable
							dense
							prepend-inner-icon="mdi-text"
							label="Slogan"
							outlined
							class="ma-0-0"
							:error-messages="formErrors.slogan"
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
						id="country-input-column"
						cols="12"
						class="ma-0 pa-0"
					>
						<v-autocomplete
							id="country"
							v-model="editedItem.country"
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
							:error-messages="formErrors.country"
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
							:error-messages="formErrors.province"
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
							:error-messages="formErrors.district"
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
							:error-messages="formErrors.municipality"
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
							:error-messages="formErrors.municipality_ward"
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
							:error-messages="formErrors.vdc"
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
							:error-messages="formErrors.vdc_ward"
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
import {mapGetters} from "vuex";
import {cookCreateData, cookEditData, getFormData} from "@/Helper";

export default {
	name: "BranchFormDialog",
	data: () => ({
		dialog: false,
		editedIndex: -1,
		editedItem: {
			id: "",
			cover_image: "",
			name: "",
			country: "",
			province: "",
			district: "",
			municipality: null,
			municipality_ward: null,
			vdc: null,
			vdc_ward: null,
			contact: null,
			is_main: false,
			is_approved: false,
			imageForUpload: []
		},
		defaultItem: {},
	}),
	computed: {
		...mapGetters({
			countries: "location/countriesList",
			provinces: "location/provincesList",
			districts: "location/districtsList",
			municipalities: "location/municipalitiesList",
			municipality_wards: "location/municipalityWardsList",
			vdcs: "location/vdcsList",
			vdc_wards: "location/vdcWardsList",
			formErrors: "branch/formErrorMessagesList"
		}),

		formTitle() {
			return this.editedIndex === -1 ? "New Branch" : "Edit Branch"
		},
		formIcon() {
			return this.editedIndex === -1 ? "mdi-home-modern" : "mdi-home-edit"
		}
	},
	async created() {
		this.$bus.on("open-branch-form-dialog-add-item", this.openDialog)
		this.$bus.on("open-branch-form-dialog-edit-item", this.openEditDialog)
	},
	beforeUnmount() {
		this.$bus.off("open-branch-form-dialog-add-item")
		this.$bus.off("open-branch-form-dialog-edit-item")
	},
	methods: {
		clearFormErrors() {
			this.$store.dispatch("branch/clearBranchFormErrors")
		},
		openDialog() {
			this.clearFormErrors()
			this.dialog = true
		},

		openEditDialog(args) {
			this.editedIndex = args.editedIndex
			this.editedItem = args.editedItem
			if(this.editedItem.contact) {
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

		async openSnack(text, color="error") {
			await this.$store.dispatch("snack/setSnackState", true)
			await this.$store.dispatch("snack/setSnackColor", color)
			await this.$store.dispatch("snack/setSnackText", text)
		},

		async save() {
			if (this.editedIndex > -1) {
				const body = cookEditData("branch", this.editedItem, "cover_image")
				const branchData = getFormData(body)
				const updated = await this.$store.dispatch(
					"branch/update",
					{
						id: this.editedItem.id,
						body: branchData
					}
				)
				if (updated) {
					this.close()
					this.$bus.emit("reload-branches")
					await this.openSnack("Branch updated successfully.", "success")
				} else {
					await this.openSnack("Branch update failed. Try again.")
				}
			} else {
				const body = cookCreateData("cover_image", this.editedItem)
				const branchData = getFormData(body)
				const created = await this.$store.dispatch("branch/create", {body: branchData})
				if (created) {
					this.close()
					this.$bus.emit("reload-branches")
					await this.openSnack("Branch added successfully.", "success")
				} else {
					await this.openSnack("Branch create failed. Try again.")
				}
			}
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

	.sticky-dialog-top
		position: sticky
		position: -webkit-sticky
		top: 0
		z-index: 200

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

.checkbox-input-column
	::v-deep.v-input--checkbox
		margin: -5px 0 25px
		padding: 10px 10px
		border: 1px solid rgb(156 155 150) !important
		border-radius: 3px
	::v-deep.v-input--checkbox:hover
		border: 1px solid black !important
</style>
