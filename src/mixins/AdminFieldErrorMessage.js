/**
 *
 * inheriting component should have following fields:
 * - errors: Object
 *
 */
const AdminFieldErrorMessage = {
	computed: {
		getErrorMessage() {
			if (!this.errors) return null
			if (this.errors[this.name]) {
				return this.errors[this.name][0]
			}
			else return null
		}
	}
}
export default AdminFieldErrorMessage
