import PatchMixin from "@/mixins/PatchMixin.js";

const LocationUpdateMixin = {
	mixins: [PatchMixin],
	data() {
		return {
			locationUpdateDialog: false,
			loadingForm: false,
			editedItemId: null,
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
	methods: {
		async openLocationEdiDialog(model, args) {
			args["model"] = model
			this.$bus.emit("open-location-edit-form", args)
		},
		async loadFormWithExistingData(args) {
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
			this.editedItemId = args.id
			this.loadingForm = false
		},
		closeLocationEditDialog() {
			this.locationUpdateDialog = false
		},
		async patchLocation(body) {
			await this.patch(this.model, this.editedItemId, body)
		}
	}
}

export default LocationUpdateMixin
