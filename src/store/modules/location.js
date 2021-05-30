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

export const SET_SELECTED_COUNTRY = "SET_SELECTED_COUNTRY"
export const SET_SELECTED_PROVINCE = "SET_SELECTED_PROVINCE"

const state = {
	countries: {},
	provinces: {},
	districts: {},
	municipalities: {},
	municipality_wards: {},
	vdcs: {},
	vdc_wards: {},


	selectedCountry: null,
	selectedProvince: null
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
	[SET_SELECTED_COUNTRY](state, value) {
		state.selectedCountry = value
	},
	[SET_SELECTED_PROVINCE](state, value) {
		state.selectedProvince = value
	}
}

const getters = {
	selectedCountryId: state => state.selectedCountry,
	selectedProvinceId: state => state.selectedProvince,


	countriesList: state => state.countries,
	provincesList: state => state.provinces,
	districtsList: state => state.districts,
	municipalitiesList: state => state.municipalities.results,
	municipalityWardsList: state => state.municipality_wards.results,
	vdcsList: state => state.vdcs.results,
	vdcWardsList: state => state.vdc_wards.results
}

const actions = {
	setSelectedCountry({commit}, {value: value}) {
		commit("SET_SELECTED_COUNTRY", value)
	},
	setSelectedProvince({commit}, {value: value}) {
		commit("SET_SELECTED_PROVINCE", value)
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
	}
}

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations
}
