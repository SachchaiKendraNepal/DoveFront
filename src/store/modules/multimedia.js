import $api from "@/handler/axios"
import urls from "@/urls.json"

const multimediaUrl = urls.multimedia
const util = require("util")

export const SET_MULTIMEDIAS = "SET_MULTIMEDIAS"
export const SET_MULTIMEDIA = "SET_MULTIMEDIA"
export const SET_MULTIMEDIA_POST_CREATION_FORM_ERRORS = "SET_MULTIMEDIA_POST_CREATION_FORM_ERRORS"
export const SET_MULTIMEDIA_IMAGES = "SET_MULTIMEDIA_IMAGES"
export const SET_MULTIMEDIA_SOUNDS = "SET_MULTIMEDIA_SOUNDS"
export const SET_MULTIMEDIA_VIDEOS = "SET_MULTIMEDIA_VIDEOS"
export const SET_MULTIMEDIA_VIDEO_URLS = "SET_MULTIMEDIA_VIDEO_URLS"

const defaultMultimediaPostCreationFormErrors = {
	video: null,
	audio: null,
	image: null,
	video_url: null,
	title: null,
	description: null
}

const state = {
	multimedias: {},
	multimedia: {},
	multimediaPostCreationFormErrors: {
		... defaultMultimediaPostCreationFormErrors
	},
	multimediaImages: {},
	multimediaSounds: {},
	multimediaVideos: {},
	multimediaVideoUrls: {}
}

const mutations = {
	[SET_MULTIMEDIAS](state, value) {
		state.multimedias = value
	},
	[SET_MULTIMEDIA](state, value) {
		state.multimedia = value
	},
	[SET_MULTIMEDIA_POST_CREATION_FORM_ERRORS](state, value) {
		state.multimediaPostCreationFormErrors = value
	},
	[SET_MULTIMEDIA_IMAGES](state, value) {
		state.multimediaImages = value
	},
	[SET_MULTIMEDIA_SOUNDS](state, value) {
		state.multimediaSounds = value
	},
	[SET_MULTIMEDIA_VIDEOS](state, value) {
		state.multimediaVideos = value
	},
	[SET_MULTIMEDIA_VIDEO_URLS](state, value) {
		state.multimediaVideoUrls = value
	}
}

const getters = {
	allMultimedias: state => {
		return state.multimedias.results
	},
	multimediaPostCreationFormErrors: state => {
		return state.multimediaPostCreationFormErrors
	},
	allMultimediaImages: state => {
		return state.multimediaImages.data
	},
	allMultimediaSounds: state => {
		return state.multimediaSounds.data
	},
	allMultimediaVideos: state => {
		return state.multimediaVideos.data
	},
	allMultimediaVideoUrls: state => {
		return state.multimediaVideoUrls.data
	},
	multimediaDetail: state => {
		return state.multimedia
	}
}

const actions = {
	clearMultimediaPostCreationFormErrors({ commit }) {
		commit("SET_MULTIMEDIA_POST_CREATION_FORM_ERRORS", { ... defaultMultimediaPostCreationFormErrors })
	},
	async getAll({commit}) {
		const response = await $api.get(multimediaUrl.set)
		commit("SET_MULTIMEDIAS", response)
	},


	async getSingle({commit}, {id: id}) {
		const response = await $api.get(multimediaUrl.set + id)
		commit("SET_MULTIMEDIA", response)
	},


	async getAllApproved({commit}) {
		const response = await $api.get(multimediaUrl.set + "?is_approved=true")
		commit("SET_MULTIMEDIAS", response)
	},

	async createMultimediaPost({commit}, body) {
		try {
			const resp = await $api.post(multimediaUrl.createWithList, body)
			return !!resp.success;
		} catch (e) {
			const status = parseInt(e.response.status.toString())
			if (status === 400 || status === 404) {
				commit("SET_MULTIMEDIA_POST_CREATION_FORM_ERRORS", e.response.data)
				return false
			} else return 500
		}
	},

	async update({commit}, payload) {
		await $api.put(multimediaUrl + payload.id + "/", payload.body)
	},

	async delete({commit}, payload) {
		await $api.delete(multimediaUrl + payload.id + "/")
	},


	async approve({}, {id: id}) {
		try {
			await $api.post(util.format(multimediaUrl.toggleApproval, id))
			return true
		} catch (e) {
			return false
		}
	},

	async fetchImagesFor({commit}, {id: id}) {
		try {
			const response = await $api.get(util.format(multimediaUrl.images, id))
			commit("SET_MULTIMEDIA_IMAGES", response)
			return response
		} catch (e) {
			return false
		}
	},

	async fetchSoundsFor({commit}, {id: id}) {
		try {
			const response = await $api.get(util.format(multimediaUrl.audios, id))
			commit("SET_MULTIMEDIA_SOUNDS", response)
			return response
		} catch (e) {
			return false
		}
	},

	async fetchVideosFor({commit}, {id: id}) {
		try {
			const response = await $api.get(util.format(multimediaUrl.videos, id))
			commit("SET_MULTIMEDIA_VIDEOS", response)
			return response
		} catch (e) {
			return false
		}
	},


	async fetchVideoUrlsFor({commit}, {id: id}) {
		try {
			const response = await $api.get(util.format(multimediaUrl.videoUrls, id))
			commit("SET_MULTIMEDIA_VIDEO_URLS", response)
			return response
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
