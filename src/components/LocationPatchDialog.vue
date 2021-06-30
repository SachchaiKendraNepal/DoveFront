<template>
	<v-dialog v-model="locationUpdateDialog"
		max-width="600"
	>
		<v-card class="pa-4"
			:loading="loadingForm"
		>
			<v-row class="ma-0 pa-0">
				<v-col cols="12">
					<v-card-title class="form-heading">
						Update location details
					</v-card-title>
					<v-divider />
				</v-col>
				<country-field
					id="country"
					v-model="locationFields.country"
					:province="locationFields.province"
					@change="patchLocation({country: locationFields.country})"
				/>
				<province-field
					id="province"
					v-model="locationFields.province"
					:country="locationFields.country"
					:district="locationFields.district"
					@change="patchLocation({province: locationFields.province})"
				/>
				<district-field
					id="district"
					v-model="locationFields.district"
					:province="locationFields.province"
					:municipality="locationFields.municipality"
					:vdc="locationFields.vdc"
					@change="patchLocation({district: locationFields.district})"
				/>
				<municipality-field
					id="municipality"
					v-model="locationFields.municipality"
					:district="locationFields.district"
					:ward="locationFields.municipality_ward"
					:vdc="locationFields.vdc"
					@change="patchLocation({municipality: locationFields.municipality})"
				/>
				<municipality-ward-field
					id="municipality-ward"
					v-model="locationFields.municipality_ward"
					:municipality="locationFields.municipality"
					:vdc="locationFields.vdc"
					@change="patchLocation({municipality_ward: locationFields.municipality_ward})"
				/>
				<vdc-field
					id="vdc"
					v-model="locationFields.vdc"
					:district="locationFields.district"
					:ward="locationFields.vdc_ward"
					:municipality="locationFields.municipality"
					@change="patchLocation({vdc: locationFields.vdc})"
				/>
				<vdc-ward-field
					id="vdc-ward"
					v-model="locationFields.vdc_ward"
					:municipality="locationFields.municipality"
					:vdc="locationFields.vdc"
					@change="patchLocation({vdc_ward: locationFields.vdc_ward})"
				/>
			</v-row>
		</v-card>
	</v-dialog>
</template>

<script>
import PatchMixin from "@/mixins/PatchMixin.js";

export default {
	name: "LocationPatchForm",
	mixins: [PatchMixin],
	props: {
		modelName: {
			type: String,
			required: true,
			default: ""
		}
	},

	data() {
		return {
			locationUpdateDialog: false,
			loadingForm: false,
			itemIdToUpdate: null,
			itemModelToUpdate: null,
			locationFields: {
				country: null,
				province: null,
				district: null,
				municipality: null,
				municipality_ward: null,
				vdc: null,
				vdc_ward: null
			}
		}
	},

	created() {
		this.$bus.on("open-location-edit-form", this.openAndLoadForm)
	},
	beforeUnmount() {
		this.$bus.off("open-location-edit-form")
	},
	methods: {
		async openAndLoadForm(args) {
			this.locationUpdateDialog = true
			this.loadingForm = true
			this.model = args.model
			this.locationFields.country = args.country
			await this.$store.dispatch("location/setCountries", this.locationFields.country)
			this.locationFields.province = args.province
			await this.$store.dispatch("location/setProvinces", this.locationFields.province)
			this.locationFields.district = args.district
			await this.$store.dispatch("location/setDistricts", this.locationFields.district)
			this.locationFields.municipality = args.municipality
			await this.$store.dispatch("location/setMunicipalities", this.locationFields.municipality)
			this.locationFields.municipality_ward = args.municipality_ward
			await this.$store.dispatch("location/setMunicipalityWards", this.locationFields.municipality_ward)
			this.locationFields.vdc = args.vdc
			await this.$store.dispatch("location/setVdcs", this.locationFields.vdc)
			this.locationFields.vdc_ward = args.vdc_ward
			await this.$store.dispatch("location/setVdcWards", this.locationFields.vdc_ward)
			this.itemIdToUpdate = args.id
			this.itemModelToUpdate = this.model
			console.log(this.itemModelToUpdate)
			this.loadingForm = false
		},
		closeLocationEditDialog() {
			this.locationUpdateDialog = false
		},
		async patchLocation(body) {
			await this.patch(this.modelName, this.itemIdToUpdate, body)
		}
	}
}
</script>

<style scoped lang="sass">
.form-heading
	font-size: 1rem
	text-transform: uppercase
	padding: 4px
	color: #747474
</style>
