<template>
    <el-dialog :visible.sync="$store.state.users.dialogs.user">
        <el-form label-position="top">
            <el-form-item label="Username">
                <el-input
                    v-model="user.username"
                    placeholder="Username"/>
            </el-form-item>
            <el-form-item label="Email">
                <el-input
                    v-model="user.email"
                    placeholder="Email"/>
            </el-form-item>
            <el-form-item label="Role" v-if="$store.state.user.role === 'superadmin'">
                <el-select v-model="user.role" placeholder="Select Role">
                  <el-option
                    v-for="(role, index) in $store.state.users.roles"
                    :key="`role-${index}`"
                    :value="role.value"
                    :label="role.label"/>
                </el-select>
            </el-form-item>
            <div v-if="user.uuid">
                <el-form-item label="New Password">
                    <el-input
                        v-model="user.newPassword"
                        type="password"
                        placeholder="New Password"/>
                </el-form-item>
            </div>
            <div v-else>
                <el-form-item label="Password">
                    <el-input
                        v-model="user.password"
                        type="password"
                        placeholder="Password"/>
                </el-form-item>
                <el-form-item label="Password Confirmation">
                    <el-input
                        v-model="user.passwordConfirmation"
                        type="password"
                        placeholder="Password Confirmation"/>
                </el-form-item>
            </div>
        </el-form>
        <el-row
            type="flex"
            justify="end"
            style="margin-top: 10px">
            <el-button
                type="primary"
                v-if="user.uuid"
                @click="$store.dispatch('users/submit', true)">
                    Save
            </el-button>
            <el-button
                type="primary"
                v-else
                @click="$store.dispatch('users/submit', null)">
                    Create
            </el-button>
        </el-row>
    </el-dialog>
</template>

<script>
    import { mapState } from 'vuex'

    export default {
        computed: {
            ...mapState('users', [
                'user'
            ])
        }
    }
</script>
