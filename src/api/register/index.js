/**
 * author: panyoujie
 * URL: https://github.com/panyoujies
 */
import request from "@/utils/request";

/**
 * 登录
 */
export async function register(data) {
    const res = await request.post('/register', data);
    if (res.data.code === 0) {
        return res.data.msg;
    }
    return Promise.reject(new Error(res.data.msg));
}

/**
 * 登录
 */
export async function sendEamilCode(data) {
    const res = await request.post('/sendEamilCode', data);
    if (res.data.code === 0) {
        return res.data.msg;
    }
    return Promise.reject(new Error(res.data.msg));
}