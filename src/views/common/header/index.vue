<template>
  <a-layout-header class="sticky">
    <div class="container bomao-header">
      <router-link class="bomao-logo" to="/" style="letter-spacing: 1.5px;">
        <img :src="tools" class="img-item" style="height: 32px; border-radius: 5px">
        <span>{{ t('app.header.title') }}</span>
      </router-link>
      <div style="line-height: 66px;">
        <a-dropdown>
          <template #overlay>
            <a-menu @click="handleMenuClick">
              <a-menu-item key="zh_CN">
                简体中文
              </a-menu-item>
              <a-menu-item key="en">
                English
              </a-menu-item>
            </a-menu>
          </template>
          <a-button>
            {{ language }}
            <DownOutlined/>
          </a-button>
        </a-dropdown>
      </div>
    </div>
  </a-layout-header>
  <div class="header-body">
    <div class="container">
      <div class="header">
        <a-input
            v-model:value="content"
            :placeholder="t('app.search.placeholder')"
            size="large"
            @keyup.enter="onSearch">
          <template #prefix>
            <svg t="1657472341115" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
                 p-id="2272" width="25" height="25">
              <path
                  d="M214.101333 512c0-32.512 5.546667-63.701333 15.36-92.928L57.173333 290.218667A491.861333 491.861333 0 0 0 4.693333 512c0 79.701333 18.858667 154.88 52.394667 221.610667l172.202667-129.066667A290.56 290.56 0 0 1 214.101333 512"
                  fill="#FBBC05" p-id="2273"></path>
              <path
                  d="M516.693333 216.192c72.106667 0 137.258667 25.002667 188.458667 65.962667L854.101333 136.533333C763.349333 59.178667 646.997333 11.392 516.693333 11.392c-202.325333 0-376.234667 113.28-459.52 278.826667l172.373334 128.853333c39.68-118.016 152.832-202.88 287.146666-202.88"
                  fill="#EA4335" p-id="2274"></path>
              <path
                  d="M516.693333 807.808c-134.357333 0-247.509333-84.864-287.232-202.88l-172.288 128.853333c83.242667 165.546667 257.152 278.826667 459.52 278.826667 124.842667 0 244.053333-43.392 333.568-124.757333l-163.584-123.818667c-46.122667 28.458667-104.234667 43.776-170.026666 43.776"
                  fill="#34A853" p-id="2275"></path>
              <path
                  d="M1005.397333 512c0-29.568-4.693333-61.44-11.648-91.008H516.650667V614.4h274.602666c-13.696 65.962667-51.072 116.650667-104.533333 149.632l163.541333 123.818667c93.994667-85.418667 155.136-212.650667 155.136-375.850667"
                  fill="#4285F4" p-id="2276"></path>
            </svg>
          </template>
          <template #suffix>
            <search-outlined @click="onSearch"/>
          </template>
        </a-input>
      </div>
    </div>
    <div class="header-nav" style="background-color: white;">
      <div class="container">
        <a-card
            class="ant-card-header"
            :tab-list="tabListNoTitle"
            :active-tab-key="routeKeys"
            @tabChange="key => onTabChange(key, key)"
            :bordered="false">
          <template #customTab="item">
            <span v-if="item.key === '/store'">
                {{ t('app.navigation.store') }}
                <a-badge :dot="tabStoreShow" color="blue" :style="{ marginLeft: '5px' }" status="processing"/>
              </span>
          </template>
          <template #tabBarExtraContent>
            <a-spin :spinning="spinning">
              <div v-if="!loginUser">
                <router-link class="bomao-login-btn" to="/login">登录</router-link>
              </div>
              <!-- 用户信息 -->
              <div v-else class="bomao-admin-header-tool-item">
                <a-dropdown placement="bottom" :overlay-style="{ minWidth: '120px' }">
                  <div class="bomao-admin-header-avatar">
                    <a-avatar :src="loginUser.avatar">
                      <template v-if="!loginUser.avatar" #icon>
                        <user-outlined/>
                      </template>
                    </a-avatar>
                    <span class="hidden-sm-and-down">{{ loginUser.nickName }}</span>
                    <down-outlined style="margin-left: 6px"/>
                  </div>
                  <template #overlay>
                    <a-menu :selectable="false" @click="onUserDropClick">
                      <a-menu-item key="profile">
                        <div class="bomao-cell">
                          <user-outlined/>
                          <div class="bomao-cell-content">
                            个人信息
                          </div>
                        </div>
                      </a-menu-item>
                      <a-menu-item key="password">
                        <div class="bomao-cell">
                          <key-outlined/>
                          <div class="bomao-cell-content">
                            重置密码
                          </div>
                        </div>
                      </a-menu-item>
                      <a-menu-divider/>
                      <a-menu-item key="logout">
                        <div class="bomao-cell">
                          <logout-outlined/>
                          <div class="bomao-cell-content">
                            退出登录
                          </div>
                        </div>
                      </a-menu-item>
                    </a-menu>
                  </template>
                </a-dropdown>
              </div>
            </a-spin>
          </template>
        </a-card>
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref, computed, createVNode} from 'vue';
import {useRouter, useRoute} from 'vue-router';
import {useI18n} from 'vue-i18n';
import {I18N_CACHE_NAME} from '@/config/setting';
import tools from '@/assets/tools.svg'
import {message, Modal} from "ant-design-vue";
import {useUserStore} from '@/store/modules/user';
import {
  DownOutlined,
  SearchOutlined,
  UserOutlined,
  KeyOutlined,
  LogoutOutlined,
  ExclamationCircleOutlined
} from '@ant-design/icons-vue';
import {logout} from "@/utils/page-tab-util";

const {push} = useRouter();
const {t} = useI18n();
const userStore = useUserStore();

const spinning = ref(true);
const tabStoreShow = ref(true);
// 是否显示修改密码弹窗
const passwordVisible = ref(false);
const content = ref('');

// 当前用户信息
const loginUser = computed(() => {
  // eslint-disable-next-line vue/no-async-in-computed-properties
  setTimeout(function () {
    spinning.value = false;
  }, 1000)
  return userStore.info ?? null;
});

const onSearch = () => {
  if (!content.value) {
    return message.warning('搜索内容不能为空');
  }
  window.open('https://www.google.com/search?q=' + content.value, '_blank');
}

const tabListNoTitle = [
  {key: '/', tab: t('app.navigation.home')},
  {key: '/store', tab: t('app.navigation.store')}
];

// eslint-disable-next-line no-unused-vars
const key = ref('/');
const noTitleKey = ref('/');

/**
 * 计算属性 - 计算路由刷新（tabs 切换）
 * @type {ComputedRef<unknown>}
 */
const routeKeys = computed(() => {
  const path = useRoute().path;
  if (path.includes('tools')) {
    return '/tools';
  } else {
    return path;
  }
})

const onTabChange = (value, type) => {
  noTitleKey.value = value;
  push(type)
};

const {locale} = useI18n();

// 当前显示语言
// eslint-disable-next-line vue/return-in-computed-property
const language = computed(() => {
  if (locale.value === 'zh_CN') {
    return '简体中文';
  } else if (locale.value === 'en') {
    return 'English';
  }
});

/* 切换语言 */
const handleMenuClick = ({key}) => {
  locale.value = key;
  localStorage.setItem(I18N_CACHE_NAME, key);
  location.reload()
};

/* 用户信息下拉点击 */
const onUserDropClick = ({key}) => {
  if (key === 'password') {
    passwordVisible.value = true;
  } else if (key === 'profile') {
    push({
      name: 'user',
      params: {id: loginUser.value.userId}
    });
  } else if (key === 'logout') {
    // 退出登录
    Modal.confirm({
      title: '提示',
      content: '确定要退出登录吗?',
      icon: createVNode(ExclamationCircleOutlined),
      maskClosable: true,
      onOk: () => {
        logout();
      }
    });
  }
};
</script>

<script>
export default {
  name: "CommonHeader"
}
</script>

<style scoped>
.header-body {
  margin-bottom: 15px;
  background-color: #fcfcfc;
}

.header {
  display: flex;
  justify-content: center;
  padding: 30px 0;
}

.header-logo svg {
  width: 60px;
  height: 60px;
}

.header-logo span {
  margin-left: 15px;
  letter-spacing: 1.5px;
  font-size: 30px;
  font-weight: bold;
}

.header-nav {
  border-bottom: 1px solid #f0f0f0;
  border-top: 1px solid #f0f0f0;
}

.bomao-login-btn {
  background: rgba(30, 128, 255, .05);
  border: 1px solid rgba(30, 128, 255, .3);
  border-radius: 4px;
  padding: 0.3rem 1.5rem;
  color: #007fff;
  line-height: 1.9rem;
  font-size: 14px;
  font-weight: 400;
  height: 3rem;
}

footer {
  padding: 50px 0;
  font-size: 15px;
  display: flex;
  justify-content: center;
}

.ant-card-header {
  border-radius: 0px !important;
}

:deep(.ant-card-head) {
  border-bottom: transparent;
}

:deep(.ant-card-head) {
  padding: 0;
  border-bottom: transparent;
}

:deep(.ant-badge-status-text) {
  margin-left: 0px;
}

.ant-pro-global-footer-links a {
  color: rgba(0, 0, 0, .45);
  transition: all .3s;
}

.ant-pro-global-footer-links a:not(:last-child) {
  margin-right: 40px;
}

:deep(.anticon-search) {
  background-color: #1990ff;
  padding: 6px 15px;
  border-radius: 50px;
  color: #fff;
  font-size: 15px;
}

:deep(.ant-input-affix-wrapper-lg) {
  width: 500px;
  font-size: 20px;
  border-radius: 50px;
  background-color: #f5f5f5;
}

:deep(.ant-input-affix-wrapper > input.ant-input) {
  background-color: #f5f5f5;
}

.bomao-admin-header-avatar {
  display: flex;
  align-items: center;
  position: relative;
  height: 100%;
}

.bomao-admin-header-avatar .ant-avatar + span {
  padding-left: 8px;
}

.bomao-cell {
  display: flex;
  align-items: center;
}

.bomao-cell .bomao-cell-content {
  flex: 1;
  box-sizing: border-box;
}

.bomao-cell * + .bomao-cell-content {
  padding-left: 12px;
}

@media (max-width: 640px) {
  .header {
    padding: 20px 0;
  }

  .header-logo svg {
    width: 45px;
    height: 46px;
  }

  .header-logo span {
    font-size: 25px;
  }

  :deep(.ant-input-affix-wrapper-lg) {
    width: 90%;
  }
}
</style>