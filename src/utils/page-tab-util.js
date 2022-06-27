import router from '@/router';
import { removeToken } from '@/utils/token-util';
import { HOME_PATH, LAYOUT_PATH, API_BASE_URL } from '@/config/setting';
const HOME_ROUTE = HOME_PATH || LAYOUT_PATH;

/**
 * 判断路由是否是主页
 * @param route 路由信息
 */
export function isHomeRoute(route) {
    const { path, matched } = route;
    if (HOME_ROUTE === path) {
        return true;
    }
    return (
        matched[0] &&
        matched[0].path === LAYOUT_PATH &&
        matched[0].redirect === path
    );
}

/**
 * 登录成功后跳转首页
 * @param from 登录前的地址
 */
export function goHomeRoute(from) {
    router.replace(from || HOME_ROUTE);
}

/**
 * 退出登录
 * @param route 是否使用路由跳转
 * @param from 登录后跳转的地址
 */
export function logout(route, from) {
    removeToken();
    if (route) {
        router.push({
            path: '/login',
            query: from ? { from } : undefined
        });
    } else {
        // 这样跳转避免再次登录重复注册动态路由
        location.replace(API_BASE_URL + 'login' + (from ? '?from=' + from : ''));
    }
}
