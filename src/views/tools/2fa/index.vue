<template>
  <a-card title="2FA 验证码获取">
    <template #extra>
      <a-button type="primary" :loading="loading" @click="get2faCode">获取验证码</a-button>
    </template>
    <div style="padding: 15px">
      <a-input v-model:value="value" size="large"  placeholder="输入双重密钥"/>
      <h4 style="margin-top: 10px; margin-bottom: 15px">双重验证码/二步验证码获取工具（相当于谷歌身份验证器的网页版），使用时在上方输入密钥获取即可。</h4>
      <a-descriptions size="small" :labelStyle="{ fontWeight: '500' }">
        <a-descriptions-item label="当前验证码">
          <span class="-parse">{{ code ? code : 'Code' }}</span>
          <a-button @click="copy" size="small" style="margin-left: 10px" class="layout-vertcal">复制验证码</a-button>
        </a-descriptions-item>
      </a-descriptions>
      <a-descriptions size="small" :labelStyle="{ fontWeight: '500' }">
        <a-descriptions-item label="双重密钥为">{{ value }}</a-descriptions-item>
      </a-descriptions>
      <a-descriptions size="small" :labelStyle="{ fontWeight: '500' }">
        <a-descriptions-item label="剩余的时间">{{ timer }} (请在倒计时结束前输入验证码完成登录或者验证)</a-descriptions-item>
      </a-descriptions>
      <a-descriptions size="small" :labelStyle="{ fontWeight: '500' }">
        <a-descriptions-item label="演示的密钥">7J64V3P3E77J3LKNUGSZ5QANTLRLTKVL</a-descriptions-item>
      </a-descriptions>
    </div>
  </a-card>
</template>

<script setup>
import {ref, watch} from "vue";
import {message} from 'ant-design-vue';
import useClipboard from 'vue-clipboard3';
import * as OTPAuth from 'otpauth';

const {toClipboard} = useClipboard()
const loading = ref(false);
// 需要加密的内容
const value = ref('');
// 解析后的内容
const code = ref('');
const timer = ref(0);

// 加密
const get2faCode = () => {
  if (!value.value) {
    return message.warning('双重密钥不能为空');
  }
  loading.value = true;
  setTimeout(() => {
    try {
      // Create a new TOTP object.
      let totp = new OTPAuth.TOTP({
        issuer: 'ACME',
        label: 'AzureDiamond',
        algorithm: 'SHA1',
        digits: 6,
        period: 30,
        secret: value.value // or "OTPAuth.Secret.fromBase32('NB2W45DFOIZA')"
      });
      let token = totp.generate();
      var epoch = Math.round(new Date().getTime() / 1000.0);
      var countDown = 30 - (epoch % 30);
      timer.value = countDown
      code.value = token;
      loading.value = false;
    } catch (e) {
      loading.value = false;
      return message.error('字符编码错误')
    }
  }, 1000);
}

const copy = async () => {
  if (!value.value) {
    return message.warning('验证码为空、复制失败');
  }
  try {
    await toClipboard(code.value)
    message.success('成功复制内容')
  } catch (e) {
    message.error(e)
  }
}

watch(timer, () => {
  setTimeout(function () {
    var epoch = Math.round(new Date().getTime() / 1000.0);
    var countDown = 30 - (epoch % 30);
    if (epoch % 30 == 0) {
      get2faCode()
    } else {
      timer.value = countDown;
    }
  }, 1000)
})
</script>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Tools2fa"
}
</script>

<style scoped>
.-parse {
  background-color: #1890ff;
  padding: 0 8px;
  border-radius: 2px;
  color: white;
}
</style>