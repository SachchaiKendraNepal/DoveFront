const AdminTableDeleteItemMixin = {
	methods: {
		openAdminDeleteItemDialog(itemId, itemText, action=null) {
			this.$bus.emit("openAdminDeleteDialog", {
				itemId: itemId,
				itemText: itemText,
				action: action
			})
		},
	}
}

export default AdminTableDeleteItemMixin
