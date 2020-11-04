<template>
    <div>
        <el-card v-loading="loaders.page">
            <div slot="header">
                <el-row type="flex" justify="space-between" align="middle">
                    <span>Files</span>
                    <el-button
                        type="danger"
                        :loading="deletingFiles"
                        @click="removeFiles()"
                        plain>
                            Delete All Files
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
                    v-model="filters.filename"
                    style="width: 300px"
                    class="mr-10"
                    placeholder="Filename"/>
                <el-button
                    type="primary"
                    @click="resetFilters()">
                        Reset
                </el-button>
            </el-row>
            <el-table
                :data="$store.state.files.all.data"
                @selection-change="onSelect">
                    <el-table-column
                        type="selection"
                        width="55"/>
                    <el-table-column label="File">
                        <template slot-scope="scope">
                            <div v-if="/\.(gif|jpg|jpeg|tiff|png|svg)$/i.test(scope.row.path)">
                                <img
                                    :src="baseURL + scope.row.path"
                                    width="100px">
                            </div>
                            <a
                                :href="baseURL + scope.row.path"
                                target="_blank"
                                rel="noopener"
                                download>
                                    download
                            </a>
                        </template>
                    </el-table-column>
                    <el-table-column prop="name" label="Name"/>
                    <el-table-column label="Uploaded">
                        <template slot-scope="scope">
                            {{ scope.row.createdAt | formatDate }}
                        </template>
                    </el-table-column>
                    <el-table-column label="Actions">
                        <template slot-scope="scope">
                            <el-button
                                type="danger"
                                size="mini"
                                icon="el-icon-delete"
                                @click="removeFiles([scope.row.uuid])"
                                plain>
                                    Remove
                            </el-button>
                        </template>
                    </el-table-column>
            </el-table>

            <el-row class="mt-20 mb-20">
                <el-button
                    type="danger"
                    icon="el-icon-delete"
                    v-if="selectedFiles.length"
                    @click="removeSelectedFiles()">
                        Remove
                </el-button>
            </el-row>

            <el-pagination
                :current-page.sync="filters.page"
                layout="total, prev, pager, next"
                :page-size="all.perPage"
                :total="all.count">
                </el-pagination>
        </el-card>
    </div>
</template>

<script>
    import moment from 'moment'
    import { mapState } from 'vuex'
    import { Message } from 'element-ui'

    const emptyFilters = () => {
        return {
            date: [null, null],
            filename: '',
            fromDate: null,
            toDate: null
        }
    }

    export default {
        data () {
            return {
                filters: emptyFilters(),
                selectedFiles: [],
                deletingFiles: false
            }
        },
        computed: {
            ...mapState('files', [
                'loaders',
                'all'
            ]),
            ...mapState([
                'baseURL'
            ])
        },
        watch: {
            'filters.date': 'onDateChange',
            'filters.filename': 'getFiles',
            'filters.page': 'getFiles'
        },
        mounted () {
            this.getFiles()
        },
        methods: {
            getFiles: function () {
                this.$store.dispatch('files/all', this.filters)
            },
            onSelect: function (value) {
                this.selectedFiles = value
            },
            onDateChange: function () {
                if (this.filters.date) {
                    this.filters.fromDate = this.filters.date[0]
                    this.filters.toDate = this.filters.date[1]
                } else {
                    this.filters.fromDate = null
                    this.filters.toDate = null
                }

                this.getFiles()
            },
            resetFilters: function () {
                this.filters = emptyFilters()
            },
            removeFiles: async function (fileIds = []) {
                try {
                    await this.$store.dispatch('files/remove', fileIds)
                    this.getFiles()
                    return Promise.resolve()
                } catch (e) {
                    console.log('error removing files')
                    return Promise.reject(e)
                }
            },
            removeSelectedFiles: async function () {
                try {
                    if (!this.selectedFiles.length) {
                        Message.error('Please select files!')
                        return
                    }
                    await this.removeFiles(this.selectedFiles)
                    this.selectedFiles = []
                } catch (e) {
                    console.log('error deleting multiple files')
                    return Promise.reject(e)
                }
            }
        },
        filters: {
            formatDate: (value) => {
                return moment(value).format('DD/MM/YYYY HH:mm')
            }
        }
    }
</script>
