<template>
  <a-config-provider :locale="antLocale">
    <Header/>
    <div class="container">
      <router-view/>
    </div>
    <Footer/>
  </a-config-provider>
</template>

<script setup>
import {useLocale} from '@/i18n/use-locale';
import Header from "@/views/common/header";
import Footer from "@/views/common/footer";
const {antLocale} = useLocale();
</script>

<script>
export default {
  name: 'App'
}
</script>

<style>

</style>