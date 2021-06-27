const ToggleApproval = {
	methods: {
		getCapitalizedModelName() {
			return this.mixinData["modelName"].replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())));
		},
		async approve(item) {
			const approveAction = `${this.mixinData["modelName"]}/approve`
			const response = await this.$store.dispatch(approveAction, {id: item.id})
			if (response) {
				await this.openSnack(`${this.getCapitalizedModelName()} approved`, "success")
				await this.initialize()
			} else await this.openSnack(`${this.getCapitalizedModelName()} approve failed. Try again.`, "success")
		},
		async revokeApprove(item) {
			const revokeApprovalAction = `${this.mixinData["modelName"]}/disapprove`
			const response = await this.$store.dispatch(revokeApprovalAction, {id: item.id})
			if (response) {
				await this.openSnack(`${this.getCapitalizedModelName()} approve revoked`, "success")
				await this.initialize()
			} else await this.openSnack(`${this.getCapitalizedModelName()} approve revoke failed. Try again.`, "success")
		},
	}
}

export default ToggleApproval
