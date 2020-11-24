module.exports = {
	getFormData(data) {
		let formData = new FormData()
		for (const [key, value] of Object.entries(data)) {
			if (Array.isArray(value)) {
				for (let i = 0; i < value.length; i++) {
					formData.append(`${key}`, value[i]);
				}
			} else if (key === "id" || key === "imageForUpload") {
				// append nothing
			} else {
				formData.append(key, value)
			}
		}
		return formData
	}
}
