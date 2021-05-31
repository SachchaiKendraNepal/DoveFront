import {mapGetters} from "vuex";

const BranchAutocomplete = {
	data() {
		return {
			branch: null,
			branchesLoading: false
		}
	},
	computed: {
		...mapGetters({
			branches: "branch/list"
		}),
	},
	watch: {
		async branch(val) {
			if (val) {
				this.branchesLoading = true
				await this.$store.dispatch("branch/filter", {
					search: val
				})
				this.branchesLoading = false
			}
		}
	},
}

export default BranchAutocomplete
