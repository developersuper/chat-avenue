<template>
    <el-dialog :visible.sync="$store.state.dictionary.dialogs.word">
        <el-form label-position="top">
            <el-form-item label="Word">
                <el-input
                    placeholder="Word"
                    v-model="word.content"/>
            </el-form-item>
            <el-form-item label="Replace">
                <el-input
                    placeholder="Replace"
                    v-model="word.replace"/>
            </el-form-item>
        </el-form>
        <el-row
            type="flex"
            style="margin-top: 20px"
            justify="end">
            <el-button
                type="primary"
                v-if="word.uuid"
                @click="$store.dispatch('dictionary/submit', true)">
                    Save
            </el-button>
            <el-button
                type="primary"
                v-else
                @click="$store.dispatch('dictionary/submit', null)">
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
            ...mapState('dictionary', [
                'word'
            ])
        }
    }
</script>
