import $api from "@/handler/axios"

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
	allCountries: state => state.countries.results,
	allProvinces: state => state.provinces.results,
	allDistricts: state => state.districts.results,
	allMunicipalities: state => state.municipalities.results,
	allMunicipalityWards: state => state.municipality_wards.results,
	allVdcs: state => state.vdcs.results,
	allVdcWards: state => state.vdc_wards.results
}

const actions = {
	async getAllCountries({commit}){
		const response = await $api.get("/country/")
		commit("SET_COUNTRIES", response)
	},
	async getAllProvinces({commit}){
		const response = await $api.get("/province/")
		commit("SET_PROVINCES", response)
	},
	async getAllDistricts({commit}){
		const response = await $api.get("/district/")
		commit("SET_DISTRICTS", response)
	},
	async getAllMunicipalities({commit}){
		const response = await $api.get("/municipality/")
		commit("SET_MUNICIPALITIES", response)
	},
	async getAllMunicipalityWards({commit}){
		const response = await $api.get("/municipality-ward/")
		commit("SET_MUNICIPALITY_WARDS", response)
	},
	async getAllVdcs({commit}){
		const response = await $api.get("/vdc/")
		commit("SET_VDCS", response)
	},
	async getAllVdcWards({commit}){
		const response = await $api.get("/vdc-ward/")
		commit("SET_VDC_WARDS", response)
	}
}

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations
}
