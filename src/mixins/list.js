const list = {
	data() {
		return {
			isLoading: false,
			search: "",
			options: {}
		};
	},
	computed: {
		getTotalPaginationData() {
			if (!this.items) return 0
			const serverItemsPerPage = 10
			const  rem = this.items.count % serverItemsPerPage
			const div = Math.floor(this.items.count / serverItemsPerPage)
			if (rem > 0) return div + 1
			else return div
		},
		getItemsPerPageCount() {
			if (!this.items) return 0
			if (!this.items.results) return 0
			return this.items.results.length
		}
	},
	watch: {
		options: {
			async handler(val) {
				if(val) {
					const page = val.page || "1";
					await this.initialize(page)
				}
			},
			deep: true,
		},
	},
	methods: {
		formatDate(date) {
			return this.$moment(date).fromNow()
		},
		async openSnack(text, color="error") {
			await this.$store.dispatch("snack/setSnackState", true)
			await this.$store.dispatch("snack/setSnackColor", color)
			await this.$store.dispatch("snack/setSnackText", text)
		},
	}
};

export default list;
