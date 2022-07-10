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
        <a class="bomao-text-secondary" href="https://zdins.cn/" target="_blank">
          <slack-square-filled/>
          {{ t('app.footer.state') }}
        </a>
      </a-space>
      <div class="bomao-text-secondary" style="margin-top: 8px">
        2022 {{ t('app.footer.toolName') }} | <a href="http://www.beian.gov.cn/" target="_blank">琼ICP备2022003095号-1</a>
      </div>
    </div>
  </div>
</template>
<script setup>
import {useI18n} from 'vue-i18n';
const {t} = useI18n();
import {
  GithubOutlined,
  QqOutlined,
  SlackSquareFilled
} from '@ant-design/icons-vue';
</script>

<script>
export default {
  name: "CommonFooter"
}
</script>

<style scoped>

</style>