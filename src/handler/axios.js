import axios from "axios"

const api = {
    setHeaders: function (contentType) {
        return axios.create({
            baseURL: `${process.env.BASE_URL}/api/`,
            headers: {
                "Content-Type": contentType || "application/json",
                Accept: "application/json",
                Authorization:
                    localStorage.getItem("access_token") === null
                        ? null
                        : `Token ${localStorage.getItem("access_token")}`
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
    async post(target, payload, contentType) {
        try {
            const instance = await this.setHeaders(contentType)
            const response = await instance.post(target, payload)
            return response.data
        } catch (e) {
            throw e
        }
    },
    async put(target, payload, contentType) {
        try {
            const instance = await this.setHeaders(contentType)
            const response = await instance.put(target, payload)
            return response.data
        } catch (e) {
            throw e
        }
    },
    async patch(target, payload, contentType) {
        try {
            const instance = await this.setHeaders(contentType)
            const response = await instance.patch(target, payload)
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
};

export default api
