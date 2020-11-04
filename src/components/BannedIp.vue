<template>
    <div>
        <el-card>
            <div slot="header">
                <el-row
                    type="flex"
                    justify="space-between"
                    align="middle">
                    Banned IP Addresses
                </el-row>
            </div>
            <el-row>
                <el-input
                    placeholder="IP Address"
                    v-model="filters.address"/>
            </el-row>
            <el-table
                :data="$store.state.bannedIps.all"
                @selection-change="onSelect"
                v-loading="deletingIps">
                    <el-table-column
                        type="selection"
                        width="55">
                    </el-table-column>
                    <el-table-column prop="address" label="Address"/>
                    <el-table-column label="By">
                        <template slot-scope="scope">
                            {{ scope.row.by.username }}
                        </template>
                    </el-table-column>
                    <el-table-column label="Date">
                        <template slot-scope="scope">
                            {{ scope.row.createdAt | formated }}
                        </template>
                    </el-table-column>
                    <el-table-column label="Actions" :width="100">
                        <template slot-scope="scope">
                            <el-button
                                type="danger"
                                size="mini"
                                :loading="removingIps[scope.row.uuid]"
                                @click="remove(scope.row)"
                                plain>
                                <icon :icon="['far', 'trash-alt']"/> Remove
                            </el-button>
                        </template>
                    </el-table-column>
            </el-table>
        </el-card>
        <el-button
            type="danger"
            style="position: fixed; right: 20px; bottom: 20px; box-shadow: 0 0 5px 2px rgba(0,0,0,.1)"
            v-if="selectedIps.length"
            @click="removeSelectedIps()"
            circle>
            <icon :icon="['fas', 'trash']"/>
        </el-button>
    </div>
</template>

<script>
    import moment from 'moment'
    import Vue from 'vue'
    import { Message, MessageBox } from 'element-ui'

    export default {
        data () {
            return {
                selectedIps: [],
                removingIps: {},
                deletingIps: false,
                filters: {
                    address: ''
                }
            }
        },
        watch: {
            'filters.address': 'onFilterChange'
        },
        mounted () {
            this.$store.dispatch('bannedIps/all')
        },
        methods: {
            onFilterChange: function () {
                this.$store.dispatch('bannedIps/all', this.filters)
            },
            onSelect: function (ips) {
                this.selectedIps = ips
            },
            removeSelectedIps: async function () {
                this.deletingIps = true
                try {
                    if (!this.selectedIps.length) {
                        Message.error('Please select files!')
                        return
                    }
                    await MessageBox.confirm('This will permanently delete information. Continue ?', 'Warning')
                    await Promise.all(this.selectedIps.map(ip => {
                        this.$store.dispatch('bannedIps/remove', ip.address)
                    }))
                    this.$store.dispatch('bannedIps/all')
                    this.selectedIps = []
                } catch (e) {
                    console.log('error deleting multiple files')
                }
                this.deletingIps = false
            },
            remove: async function (ip) {
                Vue.set(this.removingIps, ip, true)
                try {
                    await MessageBox.confirm('This will permanently delete information. Continue ?', 'Warning')
                    await this.$store.dispatch('bannedIps/remove', ip.address)
                    await this.$store.dispatch('bannedIps/all')
                    Vue.set(this.removingIps, ip, false)
                    return Promise.resolve()
                } catch (e) {
                    console.log('error removeing ip')
                    Vue.set(this.removingIps, ip, false)
                    return Promise.reject(e)
                }
            }
        },
        filters: {
            formated: (value) => {
                return moment(value).format('DD/MM/YYYY HH:mm')
            }
        }
    }
</script>
