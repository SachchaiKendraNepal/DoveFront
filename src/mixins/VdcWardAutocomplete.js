import {mapGetters} from "vuex";

const VdcWardAutocomplete = {
	data() {
		return {
			vdcWard: null,
			vdcWardsLoading: false
		}
	},
	computed: {
		...mapGetters({
			vdcWards: "location/vdcWardsList",
			selectedVdcWard: "location/selectedDistrictId"
		}),
	},
	watch: {
		async vdcWard(val) {
			if (val) {
				this.vdcWardsLoading = true
				await this.$store.dispatch("location/filterVdc", {
					search: val,
					district: (this.selectedDistrict) ? this.selectedDistrict : ""
				})
				this.vdcWardsLoading = false
			}
		}
	},
}

export default VdcWardAutocomplete
