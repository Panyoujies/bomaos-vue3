// token 存储的名称
export const TOKEN_STORE_NAME = 'access_token';

// token 传递的 header 名称
export const TOKEN_HEADER_NAME = 'Authorization';

// 接口地址
export const API_BASE_URL = 'https://api.bomaos.com/api';

// 项目名称
export const PROJECT_NAME = '波猫导航';

// i18n 缓存的名称
export const I18N_CACHE_NAME = 'i18n-lang';

// 首页路径, 为空则取第一个菜单的地址
export const HOME_PATH = undefined;

// 外层布局的路由地址
export const LAYOUT_PATH = '/';

// 外层布局的路由地址
export const LOGIN_ROUTE = '/login';

// 刷新路由的路由地址
export const REDIRECT_PATH = '/redirect';

// 不需要登录的路由
export const WHITE_LIST = [
    '/',
    '/base64',
    '/text',
    '/2fa',
    '/cdk',
    '/login',
    '/register',
    '/forget'
];