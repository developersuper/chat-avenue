import Vue from 'vue'
import Router from 'vue-router'
// import store from './store'
import { Message } from 'element-ui'

import Dashboard from '@/components/Dashboard'
import Home from '@/components/Home'
import Users from '@/components/Users'
import Rooms from '@/components/Rooms'
import Dictionary from '@/components/Dictionary'
import AdBots from '@/components/AdBots'
import BannedIp from '@/components/BannedIp'
import Pages from '@/components/Pages'
import Logs from '@/components/Logs'
import Files from '@/components/Files'
import Settings from '@/components/Settings'
import Login from '@/components/Login'

Vue.use(Router)

const router = new Router({
    mode: 'history',
    base: window.location.pathname || window.location.pathName,
    routes: [
        {
            path: '/',
            meta: { requiresAuth: true },
            component: Dashboard,
            children: [
                { path: '/home', name: 'home', component: Home },
                { path: '/users', name: 'users', component: Users },
                { path: '/rooms', name: 'rooms', component: Rooms },
                { path: '/dictionary', name: 'dictionary', component: Dictionary },
                { path: '/ad-bots', name: 'ad-bots', component: AdBots },
                { path: '/banned-ip', name: 'banned-ip', component: BannedIp },
                { path: '/pages', name: 'pages', component: Pages },
                { path: '/logs', name: 'logs', component: Logs },
                { path: '/files', name: 'files', component: Files },
                { path: '/settings', name: 'settings', component: Settings }
            ]
        },
        {
            path: '/login',
            name: 'login',
            component: Login
        }
    ]
})

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (!localStorage.getItem('admin_token')) {
            Message.error({ message: 'Unauthorized' })

            next({ name: 'login' })
        }

        next()
    } else if (to.matched.some(record => record.name === 'home')) {
        if (localStorage.getItem('admin_token')) {
            next({
                name: 'dashboard'
            })
            return
        }

        next()
    } else {
      next()
    }
})

export default router
