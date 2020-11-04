<template>
    <el-row 
        type="flex" 
        justify="center"
        style="display: flex; align-items: center; justify-content: center"
        :style="{ 'height': $store.state.props.safari ? '85vh' : '100vh' }">
        <el-col :sm="8" :xs="22">
            <el-card>
                <div slot="header">
                    Login
                </div>
                <el-form label-position="top">
                    <el-form-item label="Username">
                        <el-input 
                            v-model="$store.state.login.username" 
                            @keyup.enter.native="login()"
                            placeholder="Username"/>
                    </el-form-item>
                    <el-form-item label="Password">
                        <el-input 
                            v-model="$store.state.login.password"
                            @keyup.enter.native="login()"
                            type="password"
                            placeholder="Password"/>
                    </el-form-item>
                    <el-row 
                        type="flex" 
                        justify="end">
                        <el-button 
                            type="primary" 
                            style="margin-top: 20px" 
                            :loading="loggingIn"
                            @click.prevent="login()">
                                Login
                        </el-button>
                    </el-row>
                </el-form>
            </el-card>
        </el-col>
    </el-row>
</template>

<script>
    export default {
        data () {
            return {
                loggingIn: false
            }
        },
        methods: {
            login: async function () {
                this.loggingIn = true
                try {
                    await this.$store.dispatch('login')
                    // await this.$store.dispatch('getUser')
                    // this.loggingIn = false
                    // this.$router.push({ name: 'home' })
                } catch (e) {
                    console.log('error logging in')
                    this.loggingIn = false
                }
            }
        }
    }
</script>