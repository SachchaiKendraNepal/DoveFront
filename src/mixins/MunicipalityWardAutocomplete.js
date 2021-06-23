import {mapGetters} from "vuex";

const MunicipalityWardAutocomplete = {
	data() {
		return {
			municipalityWard: null,
			municipalityWardsLoading: false
		}
	},
	computed: {
		...mapGetters({
			municipalityWards: "location/municipalityWardsList"
		}),
	},
	watch: {
		async municipalityWard(val) {
			if (val) {
				this.municipalityWardsLoading = true
				await this.$store.dispatch("location/filterMunicipalityWard", {
					search: val,
					municipality: (this.municipality) ? this.municipality.id : ""
				})
				this.municipalityWardsLoading = false
			}
		}
	},
}

export default MunicipalityWardAutocomplete
