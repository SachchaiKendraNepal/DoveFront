import $api from "@/handler/axios";
import $helper from "@/Helper"

const state = {}

const getters = {}

const mutations = {}

const actions = {
	async login({}, user) {
		// always remove preserved/cached localStorage item at first
		$helper.clearApplicationData()
		try {
			const response = await $api.post("login", user)
			if (response.token) {
				$helper.setCurrentUser(response.data)
				$helper.setAccessToken(response.token)
				return true
			} else {
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
			$helper.clearApplicationData()
			return true
		} catch (e) {
			const status = (e.response) ? parseInt(e.response.status.toString()) : "500"
			if (status === 400) {
				return `Username: ${e.response.data.username[0]}`
			} else if (status === 404) return e.response.data.detail
			else {
				$helper.clearApplicationData()
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
