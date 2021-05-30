import {mapGetters} from "vuex";

const VdcAutocomplete = {
	data() {
		return {
			vdc: null,
			vdcsLoading: false
		}
	},
	computed: {
		...mapGetters({
			vdcs: "location/vdcsList",
			selectedDistrict: "location/selectedDistrictId"
		}),
	},
	watch: {
		async vdc(val) {
			if (val) {
				this.vdcsLoading = true
				await this.$store.dispatch("location/filterVdc", {
					search: val,
					district: (this.selectedDistrict) ? this.selectedDistrict : ""
				})
				this.vdcsLoading = false
			}
		}
	},
}

export default VdcAutocomplete
