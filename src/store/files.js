import http from '../http'
import { MessageBox } from 'element-ui'

const state = {
    all: [],
    loaders: {
        page: false
    }
}

const actions = {
    async all ({ state, commit, dispatch }, filters) {
        try {
            commit('LOADING', 'page')
            let response = await http.get(`api/admin/files?perPage=100&page=${filters.page}`, {
                params: {
                    filters: JSON.stringify(filters)
                }
            })
            commit('SET', { key: 'all', value: response.data.files })
            commit('LOADED', 'page')

            return Promise.resolve()
        } catch (e) {
            dispatch('handleError', e, { root: true })
            return Promise.reject(e)
        }
    },
    async remove ({ state, commit, dispatch }, fileIds = []) {
        try {
            await MessageBox.confirm('This will permanently delete information. Continue ?', 'Warning')
            commit('LOADING', 'page')
            await http.post('api/admin/files/delete', {
                ids: fileIds
            })
            return Promise.resolve()
        } catch (e) {
            commit('LOADED', 'page')
            dispatch('handleError', e, { root: true })
            return Promise.reject(e)
        }
    }
}

const mutations = {
    SET: (state, { key, value }) => {
        state[key] = value
    },
    LOADING: (state, key) => {
        state.loaders[key] = true
    },
    LOADED: (state, key) => {
        state.loaders[key] = false
    }
}

export default {
    namespaced: true,
    state,
    actions,
    mutations
}
