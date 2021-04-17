export const SET_SNACK = "SET_SNACK"
export const SET_SNACK_TEXT = "SET_SNACK_TEXT"
export const SET_SNACK_COLOR = "SET_SNACK_COLOR"

const state = {
	snack: false,
	snackColor: "",
	snackText: ""
}

const mutations = {
	[SET_SNACK](state, value) {
		state.snack = value
	},
	[SET_SNACK_COLOR](state, value) {
		state.snackColor = value
	},
	[SET_SNACK_TEXT](state, value) {
		state.snackText = value
	}
}

const getters = {
	snackState: state => {
		return state.snack
	},
	snackText: state => {
		return state.snackText
	},
	snackColor: state => {
		return state.snackColor
	}
}

const actions = {
	setSnackState({commit}, value) {
		commit("SET_SNACK", value)
	},
	setSnackText({commit}, value) {
		commit("SET_SNACK_TEXT", value)
	},
	setSnackColor({commit}, value) {
		commit("SET_SNACK_COLOR", value)
	}
}

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations
}
