<template>
  <a-card title="Base64 加密解密">
    <template #extra>
      <a-space>
        <a-button type="primary" :loading="loading" @click="encodeBtn">加密</a-button>
        <a-button @click="decodeBtn" :loading="loadingDe">解密</a-button>
      </a-space>
    </template>
    <div style="padding: 15px">
      <a-textarea v-model:value="value" placeholder="输入要加密/解密的内容" :rows="8"/>
      <div v-show="isParse" style="margin-top: 15px">
        <div class="-parse">
          <span class="layout-vertcal">解析后内容</span>
          <a-button @click="copy" style="margin-left: 10px" class="layout-vertcal">复制内容</a-button>
        </div>
        <a-textarea v-model:value="parseContent" placeholder="解密后的内容" :rows="8"/>
      </div>
    </div>
  </a-card>
</template>

<script setup>
import {ref} from "vue";
import {message} from 'ant-design-vue';

let jsBase64 = require('js-base64').Base64;
import useClipboard from 'vue-clipboard3';

const {toClipboard} = useClipboard()
const loading = ref(false);
const loadingDe = ref(false);
const isParse = ref(false);
// 需要加密的内容
const value = ref('');
// 解析后的内容
const parseContent = ref('');

// 加密
const encodeBtn = () => {
  if (!value.value) {
    return message.warning('加密内容不能为空');
  }
  loading.value = true;
  setTimeout(() => {
    var encode = jsBase64.encode(value.value);
    parseContent.value = encode;
    isParse.value = true;
    loading.value = false;
  }, 1000);
}

// 解密
const decodeBtn = () => {
  if (!value.value) {
    return message.warning('解密内容不能为空');
  }
  loadingDe.value = true;
  setTimeout(() => {
    try {
      var decode = jsBase64.decode(value.value);
      parseContent.value = decode;
      isParse.value = true;
      loadingDe.value = false;
    } catch (DOMException) {
      loadingDe.value = false;
      isParse.value = false;
      return message.error('格式错误、解码失败！')
    }
  }, 1000);
}

const copy = async () => {
  try {
    await toClipboard(parseContent.value)
    message.success('成功复制内容')
  } catch (e) {
    message.error(e)
  }
}
</script>

<script>
export default {
  name: "ToolsBase64"
}
</script>

<style scoped>
.-parse {
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
}

.-parse span {
  font-size: 17px;
  line-height: 32px;
}
</style>