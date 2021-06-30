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
		}),
	},
	watch: {
		async province(val) {
			if (val) {
				this.provincesLoading = true
				await this.$store.dispatch("location/filterProvinces", {
					search: val,
					country: (this.country)
						? (typeof this.country === "object")
							? this.country.id
							: this.country
						: ""
				})
				this.provincesLoading = false
			}
		}
	},
}

export default ProvinceAutocomplete
