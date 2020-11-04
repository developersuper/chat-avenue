import http from '../http'
import Word from '../types/Word'
import {
    MessageBox
} from 'element-ui'

const state = {
    all: [],
    word: new Word(),
    dialogs: {
        word: false
    }
}

const actions = {
    async all ({ state, commit, dispatch }, params) {
        try {
            let response = await http.get('api/word-filters')
            commit('SET', { key: 'all', value: response.data.filters })
        } catch (e) {
            dispatch('handleError', e, { root: true })
        }
    },
    async submit ({ state, commit, dispatch }, update) {
        try {
            if (update) {
                await http.put(`api/admin/word-filters/${state.word.uuid}`, state.word)
            } else {
                await http.post(`api/admin/word-filters`, state.word)
            }

            commit('HIDE_WORD_DIALOG')
            dispatch('all')
        } catch (e) {
            dispatch('handleError', e, { root: true })
        }
    },
    async remove ({ state, commit, dispatch }, wordId) {
        try {
            await MessageBox.confirm('This will permanently delete information. Continue ?', 'Warning')
            await http.delete(`api/admin/word-filters/${wordId}`)
            dispatch('all')
        } catch (e) {
            dispatch('handleError', e, { root: true })
        }
    }
}

const mutations = {
    SET: (state, { key, value }) => { state[key] = value },
    SHOW_WORD_DIALOG: (state) => {
        state.dialogs.word = true
        state.word = new Word()
    },
    HIDE_WORD_DIALOG: (state) => { state.dialogs.word = false },
    EDIT: (state, word) => {
        state.dialogs.word = true
        state.word = {...word}
    }
}

export default {
    namespaced: true,
    state,
    actions,
    mutations
}
