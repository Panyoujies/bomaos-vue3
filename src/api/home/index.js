import request from '@/utils/request';

/**
 * 获取网址
 * @returns {Promise<*>}
 */
export async function getDomains() {
    const res = await request.get('/home/getDomains');
    if (res.data.code === 0 && res.data.data) {
        return res.data.data;
    }
    return Promise.reject(new Error(res.data.msg));
}

/**
 * 获取网址
 * @returns {Promise<*>}
 */
export async function getClassifys() {
    const res = await request.get('/home/getClassifyList');
    if (res.data.code === 0 && res.data.data) {
        return res.data.data;
    }
    return Promise.reject(new Error(res.data.msg));
}

/**
 * 提交网址
 * @returns {Promise<*>}
 */
export async function postAddDomain(data) {
    const res = await request.post('/home/addDomain', data);
    if (res.data.code === 0) {
        return res.data.msg;
    }
    return Promise.reject(new Error(res.data.msg));
}