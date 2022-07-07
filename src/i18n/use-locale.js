/**
 * author: https://github.com/panyoujies
 */
import { ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
// ant-design-vue
import zh_CN from 'ant-design-vue/es/locale/zh_CN';
import en from 'ant-design-vue/es/locale/en_US';
// dayjs
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
const antLocales = { zh_CN, en };

export function useLocale() {
  const { locale } = useI18n();
  const antLocale = ref();

  watch(
    locale, () => {
      antLocale.value = antLocales[locale.value];
      dayjs.locale(locale.value.toLowerCase().replace(/_/g, '-'));
    },
    {
      immediate: true
    }
  );
  return { antLocale };
}
