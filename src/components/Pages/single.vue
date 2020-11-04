<template>
    <el-dialog :visible.sync="$store.state.pages.dialogs.page">
        <el-form label-position="top">
            <el-form-item label="Slug">
                <el-input
                    placeholder="Slug"
                    v-model="page.slug"/>
            </el-form-item>
            <el-form-item label="Title">
                <el-input
                    placeholder="Title"
                    v-model="page.title"/>
            </el-form-item>
            <el-form-item label="Content">
                <quill-editor
                    ref="quillEditor"
                    style="height: 400px"
                    v-model="page.content"
                    :options="editorOptions">
                </quill-editor>
            </el-form-item>
        </el-form>
        <el-row
            type="flex"
            style="margin-top: 80px"
            justify="end">
            <el-button
                type="primary"
                v-if="page.uuid"
                @click="$store.dispatch('pages/submit', true)">
                    Save
            </el-button>
            <el-button
                type="primary"
                v-else
                @click="$store.dispatch('pages/submit', null)">
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
            ...mapState('pages', [
                'page'
            ])
        },
        data () {
            return {
                editorOptions: {
                    modules: {
                        toolbar: [
                            ['bold', 'italic', 'underline', 'strike'],
                            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                            [{ 'indent': '-1' }, { 'indent': '+1' }],
                            [{ 'header': [1, 2, 3, false] }],
                            ['clean']
                        ]
                    }
                }
            }
        }
    }
</script>
