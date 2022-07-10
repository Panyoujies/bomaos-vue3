<template>
  <div class="login-wrapper">
    <div class="panfish">
      <img :src="loginLogo" class="normal">
    </div>
    <a-form class="login-form bomao-bg-white">
      <h4>用户注册</h4>
      <a-form-item v-bind="validateInfos.nickName">
        <a-input
            allow-clear
            size="large"
            v-model:value="form.nickName"
            placeholder="用户昵称"
        >
          <template #prefix>
            <user-outlined/>
          </template>
        </a-input>
      </a-form-item>
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
      <a-form-item v-bind="validateInfos.email">
        <a-input
            placeholder="请输入绑定邮箱"
            v-model:value="form.email"
            allow-clear
            size="large"
        >
          <template #prefix>
            <mail-outlined/>
          </template>
        </a-input>
      </a-form-item>
      <a-form-item v-bind="validateInfos.code">
        <div class="login-input-group">
          <a-input
              placeholder="请输入验证码"
              v-model:value="form.code"
              allow-clear
              size="large"
          >
            <template #prefix>
              <safety-certificate-outlined />
            </template>
          </a-input>
          <a-button
              block
              size="large"
              type="primary"
              class="login-captcha"
              :disabled="!!countdownTime"
              :loading="codeLoading"
              @click="sendCode"
          >
            <span v-if="!countdownTime">发送验证码</span>
            <span v-else>已发送 {{ countdownTime }} s</span>
          </a-button>
        </div>
      </a-form-item>
      <a-form-item>
        <a-button
            block
            size="large"
            type="primary"
            :loading="loading"
            @click="submit"
        >
          注册
        </a-button>
      </a-form-item>
      <div class="bomao-text-center" style="padding-bottom:25px">
        <router-link to="/login">用户登录</router-link>
      </div>
    </a-form>
  </div>
</template>

<script setup>
import {ref, reactive, computed, unref, onBeforeUnmount} from 'vue';
import {Form, message} from 'ant-design-vue';
import {getToken} from '@/utils/token-util';
import {useRouter} from 'vue-router';
import {goHomeRoute, goLoginRoute} from '@/utils/page-tab-util';
import {register, sendEamilCode} from '@/api/register';
import {
  UserOutlined,
  LockOutlined,
  MailOutlined,
  SafetyCertificateOutlined
} from '@ant-design/icons-vue';
import loginLogo from '@/assets/login.svg'

const {currentRoute} = useRouter();

const useForm = Form.useForm;
// 发送验证码按钮loading
const codeLoading = ref(false);
// 验证码倒计时时间
const countdownTime = ref(0);
// 验证码倒计时定时器
let countdownTimer = null;
// 加载状态
const loading = ref(false);
// 表单数据
const form = reactive({
  nickName: '',
  username: '',
  password: '',
  email: '',
  code: ''
});

// 表单验证规则
const rules = computed(() => {
  return {
    nickName: [
      {
        required: true,
        message: '用户昵称',
        type: 'string',
        trigger: 'blur'
      }
    ],
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
    ],
    email: [
      {
        required: true,
        message: '请输入绑定邮箱',
        type: 'string',
        trigger: 'blur'
      }
    ]
  };
});

const {validate, validateInfos} = useForm(form, rules);

/* 跳转到首页 */
const goLogin = () => {
  const {query} = unref(currentRoute);
  goLoginRoute(query.from);
};

/* 跳转到首页 */
const goHome = () => {
  const {query} = unref(currentRoute);
  goHomeRoute(query.from);
};

/* 提交 */
const submit = () => {
  validate().then(() => {
    loading.value = true;
    register(form)
        .then((msg) => {
          message.success(msg);
          goLogin();
        })
        .catch((e) => {
          message.error(e.message);
          loading.value = false;
        });
  });
};

/* 发送短信验证码 */
const sendCode = () => {
  validate().then(() => {
    codeLoading.value = true;
    sendEamilCode(form)
        .then((msg) => {
          setTimeout(() => {
            message.success('短信验证码发送成功, 请注意查收!');
            codeLoading.value = false;
            countdownTime.value = 30;
            // 开始对按钮进行倒计时
            countdownTimer = window.setInterval(() => {
              if (countdownTime.value <= 1) {
                countdownTimer && clearInterval(countdownTimer);
                countdownTimer = null;
              }
              countdownTime.value--;
            }, 1000);
          }, 1000);
        })
        .catch((e) => {
          message.error(e.message);
          codeLoading.value = false;
        });
  });

};

onBeforeUnmount(() => {
  countdownTimer && clearInterval(countdownTimer);
});

if (getToken()) {
  goHome();
}

</script>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Register'
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
  justify-content: flex-end;
}

.login-oauth-show {
  margin: 0 12px 0 0;
}

body .bomao-text-center a {
  line-height: 26px;
}


</style>
