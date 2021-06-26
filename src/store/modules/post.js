import $api from "@/handler/axios";
import urls from "@/urls.json";
const util = require("util");

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
	async fetchPinnedMultimedia({commit}) {
		const response = await $api.getWithPayload(urls.multimedia.set, {
			is_pinned: true
		})
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
	},

	async updateComment({}, {id: id, comment: comment}) {
		try{
			await $api.patch(util.format(urls.post.commentDetail, id), {comment: comment})
			return true
		} catch (e) {
			return false
		}
	},

	async deleteComment({}, {id: id}) {
		try {
			await $api.delete(util.format(urls.post.commentDetail, id))
			return true
		} catch (e) {
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
