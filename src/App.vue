<template>
  <a-config-provider :locale="antLocale">
    <div class="header-body sticky">
      <a-layout-header>
        <div class="container flour-header">
          <router-link class="flour-logo" to="/" style="letter-spacing: 1.5px;">
            <img :src="tools" class="img-item" style="height: 32px;">
            <span>{{ t('app.header.title') }}</span>
          </router-link>
          <div style="line-height: 66px;">
            <a-dropdown>
              <template #overlay>
                <a-menu @click="handleMenuClick">
                  <a-menu-item key="zh_CN">
                    <UserOutlined/>
                    简体中文
                  </a-menu-item>
                  <a-menu-item key="en">
                    <UserOutlined/>
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
      <div class="container">
        <div class="header">
          <a-input-search
              v-model:value="content"
              :placeholder="t('app.search.placeholder')"
              style="width: 500px"
              size="large"
              enter-button
              @search="onSearch">
            <template #prefix>
              <google-outlined style="color: #1890ff; font-size: 20px;"/>
            </template>
          </a-input-search>
        </div>
      </div>
      <a-card
          class="ant-card-header"
          :tab-list="tabListNoTitle"
          :active-tab-key="routeKeys"
          @tabChange="key => onTabChange(key, key)">
      </a-card>
    </div>
    <div class="container">
      <router-view/>
    </div>
    <div class="container">
      <div class="flour-text-center" style="padding: 35px 0">
        <a-space size="large">
          <a class="flour-text-secondary" href="https://github.com/Panyoujies/my-tools-vue3" target="_blank">
            <github-outlined/>
            {{ t('app.footer.github') }}
          </a>
          <a class="flour-text-secondary" href="http://wpa.qq.com/msgrd?v=3&uin=1724962375&site=qq&menu=yes"
             target="_blank">
            <qq-outlined/>
            {{ t('app.footer.connect') }}
          </a>
          <a class="flour-text-secondary" href="https://zdins.cn/" target="_blank">
            <slack-square-filled/>
            {{ t('app.footer.state') }}
          </a>
        </a-space>
        <div class="flour-text-secondary" style="margin-top: 8px">
          2022 {{ t('app.footer.toolName') }} | <a href="http://www.beian.gov.cn/" target="_blank">琼ICP备2022003095号-1</a>
        </div>
      </div>
    </div>
  </a-config-provider>
</template>

<script setup>
import {ref, computed} from 'vue';
import {useRouter, useRoute} from 'vue-router';
import {useI18n} from 'vue-i18n';
import {I18N_CACHE_NAME} from '@/config/setting';
import tools from '@/assets/tools.svg'
import {message, Layout, Input, Card, Space, Dropdown, Button, Menu} from "ant-design-vue";
import {
  GithubOutlined,
  QqOutlined,
  SlackSquareFilled,
  GoogleOutlined,
  DownOutlined
} from '@ant-design/icons-vue';
import {useLocale} from '@/i18n/use-locale';

const { t } = useI18n();
const {antLocale} = useLocale();

const ALayoutHeader = Layout.Header;
const AInputSearch = Input.Search;
const ACard = Card;
const ASpace = Space;
const ADropdown = Dropdown;
const AButton = Button;
const AMenu = Menu;
const AMenuItem = Menu.Item;

const router = useRouter();
const content = ref('');

const onSearch = () => {
  if (!content.value) {
    return message.warning('搜索内容不能为空');
  }
  window.open('https://www.google.com/search?q=' + content.value , '_blank');
}

const tabListNoTitle = [
  {key: '/', tab: t('app.navigation.home')},
  {key: '/tools', tab: t('app.navigation.tools')}
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
  router.push(type)
};

const { locale } = useI18n();

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

</script>

<script>
export default {
  name: 'App'
}
</script>

<style>
.header-body {
  margin-bottom: 15px;
  background-color: #fcfcfc;
}

.header {
  display: flex;
  justify-content: center;
  padding: 30px 0;
}

.header-logo, .header-avatar {
  display: flex;
  align-items: center;
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

.layout-vertcal {
  vertical-align: middle;
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

.ant-card-header .ant-card-head {
  border-bottom: transparent;
}

.ant-pro-global-footer {
  margin: 48px 0 24px;
  padding: 0 16px;
  text-align: center;
}

.ant-pro-global-footer {
  margin-top: 24px;
}

.ant-pro-global-footer-links {
  margin-bottom: 8px;
}

.ant-pro-global-footer-links a {
  color: rgba(0,0,0,.45);
  transition: all .3s;
}

.ant-pro-global-footer-links a:not(:last-child) {
  margin-right: 40px;
}

.ant-pro-global-footer-copyright {
  color: rgba(0,0,0,.45);
  font-size: 14px;
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
}
</style>