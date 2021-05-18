import $api from "@/handler/axios";

function clearApplication() {
	localStorage.removeItem("sachchaiAccessToken")
	localStorage.removeItem("currentUser")
}

const state = {}

const getters = {}

const mutations = {}

const actions = {
	async login({}, user) {
		// always remove preserved/cached localStorage item at first
		clearApplication()
		try {
			const response = await $api.post("login", user)
			if (response.token) {
				// save currentUser at localStorage
				localStorage.setItem("currentUser", JSON.stringify(response.data))
				// save new access token at localStorage
				localStorage.setItem("sachchaiAccessToken", response.token)
				return true
			} else {
				clearApplication()
				return false
			}
		} catch (e) {
			const status = parseInt(e.response.status.toString())
			if (status === 400 || status === 404) {
				return e.response.data.detail
			}
			return 500
		}
	},
	async logout({}, username) {
		try {
			await $api.post("logout", { username: username })
			clearApplication()
			return true
		} catch (e) {
			const status = (e.response) ? parseInt(e.response.status.toString()) : "500"
			if (status === 400) {
				return `Username: ${e.response.data.username[0]}`
			} else if (status === 404) return e.response.data.detail
			else {
				clearApplication()
				return true
			}
		}
	},
}

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations
}
