const util = require("util")
import $api from "@/handler/axios"
import urls from "@/urls.json"
const userUrls = urls.user

export const SET_USERS = "SET_USERS"
export const SET_USER = "SET_USER"
export const SET_ROLES = "SET_ROLES"
export const SET_REGISTER_FORM_ERRORS = "SET_REGISTER_FORM_ERRORS"
export const SET_CREATE_FORM_ERRORS = "SET_CREATE_FORM_ERRORS"

const defaultRegisterErrors = {
	first_name: null,
	last_name: null,
	username: null,
	email: null,
	contact: null,
	password: null,
	confirm_password: null,
	birth_date: null,
	current_city: null,
	home_town: null,
	country: null,
	province: null,
	district: null,
}

const defaultCreateFormErrors = {
	first_name: null,
	last_name: null,
	username: null,
	email: null,
}

const state = {
	users: [],
	user: {},
	registerFormErrors: {
		... defaultRegisterErrors
	},
	createFormErrors: {
		...defaultCreateFormErrors
	}
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
	[SET_REGISTER_FORM_ERRORS](statue, value) {
		state.registerFormErrors = value
	},
	[SET_CREATE_FORM_ERRORS](state, value) {
		state.userCreateFormErrors = value
	}
}

const getters = {
	list: (state) => state.users,
	detail: (state) => state.user,
	roles: (state) => state.roles,
	registerFormErrors: (state) => state.registerFormErrors,
	userCreateFormErrors: (state) => state.createFormErrors
}

const actions = {
	clearRegisterFormErrors({ commit }) {
		commit("SET_REGISTER_FORM_ERRORS", { ...defaultRegisterErrors })
	},
	clearCreateFormErrors({commit}) {
		commit("SET_CREATE_FORM_ERRORS", { ...defaultCreateFormErrors })
	},
	async create({ commit }, {body: body}) {
		try {
			await $api.post(userUrls.list, body)
			return true
		} catch (e) {
			if (parseInt(e.response.status.toString()) === 400) {
				commit("SET_CREATE_FORM_ERRORS", e.response.data)
			}
			return false
		}
	},
	async fetchById({ commit }, {id: id}) {
		const response = await $api.get(util.format(userUrls.detail, id))
		commit("SET_USER", response)
	},
	async fetchAll({ commit }) {
		try {
			const response = await $api.get(userUrls.list)
			commit(SET_USERS, response)
		} catch (e) {
			throw e
		}
	},
	async update({ commit }, {id: id, body: body}) {
		try {
			await $api.patch(util.format(userUrls.detail, id), body)
			return true
		} catch (e) {
			if (parseInt(e.response.status.toString()) === 400) {
				commit("SET_CREATE_FORM_ERRORS", e.response.data)
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
				commit("SET_REGISTER_FORM_ERRORS", e.response.data)
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
