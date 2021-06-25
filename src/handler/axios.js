import axios from "axios"
import $helper from "@/Helper"

const api = {
	setHeaders: function (contentType) {
		return axios.create({
			baseURL: "http://localhost:8000/api/",
			headers: {
				"Content-Type": contentType || "application/json",
				Accept: "application/json",
				Authorization:
				typeof $helper.getAccessToken() !== "string"
					? null
					: `Token ${$helper.getAccessToken()}`
			}
		})
	},
	async get(target, contentType) {
		try {
			const instance = await this.setHeaders(contentType)
			const response = await instance.get(target)
			return response.data
		} catch (e) {
			throw e
		}
	},
	async getWithPayload(target, payload) {
		try {
			const instance = await this.setHeaders()
			const response = await instance.get(target, { params: payload })
			return response.data
		} catch (e) {
			throw e
		}
	},
	async post(target, body, contentType) {
		try {
			const instance = await this.setHeaders(contentType)
			const response = await instance.post(target, body)
			return response.data
		} catch (e) {
			throw e
		}
	},
	async put(target, body, contentType) {
		try {
			const instance = await this.setHeaders(contentType)
			const response = await instance.put(target, body)
			return response.data
		} catch (e) {
			throw e
		}
	},
	async patch(target, body, contentType) {
		try {
			const instance = await this.setHeaders(contentType)
			const response = await instance.patch(target, body)
			return response.data
		} catch (e) {
			throw e
		}
	},
	async delete(target) {
		try {
			const instance = await this.setHeaders()
			const response = await instance.delete(target)
			return response.data
		} catch (e) {
			throw e
		}
	}
}

export default api
