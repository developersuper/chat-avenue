<template>
    <div>
        <el-card>
            <div slot="header">
                <el-row
                    type="flex"
                    justify="space-between"
                    align="middle">
                        Settings
                </el-row>
            </div>
            <el-form 
                label-width="180px" 
                :label-position="props.isMobile ? 'top': 'left'">
                    <el-form-item label="App Name">
                        <el-input
                            placeholder="App Name"
                            v-model="settings.appName"/>
                    </el-form-item>
                    <el-form-item label="App Icon">
                        <input 
                            type="file" 
                            @change="$store.commit('settings/SET_SETTINGS', { key: 'appIcon', value: $event.target.files[0] })"/>
                        <br/>
                        <div v-if="typeof settings.appIcon === 'string' && settings.appIcon.length">
                            <img
                                :src="$store.state.baseURL + settings.appIcon"
                                width="200"/>
                            <br/>
                            <el-button 
                                type="default"
                                @click="$store.commit('settings/SET_SETTINGS', { key: 'appIcon', value: '' })">
                                    Remove Image
                            </el-button>
                        </div>
                    </el-form-item>
                    <el-form-item label="App Icon URL">
                        <el-input v-model="settings.appIconUrl" placeholder="App Icon URL">
                            <template slot="prepend">
                                <icon :icon="['fas', 'link']"/>
                            </template>
                        </el-input>
                    </el-form-item>
                    <el-form-item label="Welcome Title">
                        <el-input
                            placeholder="Welcome Title"
                            v-model="settings.welcomeTitle"/>
                    </el-form-item>
                    <el-form-item label="Welcome Message">
                        <el-input
                            placeholder="Welcome Message"
                            v-model="settings.welcomeMessage"/>
                    </el-form-item>
                    <!-- <el-form-item label="Theme">
                        <el-row type="flex" align="middle" justify="space-between" style="width: 300px">
                            <span style="margin-right: 10px">App Header Background Color</span>
                            <el-color-picker v-model="settings.appHeaderBackground"></el-color-picker>
                        </el-row>
                        <el-row type="flex" align="middle" justify="space-between" style="width: 300px">
                            <span style="margin-right: 10px">Login Page Background Color</span>
                            <el-color-picker v-model="settings.loginPageBackground"></el-color-picker>
                        </el-row>
                        <el-row type="flex" align="middle" justify="space-between" style="width: 300px">
                            <span style="margin-right: 10px">Login Page Card Background Color</span>
                            <el-color-picker v-model="settings.loginPageCardBackground"></el-color-picker>
                        </el-row>
                        <el-row type="flex" align="middle" justify="space-between" style="width: 300px">
                            <span style="margin-right: 10px">Login Page Card Text Color</span>
                            <el-color-picker v-model="settings.loginPageCardTextColor"></el-color-picker>
                        </el-row>
                    </el-form-item> -->
                    <el-form-item label="History Count">
                        <el-input-number 
                            v-model="settings.historyCount" 
                            controls-position="right" 
                            :min="1" 
                            :max="10000"></el-input-number>
                    </el-form-item>
                    <el-form-item label="Number of smileys per message">
                        <el-input-number 
                            v-model="settings.numberOfSmileysPerMessage" 
                            controls-position="right" 
                            :min="1" 
                            :max="10000"></el-input-number>
                    </el-form-item>
                    <el-form-item label="Max char limit">
                        <el-input-number 
                            v-model="settings.maxWordCharLimit" 
                            controls-position="right" 
                            :min="1" 
                            :max="10000"></el-input-number>
                    </el-form-item>
                    <el-form-item label="Allowed username length">
                        <el-input-number 
                            v-model="settings.allowedUsernameLength" 
                            controls-position="right" 
                            :min="1" 
                            :max="10000"></el-input-number>
                    </el-form-item>
                    <el-form-item label="No. of Mutes to Action">
                        <el-input-number 
                            v-model="settings.numberOfMutesToAction"
                            controls-position="right" 
                            :min="1" 
                            :max="10000"></el-input-number>
                    </el-form-item>
                    <el-form-item label="Mute exceed action">
                        <el-switch
                            v-model="settings.actionOnMuteExceed"
                            active-value="ban"
                            inactive-value="kick"
                            active-text="Ban"
                            inactive-text="Kick"/>
                    </el-form-item>
                    <el-form-item label="Mute User Timeout">
                        <el-input
                            v-model="settings.muteUserTimeout" 
                            type="number"
                            :min="1">
                                <template slot="append">
                                    minutes
                                </template>
                        </el-input>
                    </el-form-item>
                    <el-form-item label="Kick User Timeout">
                        <el-input
                            v-model="settings.kickUserTimeout" 
                            type="number"
                            :min="1">
                                <template slot="append">
                                    minutes
                                </template>
                        </el-input>
                    </el-form-item>
                    <el-form-item label="Audio Recording Limit">
                        <el-input
                            v-model="settings.audioRecordingLimit" 
                            type="number"
                            :min="1">
                                <template slot="append">
                                    seconds
                                </template>
                        </el-input>
                    </el-form-item>
                    <el-form-item label="Adbot Interval">
                        <el-input
                            v-model="settings.adbotInterval" 
                            type="number"
                            :min="1">
                                <template slot="append">
                                    seconds
                                </template>
                        </el-input>
                    </el-form-item>
                    <el-form-item label="Advertisement Image">
                        <input type="file" @change="$store.commit('settings/SET_SETTINGS', { key: 'advertisementImage', value: $event.target.files[0] })"/>
                        <br/>
                        <div v-if="typeof settings.advertisementImage === 'string' && settings.advertisementImage.length">
                            <img
                                :src="$store.state.baseURL + settings.advertisementImage"
                                width="200"/>
                            <br/>
                            <el-button
                                type="default"
                                @click="$store.commit('settings/SET_SETTINGS', { key: 'advertisementImage', value: '' })">
                                    Remove Image
                            </el-button>
                        </div>
                    </el-form-item>
                    <el-form-item label="Advertisement URL">
                        <el-input v-model="settings.advertismentUrl" placeholder="Advertisement URL">
                            <template slot="prepend">
                                <icon :icon="['fas', 'link']"/>
                            </template>
                        </el-input>
                    </el-form-item>
                    <el-form-item label="Help Page URL">
                        <el-input v-model="settings.helpPageUrl" placeholder="Help Page URL">
                            <template slot="prepend">
                                <icon :icon="['fas', 'link']"/>
                            </template>
                        </el-input>
                    </el-form-item>
                    <el-form-item label="Facebook Share URL">
                        <el-input v-model="settings.facebookShareUrl" placeholder="Facebook Share URL">
                            <template slot="prepend">
                                <icon :icon="['fas', 'link']"/>
                            </template>
                        </el-input>
                    </el-form-item>
                    <el-form-item label="Twitter Share URL">
                        <el-input v-model="settings.twitterShareUrl" placeholder="Twitter Share URL">
                            <template slot="prepend">
                                <icon :icon="['fas', 'link']"/>
                            </template>
                        </el-input>
                    </el-form-item>
                    <el-form-item label="Allowed file size">
                        <el-input
                            v-model="settings.allowedFileSize" 
                            placeholder="512"
                            style="width: 150px"
                            type="number">
                                <template slot="append">kb</template>
                        </el-input>
                    </el-form-item>
                    <el-form-item label="Allowed file resolution" v-if="settings.allowedFileResolution">
                        <el-input
                            v-model="settings.allowedFileResolution[0]" 
                            placeholder="512"
                            style="width: 150px"
                            class="mr-10"
                            type="number"
                            min="0">
                                <template slot="append">px</template>
                        </el-input>
                        x
                        <el-input
                            v-model="settings.allowedFileResolution[1]"
                            placeholder="512"
                            style="width: 150px"
                            class="ml-10"
                            type="number"
                            min="0">
                                <template slot="append">px</template>
                        </el-input>
                    </el-form-item>
                    <el-form-item label="Allowed file types">
                        <el-input
                            placeholder="Allowed file types regex"
                            v-model="settings.allowedFileTypes">
                        </el-input>
                        * file extensions separated by comma
                    </el-form-item>
                    <el-form-item label="Settings">
                        <el-checkbox v-model="settings.showAppIcon">Show App Icon</el-checkbox><br>
                        <el-checkbox v-model="settings.enableGuestAvatar">Enable Guest Avatar</el-checkbox><br>
                        <el-checkbox v-model="settings.enableEmailVerification">Enable Email Verification</el-checkbox><br>
                    </el-form-item>

                    <el-row type="flex" justify="end">
                        <el-button 
                            type="primary"
                            @click="$store.dispatch('settings/submit')">
                                Save
                        </el-button>
                    </el-row>
            </el-form>
        </el-card>
    </div>
</template>

<script>
    import {
        mapState
    } from 'vuex'

    export default {
        computed: {
            ...mapState('settings', [
                'settings'
            ]),
            ...mapState([
                'props'
            ])
        },
        mounted () {
            this.$store.dispatch('settings/get')
        }
    }
</script>