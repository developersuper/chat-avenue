<template>
    <div>
        <el-card>
            <div slot="header">
                <el-row type="flex" justify="space-between" align="middle">
                    <span>Logs</span>
                    <el-button @click="clearLogs = !clearLogs">
                        Clear
                    </el-button>
                </el-row>
            </div>
            <el-row type="flex" class="mt-20 mb-20">
                <el-date-picker
                    v-model="filters.date"
                    type="daterange"
                    range-separator="To"
                    class="mr-10"
                    start-placeholder="Start date"
                    end-placeholder="End date"/>
                <el-input
                    v-model="filters.ip"
                    style="width: 300px"
                    class="mr-10"
                    placeholder="IP"/>
                <el-input
                    v-model="filters.username"
                    style="width: 300px"
                    class="mr-10"
                    placeholder="Username"/>
                <el-select
                    v-model="filters.activity"
                    class="mr-10"
                    placeholder="Activity Type">
                        <el-option
                            v-for="(activity, index) in activities"
                            :key="`actiivty-${index}`"
                            :value="activity.value"
                            :label="activity.label"/>
                </el-select>
                <el-button
                    type="primary"
                    @click="resetFilters()">
                        Reset
                </el-button>
            </el-row>
            <el-table :data="$store.state.logs.all.data">
              <el-table-column prop="username" label="Username"/>
              <el-table-column prop="ip" label="IP"/>
              <el-table-column prop="activity" label="Activity"/>
              <el-table-column label="Date">
                  <template slot-scope="scope">
                    {{ scope.row.createdAt | date }}
                  </template>
              </el-table-column>
            </el-table>

            <el-pagination
                :current-page.sync="filters.page"
                layout="total, prev, pager, next"
                :page-size="all.perPage"
                :total="all.count">
            </el-pagination>
        </el-card>

        <el-dialog 
            :visible.sync="clearLogs" 
            title="Clear logs up to">
                <el-date-picker
                    v-model="clearDate"
                    class="mt-20"
                    type="daterange"
                    range-separator="To"
                    start-placeholder="Start date"
                    end-placeholder="End date"/>

                <el-row type="flex" justify="end">
                    <el-button 
                        @click="clearLogsSubmit()"
                        :loading="clearingLogs">
                            Submit
                    </el-button>
                </el-row>
        </el-dialog>
    </div>
</template>

<script>
    import moment from 'moment'
    import { mapState } from 'vuex'

    const emptyFilters = () => {
        return {
            date: [null, null],
            ip: '',
            username: '',
            activity: '',
            fromDate: null,
            toDate: null,
            page: 1
        }
    }

    export default {
        data () {
            return {
                filters: emptyFilters(),
                activities: [
                    { value: 'registration', label: 'Registration' },
                    { value: 'login', label: 'Login' },
                    { value: 'guestLogin', label: 'Guest Login' },
                    { value: 'logout', label: 'Logout' },
                    { value: 'disconnect', label: 'Disconnect' }
                ],
                clearLogs: false,
                clearDate: [],
                clearingLogs: false
            }
        },
        computed: {
            ...mapState('logs', [
                'all'
            ])
        },
        watch: {
            'filters.date': 'onDateChange',
            'filters.ip': 'getLogs',
            'filters.username': 'getLogs',
            'filters.activity': 'getLogs',
            'filters.page': 'getLogs'
        },
        mounted () {
            this.getLogs()
        },
        methods: {
            getLogs: function () {
                this.$store.dispatch('logs/all', this.filters)
            },
            resetFilters: function () {
                this.filters = emptyFilters()
            },
            onDateChange: function () {
                if (this.filters.date) {
                    this.filters.fromDate = this.filters.date[0]
                    this.filters.toDate = this.filters.date[1]
                } else {
                    this.filters.fromDate = null
                    this.filters.toDate = null
                }
                
                this.getLogs()
            },
            clearLogsSubmit: async function () {
                this.clearingLogs = true
                try {
                    await this.$store.dispatch('logs/clear', this.clearDate)
                    await this.getLogs()
                } catch (e) {
                    console.log('error clearing logs')
                }
                this.clearLogs = false
                this.clearDate = []
                this.clearingLogs = false
            }
        },
        filters: {
            date: (string) => {
                return moment(string).format('DD/MM/YYYY HH:mm:ss')
            }
        }
    }
</script>