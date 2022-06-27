<template>
  <a-card title="Base64 加密解密" :bordered="false">
    <template #extra>
      <a-button type="primary" @click="encodeBtn">加密</a-button>
      <a-button @click="decodeBtn" style="margin-left: 10px">解密</a-button>
    </template>
    <div style="padding: 15px">
      <a-textarea v-model:value="value" placeholder="输入要加密/解密的内容" :rows="8" />
      <div v-show="isParse" style="margin-top: 15px">
        <div class="-parse">
          <span class="layout-vertcal">解析后内容</span>
          <a-button @click="copy" style="margin-left: 10px" class="layout-vertcal">复制内容</a-button>
        </div>
        <a-textarea v-model:value="parseContent" placeholder="解密后的内容" :rows="8" />
      </div>
    </div>
  </a-card>
</template>

<script setup>
import { ref } from "vue";
import { message } from 'ant-design-vue';
let jsBase64 = require('js-base64').Base64;
import useClipboard from 'vue-clipboard3';
const { toClipboard } = useClipboard()

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
  var encode = jsBase64.encode(value.value);
  parseContent.value = encode;
  isParse.value = true;
}

// 解密
const decodeBtn = () => {
  if (!value.value) {
    return message.warning('解密内容不能为空');
  }
  var decode = jsBase64.decode(value.value);
  parseContent.value = decode;
  isParse.value = true;
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