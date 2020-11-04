<template>
    <div id="mobile-navigation" class="animated fadeInUp">
        <el-row type="flex" justify="end">
            <el-button
                type="primary"
                @click="close()">
                    <icon :icon="['fas', 'times']"/>        
            </el-button>
        </el-row>
        <el-menu 
            :router="true" 
            @select="onMenuSelect">
                <el-menu-item :route="{ name: 'users' }" index="1">
                    <div slot="title">
                        <el-row type="flex" align="middle" style="padding: 0 40px 0 20px">
                            <i style="margin-right: 10px"><icon :icon="['fas', 'user']" style="font-size: 19px;"/></i>
                            Users
                        </el-row>
                    </div>
                </el-menu-item>
                <el-menu-item :route="{ name: 'rooms' }" index="2">
                    <div slot="title">
                        <el-row type="flex" align="middle" style="padding: 0 40px 0 20px">
                            <i style="margin-right: 10px"><icon :icon="['fas', 'chalkboard-teacher']" style="font-size: 19px;"/></i>
                            Rooms
                        </el-row>
                    </div>
                </el-menu-item>
                <el-menu-item :route="{ name: 'dictionary' }" index="3">
                    <div slot="title">
                        <el-row type="flex" align="middle" style="padding: 0 40px 0 20px">
                            <i style="margin-right: 10px"><icon :icon="['fas', 'book']" style="font-size: 19px;"/></i>
                            Word Filtering
                        </el-row>
                    </div>
                </el-menu-item>
                <el-menu-item :route="{ name: 'ad-bots' }" index="4">
                    <div slot="title">
                        <el-row type="flex" align="middle" style="padding: 0 40px 0 20px">
                            <i style="margin-right: 10px"><icon :icon="['fab', 'adversal']" style="font-size: 19px;"/></i>
                            Ad Bots
                        </el-row>
                    </div>
                </el-menu-item>
                <el-menu-item :route="{ name: 'banned-ip' }" index="5">
                    <div slot="title">
                        <el-row type="flex" align="middle" style="padding: 0 40px 0 20px">
                            <i style="margin-right: 10px"><icon :icon="['fas', 'ban']" style="font-size: 19px;"/></i>
                            Banned IP
                        </el-row>
                    </div>
                </el-menu-item>
                <el-menu-item :route="{ name: 'pages' }" index="6">
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
                <el-menu-item :route="{ name: 'files' }" index="8">
                    <div slot="title">
                        <el-row type="flex" align="middle" style="padding: 0 40px 0 20px">
                            <i style="margin-right: 10px"><icon :icon="['fas', 'copy']" style="font-size: 19px;"/></i>
                            Files
                        </el-row>
                    </div>
                </el-menu-item>
                <el-menu-item :route="{ name: 'settings' }" index="9">
                    <div slot="title">
                        <el-row type="flex" align="middle" style="padding: 0 40px 0 20px">
                            <i style="margin-right: 10px"><icon :icon="['fas', 'cog']" style="font-size: 19px;"/></i>
                            Settings
                        </el-row>
                    </div>
                </el-menu-item>
        </el-menu>
    </div>
</template>

<script>
    import $ from 'jquery'

    export default {
        mounted () {
            $('body').addClass('no-scroll')
        },
        beforeDestroy () {
            $('body').removeClass('no-scroll')
        },
        methods: {
            close: function () {
                $('#mobile-navigation').animateCss('fadeOutDown', () => {
                    this.$emit('close')
                })
            },
            onMenuSelect: function () {
                this.close()
            }
        }
    }
</script>