import $api from "@/handler/axios"
import urls from "@/urls.json"

const branchUrl = urls.branch

export const SET_BRANCHES = "SET_BRANCHES"
export const SET_BRANCH = "SET_BRANCH"

const state = {
	branches: {},
	branch: {}
}

const mutations = {
	[SET_BRANCHES](state, value) {
		state.branches = value
	},
	[SET_BRANCH](state, value) {
		state.branch = value
	}
}

const getters = {
	allBranches: state => {
		return state.branches.results
	}
}

const actions = {
	async getAll({commit}) {
		const response = await $api.get(branchUrl)
		commit("SET_BRANCHES", response)
	},

	async create({commit}, body) {
		await $api.post(branchUrl, body)
	},

	async update({commit}, payload) {
		await $api.put(branchUrl + payload.id + "/", payload.body)
	},

	async delete({commit}, payload) {
		await $api.delete(branchUrl + payload.id + "/")
	}
}

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations
}
