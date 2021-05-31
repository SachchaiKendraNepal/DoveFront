const AdminTableDeleteItemMixin = {
	methods: {
		openAdminDeleteItemDialog(itemId, itemText) {
			this.$bus.emit("openAdminDeleteDialog", {
				itemId: itemId,
				itemText: itemText
			})
		},
	}
}

export default AdminTableDeleteItemMixin
