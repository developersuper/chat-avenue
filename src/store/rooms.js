import http from '../http'
import Room from '../types/Room'
import {
    MessageBox
} from 'element-ui'

const state = {
    all: [],
    room: new Room(),
    dialogs: {
        room: false
    }
}

const actions = {
    async all ({ state, commit, dispatch }, params) {
        try {
            let response = await http.get('api/admin/rooms')
            commit('SET', { key: 'all', value: response.data.rooms })
        } catch (e) {
            dispatch('handleError', e, { root: true })
        }
    },
    async pushUri ({ state, commit, dispatch }, data) {
        try {
            await http.post('api/admin/rooms/push-uri', data)
            return Promise.resolve()
        } catch (e) {
            dispatch('handleError', e, { root: true })
            return Promise.reject(e)
        }
    },
    async announce ({ state, commit, dispatch }, data) {
        try {
            await http.post('api/admin/rooms/announce', data)
            return Promise.resolve()
        } catch (e) {
            dispatch('handleError', e, { root: true })
            return Promise.reject(e)
        }
    },
    async submit ({ state, commit, dispatch }, update) {
        try {
            if (update) {
                await http.put(`api/admin/rooms/${state.room.uuid}`, state.room)
            } else {
                await http.post(`api/admin/rooms`, state.room)
            }

            commit('HIDE_ROOM_DIALOG')
            dispatch('all')
        } catch (e) {
            dispatch('handleError', e, { root: true })
        }
    },
    async remove ({ state, commit, dispatch }, roomId) {
        try {
            await MessageBox.confirm('This will permanently delete information. Continue ?', 'Warning')
            await http.delete(`api/admin/rooms/${roomId}`)
            dispatch('all')
        } catch (e) {
            dispatch('handleError', e, { root: true })
        }
    }
}

const mutations = {
    SET: (state, { key, value }) => { state[key] = value },
    SHOW_ROOM_DIALOG: (state) => {
        state.dialogs.room = true
        state.room = new Room()
    },
    HIDE_ROOM_DIALOG: (state) => { state.dialogs.room = false },
    EDIT: (state, room) => {
        state.dialogs.room = true
        state.room = {...room}
    }
}

export default {
    namespaced: true,
    state,
    actions,
    mutations
}
