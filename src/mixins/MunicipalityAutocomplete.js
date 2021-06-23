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
					district: (this.district)
						? (typeof this.district === "object")
							? this.district.id
							: this.district
						: ""
				})
				this.municipalitiesLoading = false
			}
		}
	},
}

export default MunicipalityAutocomplete
