import $api from "@/handler/axios"
import urls from "@/urls.json"
const util = require("util");


const articleUrl = urls.article
const multimediaUrl = urls.multimedia

export const SET_ARTICLES = "SET_ARTICLES"
export const SET_ARTICLE = "SET_ARTICLE"
export const SET_ARTICLE_IMAGES = "SET_ARTICLE_IMAGES"
export const SET_MULTIMEDIAS = "SET_MULTIMEDIAS"
export const SET_MULTIMEDIA = "SET_MULTIMEDIA"
export const SET_MULTIMEDIA_IMAGES = "SET_MULTIMEDIA_IMAGES"
export const SET_MULTIMEDIA_AUDIOS = "SET_MULTIMEDIA_AUDIOS"

const state = {
	articles: {},
	article: {},
	articleImages: [],
	multimedias: {},
	multimedia: {},
	multimediaImages: {},
	multimediaAudios: {}
}

const mutations = {
	[SET_ARTICLES](state, value) {
		state.articles = value
	},
	[SET_ARTICLE](state, value) {
		state.article = value
	},
	[SET_ARTICLE_IMAGES](state, value) {
		state.articleImages = value
	},
	[SET_MULTIMEDIAS](state, value) {
		state.multimedias = value
	},
	[SET_MULTIMEDIA](state, value) {
		state.multimedia = value
	},
	[SET_MULTIMEDIA_IMAGES](state, value) {
		state.multimediaImages = value
	},
	[SET_MULTIMEDIA_AUDIOS](state, value) {
		state.multimediaAudios = value
	}
}

const getters = {
	allArticles: state => {
		return state.articles.results
	},
	allImagesOfAPost: state => {
		return state.articleImages.data
	},
	allMultimedia: state => {
		return state.multimedias.results
	},
	multimedia: state => {
		return state.multimedia
	},
	detailImagesM: state => {
		return state.multimediaImages.data
	},
	detailAudiosM: state => {
		return state.multimediaAudios.data
	}
}

const actions = {
	async getAll({commit}) {
		const response = await $api.get(articleUrl.set)
		commit("SET_ARTICLES", response)
	},

	async getArticleImages({commit}, payload) {
		const response = await $api.get(util.format(articleUrl.imageList, payload.id))
		commit("SET_ARTICLE_IMAGES", response)
	},

	async create({commit}, body) {
		await $api.post(articleUrl.createWithList, body)
	},

	async update({commit}, payload) {
		await $api.put(articleUrl.set + payload.id + "/", payload.body)
	},

	async delete({commit}, payload) {
		await $api.delete(articleUrl.set + payload.id + "/")
	},

	async getAllM({commit}) {
		const response = await $api.get(multimediaUrl.set)
		commit("SET_MULTIMEDIAS", response)
	},

	async getDetailM({commit}, payload) {
		const response = await $api.get(multimediaUrl.set + payload.id + "/")
		commit("SET_MULTIMEDIA", response)
	},

	async getDetailImagesM({commit}, payload) {
		const response = await $api.get(util.format(multimediaUrl.imageList, payload.id))
		commit("SET_MULTIMEDIA_IMAGES", response)
	},

	async getDetailAudiosM({commit}, payload) {
		const response = await $api.get(util.format(multimediaUrl.audioList, payload.id))
		commit("SET_MULTIMEDIA_AUDIOS", response)
	},

	async createM({commit}, body) {
		await $api.post(multimediaUrl.createWithList, body)
	},

	async updateM({commit}, payload) {
		await $api.put(multimediaUrl + payload.id + "/", payload.body)
	},

	async deleteM({commit}, payload) {
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
