import $api from "@/handler/axios"
const util = require("util")
import urls from "@/urls.json"
const profileUrs = urls.profile

export const SET_PROFILE = "SET_PROFILE"
export const SET_PROFILE_IMAGES = "SET_PROFILE_IMAGES"
export const SET_USER_PROFILE_FORM_ERRORS = "SET_USER_PROFILE_FORM_ERRORS"


const defaultUserProfileFormErrors = {
	current_city: null,
	contact: null,
	country: null,
	province: null,
	district: null
}


const state = {
	profile: {},
	profileImage: {},
	userProfileFormErrors: {
		...defaultUserProfileFormErrors
	}
}

const mutations = {
	[SET_PROFILE](state, value) {
		return state.profile = value
	},
	[SET_PROFILE_IMAGES](state, value) {
		return state.profileImage = value
	},
	[SET_USER_PROFILE_FORM_ERRORS](state, value) {
		return state.userProfileFormErrors = value
	}
}

const getters = {
	profile: (state) => {
		return state.profile
	},
	profileImages: (state) => state.profileImages,
	profileUpdateFormErrors: (state) => state.userProfileFormErrors
}

const actions = {
	clearUserProfileFormErrors({commit}) {
		commit("SET_USER_PROFILE_FORM_ERRORS", { ...defaultUserProfileFormErrors })
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
				commit("SET_USER_PROFILE_FORM_ERRORS", e.response.data)
				return false
			}
			return 500
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
