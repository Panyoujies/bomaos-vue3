import {createRouter, createWebHistory} from 'vue-router';
import {PROJECT_NAME, WHITE_LIST, REDIRECT_PATH} from '@/config/setting';
import { getToken } from '@/utils/token-util';
import Nprogress from 'nprogress';
import 'nprogress/nprogress.css';

Nprogress.configure({
    speed: 200,
    minimum: 0.02,
    trickleSpeed: 200,
    showSpinner: false
});

const routes = [
    {
        path: '/',
        name: 'home',
        component: () => import('@/views/home/index'),
        meta: {title: '网址导航'}
    },
    {
        path: '/tools',
        name: 'tools',
        component: () => import('@/views/tools/index'),
        redirect: '/tools/base64',
        children: [
            {
                path: 'base64',
                name: 'base64',
                component: () => import('@/views/tools/base64/index'),
                meta: {title: 'Base64 加密解密'},
            },
            {
                path: 'text',
                name: 'text',
                component: () => import('@/views/tools/text/index'),
                meta: {title: 'text'},
            },
            {
                path: '2fa',
                name: '2fa',
                component: () => import('@/views/tools/2fa/index'),
                meta: {title: '2fa'},
            }
        ],
        meta: {title: '工具箱'},
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('@/views/login/index'),
        meta: {title: '用户登录'}
    }
];

/**
 * 静态路由导航
 * @type {Router}
 */
const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior() {
        return {top: 0};
    }
})

/**
 * 前置路由守卫
 */
router.beforeEach(async (to, from) => {
    if (!from.path.includes(REDIRECT_PATH)) {
        Nprogress.start();
    }
    updateTitle(to); // 更新标题
    if (!getToken()) {
        // 未登录跳转登录界面
        if (!WHITE_LIST.includes(to.path)) {
            return {
                path: '/login',
                query: to.path === '/' ? {} : { from: to.path }
            };
        }
        return;
    }
})

/**
 * 后置路由守卫
 */
router.afterEach((to) => {
    if (!to.path.includes(REDIRECT_PATH) && Nprogress.isStarted()) {
        setTimeout(() => {
            Nprogress.done(true);
        }, 200);
    }
})

function updateTitle(route) {
    const names = [];
    if (route.meta?.title) {
        names.push(route.meta.title);
    }
    if (PROJECT_NAME) {
        names.push(PROJECT_NAME);
    }
    document.title = names.join(' - ');
}

export default router;
