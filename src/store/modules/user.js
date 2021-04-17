import $api from "@/handler/axios"

export const SET_USERS = "SET_USERS"
export const SET_ROLES = "SET_ROLES"
export const SET_REGISTER_FORM_ERRS = "SET_REGISTER_FORM_ERRS"

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

const state = {
	users: {},
	user: {},
	roles: {},
	registerFormErrors: {
		... defaultRegisterErrors
	}
}
const mutations = {
	[SET_USERS](state, value) {
		state.users = value
	},
	[SET_ROLES](state, value) {
		state.roles = value
	},
	[SET_REGISTER_FORM_ERRS](statue, value) {
		state.registerFormErrors = value
	}
}

const getters = {
	users: (state) => state.users,
	roles: (state) => state.roles,
	registerFormErrors: (state) => state.registerFormErrors,
}

const actions = {
	clearRegisterFormErrors({ commit }) {
		commit("SET_REGISTER_FORM_ERRS", { ...defaultRegisterErrors })
	},
	async login({ commit }, user) {
		// always remove preserved/cached localStorage item at first
		localStorage.removeItem("sachchaiAccessToken")
		localStorage.removeItem("currentUser")
		try {
			const response = await $api.post("login", user)
			if (response.token) {
				// save currentUser at localStorage
				localStorage.setItem("currentUser", JSON.stringify(response.data))
				// save new access token at localStorage
				localStorage.setItem("sachchaiAccessToken", response.token)
				return true
			} else {
				localStorage.removeItem("sachchaiAccessToken")
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
	async logout({ commit }, username) {
		try {
			const response = await $api.post("logout", { username: username })
			localStorage.removeItem("sachchaiAccessToken")
			localStorage.removeItem("currentUser")
			return true
		} catch (e) {
			const status = parseInt(e.response.status.toString())
			if (status === 400) {
				return `Username: ${e.response.data.username[0]}`
			} else if (status === 404) return e.response.data.detail
			return 500
		}

	},
	async create({ commit }, userData) {
		const response = await $api.post("user", userData)
		console.log(response)
	},
	async get({ commit }, userID) {
		const response = await $api.getWithPayload("user", userID)
		console.log(response)
	},
	async list({ commit }) {
		try {
			const response = await $api.get("user")
			commit(SET_USERS, response)
			return response
		} catch (e) {
			throw e
		}
	},
	async update({ commit }, userData) {
		// TODO: TBD
	},
	changePassword({ commit }, changePwData) {
		return $api.post("update-password", changePwData)
	},
	forgotPassword({ commit }, userEmail) {
		const fd = new FormData()
		fd.append("email", userEmail)
		return $api.post("reset-password", fd)
	},
	async getAllRoles({ commit }) {
		// TODO: TBD
	},
	async registerFollower({commit}, userData) {
		try {
			await $api.post("register-follower", userData)
			return true
		} catch (e) {
			if (parseInt(e.response.status.toString()) === 400) {
				commit("SET_REGISTER_FORM_ERRS", e.response.data)
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
