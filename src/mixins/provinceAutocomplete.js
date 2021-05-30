import {mapGetters} from "vuex";

const provinceAutocomplete = {
	data() {
		return {
			province: null,
			provincesLoading: false
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
				await this.$store.dispatch("location/searchProvincesByName", {name: val})
				this.provincesLoading = false
			}
		}
	},
}

export default provinceAutocomplete
