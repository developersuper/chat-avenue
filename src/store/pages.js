import http from '../http'
import Page from '../types/Page'
import {
    MessageBox
} from 'element-ui'

const state = {
    all: [],
    page: new Page(),
    dialogs: {
        page: false
    }
}

const actions = {
    async all ({ state, commit, dispatch }) {
        try {
            let response = await http.get('api/pages')
            commit('SET', { key: 'all', value: response.data.pages })
        } catch (e) {
            dispatch('handleError', e, { root: true })
        }
    },
    async submit ({ state, commit, dispatch }, update) {
        try {
            if (update) {
                await http.put(`api/admin/pages/${state.page.uuid}`, state.page)
            } else {
                await http.post(`api/admin/pages`, state.page)
            }

            commit('HIDE_PAGE_DIALOG')
            dispatch('all')
        } catch (e) {
            dispatch('handleError', e, { root: true })
        }
    },
    async remove ({ state, commit, dispatch }, pageId) {
        try {
            await MessageBox.confirm('This will permanently delete information. Continue ?', 'Warning')
            await http.delete(`api/admin/pages/${pageId}`)
            dispatch('all')
        } catch (e) {
            dispatch('handleError', e, { root: true })
        }
    }
}

const mutations = {
    SET: (state, { key, value }) => {
        state[key] = value
    },
    SHOW_PAGE_DIALOG: (state) => {
        state.dialogs.page = true
        state.page = new Page()
    },
    HIDE_PAGE_DIALOG: (state) => {
        state.dialogs.page = false
    },
    EDIT: (state, page) => {
        state.dialogs.page = true
        state.page = {...page}
    }
}

export default {
    namespaced: true,
    state,
    actions,
    mutations
}
