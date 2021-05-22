import $api from "@/handler/axios"
import urls from "@/urls.json"
const util = require("util")

const eventUrl = urls.event

export const SET_EVENTS = "SET_EVENTS"
export const SET_EVENT = "SET_EVENT"
export const SET_EVENT_FORM_ERRORS = "SET_EVENT_FORM_ERRORS"

const defaultFormErrors = {
	title: null,
	description: null,
	venue: null,
	start_date: null,
	duration: null,
	time_of_day: null,
	type: null,
	is_approved: null,
	is_main: null,
	banner: null,
	country: null,
	province: null,
	district: null,
	municipality: null,
	municipality_ward: null,
	vdc: null,
	vdc_ward: null,
	contact: null,
	organizer: null,
}

const state = {
	events: {},
	lastCreatedEvent: {},
	event: {},
	eventPhotos: {},
	eventVideoUrls: {},
	formErrors: { ... defaultFormErrors }
}

const mutations = {
	[SET_EVENTS](state, value) {
		state.events = value
	},
	[SET_EVENT](state, value) {
		state.event = value
	},
	[SET_EVENT_FORM_ERRORS](state, value) {
		state.formErrors = value
	}
}

const getters = {
	list: state => state.events.results,
	formErrorsList: state => state.formErrors
}

const actions = {
	clearFormErrors({commit}) {
		commit("SET_EVENT_FORM_ERRORS", { ... defaultFormErrors})
	},
	async getAll({commit}) {
		const response = await $api.get(eventUrl.list)
		commit("SET_EVENTS", response)
	},

	async create({commit}, {body: body}) {
		try {
			await $api.post(eventUrl.list, body)
			return true
		} catch(e) {
			if (parseInt(e.response.status.toString()) === 400) {
				commit("SET_EVENT_FORM_ERRORS", e.response.data)
			}
			return false
		}
	},

	async update({commit}, {id: id, body: body}) {
		try {
			await $api.put(util.format(eventUrl.detail, id), body)
			return true
		} catch(e) {
			if (parseInt(e.response.status.toString()) === 400) {
				commit("SET_EVENT_FORM_ERRORS", e.response.data)
			}
			return false
		}
	},

	async delete({commit}, {id: id}) {
		try {
			await $api.delete(util.format(eventUrl.detail, id))
			return true
		} catch {
			return false
		}
	},

	async filterEvents({commit}, payload) {
		try {
			const response = await $api.getWithPayload(eventUrl, payload)
			commit("SET_EVENTS", response)
			return true
		} catch {
			return false
		}
	},

	async toggleApproval({commit}, {id: id}) {
		try {
			await $api.post(util.format(eventUrl.toggleApproval, id))
			return true
		} catch {
			return false
		}
	}
}

export default {
	namespaced: true,
	state,
	mutations,
	getters,
	actions
}
