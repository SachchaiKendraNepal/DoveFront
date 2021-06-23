import $api from "@/handler/axios"
const util = require("util")
import urls from "@/urls.json"
const profileUrs = urls.profile

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
		localStorage.removeItem("currentUser")
		localStorage.setItem("currentUser", JSON.stringify(value))
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
				util.format(profileUrs.detail, id),
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
	}
}

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations
}
