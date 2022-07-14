<template>
  <a-config-provider :locale="antLocale">
    <Header />
    <div class="container">
      <keep-alive>
        <router-view/>
      </keep-alive>
    </div>
    <Footer />
  </a-config-provider>
</template>

<script setup>
import {useLocale} from '@/i18n/use-locale';
import Header from "@/views/common/header/index.vue";
import Footer from "@/views/common/footer/index.vue";
const {antLocale} = useLocale();
</script>

<style>
p {
  margin: 0;
}
</style>