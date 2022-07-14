<template>
  <a-card :title="t('tools.base64.module.title')">
    <template #extra>
      <a-space>
        <a-button type="primary" :loading="loading" @click="encodeBtn">{{ t('tools.base64.module.encode') }}</a-button>
        <a-button @click="decodeBtn" :loading="loadingDe">{{ t('tools.base64.module.decode') }}</a-button>
      </a-space>
    </template>
    <div style="padding: 15px">
      <a-textarea v-model:value="value" :placeholder="t('tools.base64.module.placeholder')" :rows="8"/>
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
import { Base64 } from 'js-base64';
import useClipboard from 'vue-clipboard3';
import { useI18n } from "vue-i18n";

const {toClipboard} = useClipboard()
const loading = ref(false);
const loadingDe = ref(false);
const isParse = ref(false);
// 需要加密的内容
const value = ref('');
// 解析后的内容
const parseContent = ref('');
const { t } = useI18n();

// 加密
const encodeBtn = () => {
  if (!value.value) {
    return message.warning('加密内容不能为空');
  }
  loading.value = true;
  setTimeout(() => {
    var encode = Base64.encode(value.value);
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
      var decode = Base64.decode(value.value);
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