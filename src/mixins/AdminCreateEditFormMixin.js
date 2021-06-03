const AdminCreateEditFormMixin = {
	data() {
		return {
			editedIndex: -1,
			dialog: false
		}
	},
	methods: {
		formTitle(title) {
			return this.editedIndex === -1 ? `Add New ${title}` : `Edit ${title}`
		},
		formIcon() {
			return this.editedIndex === -1 ? "mdi-plus-circle" : "mdi-pencil"
		},
		openDialog() {
			this.dialog = true
		},
		async openCreateDialog() {
			this.editedItem = this.defaultItem
			await this.$store.dispatch(this.mixinData["clearFormErrorAction"])
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
				this.editedItem = Object.assign({}, this.defaultItem)
				this.editedIndex = -1
			})
		},
	}
}

export default  AdminCreateEditFormMixin
