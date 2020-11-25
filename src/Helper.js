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
	cookEditData(target, rawData, imageKey) {
		const body = {}
		let objArray = []
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

		for (const [key, value] of Object.entries(rawData)) {
			if(!body.hasOwnProperty(key)) {
				body[key] = value
			}
		}
		// remove image from object if not changed
		if (rawData.imageForUpload !== undefined) {
			body[imageKey] = rawData.imageForUpload[0]
		} else delete body[imageKey]
		// Remove unused municipality or vdc
		if (body.municipality > 0) {
			delete body.vdc
			delete body.vdc_ward
		} else {
			delete body.municipality
			delete body.municipality_ward
		}
		return body
	},
	getFormData(data) {
		let formData = new FormData()
		for (const [key, value] of Object.entries(data)) {
			if (!keysToIgnore.includes(key)) {
				if (Array.isArray(value)) {
					for (let i = 0; i < value.length; i++) {
						formData.append(`${key}`, value[i]);
					}
				} else {
					formData.append(key, value)
				}
			}
		}
		return formData
	}
}
