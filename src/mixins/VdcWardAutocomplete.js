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
		}),
	},
	watch: {
		async vdcWard(val) {
			if (val) {
				this.vdcWardsLoading = true
				await this.$store.dispatch("location/filterVdcWard", {
					search: val,
					vdc: (this.vdc)
						? (typeof this.vdc === "object")
							? this.vdc.id
							: this.vdc
						: ""
				})
				this.vdcWardsLoading = false
			}
		}
	},
}

export default VdcWardAutocomplete
