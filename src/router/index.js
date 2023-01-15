import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/IndexView.vue'
import AuthView from '../views/AuthView.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/auth',
        component: AuthView,
        redirect: '/sys-admin',
        children: [ //嵌套路由,在HomeView里的router里
            {
                path: '/sys-admin',
                component: () => import( '../views/sys-admin/SystemAdminIndex.vue')
            },
        ]

    },
    {
        path: '/',
        component: HomeView
    },
    {
        path: '/login',
        component: () => import('../views/LoginView.vue')
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
