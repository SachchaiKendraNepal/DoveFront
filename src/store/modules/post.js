import $api from "@/handler/axios";
import urls from "@/urls.json";

export const SET_LOVED_POSTS = "SET_LOVED_POSTS"
export const SET_BOOKMARKED_POSTS = "SET_BOOKMARKED_POSTS"
export const SET_PINNED_POST = "SET_PINNED_POST"

const state = {
	lovedPosts: [],
	bookmarkedPosts: [],
	pinnedPosts: []
}

const mutations = {
	[SET_LOVED_POSTS](state, value) {
		state.lovedPosts = value
	},
	[SET_BOOKMARKED_POSTS](state, value) {
		state.bookmarkedPosts = value
	},
	[SET_PINNED_POST](state, value) {
		state.pinnedPosts = value
	},
}

const getters = {
	lovedPostsLists: state => {
		return state.lovedPosts
	},
	bookmarkedPostList: state => {
		return state.bookmarkedPosts
	},
	pinnedPostList: state => {
		return state.pinnedPosts
	}
}


const actions = {
	async fetchPinnedPosts({commit}) {
		const response = await $api.get(urls.post.listPinnedMedia)
		commit(SET_PINNED_POST, response)
	},
	async fetchLovedPosts({commit}) {
		const response = await $api.get(urls.post.listLovedMedia)
		commit(SET_LOVED_POSTS, response)
	},
	async fetchBookmarkedPosts({commit}) {
		const response = await $api.get(urls.post.listBookmarkedMedia)
		commit(SET_BOOKMARKED_POSTS, response)
	},
	async postComment({}, {body: body}) {
		try {
			await $api.post(urls.post.comment, body)
			return true
		} catch (e) {
			const status = parseInt(e.response.status.toString())
			if (status === 400 || status === 404) {
				return e.response.data
			}
			return 500
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
