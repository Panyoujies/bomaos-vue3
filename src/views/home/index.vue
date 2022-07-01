<template>
  <a-card :bordered="false">
    <a-skeleton :loading="loading" active>
      <a v-for="site in siteList" :href="site.url" target="_blank" :key="site.id">
        <a-card-grid style="text-align: center">
          <a-avatar shape="square" size="large" :src="site.icon" />
          <div class="resource-name">{{ site.title }}</div>
        </a-card-grid>
      </a>
    </a-skeleton>
  </a-card>
</template>
<script setup>
import { ref } from 'vue';
import { getDomains } from '@/api/app/index';
import { Card, Avatar, Skeleton } from 'ant-design-vue';
const ACard = Card;
const ACardGrid = Card.Grid;
const AAvatar = Avatar;
const ASkeleton = Skeleton;

const loading = ref(false);
const siteList = ref([]);

const getWebsite = () => {
  loading.value = true;
  getDomains().then((res) => {
    siteList.value = res.map((d) => {
      setTimeout(() => {
        loading.value = false;
      }, 300);
      return {
        ...d
      };
    });
  }).catch((error) => {
    console.log(error)
  })
}

getWebsite();
</script>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Home"
}
</script>

<style scoped>

</style>