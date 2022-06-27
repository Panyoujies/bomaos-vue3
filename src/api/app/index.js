import request from '@/utils/request';

/**
 * 获取网址
 * @returns {Promise<*>}
 */
export async function getDomains() {
    const res = await request.get('/getDomains');
    if (res.data.code === 0 && res.data.data) {
        return res.data.data;
    }
    return Promise.reject(new Error(res.data.message));
}