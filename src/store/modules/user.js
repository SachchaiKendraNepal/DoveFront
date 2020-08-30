import $api from "@/handler/axios";

export const SET_USERS = "SET_USERS";
export const SET_ROLES = "SET_ROLES";

const state = {
    users: {},
    user: {},
    roles: {},
    message: "" // To catch error message
};
const mutations = {
    SET_CURRENT_USER(state, data) {
        state.user = data;
    },
    SET_MESSAGE(state, data) {
        state.message = data;
    },
    [SET_USERS](state, value) {
        state.users = value;
    },
    [SET_ROLES](state, value) {
        state.roles = value;
    }
};

const actions = {
    async loginUser({ commit }, user) {
        try {
            // always remove preserved/cached localStorage item at first
            localStorage.removeItem("access_token");
            localStorage.removeItem("currentUser");
            const response = await $api.post("login", user);
            if (response.message === "success") {
                // set current user
                commit("SET_CURRENT_USER", response.user);
                commit("SET_MESSAGE", "");
                // save new access token at localStorage
                localStorage.setItem("access_token", response["token"]);
                // save currentUser at localStorage
                localStorage.setItem("currentUser", JSON.stringify(response["user"]));
            } else {
                commit("SET_MESSAGE", response.message);
                commit("SET_CURRENT_USER", {});
                localStorage.removeItem("access_token");
            }
            return response;
        } catch (e) {
            throw e;
        }
    },
    async logoutUser({commit}, username) {
        const response = await $api.post("logout", username);
        localStorage.removeItem("access_token");
        localStorage.removeItem("currentUser");
        commit("SET_CURRENT_USER", {});
        commit("SET_MESSAGE", "");
    },
    async createUser({ commit }, userData) {
        const response = await $api.post("user", userData);
        console.log(response);
    },
    async getUser({ commit }, userID) {
        const response = await $api.getWithPayload("user", userID);
        console.log(response);
    },
    async getAllUsers({ commit }) {
        try {
            const response = await $api.get("user");
            commit(SET_USERS, response);
            return response;
        } catch (e) {
            throw e;
        }
    },
    async updateUser({ commit }, userData) {
        // TODO: TBD
    },
    changePassword({ commit }, changePwData) {
        return $api.post("update-password", changePwData);
    },
    forgotPassword({ commit }, userEmail) {
        const fd = new FormData();
        fd.append("email", userEmail);
        return $api.post("reset-password", fd);
    },
    async getAllRoles({ commit }) {
        // TODO: TBD
    }
};

const getters = {
    users: state => state.users,
    roles: state => state.roles
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};
