import $api from "@/handler/axios"
import urls from "@/urls.json"


const state = {
	modelStatus: {}
}

const mutations = {
	setStatus(state, value) {
		state.modelStatus = value
	}
}

const getters = {
	list: state => state.modelStatus
}

const actions = {
	async fetchModelStatus({commit}) {
		const response = await $api.get(urls.modelStatus)
		commit("setStatus", response)
	}
}

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations
}
