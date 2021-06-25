import $api from "@/handler/axios"
import $helper from "@/Helper"
const util = require("util")
import urls from "@/urls.json"

export const SET_PROFILE = "SET_PROFILE"
export const SET_PROFILE_IMAGES = "SET_PROFILE_IMAGES"
export const SET_PROFILE_FORM_ERRORS = "SET_PROFILE_FORM_ERRORS"


const state = {
	profile: {},
	profileImage: {},
	formErrors: {}
}

const mutations = {
	[SET_PROFILE](state, value) {
		$helper.setCurrentUser(value)
		return state.profile = value
	},
	[SET_PROFILE_IMAGES](state, value) {
		return state.profileImage = value
	},
	[SET_PROFILE_FORM_ERRORS](state, value) {
		return state.formErrors = value
	}
}

const getters = {
	updateFormErrors: (state) => state.formErrors
}

const actions = {
	clearFormErrors({commit}) {
		commit("SET_PROFILE_FORM_ERRORS", {})
	},
	async update({commit}, {id: id, body: body}) {
		try {
			const response = await $api.patch(
				util.format(urls.profile.detail, id),
				body
			)
			commit("SET_PROFILE", response)
			return true
		} catch (e) {
			if (parseInt(e.response.status.toString()) === 400) {
				commit("SET_PROFILE_FORM_ERRORS", e.response.data)
			}
			return false
		}
	},
	async setActiveProfileImage({commit}, id) {
		try {
			await $api.put(util.format(urls.profile.setActiveProfileImage, id))
			return true
		} catch (e) {
			return false
		}

	},
	async setActiveCoverImage({commit}, id) {
		try {
			await $api.put(util.format(urls.profile.setActiveCoverImage, id))
			return true
		} catch (e) {
			return false
		}
	},
	async uploadProfileImage({commit}, body) {
		try {
			await $api.post(urls.profile.imageList, body)
			return true
		} catch (e) {
			if (parseInt(e.response.status.toString()) === 400) {
				commit("SET_PROFILE_FORM_ERRORS", e.response.data)
			}
			return false
		}
	},
	async uploadCoverImage({commit}, body) {
		try {
			await $api.post(urls.profile.coverList, body)
			return true
		} catch (e) {
			if (parseInt(e.response.status.toString()) === 400) {
				commit("SET_PROFILE_FORM_ERRORS", e.response.data)
			}
			return false
		}
	},
	async deleteProfileImage({}, id) {
		try {
			await $api.delete(util.format(urls.profile.imageDetail, id))
			return true
		} catch {
			return false
		}
	},
	async deleteCoverImage({}, id) {
		try {
			await $api.delete(util.format(urls.profile.coverDetail, id))
			return true
		} catch {
			return false
		}
	}
}

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations
}
