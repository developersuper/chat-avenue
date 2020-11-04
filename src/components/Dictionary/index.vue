<template>
    <div>
        <el-card>
            <div slot="header">
                <el-row
                    type="flex"
                    justify="space-between"
                    align="middle">
                    Word Filtering

                    <el-button
                        type="primary"
                        plain
                        @click="$store.commit('dictionary/SHOW_WORD_DIALOG')">
                            Create
                    </el-button>
                </el-row>
            </div>
            <el-table :data="$store.state.dictionary.all">
              <el-table-column prop="content" label="Word"/>
              <el-table-column label="Actions" :width="200">
                  <template slot-scope="scope">
                    <el-button
                        size="mini"
                        @click="$store.commit('dictionary/EDIT', scope.row)">
                        <icon :icon="['far', 'edit']"/> Edit
                    </el-button>
                    <el-button
                        type="danger"
                        size="mini"
                        @click="$store.dispatch('dictionary/remove', scope.row.uuid)"
                        plain>
                        <icon :icon="['far', 'trash-alt']"/> Remove
                    </el-button>
                  </template>
              </el-table-column>
            </el-table>
        </el-card>

        <single-word/>
    </div>
</template>

<script>
    import SingleWord from './single'

    export default {
        components: {
            SingleWord
        },
        mounted () {
            this.$store.dispatch('dictionary/all')
        }
    }
</script>
