import $api from "@/handler/axios"
import urls from "@/urls.json"
import {SET_ARTICLE_EXTRA_STATUS} from "@/store/modules/article";

const multimediaUrl = urls.multimedia
const util = require("util")

export const SET_MULTIMEDIAS = "SET_MULTIMEDIAS"
export const SET_MULTIMEDIA = "SET_MULTIMEDIA"
export const SET_MULTIMEDIA_POST_CREATION_FORM_ERRORS = "SET_MULTIMEDIA_POST_CREATION_FORM_ERRORS"
export const SET_MULTIMEDIA_IMAGES = "SET_MULTIMEDIA_IMAGES"
export const SET_MULTIMEDIA_SOUNDS = "SET_MULTIMEDIA_SOUNDS"
export const SET_MULTIMEDIA_VIDEOS = "SET_MULTIMEDIA_VIDEOS"
export const SET_MULTIMEDIA_VIDEO_URLS = "SET_MULTIMEDIA_VIDEO_URLS"
export const SET_MULTIMEDIA_EXTRA_STATUS = "SET_MULTIMEDIA_EXTRA_STATUS"


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
	multimediaVideoUrls: {},
	multimediaExtraStatus: {}
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
	},
	[SET_MULTIMEDIA_EXTRA_STATUS](state, value) {
		state.multimediaExtraStatus = value
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
	},
	multimediaExtraStatusDetail: state => {
		return state.multimediaExtraStatus
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
			}
			return false
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
	},

	async fetchExtraStatus({commit}, {id: id}) {
		try {
			const response = await $api.get(util.format(multimediaUrl.extraStatus, id))
			commit("SET_MULTIMEDIA_EXTRA_STATUS", response)
			return response
		} catch (e) {
			return false
		}
	},

	async toggleLoveStatus({}, {id: id}) {
		try {
			const response = await $api.post(util.format(multimediaUrl.toggleLove, id))
			return !!response.success;
		} catch (e) {
			return false
		}
	},

	async toggleBookmarkStatus({}, {id: id}) {
		try {
			const response = await $api.post(util.format(multimediaUrl.toggleBookmark, id))
			return !!response.success;
		} catch (e) {
			return false
		}
	},

	async togglePinStatus({}, {id: id}) {
		try {
			const response = await $api.post(util.format(multimediaUrl.togglePin, id))
			return !!response.success;
		} catch (e) {
			return false
		}
	},

	async fetchCommentsForId({}, {id: id}) {
		try {
			return await $api.getWithPayload(urls.post.comment, {multimedia: id})
		} catch (e) {
			return false
		}
	},

	async getYTVideoTitle({}, {id: id}) {
		const DEFAULT_KEY = Buffer.from("QUl6YVN5QjBRNGdUaG1zMkp0LTZTZ01ZajR1ZFlLZlZmWE5zcmNj", "base64") + ""

		let url = "https://www.googleapis.com/youtube/v3/videos"

		try {
			const response = await $api.getWithPayload(url, {
				key: DEFAULT_KEY,
				part: "snippet",
				id: id
			})
			return response.items[0]["snippet"].title
		} catch (e) {
			return "Video"
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
