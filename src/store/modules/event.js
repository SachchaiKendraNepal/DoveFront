import $api from "@/handler/axios"
import urls from "@/urls.json"

const eventUrl = urls.event

export const SET_EVENTS = "SET_EVENTS"
export const SET_EVENT = "SET_EVENT"

const state = {
	events: {},
	lastCreatedEvent: {},
	event: {},
	eventPhotos: {},
	eventVideoUrls: {}
}

const mutations = {
	[SET_EVENTS](state, value) {
		state.events = value
	},
	[SET_EVENT](state, value) {
		state.event = value
	}
}

const getters = {
	list: state => {
		return state.events.results
	}
}

const actions = {
	async getAll({commit}) {
		const response = await $api.get(eventUrl)
		commit("SET_EVENTS", response)
	},

	async create({commit}, body) {
		await $api.post(eventUrl, body)
	},

	async update({commit}, payload) {
		await $api.put(eventUrl + payload.id + "/", payload.body)
	},

	async delete({commit}, payload) {
		await $api.delete(eventUrl + payload.id + "/")
	},

	async filterEvents({commit}, payload) {
		try {
			const response = await $api.getWithPayload(eventUrl, payload)
			commit("SET_EVENTS", response)
			return true
		} catch {
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
