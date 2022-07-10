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
        <a-input-search
            v-model:value="content"
            :placeholder="t('app.search.placeholder')"
            size="large"
            enter-button
            @search="onSearch">
          <template #prefix>
            <google-outlined style="color: #1890ff; font-size: 20px;"/>
          </template>
        </a-input-search>
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
          <template #tabBarExtraContent>
            <a-space :size="15">
              <a-button @click="showModal">提交网站</a-button>
            </a-space>
          </template>
        </a-card>
        <a-modal v-model:visible="visible" width="340px" title="提交网站" @ok="handleOk">
          <a-form
              :label-col="{ md: { span: 7 }, sm: { span: 4 }, xs: { span: 24 } }"
              :wrapper-col="{ md: { span: 17 }, sm: { span: 20 }, xs: { span: 24 } }"
          >
            <a-form-item label="网站分类" v-bind="validateInfos.classifyId">
              <a-select
                  allow-clear
                  v-model:value="form.classifyId"
                  placeholder="请选择网站分类"
              >
                <a-select-option
                    v-for="classify in classifyList"
                    :value="classify.id"
                    :key="classify.id"
                >
                  {{ classify.title }}
                </a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item label="网站名称" v-bind="validateInfos.title">
              <a-input
                  allow-clear
                  :maxlength="20"
                  placeholder="请输入网站名称"
                  v-model:value="form.title"
                  @blur="validate('title', { trigger: 'blur' }).catch(() => {})"
              />
            </a-form-item>
            <a-form-item label="网站链接" v-bind="validateInfos.url">
              <a-input
                  allow-clear
                  :maxlength="100"
                  placeholder="请输入网站链接"
                  v-model:value="form.url"
                  @blur="validate('title', { trigger: 'blur' }).catch(() => {})"
              />
            </a-form-item>
            <a-form-item label="网站描述" v-bind="validateInfos.summary">
              <a-textarea
                  :rows="4"
                  v-model:value="form.summary"
                  placeholder="请输入网站描述"
              />
            </a-form-item>
          </a-form>
        </a-modal>
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref, computed, reactive} from 'vue';
import {useRouter, useRoute} from 'vue-router';
import {useI18n} from 'vue-i18n';
import {I18N_CACHE_NAME} from '@/config/setting';
import tools from '@/assets/tools.svg'
import {message, Form} from "ant-design-vue";
import {
  GoogleOutlined,
  DownOutlined
} from '@ant-design/icons-vue';
import {getClassifys, postAddDomain} from "@/api/home";
const useForm = Form.useForm;
const { push } = useRouter();
const {t} = useI18n();

const classifyList = ref([]);
const loading = ref(false);

const form = reactive({
  id: undefined,
  classifyId: undefined, // 商品分类
  title: '',
  url: '',
  summary: ''
});

// 表单验证规则
const rules = reactive({
  title: [
    {
      required: true,
      type: 'string',
      message: '请输入网站名称',
      trigger: 'blur'
    }
  ],
  url: [
    {
      required: true,
      type: 'string',
      message: '请输入网站链接',
      trigger: 'blur'
    }
  ],
  summary: [
    {
      required: true,
      type: 'string',
      message: '请输入网站描述',
      trigger: 'blur'
    }
  ],
  classifyId: [
    {
      required: true,
      message: '请选择分类',
      type: 'number',
      trigger: 'blur'
    }
  ]
});

const { validate, validateInfos } = useForm(form, rules);

const content = ref('');

const onSearch = () => {
  if (!content.value) {
    return message.warning('搜索内容不能为空');
  }
  window.open('https://www.google.com/search?q=' + content.value, '_blank');
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

const visible = ref(false);

const showModal = () => {
  visible.value = true;
};

const handleOk = e => {
  validate()
      .then(() => {
        loading.value = true;
        const data = {
          ...form
        };
        const saveOrUpdate = postAddDomain;
        saveOrUpdate(data)
            .then((msg) => {
              loading.value = false;
              visible.value = false;
              message.success(msg);
            })
            .catch((e) => {
              loading.value = false;
              message.error(e.message);
            });
      })
      .catch(() => {});
};

getClassifys().then((mData) => {
  classifyList.value = mData;
})

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

footer {
  padding: 50px 0;
  font-size: 15px;
  display: flex;
  justify-content: center;
}

.ant-card-header {
  border-radius: 0px !important;
}

.ant-card-header >>> .ant-card-head {
  border-bottom: transparent;
}

.ant-card-header >>> .ant-card-head {
  padding: 0;
  border-bottom: transparent;
}

.ant-pro-global-footer-links a {
  color: rgba(0, 0, 0, .45);
  transition: all .3s;
}

.ant-pro-global-footer-links a:not(:last-child) {
  margin-right: 40px;
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