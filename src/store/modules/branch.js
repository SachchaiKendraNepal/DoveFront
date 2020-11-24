import $api from "@/handler/axios"

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
	async getAllBranches({commit}) {
		const response = await $api.get("/branch/")
		commit("SET_BRANCHES", response)
	}
}

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations
}
