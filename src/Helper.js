const keysToIgnore = [
	"id",
	"imageForUpload",
	"created_by",
	"updated_by",
	"approved_by",
	"created_at",
	"approved_at",
	"updated_at"
]

const requiredObjectsForBranch = ["country", "province", "district", "vdc", "vdc_ward", "municipality", "municipality_ward"]
const requiredObjectsForEvent = ["country", "province", "district", "organizer", "vdc", "vdc_ward", "municipality", "municipality_ward"]

module.exports = {
	/**
	 * Cooks create data for a model
	 *
	 * @param {string} imageKey name of image key
	 * @param {Object} rawData editedItem to be parsed
	 *
	 * @return {Object}
	 */
	cookCreateData(imageKey, rawData) {
		// remove image from object if not added
		if (rawData.imageForUpload !== undefined) {
			rawData[imageKey] = rawData.imageForUpload[0]
		} else delete rawData[imageKey]
		return rawData
	},
	/**
	 * Cooks edit data for a model
	 * @param {string} target Either "branch" or "event"
	 * @param {Object} rawData editedItem to be parsed
	 * @param {string} imageKey name of image key
	 *
	 * @return {Object}
	 */
	cookEditData(target, rawData, imageKey) {
		const body = {}
		let objArray = []
		// get required objects to be id'ed
		if (target === "branch") objArray = requiredObjectsForBranch
		else if (target === "event") objArray = requiredObjectsForEvent
		// get id from objects
		objArray.forEach(model => {
			if (rawData[model] !== undefined && rawData[model] !== null) {
				if (typeof rawData[model] === "object") {
					body[model] = rawData[model].id
				}
			}
		})
		// think about image field
		if (rawData.imageForUpload !== undefined) {
			body[imageKey] = rawData.imageForUpload[0]
		}

		// copy entire rawData to a separate body
		for (const [key, value] of Object.entries(rawData)) {
			if(!body.hasOwnProperty(key)) {
				body[key] = value
			}
		}
		// remove image from object if not changed
		if (rawData.imageForUpload !== undefined) {
			body[imageKey] = rawData.imageForUpload[0]
		} else delete body[imageKey]
		return body
	},
	/**
	 * Return form data for provided raw object
	 * @param {Object} data raw data to be parsed
	 *
	 * @return {FormData}
	 */
	getFormData(data) {
		let formData = new FormData()
		for (const [key, value] of Object.entries(data)) {
			if (!keysToIgnore.includes(key)) {
				if (Array.isArray(value)) {
					for (let i = 0; i < value.length; i++) {
						formData.append(`${key}`, value[i]);
					}
				} else if(value) {
					formData.append(key, value)
				}
			}
		}
		return formData
	},
	isCurrentUserSuperAdmin() {
		if (this.isUserLoggedIn()) {
			const currentUser = this.getCurrentUser()
			return currentUser["is_superuser"]
		}
		return false
	},
	getCurrentUser() {
		return JSON.parse(localStorage.getItem("currentUser"))
	},
	isUserLoggedIn() {
		const currentUser = this.getCurrentUser()
		return typeof currentUser === "object";
	},
	getVideoIdFromYoutubeURL(url) {
		let ID = ""
		url = url.replace(/([><])/gi,"").split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
		if(url[2] !== undefined) {
			ID = url[2].split(/[^0-9a-z_\-]/i);
			ID = ID[0];
		}
		else {
			ID = url;
		}
		return ID;
	}
}
