import $api from "@/handler/axios"
import urls from "@/urls.json"

const multimediaUrl = urls.multimedia

export const SET_MULTIMEDIAS = "SET_MULTIMEDIAS"
export const SET_MULTIMEDIA = "SET_MULTIMEDIA"

const state = {
	multimedias: {},
	multimedia: {}
}

const mutations = {
	[SET_MULTIMEDIAS](state, value) {
		state.multimedias = value
	},
	[SET_MULTIMEDIA](state, value) {
		state.multimedia = value
	}
}

const getters = {
	allArticles: state => {
		return state.multimedias.results
	}
}

const actions = {
	async getAll({commit}) {
		const response = await $api.get(multimediaUrl.set)
		commit("SET_MULTIMEDIAS", response)
	},

	async create({commit}, body) {
		await $api.post(multimediaUrl.createWithList, body)
	},

	async update({commit}, payload) {
		await $api.put(multimediaUrl + payload.id + "/", payload.body)
	},

	async delete({commit}, payload) {
		await $api.delete(multimediaUrl + payload.id + "/")
	}
}

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations
}
