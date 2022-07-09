import request from '@/utils/request';

/**
 * 获取当前登录的用户信息、菜单、权限、角色
 */
export async function getUserInfo() {
  const res = await request.get('/auth/user');
  if (res.data.code === 0 && res.data.data) {
    return res.data.data;
  }
  return Promise.reject(new Error(res.data.message));
}