<template>
    <el-dialog :visible.sync="$store.state.rooms.dialogs.room">
        <el-form label-position="top">
            <el-form-item label="Name">
                <el-input
                    placeholder="Name"
                    v-model="room.name"/>
            </el-form-item>
            <el-form-item label="Topic">
                <el-input
                    placeholder="Topic"
                    v-model="room.topic"/>
            </el-form-item>
            <el-form-item label="Description">
                <el-input
                    placeholder="Description"
                    v-model="room.description"
                    type="textarea"/>
            </el-form-item>
            <el-form-item label="User Limit">
                <el-input
                    type="number"
                    placeholder="User Limit"
                    min="1"
                    v-model="room.userLimit"/>
            </el-form-item>
            <el-form-item label="Index">
              <el-input
                type="number"
                placeholder="Index"
                min="1"
                v-model="room.index"/>
            </el-form-item>
            <el-form-item label="Settings">
                <el-switch
                    v-model="room.active"
                    active-text="Active"
                    inactive-text="Inactive">
                </el-switch><br>
                <!--<el-checkbox v-model="room.primary">Primary Room</el-checkbox><br>-->
                <el-checkbox v-model="room.allowFileUpload">Enable file upload</el-checkbox><br>
                <el-checkbox v-model="room.allowAudioRecording">Enable audio recording</el-checkbox><br>
                <el-checkbox v-model="room.allowWebcamSharing">Enable webcam sharing</el-checkbox>
            </el-form-item>
          <el-form-item label="Min Age">
            <el-input
              type="number"
              placeholder="Min Age"
              min="1"
              v-model="room.min_age"/>
          </el-form-item>
        </el-form>
        <el-row
            type="flex"
            style="margin-top: 20px"
            justify="end">
            <el-button
                type="primary"
                v-if="room.uuid"
                @click="$store.dispatch('rooms/submit', true)">
                    Save
            </el-button>
            <el-button
                type="primary"
                v-else
                @click="$store.dispatch('rooms/submit', null)">
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
            ...mapState('rooms', [
                'room'
            ])
        }
    }
</script>
