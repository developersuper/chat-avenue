import http from '../http'
import User from '../types/User'

const state = {
    all: [],
    user: new User(),
    dialogs: {
        user: false
    },
    roles: [
        { value: 'superadmin', label: 'Superadmin' },
        { value: 'admin', label: 'Admin' },
        { value: 'moderator', label: 'Moderator' },
        { value: 'helper', label: 'Helper' },
        { value: 'vip', label: 'VIP' },
        { value: 'user', label: 'User' },
        { value: 'law-enforcement', label: 'Law Enforcement' }
    ]
}

const actions = {
    async all ({ state, commit, dispatch }, filters) {
        try {
            let response = await http.get('api/admin/users', {
                params: {
                    filters: JSON.stringify(filters)
                }
            })
            commit('SET', { key: 'all', value: response.data.users })
        } catch (e) {
            dispatch('handleError', e, { root: true })
        }
    },
    async ban ({ state, commit, dispatch }, userId) {
        try {
            await http.post(`api/admin/users/${userId}/ban`)
            return Promise.resolve()
        } catch (e) {
            dispatch('handleErrors', e)
            return Promise.reject(e)
        }
    },
    async banPermanent ({ state, commit, dispatch }, userId) {
        try {
            await http.post(`api/admin/users/${userId}/ban-permanent`)
            return Promise.resolve()
        } catch (e) {
            dispatch('handleErrors', e)
            return Promise.reject(e)
        }
    },
    async unban ({ state, commit, dispatch }, userId) {
        try {
            await http.post(`api/admin/users/${userId}/unban`)
            return Promise.resolve()
        } catch (e) {
            dispatch('handleErrors', e)
            return Promise.reject(e)
        }
    },
    async submit ({ state, commit, dispatch }, update) {
        try {
            if (update) {
                await http.put(`api/admin/users/${state.user.uuid}`, state.user)
            } else {
                await http.post(`api/admin/users`, state.user)
            }

            commit('HIDE_USER_DIALOG')
            dispatch('all', state.filters)
        } catch (e) {
            dispatch('handleError', e, { root: true })
        }
    },
    async remove ({ state, commit, dispatch }, options) {
        try {
            if (typeof options === 'string') {
                await http.delete(`api/admin/users/${options}`)
            } else {
                await http.delete(`api/admin/users/${options.type}?filters=${JSON.stringify(options.filters)}`)
            }
            await dispatch('all', state.filters)

            return Promise.resolve()
        } catch (e) {
            dispatch('handleError', e, { root: true })
            return Promise.reject(e)
        }
    }
}

const mutations = {
    SET: (state, { key, value }) => { state[key] = value },
    SHOW_USER_DIALOG: (state) => {
        state.dialogs.user = true
        state.user = new User()
    },
    HIDE_USER_DIALOG: (state) => { state.dialogs.user = false },
    EDIT: (state, user) => {
        state.dialogs.user = true
        state.user = {...user}
    }
}

export default {
    namespaced: true,
    state,
    actions,
    mutations
}
