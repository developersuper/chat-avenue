import http from '../http'
import Settings from '../types/Settings'
import { MessageBox, Message } from 'element-ui'

const state = {
    all: [],
    settings: new Settings(),
    dialogs: {
        settings: false
    }
}

const actions = {
    async get ({ state, commit, dispatch }) {
        try {
            let response = await http.get('api/settings')
            commit('SET', { key: 'settings', value: response.data.settings })
        } catch (e) {
            dispatch('handleError', e, { root: true })
        }
    },
    async submit ({ state, commit, dispatch }) {
        try {
            let data = new FormData()
            Object.keys(state.settings).forEach(key => {
                if (key === 'ageRange') {
                    data.append('ageRange', state.settings.ageRange[0])
                    data.append('ageRange', state.settings.ageRange[1])
                } else if (key === 'allowedFileResolution') {
                    data.append('allowedFileResolution', state.settings.allowedFileResolution[0])
                    data.append('allowedFileResolution', state.settings.allowedFileResolution[1])
                } else {
                    data.append(key, state.settings[key])
                }
            })
            await http.put(`api/admin/settings`, data)

            Message.success({ message: 'Successfully updated!' })
            commit('HIDE_SETTINGS_DIALOG')
            dispatch('get')
        } catch (e) {
            dispatch('handleError', e, { root: true })
        }
    },
    async remove ({ state, commit, dispatch }, settingsId) {
        try {
            await MessageBox.confirm('This will permanently delete information. Continue ?', 'Warning')
            await http.delete(`api/admin/settings/${settingsId}`)
            dispatch('all')
        } catch (e) {
            dispatch('handleError', e, { root: true })
        }
    }
}

const mutations = {
    SET: (state, { key, value }) => { state[key] = value },
    SET_SETTINGS: (state, { key, value }) => { state.settings[key] = value },
    SHOW_SETTINGS_DIALOG: (state) => {
        state.dialogs.settings = true
        state.settings = new Settings()
    },
    HIDE_SETTINGS_DIALOG: (state) => { state.dialogs.settings = false },
    EDIT: (state, settings) => {
        state.dialogs.settings = true
        state.settings = {...settings}
    }
}

export default {
    namespaced: true,
    state,
    actions,
    mutations
}
