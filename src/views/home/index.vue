<template>
  <a-card :bordered="false">
    <a-skeleton :loading="loading" active>
      <a v-for="site in siteList" :href="site.url" target="_blank" :key="site.id">
        <a-card-grid style="text-align: center">
          <a-avatar shape="square" size="large" :src="site.icon"/>
          <div class="resource-name">{{ site.title }}</div>
        </a-card-grid>
      </a>
    </a-skeleton>
  </a-card>
</template>
<script setup>
import {ref} from 'vue';
import {Card, Avatar, Skeleton} from 'ant-design-vue';

const ACard = Card;
const ACardGrid = Card.Grid;
const AAvatar = Avatar;
const ASkeleton = Skeleton;

const loading = ref(false);
const siteList = ref([{
      "id": 6,
      "title": "哔哩哔哩",
      "summary": "bilibili，简称B站，现为中国年轻世代高度聚集的文化社区和视频平台，该网站于2009年6月26日创建，被网友们亲切地称为“B站”。",
      "url": "https://www.bilibili.com/",
      "icon": "./assets/images/bilibili.png",
      "sort": 1,
      "enabled": 1,
      "createTime": "2022/06/26 03:04:31",
      "updateTime": "2022/06/26 03:04:31"
    }, {
      "id": 10,
      "title": "腾讯云",
      "summary": "腾讯云—腾讯倾力打造的云计算品牌，以卓越科技能力助力各行各业数字化转型，为全球客户提供领先的云计算、大数据、人工智能服务，以及定制化行业解决方案和提供可靠企业上云服务。",
      "url": "https://curl.qcloud.com/AMssDXbB",
      "icon": "./assets/images/tencent.png",
      "sort": 2,
      "enabled": 1,
      "createTime": "2022/06/26 03:17:46",
      "updateTime": "2022/06/26 03:17:46"
    }, {
      "id": 7,
      "title": "iconfont",
      "summary": "中国 矢量图标库 下载 在线存储 格式转换 阿里巴巴体验团队 iconfont",
      "url": "https://www.iconfont.cn/",
      "icon": "./assets/images/iconfont.png",
      "sort": 3,
      "enabled": 1,
      "createTime": "2022/06/26 03:14:36",
      "updateTime": "2022/06/26 03:14:36"
    }, {
      "id": 9,
      "title": "掘金",
      "summary": "掘金是面向全球中文开发者的技术内容分享与交流平台。我们通过技术文章、沸点、课程、直播等产品和服务，打造一个激发开发者创作灵感，激励开发者沉淀分享，陪伴开发者成长的综合类技术社区。",
      "url": "https://juejin.cn/",
      "icon": "./assets/images/juejin.png",
      "sort": 4,
      "enabled": 1,
      "createTime": "2022/06/26 03:16:45",
      "updateTime": "2022/06/26 03:16:45"
    }, {
      "id": 8,
      "title": "Github",
      "summary": "GitHub是一个面向开源及私有软件项目的托管平台，因为只支持Git作为唯一的版本库格式进行托管，故名GitHub。",
      "url": "https://github.com/",
      "icon": "./assets/images/github-fill.png",
      "sort": 1000,
      "enabled": 1,
      "createTime": "2022/06/26 03:15:14",
      "updateTime": "2022/06/26 03:15:14"
    }, {
      "id": 11,
      "title": "Vue.js",
      "summary": "Vue.js是一款流行的JavaScript前端框架，是一个用于创建用户界面的开源JavaScript框架，也是一个创建单页应用的Web应用框架。",
      "url": "https://cn.vuejs.org/",
      "icon": "./assets/images/Vue.png",
      "sort": 1000,
      "enabled": 1,
      "createTime": "2022/06/26 03:20:03",
      "updateTime": "2022/06/26 03:20:03"
    }, {
      "id": 12,
      "title": "Vant",
      "summary": "Vant 是一个轻量、可靠的移动端组件库，于 2017 年开源。\n\n目前 Vant 官方提供了 Vue 2 版本、Vue 3 版本和微信小程序版本，并由社区团队维护 React 版本和支付宝小程序版本。",
      "url": "https://youzan.github.io/vant/#/zh-CN",
      "icon": "./assets/images/logo.png",
      "sort": 1000,
      "enabled": 1,
      "createTime": "2022/06/26 03:21:58",
      "updateTime": "2022/06/26 03:21:58"
    }, {
      "id": 13,
      "title": "Ant Design of Vue",
      "summary": "众所周知，Ant Design 作为一门设计语言面世，经历过多年的迭代和积累，它对 UI 的设计思想已经成为一套事实标准，受到众多前端开发者及企业的追捧和喜爱，也是 React 开发者手中的神兵利器。希望 ant-design-vue 能够让 Vue 开发者也享受到 Ant Design 的优秀设计。",
      "url": "https://antdv.com/",
      "icon": "./assets/images/ant-design.png",
      "sort": 1000,
      "enabled": 1,
      "createTime": "2022/06/26 03:27:14",
      "updateTime": "2022/06/26 03:27:14"
    }, {
      "id": 14,
      "title": "V2EX",
      "summary": "V2EX是一个面向程序员、极客人群的分享交流社区，创始人Livid",
      "url": "https://www.v2ex.com/",
      "icon": "./assets/images/v2ex_1193414_easyicon.net.png",
      "sort": 1000,
      "enabled": 1,
      "createTime": "2022/06/26 05:13:21",
      "updateTime": "2022/06/26 05:13:21"
    }, {
      "id": 15,
      "title": "CSDN",
      "summary": "CSDN是全球知名中文IT技术交流平台,创建于1999年,包含原创博客、精品问答、职业培训、技术论坛、资源下载等产品服务,提供原创、优质、完整内容的专业IT技术开发社区.",
      "url": "https://www.csdn.net/",
      "icon": "./assets/images/csdn.png",
      "sort": 1000,
      "enabled": 1,
      "createTime": "2022/06/26 05:15:20",
      "updateTime": "2022/06/26 05:15:20"
    }, {
      "id": 16,
      "title": "Floating UI",
      "summary": "Floating UI 是一个用于创建浮动元素的低级工具包。工具提示、弹出框、下拉菜单、菜单等。",
      "url": "https://floating-ui.com/",
      "icon": "./assets/images/QQ20220626-051700@2x.png",
      "sort": 1000,
      "enabled": 1,
      "createTime": "2022/06/26 05:17:35",
      "updateTime": "2022/06/26 05:17:35"
    }, {
      "id": 17,
      "title": "APK Combo",
      "summary": "⚡️ APKCombo - 下载适用于 Android 的 APK (免费)",
      "url": "https://apkcombo.com/zh/",
      "icon": "./assets/images/APK.png",
      "sort": 1000,
      "enabled": 1,
      "createTime": "2022/06/26 05:19:45",
      "updateTime": "2022/06/26 05:19:45"
    }, {
      "id": 18,
      "title": "Dynadot",
      "summary": "dynadot 全球域名注册商,专业客服一对一解决客户问题。 提供域名注册/域名解析/域名交易等服务。",
      "url": "https://www.dynadot.com/",
      "icon": "./assets/images/QQ20220626-052557@2x.png",
      "sort": 1000,
      "enabled": 1,
      "createTime": "2022/06/26 05:27:14",
      "updateTime": "2022/06/26 05:27:14"
    }, {
      "id": 19,
      "title": "NameSilo",
      "summary": "Namesilo 是国外的一家域名注册商,类似国内的新网,万网,腾讯云域名注册服务商。但是 namesilo 的特点是在海外无需实名制,且价格非常便宜。",
      "url": "https://www.namesilo.com/",
      "icon": "./assets/images/QQ20220626-052844@2x.png",
      "sort": 1000,
      "enabled": 1,
      "createTime": "2022/06/26 05:29:39",
      "updateTime": "2022/06/26 05:29:39"
    }, {
      "id": 20,
      "title": "Layui",
      "summary": "一套开源的 Web UI 组件库。采用自身极简的模块化规范，并遵循原生 HTML/CSS/JS 的开发模式，极易上手，开箱即用。非常适合网页界面的快速构建。",
      "url": "https://layuion.com/",
      "icon": "./assets/images/QQ20220626-053109@2x.png",
      "sort": 1000,
      "enabled": 1,
      "createTime": "2022/06/26 05:31:47",
      "updateTime": "2022/06/26 05:31:47"
    }, {
      "id": 21,
      "title": "宝塔面板",
      "summary": "宝塔，让运维简单高效。面板支持Linux与Windows系统。一键配置：LAMP/LNMP、网站、数据库、FTP、SSL，通过Web端轻松管理服务器。",
      "url": "https://www.bt.cn/",
      "icon": "./assets/images/flogo_03.png",
      "sort": 1000,
      "enabled": 1,
      "createTime": "2022/06/26 05:36:06",
      "updateTime": "2022/06/26 05:36:06"
    }, {
      "id": 22,
      "title": "Gitee",
      "summary": "Gitee.com（码云） 是 OSCHINA.NET 推出的代码托管平台，支持 Git 和 SVN，提供免费的私有仓库托管。目前已有超过 800 万的开发者选择 Gitee。",
      "url": "https://gitee.com",
      "icon": "./assets/images/922113c877c745eab3eedf3f47d3318d.png",
      "sort": 1000,
      "enabled": 1,
      "createTime": "2022/06/26 07:48:13",
      "updateTime": "2022/06/26 07:48:13"
    }, {
      "id": 23,
      "title": "MacWK",
      "summary": "MAC应用软件,每天更新大量精品mac软件,为您提供优质的mac软件,mac破解版软件下载",
      "url": "https://www.macwk.com/",
      "icon": "./assets/images/224e17e6848c45af895ac1253480ea21.png",
      "sort": 1000,
      "enabled": 1,
      "createTime": "2022/06/26 07:56:31",
      "updateTime": "2022/06/26 07:56:31"
    }, {
      "id": 24,
      "title": "绿云",
      "summary": "GreenCloudVPS一家国外主机服务商，网友简称绿帽云，具体成立时间不详，目前有提供日本、香港、新加坡、越南、美国、欧洲等地区覆盖，包括存储型、SSD VPS都有，使用KVM虚拟化，类型比较丰富。",
      "url": "https://greencloudvps.com/",
      "icon": "./assets/images/675303b745b64a32b6e5ac5bc2b1b858.png",
      "sort": 1000,
      "enabled": 1,
      "createTime": "2022/06/26 08:00:20",
      "updateTime": "2022/06/26 08:00:20"
    }, {
      "id": 25,
      "title": "NPM",
      "summary": "",
      "url": "https://www.npmjs.com/",
      "icon": "./assets/images/ae96f693048e45c4ae0962b43679d4e4.png",
      "sort": 1000,
      "enabled": 1,
      "createTime": "2022/06/26 08:46:07",
      "updateTime": "2022/06/26 08:46:07"
    }, {
      "id": 26,
      "title": "站长工具",
      "summary": "站长工具是站长的必备工具。经常上站长工具可以了解SEO数据变化。",
      "url": "https://tool.chinaz.com/",
      "icon": "./assets/images/b6f5fd5826994675a05cd0388c441bf7.png",
      "sort": 1000,
      "enabled": 1,
      "createTime": "2022/06/28 11:34:45",
      "updateTime": "2022/06/28 11:34:45"
    }, {
      "id": 27,
      "title": "值联科技",
      "summary": "专业的商城系统、为多种个人或企业提供解决方案。",
      "url": "https://zlianyun.cn",
      "icon": "./assets/images/47b9074485fc456db67350ffa14c7f4b.png",
      "sort": 1000,
      "enabled": 1,
      "createTime": "2022/06/28 11:38:17",
      "updateTime": "2022/06/28 11:38:17"
    }, {
      "id": 28,
      "title": "CODELF",
      "summary": "",
      "url": "https://unbug.github.io/codelf/",
      "icon": "./assets/images/4ea092644bd84d148c5e530619d48f04.png",
      "sort": 1000,
      "enabled": 1,
      "createTime": "2022/06/28 11:40:39",
      "updateTime": "2022/06/28 11:40:39"
    }, {
      "id": 29,
      "title": "程序员客栈",
      "summary": "程序员客栈提供兼职程序员、程序员接私活、开发外包，程序员客栈是最大的程序员兼职平台",
      "url": "https://www.proginn.com/",
      "icon": "./assets/images/26fbeb8910dd4662a918f788644e435d.png",
      "sort": 1000,
      "enabled": 1,
      "createTime": "2022/06/28 11:45:40",
      "updateTime": "2022/06/28 11:45:40"
    }, {
      "id": 30,
      "title": "NATAPP",
      "summary": "NATAPP-内网穿透 基于ngrok的国内高速内网映射工具",
      "url": "https://natapp.cn/",
      "icon": "./assets/images/natapp.png",
      "sort": 1000,
      "enabled": 1,
      "createTime": "2022/06/28 11:45:40",
      "updateTime": "2022/06/28 11:45:40"
    }, {
      "id": 31,
      "title": "cloudflare",
      "summary": "Cloudflare以向客户提供网站安全管理、性能优化及相关的技术支持为主要业务。",
      "url": "https://dash.cloudflare.com/",
      "icon": "./assets/images/cloudflare.png",
      "sort": 1000,
      "enabled": 1,
      "createTime": "2022/06/28 11:45:40",
      "updateTime": "2022/06/28 11:45:40"
    }]
);
</script>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Home"
}
</script>

<style scoped>

</style>