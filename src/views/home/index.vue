<template>
  <a-card :bordered="false">
    <a v-for="site in siteList" :href="site.url" target="_blank" :key="site.id">
      <a-tooltip :title="site.summary" color="blue">
        <a-card-grid style="width: 25%; text-align: center">
          <a-avatar shape="square" size="large" :src="site.icon" />
          <div class="resource-name">{{ site.title }}</div>
        </a-card-grid>
      </a-tooltip>
    </a>
  </a-card>
</template>
<script setup>
import { ref } from 'vue';
import { getDomains } from '@/api/app/index';

const siteList = ref([]);

const getWebsite = () => {
  getDomains().then((res) => {
    siteList.value = res.map((d) => {
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