import $api from "@/handler/axios"
import urls from "@/urls.json"
const util = require("util");

const multimediaUrl = urls.multimedia

export const SET_MULTIMEDIAS = "SET_MULTIMEDIAS"
export const SET_MULTIMEDIA = "SET_MULTIMEDIA"
export const SET_MULTIMEDIA_IMAGES = "SET_MULTIMEDIA_IMAGES"
export const SET_MULTIMEDIA_AUDIOS = "SET_MULTIMEDIA_AUDIOS"


const state = {
	multimedias: {},
	multimedia: {},
	multimediaImages: [],
	multimediaAudios: []
}

const mutations = {
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
	allMultimedia: state => {
		return state.multimedias.results
	},
	multimedia: state => {
		return state.multimedia
	},
	detailImages: state => {
		return state.multimediaImages
	},
	detailAudios: state => {
		return state.multimediaAudios
	}
}

const actions = {
	async getAll({commit}) {
		const response = await $api.get(multimediaUrl.set)
		commit("SET_MULTIMEDIAS", response)
	},

	async getDetail({commit}, payload) {
		const response = await $api.get(multimediaUrl.set + payload.id + "/")
		commit("SET_MULTIMEDIA", response)
	},

	async getDetailImages({commit}, payload) {
		const response = await $api.get(util.format(multimediaUrl.imageList, payload.id))
		commit("SET_MULTIMEDIA_IMAGES", response)
	},

	async getDetailAudios({commit}, payload) {
		const response = await $api.get(util.format(multimediaUrl.audioList, payload.id))
		commit("SET_MULTIMEDIA_AUDIOS", response)
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
