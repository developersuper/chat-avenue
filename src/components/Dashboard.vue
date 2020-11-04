<template>
    <el-container id="dashboard">
        <el-aside width="214.03px" class="hidden-xs-only">
            <div class="aside-container">
                <el-menu :collapse="false" :router="true">
                    <el-menu-item :route="{ name: 'home' }" index="0">
                        <div slot="title">
                            <el-row type="flex" align="middle" style="padding: 0 40px 0 20px">
                                <i style="margin-right: 10px"><icon :icon="['fas', 'home']" style="font-size: 19px;"/></i>
                                Home
                            </el-row>
                        </div>
                    </el-menu-item>
                    <el-menu-item :route="{ name: 'users' }" index="1" v-if="user.role !== 'law-enforcement'">
                        <div slot="title">
                            <el-row type="flex" align="middle" style="padding: 0 40px 0 20px">
                                <i style="margin-right: 10px"><icon :icon="['fas', 'user']" style="font-size: 19px;"/></i>
                                Users
                            </el-row>
                        </div>
                    </el-menu-item>
                    <el-menu-item :route="{ name: 'rooms' }" index="2" v-if="user.role !== 'law-enforcement'">
                        <div slot="title">
                            <el-row type="flex" align="middle" style="padding: 0 40px 0 20px">
                                <i style="margin-right: 10px"><icon :icon="['fas', 'chalkboard-teacher']" style="font-size: 19px;"/></i>
                                Rooms
                            </el-row>
                        </div>
                    </el-menu-item>
                    <el-menu-item :route="{ name: 'dictionary' }" index="3" v-if="user.role !== 'law-enforcement'">
                        <div slot="title">
                            <el-row type="flex" align="middle" style="padding: 0 40px 0 20px">
                                <i style="margin-right: 10px"><icon :icon="['fas', 'book']" style="font-size: 19px;"/></i>
                                Word Filtering
                            </el-row>
                        </div>
                    </el-menu-item>
                    <el-menu-item :route="{ name: 'ad-bots' }" index="4" v-if="user.role !== 'law-enforcement'">
                        <div slot="title">
                            <el-row type="flex" align="middle" style="padding: 0 40px 0 20px">
                                <i style="margin-right: 10px"><icon :icon="['fab', 'adversal']" style="font-size: 19px;"/></i>
                                Ad Bots
                            </el-row>
                        </div>
                    </el-menu-item>
                    <el-menu-item :route="{ name: 'banned-ip' }" index="5" v-if="user.role !== 'law-enforcement'">
                        <div slot="title">
                            <el-row type="flex" align="middle" style="padding: 0 40px 0 20px">
                                <i style="margin-right: 10px"><icon :icon="['fas', 'ban']" style="font-size: 19px;"/></i>
                                Banned IP
                            </el-row>
                        </div>
                    </el-menu-item>
                    <el-menu-item :route="{ name: 'pages' }" index="6" v-if="user.role !== 'law-enforcement'">
                        <div slot="title">
                            <el-row type="flex" align="middle" style="padding: 0 40px 0 20px">
                                <i style="margin-right: 10px"><icon :icon="['fas', 'file']" style="font-size: 19px;"/></i>
                                Pages
                            </el-row>
                        </div>
                    </el-menu-item>
                    <el-menu-item :route="{ name: 'logs' }" index="7">
                        <div slot="title">
                            <el-row type="flex" align="middle" style="padding: 0 40px 0 20px">
                                <i style="margin-right: 10px"><icon :icon="['fas', 'file-alt']" style="font-size: 19px;"/></i>
                                Logs
                            </el-row>
                        </div>
                    </el-menu-item>
                    <el-menu-item :route="{ name: 'files' }" index="8" v-if="user.role !== 'law-enforcement'">
                        <div slot="title">
                            <el-row type="flex" align="middle" style="padding: 0 40px 0 20px">
                                <i style="margin-right: 10px"><icon :icon="['fas', 'copy']" style="font-size: 19px;"/></i>
                                Files
                            </el-row>
                        </div>
                    </el-menu-item>
                    <el-menu-item :route="{ name: 'settings' }" index="9" v-if="user.role !== 'law-enforcement'">
                        <div slot="title">
                            <el-row type="flex" align="middle" style="padding: 0 40px 0 20px">
                                <i style="margin-right: 10px"><icon :icon="['fas', 'cog']" style="font-size: 19px;"/></i>
                                Settings
                            </el-row>
                        </div>
                    </el-menu-item>
                </el-menu>
            </div>
        </el-aside>

        <el-container id="content">
            <el-header>
                <el-row type="flex" justify="space-between">
                    <h3>Chat Avenue</h3>
                    <div>
                        <el-button style="margin-bottom: 8px" type="text" @click="$store.dispatch('logout')">
                            Logout
                            <icon icon="sign-out-alt"/>
                        </el-button>
                        <el-button 
                            type="default"
                            class="hidden-sm-and-up"
                            @click="showMobileNav = true">
                                <icon :icon="['fas', 'bars']"/>
                        </el-button>
                    </div>
                </el-row>
            </el-header>
            
            <el-main>
                <transition name="slide" mode="out-in">
                    <router-view></router-view>
                </transition>
            </el-main>
        </el-container>

        <mobile-navigation 
            v-if="showMobileNav"
            @close="onMobileNavClose"/>
    </el-container>
</template>

<script>
    import { mapState } from 'vuex'
    import MobileNavigation from './MobileNavigation'

    export default {
        components: {
            MobileNavigation
        },
        data () {
            return {
                showMobileNav: false
            }
        },
        computed: {
            ...mapState([
                'user'
            ])
        },
        mounted () {
            this.$store.dispatch('getUser')
        },
        methods: {
            onMobileNavClose: function () {
                this.showMobileNav = false
            }
        }
    }
</script>
