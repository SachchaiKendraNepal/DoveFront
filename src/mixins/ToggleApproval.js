const ToggleApproval = {
	methods: {
		async toggleApproval(item) {
			if (!this.mixinData["toggleApprovalAction"]) return
			const response = await this.$store.dispatch(this.mixinData["toggleApprovalAction"], { id: item.id })
			if (response) {
				await this.openSnack(this.mixinData["modelName"] + " approval toggled.", "success")
				await this.$bus.emit("reload")
			}
			else await this.openSnack(this.mixinData["modelName"] + "  approval toggle failed. Try again.")
		},
	}
}

export default ToggleApproval
