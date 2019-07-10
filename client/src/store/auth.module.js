import JwtService from "../common/jwt.service";
import Vue from 'vue';
import { apiUrl } from '../common/config';
import { LOGIN, LOGOUT, REGISTER, CHECK_AUTH } from "./actions.type";
import { SET_AUTH, PURGE_AUTH, SET_ERROR } from "./mutations.type";

const state = {
    errors: null,
    user: {},
    isAuthenticated: !!JwtService.getToken()
};

const getters = {
    currentUser(state) {
        return state.user;
    },
    isAuthenticated(state) {
        return state.isAuthenticated;
    }
};

const actions = {
    [LOGIN](context, credentials) {
        return new Promise(resolve => {
            Vue.axios.post(`${apiUrl}/login`, { user: credentials })
                .then(({ data }) => {
                    context.commit(SET_AUTH, data.user);
                    resolve(data);
                })
                .catch(({ response }) => {
                    context.commit(SET_ERROR, response.data.error);
                });
        });
    },
    [LOGOUT](context) {
        context.commit(PURGE_AUTH);
    },
    [REGISTER](context, credentials) {
        return new Promise((resolve, reject) => {
            Vue.axios.post(`${apiUrl}/signup`, { user: credentials })
                .then(({ data }) => {
                        context.commit(SET_AUTH, data.user);
                        resolve(data);
                })
                .catch(({ response }) => {
                    context.commit(SET_ERROR, response.data.error);
                    reject(response);
                });
        });
    },
    [CHECK_AUTH](context) {
        if (JwtService.getToken()) {
            Vue.axios.defaults.headers.common["Authorization"] = `Token ${JwtService.getToken()}`;
            Vue.axios.get(`${apiUrl}/user`)
                .then(({ data }) => {
                    context.commit(SET_AUTH, data.user);
                })
                .catch(({ response }) => {
                    context.commit(PURGE_AUTH);
                    context.commit(SET_ERROR, response.data.errors);
                });
        } else {
            context.commit(PURGE_AUTH);
        }
    }
};

const mutations = {
    [SET_ERROR](state, error) {
        state.errors = error;
    },
    [SET_AUTH](state, user) {
        state.isAuthenticated = true;
        state.user = user;
        state.errors = {};
        JwtService.saveToken(state.user.token);
    },
    [PURGE_AUTH](state) {
        state.isAuthenticated = false;
        state.user = {};
        state.errors = {};
        JwtService.destroyToken();
    }
};

export default {
    state,
    actions,
    mutations,
    getters
};