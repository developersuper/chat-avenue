import Vue from 'vue'
import Vuex from 'vuex'
import http from './http'
import router from './router'
import {
    Message,
    Notification
} from 'element-ui'

import users from './store/users'
import rooms from './store/rooms'
import dictionary from './store/dictionary'
import adBots from './store/adBots'
import bannedIps from './store/bannedIps'
import logs from './store/logs'
import settings from './store/settings'
import pages from './store/pages'
import files from './store/files'

Vue.use(Vuex)

const state = {
    loading: false,
    baseURL: `${window.location.protocol}//${window.location.hostname}:8080`,
    user: {},
    login: {
        username: '',
        password: ''
    },
    loaders: {
        button: false
    },
    props: {
        isMobile: false,
        ios: false,
        safari: false
    }
}

const actions = {
    handleError ({ commit }, e) {
        console.log(e)
        console.log(e.response)
        commit('LOADED')

        if (e.response) {
            let error = e.response.data

            console.log(e.response.status)
            if (e.response.status === 401) {
                router.push({
                    name: 'login'
                })

                return
            }

            if (error.name === 'ValidationError') {
                Object.values(error.errors).forEach(error => {
                    setTimeout(() => {
                        Notification.error({ title: error.message, message: 'Validation error' })
                    }, 10)
                })
            } else if (error.message) {
                Message({
                    message: error.message,
                    type: 'error'
                })
            } else if (error.errmsg) {
                Notification.error({ title: error.errmsg, message: 'Validation error' })
            }
        }
    },
    async login ({ state, dispatch, commit }) {
        try {
            const response = await http.post('api/auth/login-admin', state.login)
            localStorage.setItem('admin_token', response.data.token)
            window.location = '/admin/home'
            return Promise.resolve()
        } catch (e) {
            if (e.response.status === 401) {
                Message({
                    message: 'Invalid email or password!',
                    type: 'error'
                })
            }

            dispatch('handleError', e)
            return Promise.reject(e)
        }
    },
    async logout ({ commit, dispatch }) {
        try {
            await http.get('api/auth/logout')
            localStorage.removeItem('admin_token')
            window.location = '/admin/'
        } catch (e) {
            dispatch('handleError', e)
        }
    },
    async getUser ({ commit, dispatch }) {
        try {
            let response = await http.get('api/user')
            commit('SET', { key: 'user', value: response.data.user })
        } catch (e) {
            if (e.response.status === 401) {
                router.push({ name: 'login' })
                return
            }

            dispatch('handleError', e)
        }
    }
}

const mutations = {
    SET: (state, { key, value }) => {
        state[key] = value
    },
    SET_PROP: (state, { key, value }) => {
        state.props[key] = value
    },
    LOADING: (state, key) => {
        state.loaders[key] = true
    },
    LOADED: (state, key) => {
        state.loaders[key] = false
    }
}

export default new Vuex.Store({
    state,
    actions,
    mutations,
    modules: {
        users,
        rooms,
        dictionary,
        settings,
        adBots,
        bannedIps,
        pages,
        logs,
        files
    }
})
