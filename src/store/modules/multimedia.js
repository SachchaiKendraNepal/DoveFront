import $api from "@/handler/axios"
import urls from "@/urls.json"

const multimediaUrl = urls.multimedia

export const SET_MULTIMEDIAS = "SET_MULTIMEDIAS"
export const SET_MULTIMEDIA = "SET_MULTIMEDIA"
export const SET_MULTIMEDIA_POST_CREATION_FORM_ERRORS = "SET_MULTIMEDIA_POST_CREATION_FORM_ERRORS"

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
	}
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
	}
}

const getters = {
	allArticles: state => {
		return state.multimedias.results
	},
	multimediaPostCreationFormErrors: state => {
		return state.multimediaPostCreationFormErrors
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
	}
}

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations
}
