import http from '../http'
import AdBot from '../types/AdBot'
import {
    MessageBox
} from 'element-ui'

const state = {
    all: [],
    adBot: new AdBot(),
    dialogs: {
        adBot: false
    }
}

const actions = {
    async all ({ state, commit, dispatch }, params) {
        try {
            let response = await http.get('api/adbots')
            commit('SET', { key: 'all', value: response.data.adBots })
        } catch (e) {
            dispatch('handleError', e, { root: true })
        }
    },
    async submit ({ state, commit, dispatch }, update) {
        try {
            let data = new FormData()
            Object.keys(state.adBot).forEach(key => {
                data.append(key, state.adBot[key])
            })

            if (update) {
                await http.put(`api/admin/adbots/${state.adBot.uuid}`, data, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
            } else {
                await http.post(`api/admin/adbots`, data)
            }

            commit('HIDE_ADBOT_DIALOG')
            dispatch('all')
            return Promise.resolve()
        } catch (e) {
            dispatch('handleError', e, { root: true })
            return Promise.reject(e)
        }
    },
    async remove ({ state, commit, dispatch }, adBotId) {
        try {
            await MessageBox.confirm('This will permanently delete information. Continue ?', 'Warning')
            await http.delete(`api/admin/adbots/${adBotId}`)
            dispatch('all')
        } catch (e) {
            dispatch('handleError', e, { root: true })
        }
    }
}

const mutations = {
    SET: (state, { key, value }) => { state[key] = value },
    SET_ADBOT: (state, { key, value }) => { state.adBot[key] = value },
    SHOW_ADBOT_DIALOG: (state) => {
        state.dialogs.adBot = true
        state.adBot = new AdBot()
    },
    HIDE_ADBOT_DIALOG: (state) => { state.dialogs.adBot = false },
    EDIT: (state, adBot) => {
        state.dialogs.adBot = true
        state.adBot = {...adBot}
    }
}

export default {
    namespaced: true,
    state,
    actions,
    mutations
}
