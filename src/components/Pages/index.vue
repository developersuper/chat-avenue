<template>
    <div>
        <el-card>
            <div slot="header">
                <el-row
                    type="flex"
                    justify="space-between"
                    align="middle">
                    Pages

                    <el-button
                        type="primary"
                        plain
                        @click="$store.commit('pages/SHOW_PAGE_DIALOG')">
                            Create
                    </el-button>
                </el-row>
            </div>
            <el-table :data="$store.state.pages.all">
              <el-table-column prop="slug" label="Slug"/>
              <el-table-column label="Actions" :width="200">
                  <template slot-scope="scope">
                    <el-button
                        size="mini"
                        @click="$store.commit('pages/EDIT', scope.row)">
                        <icon :icon="['far', 'edit']"/> Edit
                    </el-button>
                    <el-button
                        type="danger"
                        size="mini"
                        @click="$store.dispatch('pages/remove', scope.row.uuid)"
                        plain>
                        <icon :icon="['far', 'trash-alt']"/> Remove
                    </el-button>
                  </template>
              </el-table-column>
            </el-table>
        </el-card>

        <single-page/>
    </div>
</template>

<script>
    import SinglePage from './single'

    export default {
        components: {
            SinglePage
        },
        mounted () {
            this.$store.dispatch('pages/all')
        }
    }
</script>
