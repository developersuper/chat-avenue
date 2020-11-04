<template>
    <div>
        <el-card>
            <div slot="header">
                <el-row
                    type="flex"
                    justify="space-between"
                    align="middle">
                    Users

                    <div>
                        <el-tooltip class="item" content="Clean db from deleted users" placement="bottom">
                            <el-button @click="cleanUsers = !cleanUsers">
                                Clean
                            </el-button>
                        </el-tooltip>
                        <el-button
                            type="primary"
                            plain
                            @click="$store.commit('users/SHOW_USER_DIALOG')">
                                Create
                        </el-button>
                    </div>
                </el-row>
            </div>
            <el-row type="flex" class="mt-20 mb-20">
                <el-input
                    v-model="filters.email"
                    style="width: 300px"
                    class="mr-10"
                    placeholder="E-Mail"/>
                <el-input
                    v-model="filters.username"
                    style="width: 300px"
                    class="mr-10"
                    placeholder="Username"/>
                <el-input
                    v-model="filters.ip"
                    style="width: 300px"
                    class="mr-10"
                    placeholder="IP Address"/>
                <el-select
                    v-model="filters.role"
                    class="mr-10"
                    placeholder="Role">
                        <el-option
                            v-for="(role, index) in roles"
                            :key="`role-${index}`"
                            :value="role.value"
                            :label="role.label"/>
                </el-select>
                <el-date-picker
                    v-model="filters.registrationDate"
                    type="date"
                    placeholder="Registration Date"
                    class="mr-10"/>
                <el-button
                    type="primary"
                    @click="resetFilters()">
                        Reset
                </el-button>
            </el-row>
            <el-row type="flex" justify="end">
                <el-checkbox
                    v-model="filters.banned"
                    label="Banned"/>
            </el-row>
            <el-table :data="$store.state.users.all.docs">
              <el-table-column prop="email" label="Email"/>
              <el-table-column prop="username" label="Username"/>
              <el-table-column prop="role" label="Role"/>
              <el-table-column prop="ip" label="IP"/>
              <el-table-column label="Registered At">
                  <template slot-scope="scope">
                    {{ scope.row.registeredAt | formated }}
                  </template>
              </el-table-column>
              <el-table-column label="Actions" :width="350">
                  <template slot-scope="scope">
                    <el-button
                        size="mini"
                        @click="$store.commit('users/EDIT', scope.row)">
                            <icon :icon="['far', 'edit']"/> Edit
                    </el-button>
                    <el-button
                        size="mini"
                        v-if="!scope.row.banned"
                        :loading="loaders[scope.row.uuid]"
                        @click="ban(scope.row.uuid, scope.$index)"
                        type="danger"
                        plain>
                            <icon :icon="['fas', 'ban']"/> Ban
                    </el-button>
                    <el-button
                        size="mini"
                        v-else
                        :loading="loaders[scope.row.uuid]"
                        @click="unban(scope.row.uuid, scope.$index)"
                        type="success"
                        plain>
                            <icon :icon="['fas', 'lock-open']"/> Unban
                    </el-button>
                    <el-button
                        type="danger"
                        size="mini"
                        @click="remove(scope.row.uuid)">
                            <icon :icon="['far', 'trash-alt']"/> Remove
                    </el-button>
                  </template>
              </el-table-column>
            </el-table>
          <el-pagination
            :current-page.sync="filters.page"
            layout="total, prev, pager, next"
            :total="$store.state.users.all.total"
            :page-sizes="[20]"
          >
          </el-pagination>
        </el-card>

        <single-user/>

        <el-dialog
            :visible.sync="cleanUsers"
            title="Clean guest users">
                <el-date-picker
                    v-model="cleanDate"
                    class="mt-20"
                    type="daterange"
                    range-separator="To"
                    start-placeholder="Start date"
                    end-placeholder="End date"/>

                <el-row type="flex" justify="end">
                    <el-button
                        @click="clean()"
                        :loading="cleaning">
                            Submit
                    </el-button>
                </el-row>
        </el-dialog>
    </div>
</template>

<script>
    import SingleUser from './single'
    import { mapState } from 'vuex'
    import moment from 'moment'
    import { Message, MessageBox } from 'element-ui'
    import Vue from 'vue'

    const emptyFilters = () => {
        return {
            email: '',
            username: '',
            role: '',
            ip: '',
            registrationDate: null,
            banned: false,
            page: 1
        }
    }

    export default {
        components: {
            SingleUser
        },
        data () {
            return {
                filters: emptyFilters(),
                cleaning: false,
                cleanUsers: false,
                cleanDate: [],
                loaders: {}
            }
        },
        computed: {
            ...mapState('users', [
                'roles'
            ])
        },
        watch: {
            'filters.email': 'getUsers',
            'filters.username': 'getUsers',
            'filters.role': 'getUsers',
            'filters.ip': 'getUsers',
            'filters.registrationDate': 'getUsers',
            'filters.banned': 'getUsers',
            'filters.page': 'getUsers'
        },
        mounted () {
            this.getUsers()
        },
        methods: {
            getUsers: function () {
                this.$store.dispatch('users/all', this.filters)
            },
            resetFilters: function () {
                this.filters = emptyFilters()
            },
            ban: async function (userId, index) {
                try {
                    Vue.set(this.loaders, userId, true)
                    await this.$store.dispatch('users/banPermanent', userId)
                    Vue.set(this.$store.state.users.all[index], 'banned', true)
                    Message.success('Banned')
                } catch (e) {
                    Message.error('error banning user')
                    console.log(e)
                }

                Vue.set(this.loaders, userId, false)
            },
            unban: async function (userId, index) {
                try {
                    Vue.set(this.loaders, userId, true)
                    await this.$store.dispatch('users/unban', userId)
                    Vue.set(this.$store.state.users.all[index], 'banned', false)
                    Message.success('Unbanned')
                } catch (e) {
                    Message.error('error banning user')
                    console.log(e)
                }
                Vue.set(this.loaders, userId, false)
            },
            remove: async function (userId) {
                try {
                    await MessageBox.confirm('This will permanently delete information. Continue ?', 'Warning')
                    await this.$store.dispatch('users/remove', userId)
                } catch (e) {
                    //
                }
            },
            clean: async function () {
                try {
                    await MessageBox.confirm('This will permanently delete information. Continue ?', 'Warning')
                    this.cleaning = true
                    await this.$store.dispatch('users/remove', {
                        type: 'deleted-users',
                        filters: {
                            range: this.cleanDate
                        }
                    })
                } catch (e) {
                    console.log('error cleaning database')
                }
                this.cleaning = false
                this.cleanUsers = false
                this.cleanDate = []
            }
        },
        filters: {
            formated: (value) => moment(value).format('DD/MM/YY HH:mm')
        }
    }
</script>
