import {createRouter, createWebHistory} from 'vue-router';
import {PROJECT_NAME, WHITE_LIST, REDIRECT_PATH} from '@/config/setting';
import { getToken } from '@/utils/token-util';
import { useUserStore } from '@/store/modules/user';
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
        component: () => import('@/views/home/index.vue'),
        meta: {title: '网址导航'}
    },
    {
        path: '/store',
        name: 'store',
        component: () => import('@/views/store/index.vue'),
        meta: {title: '波猫商店'}
    },
    {
        path: '/user',
        name: 'user',
        component: () => import('@/views/user/index.vue'),
        meta: {title: '用户中心'},
        redirect: '/user/info',
        children: [
            {
                path: 'info',
                name: 'info',
                component: () => import('@/views/user/info/index.vue'),
                meta: {title: '个人简介'}
            },
            {
                path: 'wallet',
                name: 'wallet',
                component: () => import('@/views/user/wallet/index.vue'),
                meta: {title: '我的钱包'}
            },
            {
                path: 'orders',
                name: 'orders',
                component: () => import('@/views/user/orders/index.vue'),
                meta: {title: '我的订单'}
            },
            {
                path: 'edit',
                name: 'edit',
                component: () => import('@/views/user/edit/index.vue'),
                meta: {title: '编辑资料'}
            }
        ]
    },
    {
        path: '/base64',
        name: 'base64',
        component: () => import('@/views/tools/base64/index.vue'),
        meta: {title: 'Base64 加密解密'},
    },
    {
        path: '/text',
        name: 'text',
        component: () => import('@/views/tools/text/index.vue'),
        meta: {title: '文本内容去重'},
    },
    {
        path: '/2fa',
        name: '2fa',
        component: () => import('@/views/tools/2fa/index.vue'),
        meta: {title: '2FA验证码获取'},
    },
    {
        path: '/cdk',
        name: 'cdk',
        component: () => import('@/views/tools/cdk/index.vue'),
        meta: {title: '卡密生成'},
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('@/views/login/index.vue'),
        meta: {title: '用户登录'}
    },
    {
        path: '/register',
        name: 'register',
        component: () => import('@/views/register/index.vue'),
        meta: {title: '用户注册'}
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
    // 注册动态路由
    const userStore = useUserStore();
    if (!userStore.info) {
        await userStore.fetchUserInfo();
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
