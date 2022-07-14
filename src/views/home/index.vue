<template>
  <a-skeleton :loading="loading" active>
    <a-row type="flex">
      <a-col class="_show_mobile" flex="0 1 115px">
        <a-affix :offset-top="top">
          <div class="add-works-btn-wraps">
            <a class="add-works-btn" @click="showModal">提交网站</a>
          </div>
          <a-anchor
              :affix="true"
              :target-offset="targetOffset"
              @click="handleClick"
          >
            <a-anchor-link v-for="item in newList" :href="`#${item.anchor}`" :key="item.id">
              <template #title>
                <a-tooltip :title="item.summary" color="blue" placement="right" :destroyTooltipOnHide="true">
                  <a-space :size="10">
                    <span style="margin-left: 5px">{{ item.title }}</span>
                  </a-space>
                </a-tooltip>
              </template>
            </a-anchor-link>
            <a-anchor-link href="#tools">
              <template #title>
                <a-tooltip title="内置工具集" color="blue" placement="right" :destroyTooltipOnHide="true">
                  <a-space :size="10">
                    <span style="margin-left: 5px">内置工具</span>
                    <a-badge color="purple"/>
                  </a-space>
                </a-tooltip>
              </template>
            </a-anchor-link>
          </a-anchor>
          <div class="_bomao_box_ads">
            <a href="https://bbs.mihoyo.com/ys/" target="_blank">
              <img src="/assets/images/ads/ads1.png" width="115" alt="" srcset="">
            </a>
          </div>
        </a-affix>
      </a-col>
      <a-col flex="1 1">
        <a-badge-ribbon
            v-for="item in newList"
            :key="item.id"
            :text="item.summary ? item.summary : '热门推荐'"
            color="blue"
        >
          <a-card
              :id="item.anchor"
              :title="item.title"
              :style="item.anchor != 'often' ? { marginTop: '16px' } : {}"
          >
            <a-card-grid v-for="site in item.domainsList" :key="site.id">
              <a :href="site.url" target="_blank" style="display: block;">
                <a-avatar shape="square" size="large" :src="site.icon"/>
                <div class="resource-name">{{ site.title }}</div>
              </a>
            </a-card-grid>
          </a-card>
        </a-badge-ribbon>
        <a-badge-ribbon text="内置工具集" color="purple">
          <a-card id="tools" style="marginTop: 16px">
            <template #title>
              内置工具
              <a-badge color="purple" :style="{ marginLeft: '5px' }"/>
            </template>
            <a-card-grid>
              <router-link to="/base64" style="display: block;">
                <a-avatar shape="square" size="large" src="/assets/images/base64.png"/>
                <div class="resource-name">Base64加解密</div>
              </router-link>
            </a-card-grid>
            <a-card-grid>
              <router-link to="/text" style="display: block;">
                <a-avatar shape="square" size="large" src="/assets/images/text.png"/>
                <div class="resource-name">文本去重</div>
              </router-link>
            </a-card-grid>
            <a-card-grid>
              <router-link to="/2fa" style="display: block;">
                <a-avatar shape="square" size="large" src="/assets/images/2fa.png"/>
                <div class="resource-name">2FA验证码</div>
              </router-link>
            </a-card-grid>
            <a-card-grid>
              <router-link to="/cdk" style="display: block;">
                <a-avatar shape="square" size="large" src="/assets/images/cdk.png"/>
                <div class="resource-name">卡密生成</div>
              </router-link>
            </a-card-grid>
          </a-card>
        </a-badge-ribbon>
      </a-col>
    </a-row>
  </a-skeleton>
  <!-- 域名提交 -->
  <domain-submit v-model:visible="showSubmit" />
</template>
<script setup>
import {ref, onMounted} from 'vue';
import {getDomains} from "@/api/home";
import {message} from "ant-design-vue";
import DomainSubmit from "@/views/home/components/domain-submit.vue";

const newList = ref([])
const top = ref(window.innerHeight / 2 - 260);
const loading = ref(false);
const showSubmit = ref(false);
const targetOffset = ref(undefined);
onMounted(() => {
  targetOffset.value = 260;
});

const showModal = () => {
  showSubmit.value = true;
};

const handleClick = (e, link) => {
  e.preventDefault();
  console.log(link);
};

const getWebsite = () => {
  loading.value = true;
  getDomains().then((mData) => {
    newList.value = mData.map((d) => {
      return {
        ...d
      };
    });
    loading.value = false;
  }).catch((error) => {
    message.error(error)
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
._show_mobile {
  display: block;
  margin-right: 15px;
}

._bomao_box_ads {
  margin-top: 20px;
}

._bomao_box_ads img {
  border-radius: 5px;
}

.add-works-btn-wraps {
  margin-bottom: 15px;
  display: flex;
  background-color: #fff;
  border-radius: 5px;
  border: 1px solid #f0f0f0;
}

.add-works-btn {
  margin: 0;
  display: block;
  text-align: center;
  color: #308eff;
  height: 40px;
  line-height: 40px;
  width: 100%;
  outline: none;
  border-radius: 0;
  font-weight: 400;
  font-size: 14px;
}

:deep(.ant-card-grid) {
  text-align: center;
}

@media (max-width: 640px) {
  ._show_mobile {
    display: none;
  }
}
</style>