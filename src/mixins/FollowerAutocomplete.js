import {mapGetters} from "vuex";

const FollowerAutocomplete = {
	data() {
		return {
			follower: null,
			followersLoading: false
		}
	},
	computed: {
		...mapGetters({
			followers: "user/list"
		}),
	},
	watch: {
		async follower(val) {
			if (val) {
				this.followersLoading = true
				await this.$store.dispatch("user/filter", {
					search: val
				})
				console.log(this.followers)
				this.followersLoading = false
			}
		}
	},
}

export default FollowerAutocomplete
