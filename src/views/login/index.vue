<template>
  <div class="login-wrapper">
    <div class="panfish">
      <img :src="loginLogo" class="normal">
    </div>
    <a-form class="login-form bomao-bg-white">
      <h4>用户登录</h4>
      <a-form-item v-bind="validateInfos.username">
        <a-input
            allow-clear
            size="large"
            v-model:value="form.username"
            placeholder="用户名"
        >
          <template #prefix>
            <user-outlined/>
          </template>
        </a-input>
      </a-form-item>
      <a-form-item v-bind="validateInfos.password">
        <a-input-password
            size="large"
            v-model:value="form.password"
            placeholder="密码"
        >
          <template #prefix>
            <lock-outlined/>
          </template>
        </a-input-password>
      </a-form-item>
      <a-form-item>
        <a-checkbox v-model:checked="form.remember">
          记住密码
        </a-checkbox>
        <router-link
            to="/forget"
            class="bomao-pull-right"
            style="line-height: 22px"
        >
          忘记密码
        </router-link>
      </a-form-item>
      <a-form-item>
        <a-button
            block
            size="large"
            type="primary"
            :loading="loading"
            @click="submit"
        >
          登录
        </a-button>
      </a-form-item>
      <div class="bomao-text-center" style="padding-bottom: 32px">
        <div>
          <qq-outlined class="login-oauth-icon login-oauth-show" style="background: #3492ed"/>
          <wechat-outlined class="login-oauth-icon" style="background: #4daf29"/>
          <weibo-outlined class="login-oauth-icon" style="background: #cf1900"/>
        </div>
        <a @click="regBtn">注册会员</a>
        <!--<router-link to="/register">注册会员</router-link>-->
      </div>
    </a-form>
  </div>
</template>

<script setup>
import {ref, reactive, computed, unref} from 'vue';
import {Form, message} from 'ant-design-vue';
import {getToken} from '@/utils/token-util';
import {useRouter} from 'vue-router';
import {goHomeRoute} from '@/utils/page-tab-util';
import {login} from '@/api/login';
import {
  UserOutlined,
  LockOutlined,
  QqOutlined,
  WechatOutlined,
  WeiboOutlined
} from '@ant-design/icons-vue';
import loginLogo from '@/assets/login.svg'

const {currentRoute} = useRouter();

const useForm = Form.useForm;
// 加载状态
const loading = ref(false);
// 表单数据
const form = reactive({
  username: '',
  password: '',
  remember: true
});

// 表单验证规则
const rules = computed(() => {
  return {
    username: [
      {
        required: true,
        message: '用户名',
        type: 'string',
        trigger: 'blur'
      }
    ],
    password: [
      {
        required: true,
        message: '密码',
        type: 'string',
        trigger: 'blur'
      }
    ]
  };
});

const {validate, validateInfos} = useForm(form, rules);

/* 跳转到首页 */
const goHome = () => {
  const {query} = unref(currentRoute);
  goHomeRoute(query.from);
};

/* 提交 */
const submit = () => {
  validate().then(() => {
    loading.value = true;
    login(form)
        .then((msg) => {
          message.success(msg);
          goHome();
        })
        .catch((e) => {
          message.error(e.message);
          loading.value = false;
        });
  });
};

if (getToken()) {
  goHome();
}

const regBtn = () => {
  message.warning('注册功能暂未开放')
}

</script>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Login'
}
</script>

<style scoped>
.ant-card-head-wrapper .ant-card-head-title {
  font-size: 26px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  color: #1d2a3a;
  padding: 28px 0 24px;
  text-align: center;
}

.login-wrapper {
  padding: 90px 16px 0;
  position: relative;
  box-sizing: border-box;
  background-repeat: no-repeat;
  background-size: cover;
}

body h4 {
  font-size: 20px;
}

.login-form h4 {
  padding: 22px 0;
  text-align: center;
}

body .bomao-bg-white {
  background-color: #fff !important;
}

.login-form {
  width: 360px;
  margin: 0 auto;
  max-width: 100%;
  padding: 0 28px;
  box-sizing: border-box;
  border-radius: 5px !important;
  border: 1px solid #f0f0f0;
  position: relative;
  z-index: 2;
}

.login-input-group {
  display: flex;
  align-items: center;
}

.login-input-group .ant-input-affix-wrapper {
  flex: 1;
}

.login-input-group .login-captcha {
  width: 102px;
  height: 40px;
  margin-left: 10px;
  padding: 0;
}

.anticon {
  display: inline-block;
  color: inherit;
  font-style: normal;
  line-height: 0;
  text-align: center;
  text-transform: none;
  vertical-align: -0.125em;
  text-rendering: optimizelegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.login-oauth-icon {
  color: #fff;
  padding: 5px;
  margin: 0 12px;
  font-size: 18px;
  border-radius: 50%;
  cursor: pointer;
}

.login-input-group .login-captcha > img {
  width: 100%;
  height: 100%;
}

.panfish .normal {
  transform: translate(-50%,-91%);
}

.panfish .greeting, .panfish .normal {
  position: absolute;
  left: 50%;
  width: 200px;
  z-index: 3;
}

body .bomao-pull-right {
  float: right;
}

body .bomao-text-center {
  display: flex;
  justify-content: space-between;
}

.login-oauth-show {
  margin: 0 12px 0 0;
}

body .bomao-text-center a {
  line-height: 26px;
}


</style>
