/**
 * author: panyoujie
 * URL: https://github.com/panyoujies
 */
import request from "@/utils/request";
import { setToken } from '@/utils/token-util';

/**
 * 登录
 */
export async function login(data) {
    const res = await request.post('/login', data);
    console.log(res)
    if (res.data.code === 0) {
        setToken(res.data?.access_token, data.remember);
        return res.data.msg;
    }
    return Promise.reject(new Error(res.data.msg));
}