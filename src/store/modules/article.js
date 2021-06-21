import $api from "@/handler/axios"
import urls from "@/urls.json"

const util = require("util")

const articleUrl = urls.article

export const SET_ARTICLES = "SET_ARTICLES"
export const SET_ARTICLE = "SET_ARTICLE"
export const SET_FORM_ERRORS = "SET_FORM_ERRORS"
export const SET_ARTICLE_IMAGES = "SET_ARTICLE_IMAGES"
export const SET_ARTICLE_EXTRA_STATUS = "SET_ARTICLE_EXTRA_STATUS"

const state = {
	articles: {},
	article: null,
	formErrors: {},
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
	[SET_FORM_ERRORS](state, value) {
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
	list: state => state.articles,
	detail: state => state.article,
	formErrors: state => state.formErrors
}

const actions = {
	clearFormErrors({ commit }) {
		commit("SET_FORM_ERRORS", {})
	},

	async filter({commit}, payload) {
		const response = await $api.getWithPayload(articleUrl.set, payload)
		commit("SET_ARTICLES", response)
	},

	async fetchSingle({ commit }, {id: id}) {
		try {
			const response = await $api.get(util.format(articleUrl.detail, id))
			commit("SET_ARTICLE", response)
			return true
		} catch (e) {
			return false
		}
	},

	async patch({commit}, {id: id, body: body}) {
		try {
			const response = await $api.patch(articleUrl.set + id + "/", body)
			commit("SET_ARTICLE", response)
			return true
		} catch (e) {
			const status = parseInt(e.response.status.toString())
			if (status === 400 || status === 404) {
				commit("SET_FORM_ERRORS", e.response.data)
			}
			return false
		}
	},

	async delete({commit}, payload) {
		try {
			await $api.delete(articleUrl.set + payload.id + "/")
			return true
		} catch (e) {
			return false
		}
	},

	async approve({}, {id: id}) {
		try {
			await $api.post(util.format(articleUrl.toggleApproval, id))
			return true
		} catch (e) {
			return false
		}
	},

	async fetchMyStatus({}, {id: id}) {
		try {
			return await $api.get(util.format(articleUrl.extraStatus, id))
		} catch (e) {
			return false
		}
	},

	async disapprove({}, {id: id}) {
		try {
			await $api.delete(util.format(articleUrl.toggleApproval, id))
			return true
		} catch (e) {
			return false
		}
	},

	async pin({}, {id: id}) {
		console.log(id)
		try {
			await $api.post(util.format(articleUrl.togglePin, id))
			return true
		} catch (e) {
			return false
		}
	},

	async unpin({}, {id: id}) {
		try {
			await $api.delete(util.format(articleUrl.togglePin, id))
			return true
		} catch (e) {
			return false
		}
	},

	async love({}, {id: id}) {
		try {
			await $api.post(util.format(articleUrl.toggleLove, id))
			return true
		} catch (e) {
			return false
		}
	},

	async unsetLove({}, {id: id}) {
		try {
			await $api.delete(util.format(articleUrl.toggleLove, id))
			return true
		} catch (e) {
			return false
		}
	},

	async bookmark({}, {id: id}) {
		try {
			await $api.post(util.format(articleUrl.toggleBookmark, id))
			return true
		} catch (e) {
			return false
		}
	},

	async revokeBookmark({}, {id: id}) {
		try {
			await $api.delete(util.format(articleUrl.toggleBookmark, id))
			return true
		} catch (e) {
			return false
		}
	},

	async startWriting({commit}) {
		try {
			const response = await $api.post(articleUrl.startWriting)
			commit("SET_ARTICLE", response)
			return true
		} catch (e) {
			return false
		}
	},

	async completeWriting({commit}, {id: id}) {
		try {
			await $api.post(util.format(articleUrl.completeWriting, id))
			return true
		} catch (e) {
			return false
		}
	},

	async fetchCommentsForId({}, {id: id}) {
		try {
			return await $api.getWithPayload(articleUrl.commentList, {article: id})
		} catch (e) {
			return false
		}
	},
	async removeComment({}, {id: id}) {
		try {
			await $api.delete(util.format(articleUrl.commentDetail, id))
			return true
		} catch (e) {
			return false
		}
	},
	async postComment({}, {body: body}) {
		try {
			await $api.post(articleUrl.commentList, body)
			return true
		} catch (e) {
			const status = parseInt(e.response.status.toString())
			if (status === 400) {
				return e.response.data
			}
			return false
		}
	},

	async addCoverImage({}, body) {
		try {
			await $api.post(urls.articleImage.coverList, body)
			return true
		} catch (e) {
			const status = parseInt(e.response.status.toString())
			if (status === 400 || status === 404) {
				return e.response.data
			}
			return false
		}
	},
	async deleteCover({}, {id: id}) {
		try {
			await $api.delete(util.format(urls.articleImage.coverDetail, id))
			return true
		} catch (e) {
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
