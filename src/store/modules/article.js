import $api from "@/handler/axios"
import urls from "@/urls.json"

const util = require("util")

const articleUrl = urls.article

export const SET_ARTICLES = "SET_ARTICLES"
export const SET_ARTICLE = "SET_ARTICLE"
export const SET_ARTICLE_POST_CREATION_FORM_ERRORS = "SET_ARTICLE_POST_CREATION_FORM_ERRORS"
export const SET_ARTICLE_IMAGES = "SET_ARTICLE_IMAGES"
export const SET_ARTICLE_EXTRA_STATUS = "SET_ARTICLE_EXTRA_STATUS"

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
	},
	articleImages: {},
	articleExtraStatus: {}
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
	},
	[SET_ARTICLE_IMAGES](state, value) {
		state.articleImages = value
	},
	[SET_ARTICLE_EXTRA_STATUS](state, value) {
		state.articleExtraStatus = value
	}
}

const getters = {
	allArticles: state => {
		return state.articles.results
	},
	articleDetail: state => {
		return state.article
	},
	articlePostCreationFormErrors: state => {
		return state.articlePostCreationFormErrors
	},
	allArticleImages: state => {
		return state.articleImages.data
	},
	articleExtraStatusDetail: state => {
		return state.articleExtraStatus
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

	async getSingle({ commit }, {id: id}) {
		try {
			const response = await $api.get(articleUrl.set + id)
			commit("SET_ARTICLE", response)
			return true
		} catch (e) {
			return false
		}
	},

	async getAllApproved({commit}) {
		const response = await $api.get(articleUrl.set + "?is_approved=true")
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
	},

	async approve({}, {id: id}) {
		try {
			await $api.post(util.format(articleUrl.toggleApproval, id))
			return true
		} catch (e) {
			return false
		}
	},

	async fetchImagesForArticle({commit}, {id: id}) {
		try {
			const response = await $api.get(util.format(articleUrl.images, id))
			commit("SET_ARTICLE_IMAGES", response)
			return response
		} catch (e) {
			return false
		}
	},

	async fetchExtraStatus({commit}, {id: id}) {
		try {
			const response = await $api.get(util.format(articleUrl.extraStatus, id))
			commit("SET_ARTICLE_EXTRA_STATUS", response)
			return response
		} catch (e) {
			return false
		}
	},

	async toggleLoveStatus({}, {id: id}) {
		try {
			const response = await $api.post(util.format(articleUrl.toggleLove, id))
			return !!response.success;
		} catch (e) {
			return false
		}
	},

	async toggleBookmarkStatus({}, {id: id}) {
		try {
			const response = await $api.post(util.format(articleUrl.toggleBookmark, id))
			return !!response.success;
		} catch (e) {
			return false
		}
	},

	async fetchComments({}, {id: id}) {
		try {
			return await $api.get(util.format(articleUrl.comment, id))
		} catch (e) {
			return false
		}
	},

	async postComment({}, {body: body}) {
		try {
			await $api.post(urls.comment, body)
			return true
		} catch (e) {
			const status = parseInt(e.response.status.toString())
			if (status === 400 || status === 404) {
				return e.response.data
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