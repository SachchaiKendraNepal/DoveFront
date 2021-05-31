/**
 *
 * inheriting component should have following fields:
 * - errors: Object
 *
 */
import Snack from "@/mixins/Snack";

const AdminFieldErrorMessage = {
	mixins: [Snack],
	computed: {
		getErrorMessage() {
			if (!this.errors) return null
			if (this.errors[this.name]) {
				return this.errors[this.name][0]
			}
			if (this.errors["non_field_errors"]) {
				this.openSnack(this.errors["non_field_errors"][0]).then(r => r)
			}
			else return null
		}
	}
}
export default AdminFieldErrorMessage
