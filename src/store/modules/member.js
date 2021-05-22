import $api from "@/handler/axios";

const util = require("util")
const urls = require("@/urls.json")
const memberUrls = urls.member

export const SET_MEMBERS = "SET_MEMBERS"
export const SET_MEMBER = "SET_MEMBER"
export const SET_MEMBER_BRANCHES = "SET_MEMBER_BRANCHES"
export const SET_MEMBER_ROLES = "SET_MEMBER_ROLES"
export const SET_MEMBER_FORM_ERRORS = "SET_MEMBER_FORM_ERRORS"
export const SET_MEMBER_ROLE_FORM_ERRORS = "SET_MEMBER_ROLE_FORM_ERRORS"
export const SET_MEMBER_BRANCH_FORM_ERRORS = "SET_MEMBER_BRANCH_FORM_ERRORS"

const defaultMemberFormErrors = {
	user: null
}

const defaultMemberBranchFormErrors = {
	branch: null,
	date_of_membership: null,
	member: null,
}

const defaultMemberRoleFormErrors = {
	role_name: null,
	member: null,
	from_date: null,
	to_date: null,
	branch: null,
}


const state = {
	members: [],
	member: {},
	role: {},
	branch: {},

	branches: [],
	roles: [],

	memberFormErrors: { ...defaultMemberFormErrors },
	memberRoleFormErrors: { ...defaultMemberRoleFormErrors },
	memberBranchFormErrors: { ...defaultMemberBranchFormErrors }
}

const mutations = {
	[SET_MEMBERS](state, value) {
		state.members = value
	},
	[SET_MEMBER](state, value) {
		state.member = value
	},
	[SET_MEMBER_BRANCHES](state, value) {
		state.branches = value
	},
	[SET_MEMBER_ROLES](state, value) {
		state.roles = value
	},
	[SET_MEMBER_FORM_ERRORS](state, value) {
		state.memberFormErrors = value
	},
	[SET_MEMBER_ROLE_FORM_ERRORS](state, value) {
		state.memberRoleFormErrors = value
	},
	[SET_MEMBER_BRANCH_FORM_ERRORS](state, value) {
		state.memberBranchFormErrors = value
	}
}

const getters = {
	list: (state) => state.members,
	detail: state => state.member,
	branchesList: state => state.branches,
	rolesList: state => state.roles,
	memberFormErrors: state => state.memberFormErrors,
	memberRoleFormErrors: state => state.memberRoleFormErrors,
	memberBranchFormErrors: state => state.memberBranchFormErrors
}

const actions = {
	clearMemberFormError({commit}) {
		commit("SET_MEMBER_FORM_ERRORS", defaultMemberFormErrors)
	},
	clearMemberRoleFormError({commit}) {
		commit("SET_MEMBER_ROLE_FORM_ERRORS", defaultMemberRoleFormErrors)
	},
	clearMemberBranchFormError({commit}) {
		commit("SET_MEMBER_BRANCH_FORM_ERRORS", defaultMemberBranchFormErrors)
	},

	async fetchMembers({commit}) {
		try {
			const response = await $api.get(memberUrls.list)
			commit("SET_MEMBERS", response)
			return true
		} catch {
			return false
		}
	},
	async fetchMemberDetail({commit}, {id: id}) {
		try {
			const response = await $api.get(util.format(memberUrls.detail, id))
			commit("SET_MEMBER", response)
		} catch {
			return false
		}
	},
	async create({commit}, {body: body}) {
		try {
			await $api.post(memberUrls.list, body)
			return true
		} catch (e) {
			if (parseInt(e.response.status.toString()) === 400) {
				commit("SET_MEMBER_FORM_ERRORS", e.response.data)
			}
			return false
		}
	},
	async delete({}, {id: id}) {
		try {
			await $api.delete(util.format(memberUrls.detail, id))
			return true
		} catch {
			return false
		}
	},
	async toggleApprovalStatus({commit}, {id: id}) {
		try {
			await $api.post(util.format(memberUrls.toggleApproval, id))
			return true
		} catch {
			return false
		}
	},

	async assignBranch({commit}, {userId:userId, body: body}) {
		try {
			await $api.post(util.format(memberUrls.branch, userId), body)
			return true
		} catch (e) {
			if (parseInt(e.response.status.toString()) === 400) {
				commit("SET_MEMBER_BRANCH_FORM_ERRORS", e.response.data)
				return false
			}
			return 500
		}
	},

	async stripBranch({}, {id: id}) {
		try {
			await $api.delete(util.format(memberUrls.branchDetail, id))
			return true
		} catch {
			return false
		}
	},

	async assignRole({commit}, {userId: userId, body: body}) {
		try {
			const response = await $api.post(util.format(memberUrls.role, userId), body)
			return response.success
		} catch (e) {
			if (parseInt(e.response.status.toString()) === 400) {
				commit("SET_MEMBER_ROLE_FORM_ERRORS", e.response.data)
				return false
			}
			return 500
		}
	},

	async stripRole({}, {id: id}) {
		try {
			await $api.delete(util.format(memberUrls.roleDetail, id))
			return true
		} catch {
			return false
		}
	},

	async fetchMemberBranchesForBranch({commit}, {branch: branch}) {
		try {
			const response = await $api.get(memberUrls.branchViewSet + `?branch=${branch}`)
			commit("SET_MEMBER_BRANCHES", response)
			return true
		} catch (e) {
			return false
		}
	},

}

export default {
	namespaced: true,
	state,
	mutations,
	getters,
	actions
}
