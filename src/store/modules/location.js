import $api from "@/handler/axios"
const urls = require("@/urls.json")
const locationUrls = urls.location

export const SET_COUNTRIES = "SET_COUNTRIES"
export const SET_PROVINCES = "SET_PROVINCES"
export const SET_DISTRICTS = "SET_DISTRICTS"
export const SET_MUNICIPALITIES = "SET_MUNICIPALITIES"
export const SET_MUNICIPALITY_WARDS = "SET_MUNICIPALITY_WARDS"
export const SET_VDCS = "SET_VDCS"
export const SET_VDC_WARDS = "SET_VDC_WARDS"

const state = {
	countries: {},
	provinces: {},
	districts: {},
	municipalities: {},
	municipality_wards: {},
	vdcs: {},
	vdc_wards: {},
}

const mutations = {
	[SET_COUNTRIES](state, value) {
		state.countries = value
	},
	[SET_PROVINCES](state, value) {
		state.provinces = value
	},
	[SET_DISTRICTS](state, value) {
		state.districts = value
	},
	[SET_MUNICIPALITIES](state, value) {
		state.municipalities = value
	},
	[SET_MUNICIPALITY_WARDS](state, value) {
		state.municipality_wards = value
	},
	[SET_VDCS](state, value) {
		state.vdcs = value
	},
	[SET_VDC_WARDS](state, value) {
		state.vdc_wards = value
	},
}

const getters = {
	countriesList: state => state.countries,
	provincesList: state => state.provinces,
	districtsList: state => state.districts,
	municipalitiesList: state => state.municipalities,
	municipalityWardsList: state => state.municipality_wards,
	vdcsList: state => state.vdcs,
	vdcWardsList: state => state.vdc_wards
}

function getResponse(value) {
	if(!value) return { results: [] }
	return { results: [value]}
}

const actions = {
	setCountries({commit}, value) {
		commit("SET_COUNTRIES", getResponse(value))
	},
	async setProvinces({commit}, value) {
		commit("SET_PROVINCES", getResponse(value))
	},
	async setDistricts({commit}, value) {
		commit("SET_DISTRICTS", getResponse(value))
	},
	async setMunicipalities({commit}, value) {
		commit("SET_MUNICIPALITIES", getResponse(value))
	},
	async setMunicipalityWards({commit}, value) {
		commit("SET_MUNICIPALITY_WARDS", getResponse(value))
	},
	async setVdcs({commit}, value) {
		commit("SET_VDCS", getResponse(value))
	},
	async setVdcWards({commit}, value) {
		commit("SET_VDC_WARDS", getResponse(value))
	},
	async fetchAllCountries({commit}){
		const response = await $api.get(locationUrls.countryList)
		commit("SET_COUNTRIES", response)
	},
	async fetchAllProvinces({commit}){
		const response = await $api.get(locationUrls.provinceList)
		commit("SET_PROVINCES", response)
	},
	async fetchAllDistricts({commit}, {page: page}){
		const response = await $api.get(`${locationUrls.districtList}?page=${page}`)
		commit("SET_DISTRICTS", response)
	},
	async fetchAllMunicipalities({commit}){
		const response = await $api.get("/municipality/")
		commit("SET_MUNICIPALITIES", response)
	},
	async filterProvinces({commit}, payload) {
		try {
			const response = await $api.getWithPayload(locationUrls.provinceList, payload)
			commit("SET_PROVINCES", response)
			return true
		} catch {
			return false
		}
	},
	async filterCountries({commit}, payload) {
		try {
			const response = await $api.getWithPayload(locationUrls.countryList, payload)
			commit("SET_COUNTRIES", response)
			return true
		} catch {
			return false
		}
	},
	async filterDistricts({commit}, payload) {
		try {
			const response = await $api.getWithPayload(locationUrls.districtList, payload)
			commit("SET_DISTRICTS", response)
		} catch {
			return false
		}
	},
	async filterMunicipality({commit}, payload) {
		try {
			const response = await $api.getWithPayload(locationUrls.municipalityList, payload)
			commit("SET_MUNICIPALITIES", response)
		} catch {
			return false
		}
	},
	async filterMunicipalityWard({commit}, payload) {
		try {
			const response = await $api.getWithPayload(locationUrls.municipalityWardList, payload)
			commit("SET_MUNICIPALITY_WARDS", response)
		} catch {
			return false
		}
	},
	async filterVdc({commit}, payload) {
		try {
			const response = await $api.getWithPayload(locationUrls.vdcList, payload)
			commit("SET_VDCS", response)
		} catch {
			return false
		}
	},
	async filterVdcWard({commit}, payload) {
		try {
			const response = await $api.getWithPayload(locationUrls.vdcWardList, payload)
			commit("SET_VDC_WARDS", response)
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
