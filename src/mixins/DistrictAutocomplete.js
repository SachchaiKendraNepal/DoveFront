import {mapGetters} from "vuex";

const DistrictAutocomplete = {
	data() {
		return {
			district: null,
			districtsLoading: false
		}
	},
	computed: {
		...mapGetters({
			districts: "location/districtsList",
			selectedProvince: "location/selectedProvinceId"
		}),
	},
	watch: {
		async district(val) {
			if (val) {
				this.districtsLoading = true
				await this.$store.dispatch("location/filterDistricts", {
					search: val,
					province: (this.province)
						? (typeof this.province === "object")
							? this.province.id
							: this.province
						: ""
				})
				this.districtsLoading = false
			}
		}
	},
}

export default DistrictAutocomplete
