import $api from "@/handler/axios"
import urls from "@/urls.json"
const util = require("util")

const branchUrl = urls.branch

export const SET_BRANCHES = "SET_BRANCHES"
export const SET_BRANCH = "SET_BRANCH"
export const SET_BRANCH_FORM_ERRORS = "SET_BRANCH_FORM_ERRORS"

const state = {
	branches: {},
	branch: {},
	selectedBranch: null,
	formErrorMessages: {}
}

const mutations = {
	[SET_BRANCHES](state, value) {
		state.branches = value
	},
	[SET_BRANCH](state, value) {
		state.branch = value
	},
	[SET_BRANCH_FORM_ERRORS](state, value) {
		state.formErrorMessages = value
	}
}

const getters = {
	list: state => state.branches,
	detail: state => state.branch,
	formErrors: state => state.formErrorMessages
}

const actions = {
	clearFormErrors({commit}) {
		commit("SET_BRANCH_FORM_ERRORS", {})
	},
	async fetchAll({commit}) {
		const response = await $api.get(branchUrl.list)
		commit("SET_BRANCHES", response)
	},
	async filter({commit}, payload) {
		const response = await $api.getWithPayload(branchUrl.list, payload)
		commit("SET_BRANCHES", response)
	},

	async fetchSingle({commit}, {id: id}) {
		try {
			const response = await $api.get(util.format(branchUrl.detail, id))
			commit("SET_BRANCH", response)
			return true
		} catch (e) {
			return false
		}
	},

	async create({commit}, {body: body}) {
		try {
			await $api.post(branchUrl.list, body)
			return true
		} catch (e) {
			if (parseInt(e.response.status.toString()) === 400) {
				commit("SET_BRANCH_FORM_ERRORS", e.response.data)
			}
			return false
		}
	},

	async patch({commit}, {id: id, body:body}) {
		try {
			await $api.patch(util.format(branchUrl.detail, id), body)
			return true
		} catch (e) {
			if (parseInt(e.response.status.toString()) === 400) {
				commit("SET_BRANCH_FORM_ERRORS", e.response.data)
			}
			return false
		}
	},

	async delete({commit}, {id: id}) {
		try {
			await $api.delete(util.format(branchUrl.detail, id))
			return true
		} catch (e) {
			return false
		}
	},

	async approve({}, {id: id}) {
		try {
			await $api.put(util.format(branchUrl.toggleApproval, id))
			return true
		} catch {
			return false
		}
	},
	async disapprove({}, {id: id}) {
		try {
			await $api.delete(util.format(branchUrl.toggleApproval, id))
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
