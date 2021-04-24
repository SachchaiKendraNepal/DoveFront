import $api from "@/handler/axios"
import urls from "@/urls.json"
import {SET_MULTIMEDIA_POST_CREATION_FORM_ERRORS} from "@/store/modules/multimedia";

const articleUrl = urls.article

export const SET_ARTICLES = "SET_ARTICLES"
export const SET_ARTICLE = "SET_ARTICLE"
export const SET_ARTICLE_POST_CREATION_FORM_ERRORS = "SET_ARTICLE_POST_CREATION_FORM_ERRORS"

const defaultArticlePostCreationFormErrors = {
	image: null,
	title: null,
	description: null
}

const state = {
	articles: {},
	article: {},
	articlePostCreationFormErrors: {
		... defaultArticlePostCreationFormErrors
	}
}

const mutations = {
	[SET_ARTICLES](state, value) {
		state.articles = value
	},
	[SET_ARTICLE](state, value) {
		state.article = value
	},
	[SET_ARTICLE_POST_CREATION_FORM_ERRORS](state, value) {
		state.articlePostCreationFormErrors = value
	}
}

const getters = {
	allArticles: state => {
		return state.articles.results
	},
	articlePostCreationFormErrors: state => {
		return state.articlePostCreationFormErrors
	}
}

const actions = {
	clearArticlePostCreationFormErrors({ commit }) {
		commit("SET_ARTICLE_POST_CREATION_FORM_ERRORS", { ... defaultArticlePostCreationFormErrors })
	},
	async getAll({commit}) {
		const response = await $api.get(articleUrl.set)
		commit("SET_ARTICLES", response)
	},

	async createArticlePost({commit}, body) {
		try {
			const resp = await $api.post(articleUrl.createWithList, body)
			return !!resp.success;
		} catch (e) {
			const status = parseInt(e.response.status.toString())
			if (status === 400 || status === 404) {
				commit("SET_ARTICLE_POST_CREATION_FORM_ERRORS", e.response.data)
				return false
			} else return 500
		}
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
