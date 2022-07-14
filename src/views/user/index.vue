<template>
  <div class="bomao-container bomao-account-center-header">
    <div class="bomao-avatar bomao-account-center-header__avatar bomao-avatar__xxl">
      <img :src="loginUser.avatar" class="bomao-avatar__img"> <!---->
      <div class="bomao-avatar__auth">
        <span class="bomao-authentication-mark">
          <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA0ppVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6ODc2NTUxQUMyNDlFMTFFOTk4MEJDMkYyM0EzOUY3MUIiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6ODc2NTUxQUIyNDlFMTFFOTk4MEJDMkYyM0EzOUY3MUIiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDphZTY2MzM5Mi0yNDdkLTExZTktOTJmYS1lNDQ0NWY4MTgyOGUiIHN0UmVmOmRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDphZTY2MzM5Mi0yNDdkLTExZTktOTJmYS1lNDQ0NWY4MTgyOGUiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7eURWlAAADNklEQVR42sSX70sUQRjHn7m90xS1u9BMLCISPA2jIIVMJYIKFMEiCopI8FV/gRm9178iAoNQ6kWkhYlI2g8pfRtmSZGWRS8Evby7Pe+27+zOent7c3u7ZjTwcU/mmec7MzvPPM8yGtbofzS/SzsGWkEHOAVqQEj0rYJP4DUYAdNAy+/QecU+0A36hJibxifRD+6B1HaED4Eh0LjN3XwHroDPuVYka6fB278QJTGW+2hzK3wOjIHyHThD3Mc4OE8r645bXSu2qHSHD3EEnAAfZCtWwKBb0Y4q7GGFa+ES4VuRCd/w8k57sTd36jy/8267MBMh46qdDGnUitWerYS3oKcL6JbQ2hJu8xCn1BtO//a46hrzlJvC7W5H1pdo1FnNtv7v3M/oaJmnVbdbr8xmmYUC/weLicJlRHU4crXgzF5GPpZ5lz5uYTT5C1dWJJO1hPxNWcPpB6i0WzzCdC5Wby9+hpdwbc1Iu36CfeZWh7K6NY2uvUrR2Hfv2WtkWaPrGMt9SFrI6crU80sslqQLY3EaX066FuW2l57HSFWTjjnKZ0lt2YlQ8VEU47tGYzSxlF/8xbekbhtPMX0sManZqlX4Y7YwRgXQXRSgDUWhm1NqXuHuibhuy8foY5lUecEq/EaeNIX4rgAdCCp5hauCft3WQXRLyxQezV0qGOL15fmFGyqUfKK8PbUKT4nKIffFEUw7i24SDcyq1A/4b7Md28PcVCfTVmF+/gacTviR3YxSeN59n6DawQj1zah0G4Tv/6YHCwndQQOfnHP0DZjlkDWceI00KxfW6EskRceHotQzGacl1Th0nK9xRlfH49T8MEqRhJYrdnmbExrSQiAsCoGSjCGbmORGwnj6IVqgGE+zj8es2VccSPdlFgI8Lc7nKn14x2WgZsU0F+NOOYVCmFMowqfILw5W1kpV3efK+rxzzbWy/gx/u8QshRUzhM2VWk+tGXKFEC7wU0YGMXx0CZ8uqkzDsFG8F8O5j9md2jwxI52lJzWn+5CIOt/VxtY0gR6w6CFHLIoxTfbtdS7obWWocSWV8gm28Lwvcvdh2yfMoviEeQJewof8C6Kq1PUnzD9rfwQYAKVg8MmOkGbsAAAAAElFTkSuQmCC"
              class="bomao-img-icon bomao-authentication-mark__icon">
        </span>
      </div>
    </div>
    <div class="bomao-account-center-user">
      <div class="bomao-account-center-user__header">
        <div class="bomao-account-center-user__title">
          <span class="bomao-account-center-user__name">{{ loginUser.nickName }}</span> <!---->
          <img src="https://img-static.mihoyo.com/level/level16.png"
               class="bomao-img-icon bomao-account-center-user__level">
        </div>
        <div class="bomao-account-center-header__buttons">
          <div @click="editUserInfo" class="bomao-follow-button bomao-account-center-header__follow bomao-follow-button-lg">
            <span>编辑</span>
          </div>
        </div>
      </div>
      <div class="bomao-account-center-user__audit">
        <span class="bomao-account-center-user__uid">通行证ID: {{ loginUser.userId }}</span>
      </div>
      <div class="bomao-account-center-user__certification">
        <safety-certificate-filled style="color: #05aaff" class="bomao-symbol-icon"/>
        <p>官方认证：大帅比管理员</p>
      </div>
      <div class="bomao-account-center-user__intro">
        <project-filled style="color: #ff83ba" class="bomao-symbol-icon"/>
        <p>{{ loginUser.introduction }}</p>
      </div>
    </div>
  </div>
  <a-row :gutter="16">
    <a-col :span="6">
      <nav role="navigation" class="dock-nav">
        <div class="item">
          <router-link to="/user/info" class="title" active-class="active">
            <div class="bomao-title">
              <svg width="16" height="16" fill="none" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M110.680577 709.675756c80.034664-6.599288 158.410553-25.541672 241.011664-30.752336 218.819267-13.804373 257.417276 94.695543 465.119367 69.285878 51.644114-6.31788 179.273678-24.517344 172.363305-98.721222-42.818116-120.244378-47.34726-149.647999-114.486245-267.981868-18.312028-32.278083-58.748915-93.366271-84.388824-107.593269-31.970068-17.738977-84.536179 32.365064-104.675828 58.723332-5.829764 7.629756-7.61543 10.800975 0.480953 23.084719 24.089603 39.812671 88.381756 152.266635 33.213383 143.973778-18.005037-2.706639-17.789119-19.734421-32.550282-53.433873-11.897957-27.161562-24.128489-53.929152-37.391534-80.313004-35.614054-70.842323-118.249958-220.821873-194.577192-269.414494-61.886365-39.395163-114.9058-2.44058-158.194635 42.068034C190.625191 247.568997 103.983052 427.627549 35.280457 576.468162 4.832042 642.429324 20.758748 711.416397 110.680577 709.675756zM18.752049 899.130287c71.669153 18.83596 123.776824-36.996538 258.783387-51.509037 251.623328-27.050022 357.219107 100.211152 538.53223 96.463812 47.138506-0.975209 91.029044-13.611992 126.036279-33.908206 27.405109-15.89089 67.991398-50.28005 76.834793-84.179047 6.342439-26.477995-8.908886-49.551457-33.713779-49.20251-20.224583 0.288572-32.102075 13.19653-41.787648 22.909734-120.019251 120.362058-280.310637 20.883591-414.238638-15.223696-141.171971-38.056681-318.028605-31.058304-457.739297 20.34124-19.729304 7.261366-44.214926 15.157181-56.605093 29.367806-18.708047 21.458688-11.69125 50.318935 3.897766 64.939904z"></path>
              </svg>
              个人简介
            </div>
            <right-outlined style="font-size: 14px;"/>
          </router-link>
        </div>
        <div class="item">
          <router-link to="/user/wallet" class="title" active-class="active">
            <div class="bomao-title">
              <svg width="16" height="16" viewBox="0 0 1024 1024" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M939.1976300088891 879.6488692622222c0 12.945382968888888-2.5890770488888886 25.890765937777775-7.767230008888888 36.247071857777776-5.17815296 10.35630592-10.35630592 20.71261184-18.123535928888888 31.068917759999998-7.767230008888888 7.767230008888888-18.123535928888888 15.534458879999999-28.47984184888889 20.712612977777777-10.35630592 5.17815296-23.301688888888886 7.767230008888888-36.247071857777776 7.7672288711111115H172.83097258666663c-12.945382968888888 0-25.890765937777775-2.5890770488888886-36.247071857777776-7.7672288711111115-12.945382968888888-5.17815296-23.301688888888886-10.35630592-31.068917759999998-20.712612977777777-7.767230008888888-7.767230008888888-15.534458879999999-18.123535928888888-20.712612977777777-31.068917759999998-5.17815296-10.35630592-7.767230008888888-23.301688888888886-7.7672288711111115-36.247071857777776V364.4226366577778c0-25.890765937777775 10.35630592-49.19245482666667 28.47984184888889-67.31598961777779 18.123535928888888-18.123535928888888 41.42522481777778-28.47984184888889 67.31598961777779-28.47984184888889h678.3380548266667c25.890765937777775 0 49.19245482666667 10.35630592 67.31598961777779 28.47984184888889 18.123535928888888 18.123535928888888 28.47984184888889 41.42522481777778 28.47984184888889 67.31598961777779v139.81013333333334H706.18074112c-25.890765937777775 0-49.19245482666667 7.767230008888888-67.31599075555556 25.890765937777775-18.123535928888888 18.123535928888888-28.47984184888889 38.836147768888885-28.47984184888889 67.31598961777779 0 18.123535928888888 5.17815296 33.657994808888894 10.35630592 46.60337777777777s15.534458879999999 23.301688888888886 28.47984184888889 31.068918897777777c12.945382968888888 10.35630592 31.068918897777777 15.534458879999999 54.37060778666666 15.534458879999999H939.1976300088891v189.00258816z m-139.81013333333334-657.6254418488888H330.7646418488889c36.247071857777776-18.123535928888888 72.49414371555555-38.836147768888885 106.15213852444442-56.95968369777778l85.43952554666666-46.60337777777777c28.47984184888889-15.534458879999999 49.19245482666667-25.890765937777775 67.31599075555556-36.247071857777776 23.301688888888886-12.945382968888888 46.60337777777777-18.123535928888888 64.72691370666666-18.123535928888888s36.247071857777776 5.17815296 49.19245368888889 10.35630592c15.534458879999999 7.767230008888888 28.47984184888889 18.123535928888888 38.836147768888885 31.068918897777777l56.95968483555556 116.50844444444445z m-139.81013333333334 375.4160981333333c0-12.945382968888888 5.17815296-23.301688888888886 12.945381831111112-33.657994808888894 7.767230008888888-7.767230008888888 20.71261184-12.945382968888888 33.65799594666667-12.945382968888888s23.301688888888886 5.17815296 33.657994808888894 12.945382968888888c7.767230008888888 7.767230008888888 12.945382968888888 20.71261184 12.945382968888888 33.657994808888894s-5.17815296 23.301688888888886-12.945382968888888 33.65799594666667-20.71261184 12.945382968888888-33.657994808888894 12.945381831111112-23.301688888888886-5.17815296-33.65799594666667-12.945381831111112c-7.767230008888888-7.767230008888888-12.945382968888888-18.123535928888888-12.945381831111112-33.65799594666667z m0 0"></path>
              </svg>
              我的钱包
            </div>
            <right-outlined style="font-size: 14px;"/>
          </router-link>
        </div>
        <div class="item">
          <router-link to="/user/orders" class="title" active-class="active">
            <div class="bomao-title">
              <svg width="16" height="16" viewBox="0 0 1024 1024" fill="none" xmlns="http://www.w3.org/2000/svg" >
                <path d="M676.864 797.824l0 224.384 237.568-237.568-224.384 0C682.816 784.64 676.864 790.528 676.864 797.824" p-id="15594"></path>
                <path d="M859.2 0 164.8 0C133.376 0 107.904 25.472 107.904 56.896l0 910.208C107.904 998.528 133.376 1024 164.8 1024l455.168 0 0-226.176c0-38.72 31.36-70.08 70.08-70.08l226.048 0L916.096 56.896C916.096 25.472 890.624 0 859.2 0M706.88 498.368 297.024 498.368c-15.68 0-28.416-12.736-28.416-28.416 0-15.68 12.736-28.416 28.416-28.416l409.92 0c15.68 0 28.416 12.736 28.416 28.416C735.36 485.632 722.624 498.368 706.88 498.368M706.88 299.264 297.024 299.264c-15.68 0-28.416-12.736-28.416-28.416s12.736-28.416 28.416-28.416l409.92 0c15.68 0 28.416 12.736 28.416 28.416S722.624 299.264 706.88 299.264"></path>
              </svg>
              我的订单
            </div>
            <right-outlined style="font-size: 14px;"/>
          </router-link>
        </div>
        <div class="item">
          <router-link to="/user/edit" class="title" active-class="active">
            <div class="bomao-title">
              <svg width="16" height="16" viewBox="0 0 1024 1024" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M512.010745 1022.082324c-282.335297 0-511.220241-228.798986-511.220241-511.036046C0.790504 228.798986 229.675448 0 512.010745 0c282.312784 0 511.198751 228.798986 511.198751 511.046279C1023.208473 793.285385 794.322505 1022.082324 512.010745 1022.082324zM512.010745 95.826486c-229.385341 0-415.371242 185.884594-415.371242 415.220816 0 107.22714 41.021276 204.6551 107.802238 278.339286 60.140729-29.092595 38.062897-4.88424 116.77254-37.274952 80.539314-33.089629 99.610672-44.639686 99.610672-44.639686l0.776689-76.29464c0 0-30.169113-22.890336-39.543621-94.683453-18.895349 5.426593-25.108864-21.988804-26.237571-39.429011-1.001817-16.863063-10.926864-69.487607 12.105712-64.739467-4.714372-35.144428-8.094352-66.844407-6.417153-83.633792 5.763261-58.938344 62.97324-120.518864 151.105486-125.017318 103.665011 4.486174 144.737452 66.028832 150.500713 124.9682 1.680269 16.800641-2.028193 48.511877-6.739495 83.594907 23.025413-4.686742 13.028735 47.861054 11.901051 64.726164-1.028423 17.440208-7.394411 44.756343-26.208918 39.34203-9.42158 71.79107-39.593763 94.498234-39.593763 94.498234l0.725524 75.924203c0 0 19.070334 10.788717 99.609649 43.892673 78.70862 32.387641 56.605206 9.609869 116.77561 38.765909 66.75231-73.686233 107.772562-171.101913 107.772562-278.339286C927.356404 281.712103 741.398132 95.826486 512.010745 95.826486z"></path>
              </svg>
              编辑资料
            </div>
            <right-outlined style="font-size: 14px;"/>
          </router-link>
        </div>
      </nav>
    </a-col>
    <a-col :span="18">
      <keep-alive>
        <router-view/>
      </keep-alive>
    </a-col>
  </a-row>
</template>

<script setup>
import {computed} from "vue";
import {useUserStore} from '@/store/modules/user';
import { useRouter } from "vue-router";
import {
  SafetyCertificateFilled,
  ProjectFilled,
  RightOutlined
} from '@ant-design/icons-vue';

const userStore = useUserStore();
const { push } = useRouter();

// 当前用户信息
const loginUser = computed(() => userStore.info ?? null);

/**
 * 跳转路由到编辑资料
 */
const editUserInfo = () => {
  push('/user/edit');
}
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
  -webkit-transition-property: border-color, color;
  -o-transition-property: border-color, color;
  transition-property: border-color, color;
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

.dock-nav {
  background: #fff;
  padding: 10px;
  box-sizing: border-box;
  border-radius: 5px;
  border: 1px solid #f0f0f0;
  transition: all .2s linear;
}

.dock-nav .item {
  display: block;
}

.dock-nav .item .title {
  padding: 0 12px;
  color: #666666;
  border-radius: 4px;
  display: flex;
  align-items: center;
  height: 44px;
  margin-bottom: 2px;
  font-size: 16px;
  transition: color .3s;
  justify-content: space-between;
}

.bomao-title {
  display: flex;
  align-items: center;
}

.dock-nav .item .title.active {
  color: #1e80ff;
  background: #eaf2ff!important;
}

svg:not(:root) {
  overflow: hidden;
}

.dock-nav .item .title div svg {
  fill: #8a919f;
  margin-right: 10px;
  transition: fill .3s;
}

.dock-nav .item .title.active div svg {
  fill: #1e80ff;
}

</style>