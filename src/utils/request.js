/**
 * author: panyoujie
 * URL: https://github.com/panyoujies
 */
import { unref } from 'vue';
import {API_BASE_URL, TOKEN_HEADER_NAME} from '../config/setting';
import { getToken, setToken } from './token-util';
import { Modal } from 'ant-design-vue';
import { logout } from './page-tab-util';

/**
 * axios 实例
 */
import axios from 'axios';
import router from "@/router";

const service = axios.create({
    baseURL: API_BASE_URL
});

/**
 * 添加请求拦截器
 */
service.interceptors.request.use(
    (config) => {
        // 添加 token 到 header
        const token = getToken();
        if (token && config.headers) {
            config.headers.common[TOKEN_HEADER_NAME] = 'Bearer ' + token;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

/**
 * 添加响应拦截器
 */
service.interceptors.response.use(
    (res) => {
        // 登录过期处理
        if (res.data?.code === 401) {
            const currentPath = unref(router.currentRoute).path;
            if (currentPath == '/') {
                logout(true);
            } else {
                Modal.destroyAll();
                Modal.info({
                    title: '系统提示',
                    content: '登录状态已过期, 请退出重新登录!',
                    okText: '重新登录',
                    onOk: () => {
                        logout(false, currentPath);
                    }
                });
            }
            return Promise.reject(new Error(res.data.message));
        }
        // token 自动续期
        const token = res.headers[TOKEN_HEADER_NAME.toLowerCase()];
        if (token) {
            setToken(token);
        }
        return res;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default service;
