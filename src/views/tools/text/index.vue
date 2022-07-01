<template>
  <a-card title="文本去重">
    <template #extra>
      <a-button type="primary" :loading="loading" @click="operational">去重</a-button>
    </template>
    <div style="padding: 15px">
      <a-textarea v-model:value="value" placeholder="输入要去除重复的内容、以回车换行为一条数据" :rows="8" />
      <div v-show="isParse" style="margin-top: 15px">
        <div class="-parse">
          <span class="layout-vertcal">去重后内容</span>
          <a-button @click="copy" style="margin-left: 10px" class="layout-vertcal">复制内容</a-button>
        </div>
        <a-textarea v-model:value="parseContent" placeholder="去重后的内容" :rows="8" />
      </div>
    </div>
  </a-card>
</template>

<script setup>
import { ref } from "vue";
import { message, Card, Textarea, Button } from 'ant-design-vue';
import useClipboard from 'vue-clipboard3';
const ACard = Card;
const ATextarea = Textarea;
const AButton = Button;
const { toClipboard } = useClipboard()
const loading = ref(false);
const isParse = ref(false);
// 需要去重的内容
const value = ref('');
// 解析后的内容
const parseContent = ref('');

// 去重操作
const operational = () => {
  if (!value.value) {
    return message.warning('输入内容不能为空');
  }
  loading.value = true;
  setTimeout(() => {
    parseContent.value = [...new Set(value.value.split('\n'))].join("\n");
    isParse.value = true;
    loading.value = false;
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
  name: "ToolsText"
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