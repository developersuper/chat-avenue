import http from '../http'

const state = {
    all: []
}

const actions = {
    async all ({ state, commit, dispatch }, filters) {
        try {
            let response = await http.get(`api/admin/logs?perPage=100&page=${filters.page}`, {
                params: {
                    filters: JSON.stringify(filters)
                }
            })
            commit('SET', { key: 'all', value: response.data.logs })
        } catch (e) {
            dispatch('handleError', e, { root: true })
        }
    },
    async clear ({ state, commit, dispatch }, date) {
        try {
            await http.delete(`api/admin/logs`, {
                params: {
                    filters: JSON.stringify({
                        fromDate: date[0],
                        upToDate: date[1]
                    })
                }
            })
            return Promise.resolve()
        } catch (e) {
            dispatch('handleError', e, { root: true })
            return Promise.reject(e)
        }
    }
}

const mutations = {
    SET: (state, { key, value }) => {
        state[key] = value
    }
}

export default {
    namespaced: true,
    state,
    actions,
    mutations
}
