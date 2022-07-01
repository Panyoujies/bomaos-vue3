<template>
  <div class="header-body sticky">
    <a-layout-header>
      <div class="container flour-header">
        <router-link class="flour-logo" to="/" style="letter-spacing: 1.5px;">
          <img :src="tools" class="img-item" style="height: 32px;">
          <span>{{PROJECT_NAME}}</span>
        </router-link>
      </div>
    </a-layout-header>
    <div class="container">
      <div class="header">
        <a-input-search
            v-model:value="content"
            placeholder="输入要搜索的内容"
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
          <github-outlined />
          支持项目
        </a>
        <a class="flour-text-secondary" href="http://wpa.qq.com/msgrd?v=3&uin=1724962375&site=qq&menu=yes" target="_blank">
          <qq-outlined />
          联系作者
        </a>
        <a class="flour-text-secondary" href="https://zdins.cn/" target="_blank">
          <slack-square-filled />
          免责声明
        </a>
      </a-space>
      <div class="flour-text-secondary" style="margin-top: 8px">
        2022 值联工具 | <a href="http://www.beian.gov.cn/" target="_blank">琼ICP备2022003095号-1</a>
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref, computed} from 'vue';
import {useRouter, useRoute} from 'vue-router';
import {PROJECT_NAME} from '@/config/setting';
import tools from '@/assets/tools.svg'
import { message, Layout, Input, Card, Space } from "ant-design-vue";
import {
  GithubOutlined,
  QqOutlined,
  SlackSquareFilled,
  GoogleOutlined
} from '@ant-design/icons-vue';

const ALayoutHeader = Layout.Header;
const AInputSearch = Input.Search;
const ACard = Card;
const ASpace = Space;

const router = useRouter();
const content = ref('');

const onSearch = () => {
  if (!content.value) {
    return message.warning('搜索内容不能为空');
  }
  window.open('https://www.google.com/search?q=' + content.value , '_blank');
}

const tabListNoTitle = [
  {key: '/', tab: '网站导航',},
  {key: '/tools', tab: '我的工具',}
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