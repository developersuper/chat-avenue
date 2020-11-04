<template>
    <el-dialog :visible.sync="$store.state.adBots.dialogs.adBot">
        <el-form label-position="top">
            <el-form-item label="Name">
                <el-input
                    placeholder="Name"
                    v-model="adBot.name"/>
            </el-form-item>
            <el-form-item label="Message">
                <quill-editor
                    ref="quillEditor"
                    style="height: 100px; margin-bottom: 80px"
                    v-model="adBot.message"
                    :options="editorOptions">
                </quill-editor>
            </el-form-item>
            <el-form-item label="Color">
                <el-color-picker v-model="adBot.color"></el-color-picker>
            </el-form-item>
            <el-form-item label="Frequency">
              <el-input
                type="number"
                placeholder="Frequency"
                min="1"
                v-model="adBot.frequency"/>
            </el-form-item>
            <el-form-item label="Avatar">
                <input type="file" @change="$store.commit('adBots/SET_ADBOT', { key: 'profileImage', value: $event.target.files[0] })"/><br/>
                <img
                    v-if="adBot.profileImage"
                    width="200"
                    :src="createImage(adBot.profileImage)">
            </el-form-item>
        </el-form>
        <el-row
            type="flex"
            style="margin-top: 20px"
            justify="end">
            <el-button
                type="primary"
                v-if="adBot.uuid"
                @click="$store.dispatch('adBots/submit', true)">
                    Save
            </el-button>
            <el-button
                type="primary"
                v-else
                @click="$store.dispatch('adBots/submit', null)">
                    Create
            </el-button>
        </el-row>
    </el-dialog>
</template>

<script>
    import {
        mapState
    } from 'vuex'

    export default {
        computed: {
            ...mapState('adBots', [
                'adBot'
            ])
        },
        data () {
            return {
                editorOptions: {
                    modules: {
                        toolbar: ['link']
                    }
                }
            }
        },
        methods: {
            createImage (image) {
                if (typeof image === 'string') {
                    return this.$store.state.baseURL + image
                }

                return URL.createObjectURL(image)
            }
        }
    }
</script>
