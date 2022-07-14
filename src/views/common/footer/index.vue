<template>
  <div class="container">
    <div class="bomao-text-center" style="padding: 35px 0">
      <a-space size="large">
        <a class="bomao-text-secondary" href="https://github.com/Panyoujies/bomaos-vue3" target="_blank">
          <github-outlined/>
          {{ t('app.footer.github') }}
        </a>
        <a class="bomao-text-secondary" href="http://wpa.qq.com/msgrd?v=3&uin=1724962375&site=qq&menu=yes"
           target="_blank">
          <qq-outlined/>
          {{ t('app.footer.connect') }}
        </a>
        <a class="bomao-text-secondary" @click="message.warning('关于我们待实现')">
          <info-circle-filled />
          {{ t('app.footer.about') }}
        </a>
      </a-space>
      <div class="bomao-text-secondary" style="margin-top: 8px">
        2022 {{ t('app.footer.toolName') }} | 提供一体化的导航与商店
      </div>
    </div>
  </div>
</template>
<script setup>
import {useI18n} from 'vue-i18n';
import {message} from "ant-design-vue";
const {t} = useI18n();
import {
  GithubOutlined,
  QqOutlined,
  InfoCircleFilled
} from '@ant-design/icons-vue';

</script>

<script>
export default {
  name: "CommonFooter"
}
</script>

<style scoped>

</style>