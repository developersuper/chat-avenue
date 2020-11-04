<template>
    <div>
        <el-card>
            <div slot="header">
                <el-row
                    type="flex"
                    justify="space-between"
                    align="middle">
                    Ad Bots

                    <el-button
                        type="primary"
                        plain
                        @click="$store.commit('adBots/SHOW_ADBOT_DIALOG')">
                            Create
                    </el-button>
                </el-row>
            </div>
            <el-table :data="$store.state.adBots.all">
              <el-table-column prop="name" label="Name"/>
              <el-table-column label="Active" :width="100">
                    <template slot-scope="scope">
                        <el-switch
                            v-model="scope.row.active"
                            @change="onAdbotDisable(scope.row)"/>
                    </template>
              </el-table-column>
              <el-table-column label="Actions" :width="200">
                  <template slot-scope="scope">
                    <el-button
                        size="mini"
                        @click="$store.commit('adBots/EDIT', scope.row)">
                        <icon :icon="['far', 'edit']"/> Edit
                    </el-button>
                    <el-button
                        type="danger"
                        size="mini"
                        @click="$store.dispatch('adBots/remove', scope.row.uuid)"
                        plain>
                        <icon :icon="['far', 'trash-alt']"/> Remove
                    </el-button>
                  </template>
              </el-table-column>
            </el-table>
        </el-card>

        <single-ad-bot/>
    </div>
</template>

<script>
    import SingleAdBot from './single'
    import { Message } from 'element-ui'

    export default {
        components: {
            SingleAdBot
        },
        mounted () {
            this.$store.dispatch('adBots/all')
        },
        methods: {
            onAdbotDisable: async function (adbot) {
                this.$store.commit('adBots/SET', { key: 'adBot', value: {...adbot} })

                try {
                    await this.$store.dispatch('adBots/submit', true)
                } catch (e) {
                    Message.error({ message: 'error active adbot' })
                }
            }
        }
    }
</script>
