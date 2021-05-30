import {mapGetters} from "vuex";

const MunicipalityAutocomplete = {
	data() {
		return {
			municipality: null,
			municipalitiesLoading: false
		}
	},
	computed: {
		...mapGetters({
			municipalities: "location/municipalitiesList",
			selectedDistrict: "location/selectedDistrictId"
		}),
	},
	watch: {
		async municipality(val) {
			if (val) {
				this.municipalitiesLoading = true
				await this.$store.dispatch("location/filterMultimedia", {
					search: val,
					district: (this.selectedDistrict) ? this.selectedDistrict : ""
				})
				this.municipalitiesLoading = false
			}
		}
	},
}

export default MunicipalityAutocomplete
