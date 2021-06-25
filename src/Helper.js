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

module.exports = {
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
	clearApplicationData() {
		localStorage.removeItem("currentUser")
		localStorage.removeItem("sachchaiAccessToken")
	},
	setCurrentUser(currentUser) {
		localStorage.removeItem("currentUser")
		localStorage.setItem("currentUser", JSON.stringify(currentUser))
	},
	setAccessToken(token) {
		localStorage.removeItem("sachchaiAccessToken")
		localStorage.setItem("sachchaiAccessToken", token)
	},
	getAccessToken() {
		return localStorage.getItem("sachchaiAccessToken")
	},
	getCurrentUser() {
		return JSON.parse(localStorage.getItem("currentUser"))
	},
	getCurrentProfileImage() {
		return this.getCurrentUser()["active_profile_image"]
	},
	getCurrentCoverImage() {
		const defaultCover = require("@/assets/default_cover_img.jpg")
		const img = this.getCurrentUser()["active_cover_image"]
		if (!img) return defaultCover
		return img
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
	},
	getThumbnailForYoutubeVideo(videoUrl) {
		const videoId = this.getVideoIdFromYoutubeURL(videoUrl)
		return `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`
	},
	ifWriterIsCurrentUser(writerUsername) {
		const currentUser = this.getCurrentUser()
		return currentUser.username === writerUsername
	},
}
