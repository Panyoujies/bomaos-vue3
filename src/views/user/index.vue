<template>
  <div class="bomao-container bomao-account-center-header">
    <div class="bomao-avatar bomao-account-center-header__avatar bomao-avatar__xxl">
      <img :src="loginUser.avatar" class="bomao-avatar__img"> <!---->
      <div class="bomao-avatar__auth">
        <span class="bomao-authentication-mark">
          <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA0ppVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6ODc2NTUxQUMyNDlFMTFFOTk4MEJDMkYyM0EzOUY3MUIiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6ODc2NTUxQUIyNDlFMTFFOTk4MEJDMkYyM0EzOUY3MUIiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDphZTY2MzM5Mi0yNDdkLTExZTktOTJmYS1lNDQ0NWY4MTgyOGUiIHN0UmVmOmRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDphZTY2MzM5Mi0yNDdkLTExZTktOTJmYS1lNDQ0NWY4MTgyOGUiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7eURWlAAADNklEQVR42sSX70sUQRjHn7m90xS1u9BMLCISPA2jIIVMJYIKFMEiCopI8FV/gRm9178iAoNQ6kWkhYlI2g8pfRtmSZGWRS8Evby7Pe+27+zOent7c3u7ZjTwcU/mmec7MzvPPM8yGtbofzS/SzsGWkEHOAVqQEj0rYJP4DUYAdNAy+/QecU+0A36hJibxifRD+6B1HaED4Eh0LjN3XwHroDPuVYka6fB278QJTGW+2hzK3wOjIHyHThD3Mc4OE8r645bXSu2qHSHD3EEnAAfZCtWwKBb0Y4q7GGFa+ES4VuRCd/w8k57sTd36jy/8267MBMh46qdDGnUitWerYS3oKcL6JbQ2hJu8xCn1BtO//a46hrzlJvC7W5H1pdo1FnNtv7v3M/oaJmnVbdbr8xmmYUC/weLicJlRHU4crXgzF5GPpZ5lz5uYTT5C1dWJJO1hPxNWcPpB6i0WzzCdC5Wby9+hpdwbc1Iu36CfeZWh7K6NY2uvUrR2Hfv2WtkWaPrGMt9SFrI6crU80sslqQLY3EaX066FuW2l57HSFWTjjnKZ0lt2YlQ8VEU47tGYzSxlF/8xbekbhtPMX0sManZqlX4Y7YwRgXQXRSgDUWhm1NqXuHuibhuy8foY5lUecEq/EaeNIX4rgAdCCp5hauCft3WQXRLyxQezV0qGOL15fmFGyqUfKK8PbUKT4nKIffFEUw7i24SDcyq1A/4b7Md28PcVCfTVmF+/gacTviR3YxSeN59n6DawQj1zah0G4Tv/6YHCwndQQOfnHP0DZjlkDWceI00KxfW6EskRceHotQzGacl1Th0nK9xRlfH49T8MEqRhJYrdnmbExrSQiAsCoGSjCGbmORGwnj6IVqgGE+zj8es2VccSPdlFgI8Lc7nKn14x2WgZsU0F+NOOYVCmFMowqfILw5W1kpV3efK+rxzzbWy/gx/u8QshRUzhM2VWk+tGXKFEC7wU0YGMXx0CZ8uqkzDsFG8F8O5j9md2jwxI52lJzWn+5CIOt/VxtY0gR6w6CFHLIoxTfbtdS7obWWocSWV8gm28Lwvcvdh2yfMoviEeQJewof8C6Kq1PUnzD9rfwQYAKVg8MmOkGbsAAAAAElFTkSuQmCC" class="bomao-img-icon bomao-authentication-mark__icon">
        </span>
      </div>
    </div>
    <div class="bomao-account-center-user">
      <div class="bomao-account-center-user__header">
        <div class="bomao-account-center-user__title">
          <span class="bomao-account-center-user__name">{{ loginUser.nickName }}</span> <!---->
          <img src="https://img-static.mihoyo.com/level/level16.png" class="bomao-img-icon bomao-account-center-user__level">
        </div>
        <div class="bomao-account-center-header__buttons">
          <div class="bomao-follow-button bomao-account-center-header__follow bomao-follow-button-lg">
            <span>编辑</span>
          </div>
        </div>
      </div>
      <div class="bomao-account-center-user__audit">
        <span class="bomao-account-center-user__uid">通行证ID: {{ loginUser.userId }}</span>
      </div>
      <a class="bomao-router-link" target="_blank">
        <div class="bomao-account-center-user__certification">
          <safety-certificate-filled style="color: #05aaff" class="bomao-symbol-icon"/>
          <p>官方认证：大帅比管理员</p>
        </div>
      </a>
      <div class="bomao-account-center-user__intro">
        <project-filled style="color: #ff83ba" class="bomao-symbol-icon"/>
        <p>大帅比玩技术 (๑•̀ㅂ•́)و✧棒</p>
      </div>
    </div>
  </div>
  <a-row :gutter="16">
    <a-col :span="6">
      <a-card title="列表测试">
        <template #extra><a href="#">more</a></template>
        <p>card content</p>
        <p>card content</p>
        <p>card content</p>
      </a-card>
    </a-col>
    <a-col :span="18">
      <a-card title="内容测试">
        <template #extra><a href="#">more</a></template>
        <p>card content</p>
        <p>card content</p>
        <p>card content</p>
      </a-card>
    </a-col>
  </a-row>
</template>

<script setup>
import {computed} from "vue";
import {useUserStore} from '@/store/modules/user';
import {
  SafetyCertificateFilled,
  ProjectFilled
} from '@ant-design/icons-vue';

const userStore = useUserStore();

// 当前用户信息
const loginUser = computed(() => userStore.info ?? null);

</script>

<script>
export default {
  name: "User"
}
</script>

<style scoped>
:deep(.ant-card-body) {
  padding: 15px !important;
}

.bomao-container {
  background-color: #fff;
  border: 1px solid #f0f0f0;
  border-radius: 4px;
}

.bomao-account-center-header {
  padding: 20px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  margin-bottom: 15px;
}

.bomao-avatar {
  display: inline-block;
  position: relative;
}

.bomao-avatar__xxl {
  width: 120px;
  height: 120px;
}

.bomao-account-center-header__avatar {
  margin-right: 24px;
  -ms-flex-negative: 0;
  flex-shrink: 0;
}

.bomao-avatar__img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 1px solid #ebebeb;
  vertical-align: top;
}

.bomao-avatar__auth {
  position: absolute;
  bottom: 0;
  right: 0;
  z-index: 5;
}

.bomao-avatar__xxl .bomao-avatar__auth {
  font-size: 22px;
  right: 5px;
  bottom: 5px;
}

.bomao-authentication-mark {
  font-size: inherit;
  color: inherit;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
}

.bomao-img-icon {
  height: 1em;
  fill: currentColor;
  overflow: hidden;
}

.bomao-authentication-mark__icon {
  font-size: inherit;
}

.bomao-account-center-user {
  -webkit-box-flex: 1;
  -ms-flex-positive: 1;
  flex-grow: 1;
  height: 100%;
}

.bomao-account-center-user__header {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
}

.bomao-account-center-user__title {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
}

.bomao-account-center-user__name {
  font-size: 16px;
  line-height: 21px;
  font-weight: 600;
}

.bomao-account-center-user__level.bomao-img-icon {
  margin-left: 10px;
  height: 16px;
  -ms-flex-negative: 0;
  flex-shrink: 0;
}

.bomao-account-center-header__buttons {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
}

.bomao-follow-button {
  background-color: #00c3ff;
  border-radius: 13px;
  height: 26px;
  line-height: 26px;
  font-size: 14px;
  width: 70px;
  display: inline-block;
  color: #fff;
  text-align: center;
  cursor: pointer;
  -ms-flex-negative: 0;
  flex-shrink: 0;
  -webkit-transition: .2s background-color;
  -o-transition: .2s background-color;
  transition: .2s background-color;
}

.bomao-follow-button.bomao-follow-button-lg {
  width: 86px;
  height: 34px;
  line-height: 32px;
  background-color: rgba(30, 128, 255, .05);
  color: #007fff;
  border: 1px solid rgba(30, 128, 255, .3);
  border-radius: 4px;
  -webkit-transition-duration: .2s;
  -o-transition-duration: .2s;
  transition-duration: .2s;
  -webkit-transition-property: border-color,color;
  -o-transition-property: border-color,color;
  transition-property: border-color,color;
}

.bomao-follow-button.bomao-follow-button-lg:not(.bomao-follow-button--follow):not(.bomao-follow-button--follow-followed):hover {
  background-color: rgba(30, 128, 255, 0.05);
  border-color: rgba(30, 128, 255, 0.31);
  color: #4ca8ff;
}

.bomao-follow-button span {
  vertical-align: top;
  display: inline-block;
}

.bomao-account-center-user__audit {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
}

.bomao-account-center-user__uid {
  font-size: 12px;
  color: #ccc;
}

.bomao-account-center-user__certification span, .bomao-account-center-user__intro span {
  margin-top: 2px;
  -ms-flex-negative: 0;
  flex-shrink: 0;
  line-height: 1;
}

.bomao-account-center-user__certification .bomao-symbol-icon, .bomao-account-center-user__intro .bomao-symbol-icon {
  font-size: 16px;
  margin-right: 8px;
}

.bomao-symbol-icon {
  width: 1em;
  height: 1em;
  fill: currentColor;
  overflow: hidden;
}

.bomao-account-center-user__certification, .bomao-account-center-user__intro {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  margin-top: 12px;
  color: #666;
  line-height: 18px;
}

.bomao-account-center-user__certification span, .bomao-account-center-user__intro span {
  margin-top: 2px;
  -ms-flex-negative: 0;
  flex-shrink: 0;
  line-height: 1;
}
</style>