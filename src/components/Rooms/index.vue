<template>
    <div>
        <el-card>
            <div slot="header">
                <el-row
                    type="flex"
                    justify="space-between"
                    align="middle">
                    Rooms

                    <el-button
                        type="primary"
                        plain
                        @click="$store.commit('rooms/SHOW_ROOM_DIALOG')">
                            Create
                    </el-button>
                </el-row>
            </div>
            <el-table :data="$store.state.rooms.all" :row-class-name="primaryRowClassName">
              <el-table-column prop="name" label="Name"/>
              <el-table-column label="Actions" :width="500">
                  <template slot-scope="scope">
                    <el-button
                        size="mini"
                        :loading="sendingAnnouncement"
                        @click="announcement(scope.row.uuid)">
                            <icon :icon="['far', 'bell']"/> Announcement
                    </el-button>
                    <el-button
                        size="mini"
                        :loading="pushingUri"
                        @click="pushUri(scope.row.uuid)">
                            <icon :icon="['far', 'bell']"/> Push
                    </el-button>
                    <el-button
                        size="mini"
                        @click="$store.commit('rooms/EDIT', scope.row)">
                            <icon :icon="['far', 'edit']"/> Edit
                    </el-button>
                    <el-button
                        type="danger"
                        size="mini"
                        @click="$store.dispatch('rooms/remove', scope.row.uuid)"
                        plain>
                            <icon :icon="['far', 'trash-alt']"/> Remove
                    </el-button>
                  </template>
              </el-table-column>
            </el-table>
        </el-card>

        <single-room/>
    </div>
</template>

<script>
    import SingleRoom from './single'
    import { MessageBox } from 'element-ui'

    export default {
        components: {
            SingleRoom
        },
        mounted () {
            this.$store.dispatch('rooms/all')
        },
        data () {
            return {
                pushingUri: false,
                sendingAnnouncement: false
            }
        },
        methods: {
            primaryRowClassName: function ({ row, rowIndex }) {
                if (row.primary) {
                    return 'warning-row'
                }
            },
            pushUri: async function (roomId) {
                try {
                    let { value } = await MessageBox.prompt('Please input URI', 'Tip', {
                        confirmButtonText: 'OK',
                        cancelButtonText: 'Cancel',
                        inputPattern: /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/,
                        inputErrorMessage: 'Invalid URI'
                    })

                    this.pushingUri = true
                    await this.$store.dispatch('rooms/pushUri', {
                        uri: value,
                        roomId
                    })
                } catch (e) {
                    console.log('error pushing message')
                }

                this.pushingUri = false
            },
            announcement: async function (roomId) {
                try {
                    let { value } = await MessageBox.prompt('Please input announcement', 'Tip', {
                        confirmButtonText: 'OK',
                        cancelButtonText: 'Cancel'
                    })

                    this.sendingAnnouncement = true
                    await this.$store.dispatch('rooms/announce', {
                        content: value,
                        roomId
                    })
                } catch (e) {
                    console.log('error sending announcement')
                }

                this.sendingAnnouncement = false
            }
        }
    }
</script>
