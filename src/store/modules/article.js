import $api from "@/handler/axios"
import urls from "@/urls.json"

const articleUrl = urls.article

export const SET_ARTICLES = "SET_ARTICLES"
export const SET_ARTICLE = "SET_ARTICLE"

const state = {
	articles: {},
	article: {}
}

const mutations = {
	[SET_ARTICLES](state, value) {
		state.articles = value
	},
	[SET_ARTICLE](state, value) {
		state.article = value
	}
}

const getters = {
	allArticles: state => {
		return state.articles.results
	}
}

const actions = {
	async getAll({commit}) {
		const response = await $api.get(articleUrl.set)
		commit("SET_ARTICLES", response)
	},

	async create({commit}, body) {
		await $api.post(articleUrl.createWithList, body)
	},

	async update({commit}, payload) {
		await $api.put(articleUrl.set + payload.id + "/", payload.body)
	},

	async delete({commit}, payload) {
		await $api.delete(articleUrl.set + payload.id + "/")
	}
}

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations
}
