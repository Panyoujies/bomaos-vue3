<template>
  <a-card title="随机生成卡密">
    <template #extra>
      <a-space>
        <a-input
            v-model:value="count"
            placeholder="数量"
            :max-length="50000"
            style="width: 80px"
            suffix="个"
        />
        <a-button type="primary" :loading="loading" @click="generate">生成卡密</a-button>
      </a-space>
    </template>
    <div style="padding: 15px">
      <div class="-parse">
        <span class="layout-vertcal">简单的卡密随机生成工具</span>
        <a-button @click="copy" style="margin-left: 10px" class="layout-vertcal">复制内容</a-button>
      </div>
      <a-textarea v-model:value="value" placeholder="生成后的内容" :rows="12" />
    </div>
  </a-card>
</template>

<script setup>
import { ref } from "vue";
import {message} from 'ant-design-vue';
import useClipboard from 'vue-clipboard3';

const { toClipboard } = useClipboard()
const loading = ref(false);
// 生成后的内容
const value = ref('');
const count = ref(20);

// 去重操作
const generate = () => {
  if (!count.value) {
    return message.warning('数量不能为空');
  }
  loading.value = true;
  setTimeout(() => {
    let randomList = ref([])
    for (let i = 0; i < count.value; i++) {
      var random = randomString(16);
      randomList.value.push(random);
    }
    value.value = randomList.value.join('\n');
    loading.value = false;
  }, 1000);
}

function randomString(len) {
  let charSet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let randomString = '';
  for (var i = 0; i < len; i++) {
    var randomPoz = Math.floor(Math.random() * charSet.length);
    randomString += charSet.substring(randomPoz, randomPoz + 1);
  }
  return randomString;
}

const copy = async () => {
  if (!value.value) {
    return message.warning('复制内容不能为空');
  }
  try {
    await toClipboard(value.value)
    message.success('成功复制内容')
  } catch (e) {
    message.error(e)
  }
}
</script>

<script>
export default {
  name: "ToolsCdk"
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