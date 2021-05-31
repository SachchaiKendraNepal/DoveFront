const AdminCreateEditFormMixin = {
	data() {
		return {
			dialog: false
		}
	},
	methods: {
		openDialog() {
			this.dialog = true
		},
		async openCreateDialog() {
			await this.$store.dispatch(this.mixinData["clearFormErrorAction"])
			this.editedItem = {}
			this.openDialog()
		},

		async openEditDialog(args) {
			this.editedIndex = args.editedIndex
			this.editedItem = args.editedItem
			if (this.editedItem.contact) {
				this.editedItem.contact = this.editedItem.contact.substring(4)
			}
			this.openDialog()
		},

		closeCreateEditDialog() {
			this.dialog = false
			this.$nextTick(() => {
				this.editedItem = Object.assign({}, {})
				this.editedIndex = -1
			})
		},
	}
}

export default  AdminCreateEditFormMixin
