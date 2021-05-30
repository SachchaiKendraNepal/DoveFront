import {mapGetters} from "vuex";

const ProvinceAutocomplete = {
	data() {
		return {
			province: null,
			provincesLoading: false,
		}
	},
	computed: {
		...mapGetters({
			provinces: "location/provincesList",
			selectedCountry: "location/selectedCountryId"
		}),
	},
	watch: {
		async province(val) {
			if (val) {
				this.provincesLoading = true
				await this.$store.dispatch("location/filterProvinces", {
					search: val,
					country: (this.selectedCountry) ? this.selectedCountry : ""
				})
				this.provincesLoading = false
			}
		}
	},
}

export default ProvinceAutocomplete
