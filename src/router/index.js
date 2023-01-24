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
            {
                path: '/sys-admin/user/userList',
                component: () => import( '../views/sys-admin/main/user/UserListView')
            },
            {
                path: '/sys-admin/user/userAddNew',
                component: () => import( '../views/sys-admin/main/user/UserAddNewView')
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
                path: '/sys-index/bucket/setBucketPrivate',
                component: () => import ('../views/sys-index/main/bucket/SetBucketPrivate')
            },
            {
                path: '/sys-index/bucket/bucketList',
                component: () => import ('../views/sys-index/main/bucket/BucketList')
            },
            {
                path: '/sys-index/tags/setBucketTags',
                component: () => import ('../views/sys-index/main/tags/SetBucketTags')
            },
            {
                path: '/sys-index/tags/tagList',
                component: () => import ('../views/sys-index/main/tags/TagsList')
            },
            {
                path: '/sys-index/tags/deleteToTags',
                component: () => import ('../views/sys-index/main/tags/DeleteToTags')
            },
            {
                path: '/sys-index/file/fileUpload',
                component: () => import ('../views/sys-index/main/file/FileUpload')
            },
            {
                path: '/sys-index/file/fileToDelete',
                component: () => import ('../views/sys-index/main/file/DeleteToFile')
            },
            {
                path: '/sys-index/file/setFileStatus',
                component: () => import ('../views/sys-index/main/file/SetFileToStatus')
            },
            {
                path: '/sys-index/file/copyToFile',
                component: () => import ('../views/sys-index/main/file/CopyToFile')
            },
            {
                path: '/sys-index/file/setBucketType',
                component: () => import ('../views/sys-index/main/file/SetBucketType')
            },
            {
                path: '/sys-index/file/fileToThaw',
                component: () => import ('../views/sys-index/main/file/FileToThaw')
            },
            {
                path: '/sys-index/file/setOverTime',
                component: () => import ('../views/sys-index/main/file/SetOverTime')
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
