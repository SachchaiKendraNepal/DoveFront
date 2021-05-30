/**
 * required mixin data
 * - fetchAction
 * - deleteAction
 * - modelName
 */
const AdminTableList = {
	data() {
		return {
			totalDesserts: 0,
			totalItems: 0,
			isLoading: false,
			search: "",
			items: [],
			options: {},
			loading: false,
			dialogDelete: false,
			itemIdToDelete: null
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
		dialogDelete(val) {
			val || this.closeDelete()
		},
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
		closeDelete() {
			this.dialogDelete = false
		},
		formatDate(date) {
			return this.$moment(date).fromNow()
		},
		async openSnack(text, color="error") {
			await this.$store.dispatch("snack/setSnackState", true)
			await this.$store.dispatch("snack/setSnackColor", color)
			await this.$store.dispatch("snack/setSnackText", text)
		},
		async deleteItemConfirm(districtId) {
			this.dialogDelete = true
			this.itemToDelete = districtId
		},
		async deleteItem() {
			if (!this.mixinData) return;
			const deleted = await this.$store.dispatch(this.mixinData.deleteAction, {id: this.itemToDelete})
			if (deleted) {
				await this.openSnack(`${this.mixinData.modelName} deleted successfully.`, "success")
				await this.initialize(this.options.page)
			}
			else await this.openSnack("District delete failed. Try again later.")
			this.itemToDelete = null
			this.closeDelete()
		}
	}
};

export default AdminTableList;
