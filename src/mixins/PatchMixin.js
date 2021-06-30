/**
 * depends on base data `model`
 * emits reload event to reload respective model
 */
const PatchMixin = {
	methods: {
		async patch(model, id, body){
			const actionText = `${model}/patch`
			const updated = await this.$store.dispatch(
				actionText,
				{
					id: id,
					body: body
				}
			)
			if (updated) {
				await this.$store.dispatch(`${model}/clearFormErrors`)
				this.$bus.emit("reload")
				await this.openSnack(`${this.model.toUpperCase()} updated successfully.`, "success")
			} else {
				if (this.formErrors["non_field_errors"]) {
					await this.openSnack(this.formErrors["non_field_errors"][0])
				} else {
					await this.openSnack(`${model.toUpperCase()} update failed. Please try again.`)
				}
			}
		},
	}
}
export default PatchMixin
