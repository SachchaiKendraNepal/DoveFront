import {mapGetters} from "vuex";

const CountryAutocomplete = {
	data() {
		return {
			country: null,
			countriesLoading: false
		}
	},
	computed: {
		...mapGetters({
			countries: "location/countriesList",
		}),
	},
	watch: {
		async country(val) {
			if (val) {
				this.countriesLoading = true
				await this.$store.dispatch("location/filterCountries", {name: val})
				this.countriesLoading = false
			}
		}
	},
}

export default CountryAutocomplete
