import Snack from "@/mixins/Snack";

const AdminTableList = {
	mixins: [Snack],
	data() {
		return {
			totalItems: 0,
			isLoading: false,
			search: "",
			items: [],
			options: {},
			loading: false
		};
	},
	computed: {
		/**
		 * gets total pagination count required in a table
		 *
		 * serverItemsPerPage is backend constant `10`
		 *
		 * @returns {number}
		 */
		getTotalPaginationData() {
			if (!this.items) return 0
			const serverItemsPerPage = 3
			const  rem = this.items.count % serverItemsPerPage
			const div = Math.floor(this.items.count / serverItemsPerPage)
			if (rem > 0) return div + 1
			else return div
		},
		/**
		 * gets total items count in a page
		 *
		 * @returns {number}
		 */
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
	async created() {
		this.$bus.on("reload", this.initialize)
	},
	beforeUnmount() {
		this.$bus.off("reload")
	},
	methods: {
		formatDate(date) {
			return this.$moment(date).fromNow()
		}
	}
};

export default AdminTableList;
