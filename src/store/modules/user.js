/**
 * 登录用户 store
 */
import { defineStore } from 'pinia';
import { getUserInfo } from '@/api/layout';

export const useUserStore = defineStore({
  id: 'user',
  state: () => ({
    // 当前登录用户的信息
    info: null
  }),
  getters: {},
  actions: {
    /**
     * 请求用户信息
     */
    async fetchUserInfo() {
      const result = await getUserInfo().catch(() => void 0);
      if (!result) {
        return {};
      }
      // 用户信息
      this.info = result;
      console.log(result)
      return result;
    },
    /**
     * 更新用户信息
     */
    setInfo(value) {
      this.info = value;
    }
  }
});
