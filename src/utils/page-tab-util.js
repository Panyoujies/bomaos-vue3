import router from '@/router';
import { removeToken } from '@/utils/token-util';
import { HOME_PATH, LAYOUT_PATH, LOGIN_ROUTE } from '@/config/setting';
import {useUserStore} from "@/store/modules/user";
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
 * 注册成功后跳转登录
 * @param from 登录前的地址
 */
export function goLoginRoute(from) {
    router.replace(from || HOME_ROUTE);
}

/**
 * 退出登录
 * @param from 登录后跳转的地址
 */
export function logout(from) {
    removeToken();
    const userStore = useUserStore();
    userStore.info = null;
    router.replace(from || LOGIN_ROUTE);
}
