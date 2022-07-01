<template>
  <a-row type="flex">
    <a-col flex="0 1 250px">
      <nav role="navigation" class="dock-nav">
        <div class="item">
          <router-link class="title" active-class="active" to="/tools/base64">
            <svg t="1656267790172" class="icon" viewBox="0 0 1024 1024" version="1.1" fill="none" xmlns="http://www.w3.org/2000/svg" p-id="5852" width="20" height="20"><path fill-rule="evenodd" clip-rule="evenodd" d="M805.59 459.13H396.02V342.11c0-64.53 52.49-117.02 117.02-117.02s117.02 52.49 117.02 117.02h78.01c0-107.55-87.5-195.04-195.04-195.04C405.5 147.08 318 234.57 318 342.11v117.02h-97.52c-10.72 0-19.5 8.78-19.5 19.5v136.52c0 172.35 139.72 312.06 312.06 312.06 172.35 0 312.06-139.71 312.06-312.06V478.64c-0.01-10.73-8.79-19.51-19.51-19.51zM513.04 712.68c-32.3 0-58.51-26.19-58.51-58.51 0-32.32 26.21-58.51 58.51-58.51 32.32 0 58.51 26.19 58.51 58.51 0 32.32-26.19 58.51-58.51 58.51z" p-id="5853"></path></svg>
            <span>Base64 解密/加密</span>
          </router-link>
        </div>
        <div class="item">
          <router-link class="title" active-class="active" to="/tools/text">
            <svg viewBox="0 0 1024 1024" version="1.1" fill="none" xmlns="http://www.w3.org/2000/svg" p-id="1365" width="20" height="20"><path fill-rule="evenodd" clip-rule="evenodd" d="M768.2 172.3H257c-46.7 0-85.2 41.9-85.2 88.7v508.2c0 46.8 37.9 84.7 84.6 84.7h507.9c46.7 0 89.1-38.4 89.1-85.2V257.5c0-46.8-38.4-85.2-85.2-85.2zM683 640.9H342.2c-11.8 0-21.3-9.5-21.3-21.3s9.5-21.3 21.3-21.3H683c11.8 0 21.3 9.5 21.3 21.3s-9.5 21.3-21.3 21.3z m0-127.8H342.2c-11.8 0-21.3-9.5-21.3-21.3s9.5-21.3 21.3-21.3H683c11.8 0 21.3 9.5 21.3 21.3s-9.5 21.3-21.3 21.3z m0-127.8H342.2c-11.8 0-21.3-9.5-21.3-21.3s9.5-21.3 21.3-21.3H683c11.8 0 21.3 9.5 21.3 21.3s-9.5 21.3-21.3 21.3z" p-id="1366"></path></svg>
            <span>文本内容去重</span>
          </router-link>
        </div>
        <div class="item">
          <router-link class="title" active-class="active" to="/tools/2fa">
            <svg viewBox="0 0 1024 1024" version="1.1" fill="none" xmlns="http://www.w3.org/2000/svg" p-id="2960" width="20" height="20"><path fill-rule="evenodd" clip-rule="evenodd" d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64z m167 633.6C638.4 735 583 757 516.9 757c-95.7 0-178.5-54.9-218.8-134.9C281.5 589 272 551.6 272 512s9.5-77 26.1-110.1c40.3-80.1 123.1-135 218.8-135 66 0 121.4 24.3 163.9 63.8L610.6 401c-25.4-24.3-57.7-36.6-93.6-36.6-63.8 0-117.8 43.1-137.1 101-4.9 14.7-7.7 30.4-7.7 46.6s2.8 31.9 7.7 46.6c19.3 57.9 73.3 101 137 101 33 0 61-8.7 82.9-23.4 26-17.4 43.2-43.3 48.9-74H516.9v-94.8h230.7c2.9 16.1 4.4 32.8 4.4 50.1 0 74.7-26.7 137.4-73 180.1z" p-id="2961"></path></svg>
            <span>2FA验证码获取</span>
          </router-link>
        </div>
      </nav>
    </a-col>
    <a-col flex="1 1">
      <router-view />
    </a-col>
  </a-row>
</template>
<script setup>
import {Row, Col} from "ant-design-vue";
const ARow = Row;
const ACol = Col;

</script>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Tools"
}
</script>

<style scoped>
.dock-nav {
  background: #fff;
  border: 1px solid #f0f0f0;
  padding: 8px;
  margin-right: 15px;
  box-sizing: border-box;
  border-radius: 4px;
  z-index: 99;
  transition: all .2s linear;
  overflow: auto;
}

.dock-nav .item {
  display: block;
}

.dock-nav .item .title {
  padding: 0 12px;
  color: #252933;
  border-radius: 4px;
  display: flex;
  align-items: center;
  height: 44px;
  margin-bottom: 2px;
  font-size: 16px;
  transition: color .3s;
}

.dock-nav .item .title.active {
  color: #1e80ff;
  background: #eaf2ff!important;
}

.dock-nav .item .title svg {
  fill: #8a919f;
  margin-right: 10px;
  transition: fill .3s;
}

.dock-nav .item .title.active svg {
  fill: #1e80ff;
}

@media (max-width: 640px) {
  .dock-nav {
    margin-right: 0px;
    margin-bottom: 15px;
    display: flex;
    overflow: initial;
  }

  .dock-nav .item {
    width: 33.333%;
  }

  .dock-nav .item .title {
    padding: 10px 5px;
    height: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .dock-nav .item .title svg {
    margin-right: 0px;
    width: 25px;
    height: 25px;
  }

  .dock-nav .item .title span{
    font-size: 12px;
    margin-top: 5px;
  }
}
</style>