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
			municipalityWards: "location/municipalitiesList",
			selectedMunicipality: "location/selectedMunicipalityId"
		}),
	},
	watch: {
		async municipalityWard(val) {
			if (val) {
				this.municipalityWardsLoading = true
				await this.$store.dispatch("location/filterMultimediaWard", {
					search: val,
					district: (this.selectedMunicipality) ? this.selectedMunicipality : ""
				})
				this.municipalityWardsLoading = false
			}
		}
	},
}

export default MunicipalityWardAutocomplete
