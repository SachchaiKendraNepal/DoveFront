import $api from "@/handler/axios"
const urls = require("@/urls.json")
const locationUrls = urls.location
const util = require("util")

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
	vdc_wards: {}
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
	countriesList: state => state.countries.results,
	provincesList: state => state.provinces.results,
	districtsList: state => state.districts,
	municipalitiesList: state => state.municipalities.results,
	municipalityWardsList: state => state.municipality_wards.results,
	vdcsList: state => state.vdcs.results,
	vdcWardsList: state => state.vdc_wards.results
}

const actions = {
	async fetchAllCountries({commit}){
		const response = await $api.get("/country/")
		commit("SET_COUNTRIES", response)
	},
	async fetchAllProvinces({commit}){
		const response = await $api.get("/province/")
		commit("SET_PROVINCES", response)
	},
	async fetchAllDistricts({commit}, {page: page}){
		const response = await $api.get(`/district/?page=${page}`)
		commit("SET_DISTRICTS", response)
	},
	async fetchAllMunicipalities({commit}){
		const response = await $api.get("/municipality/")
		commit("SET_MUNICIPALITIES", response)
	},
	async fetchAllMunicipalityWards({commit}){
		const response = await $api.get("/municipality-ward/")
		commit("SET_MUNICIPALITY_WARDS", response)
	},
	async fetchAllVdcs({commit}){
		const response = await $api.get("/vdc/")
		commit("SET_VDCS", response)
	},
	async fetchAllVdcWards({commit}){
		const response = await $api.get("/vdc-ward/")
		commit("SET_VDC_WARDS", response)
	},
	async deleteDistrict({}, {id: id}) {
		try {
			await $api.delete(util.format(locationUrls.districtDetail, id))
			return true
		} catch {
			return false
		}
	},
}

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations
}
