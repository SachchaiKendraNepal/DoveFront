import $helper from "@/Helper";
import $api from "@/handler/axios"
const util = require("util")
import urls from "@/urls.json"
const userUrls = urls.user

export const SET_USERS = "SET_USERS"
export const SET_USER = "SET_USER"
export const SET_ROLES = "SET_ROLES"
export const SET_FORM_ERRORS = "SET_FORM_ERRORS"

const state = {
	users: [],
	user: {},
	formErrors: {}
}
const mutations = {
	[SET_USERS](state, value) {
		state.users = value
	},
	[SET_USER](state, value) {
		state.user = value
	},
	[SET_ROLES](state, value) {
		state.roles = value
	},
	[SET_FORM_ERRORS](state, value) {
		state.formErrors = value
	}
}

const getters = {
	list: (state) => state.users,
	detail: (state) => state.user,
	roles: (state) => state.roles,
	formErrors: (state) => state.formErrors,
}

const actions = {
	clearFormErrors({ commit }) {
		commit("SET_FORM_ERRORS", {})
	},
	async create({ commit }, {body: body}) {
		try {
			await $api.post(userUrls.list, body)
			return true
		} catch (e) {
			if (parseInt(e.response.status.toString()) === 400) {
				commit("SET_FORM_ERRORS", e.response.data)
			}
			return false
		}
	},
	async fetchById({ commit }, {id: id}) {
		try {
			const response = await $api.get(util.format(userUrls.detail, id))
			commit("SET_USER", response)
			return true
		} catch {
			return false
		}
	},
	async fetchAll({ commit }) {
		try {
			const response = await $api.get(userUrls.list)
			commit(SET_USERS, response)
			return true
		} catch (e) {
			return false
		}
	},
	async filter({ commit }, payload) {
		try {
			const response = await $api.getWithPayload(userUrls.filter, payload)
			commit(SET_USERS, response)
		} catch (e) {
			throw e
		}
	},
	async update({ commit }, {id: id, body: body, myProfile: myProfile }) {
		try {
			const res = await $api.patch(util.format(userUrls.detail, id), body)
			if (myProfile) {
				$helper.setCurrentUser(res)
			}
			return true
		} catch (e) {
			if (parseInt(e.response.status.toString()) === 400) {
				commit("SET_FORM_ERRORS", e.response.data)
			}
			return false
		}
	},
	async delete({}, {id: id}) {
		try {
			await $api.delete(util.format(userUrls.detail, id))
			return true
		} catch (e) {
			return false
		}
	},
	changePassword({ commit }, {body: body}) {
		return $api.post("update-password", body)
	},
	forgotPassword({ commit }, {email: email}) {
		const fd = new FormData()
		fd.append("email", email)
		return $api.post("reset-password", fd)
	},
	async registerFollower({commit}, {body: body}) {
		try {
			await $api.post("register-follower", body)
			return true
		} catch (e) {
			if (parseInt(e.response.status.toString()) === 400) {
				commit("SET_FORM_ERRORS", e.response.data)
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
