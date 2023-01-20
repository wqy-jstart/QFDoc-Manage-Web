import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/IndexView.vue'
import AuthView from '../views/AuthView.vue'
import IndexView from "@/views/IndexView";

Vue.use(VueRouter)

const routes = [
    /*权限管理*/
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
    /*文件管理*/
    {
        path: '/',
        component: IndexView,
        redirect: '/sys-index',
        children: [
            {
                path: '/sys-index',
                component: () => import ('../views/sys-index/SystemIndex.vue')
            },
            {
                path: '/sys-index/bucket/createBucket',
                component: () => import ('../views/sys-index/main/bucket/CreateBucket')
            },
            {
                path: '/sys-index/bucket/dropBucket',
                component: () => import ('../views/sys-index/main/bucket/DropBucket')
            },
            {
                path: '/sys-index/doc/docUpload',
                component: () => import ('../views/sys-index/main/file/DocumentUpload')
            }
        ]
    },
    /*非模块页面*/
    {
        path: '/',
        component: HomeView
    },
    {
        path: '/login',
        component: () => import('../views/LoginView.vue')
    },
    {
        path: '/register',
        component: () => import('../views/RegisterView.vue')
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
