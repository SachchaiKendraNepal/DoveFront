const ToggleApproval = {
	methods: {
		getCapitalizedModelName() {
			return this.mixinData["modelName"].replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())));
		},
		async toggleApproval(item) {
			if (!this.mixinData["toggleApprovalAction"]) return
			const response = await this.$store.dispatch(this.mixinData["toggleApprovalAction"], {id: item.id})
			if (response) {
				const modelName = this.mixinData["modelName"].replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())));
				await this.openSnack(modelName + " approval toggled.", "success")
				await this.$bus.emit("reload")
			} else await this.openSnack(this.mixinData["modelName"] + "  approval toggle failed. Try again.")
		},
		async approve(item) {
			const approveAction = `${this.mixinData["modelName"]}/approve`
			const response = await this.$store.dispatch(approveAction, {id: item.id})
			if (response) {
				await this.openSnack(`${this.getCapitalizedModelName()} approved`, "success")
				await this.$bus.emit("reload")
			} else await this.openSnack(`${this.getCapitalizedModelName()} approve failed. Try again.`, "success")
		},
		async revokeApprove(item) {
			const revokeApprovalAction = `${this.mixinData["modelName"]}/disapprove`
			const response = await this.$store.dispatch(revokeApprovalAction, {id: item.id})
			if (response) {
				await this.openSnack(`${this.getCapitalizedModelName()} approve revoked`, "success")
				await this.$bus.emit("reload")
			} else await this.openSnack(`${this.getCapitalizedModelName()} approve revoke failed. Try again.`, "success")
		},
	}
}

export default ToggleApproval
