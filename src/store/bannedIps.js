import http from '../http'
import Ip from '../types/Ip'

const state = {
    all: [],
    ip: new Ip()
}

const actions = {
    async all ({ state, commit, dispatch }, filters) {
        try {
            let response = await http.get('api/admin/banned-ips', {
                params: {
                    filters: JSON.stringify(filters)
                }
            })
            commit('SET', { key: 'all', value: response.data.addresses })
        } catch (e) {
            dispatch('handleError', e, { root: true })
        }
    },
    async submit ({ state, commit, dispatch }) {
        try {
            await http.post(`api/admin/banned-ips`, state.ip)
            dispatch('all')
        } catch (e) {
            dispatch('handleError', e, { root: true })
        }
    },
    async remove ({ state, commit, dispatch }, address) {
        try {
            await http.delete(`api/admin/banned-ips/${address}`)
            return Promise.resolve()
        } catch (e) {
            dispatch('handleError', e, { root: true })
            return Promise.reject(e)
        }
    }
}

const mutations = {
    SET: (state, { key, value }) => { state[key] = value }
}

export default {
    namespaced: true,
    state,
    actions,
    mutations
}
