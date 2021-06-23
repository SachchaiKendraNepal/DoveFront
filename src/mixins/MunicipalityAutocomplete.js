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
			municipalities: "location/municipalitiesList"
		}),
	},
	watch: {
		async municipality(val) {
			if (val) {
				this.municipalitiesLoading = true
				await this.$store.dispatch("location/filterMunicipality", {
					search: val,
					district: (this.district) ? this.district.id : ""
				})
				this.municipalitiesLoading = false
			}
		}
	},
}

export default MunicipalityAutocomplete
