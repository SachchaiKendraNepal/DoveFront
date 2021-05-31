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
			selectedVdc: "location/selectedVdcId"
		}),
	},
	watch: {
		async vdcWard(val) {
			if (val) {
				this.vdcWardsLoading = true
				await this.$store.dispatch("location/filterVdcWard", {
					search: val,
					vdc: (this.selectedVdc) ? this.selectedVdc : ""
				})
				this.vdcWardsLoading = false
			}
		}
	},
}

export default VdcWardAutocomplete
