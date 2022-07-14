<template>
  <a-modal
      v-model:visible="visible"
      width="340px"
      title="提交网站"
      :confirm-loading="loading"
      @update:visible="updateVisible"
      @ok="handleOk">
    <a-form
        :label-col="{ md: { span: 7 }, sm: { span: 4 }, xs: { span: 24 } }"
        :wrapper-col="{ md: { span: 17 }, sm: { span: 20 }, xs: { span: 24 } }"
    >
      <a-form-item label="网站分类" v-bind="validateInfos.classifyId">
        <a-select
            allow-clear
            v-model:value="form.classifyId"
            placeholder="请选择网站分类"
        >
          <a-select-option
              v-for="classify in classifyList"
              :value="classify.id"
              :key="classify.id"
          >
            {{ classify.title }}
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="网站名称" v-bind="validateInfos.title">
        <a-input
            allow-clear
            :maxlength="20"
            placeholder="请输入网站名称"
            v-model:value="form.title"
            @blur="validate('title', { trigger: 'blur' }).catch(() => {})"
        />
      </a-form-item>
      <a-form-item label="网站链接" v-bind="validateInfos.url">
        <a-input
            allow-clear
            :maxlength="100"
            placeholder="请输入网站链接"
            v-model:value="form.url"
            @blur="validate('title', { trigger: 'blur' }).catch(() => {})"
        />
      </a-form-item>
      <a-form-item label="网站描述" v-bind="validateInfos.summary" style="margin-bottom: 0px;">
        <a-textarea
            :rows="4"
            v-model:value="form.summary"
            placeholder="请输入网站描述"
        />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script setup>
import {reactive, ref} from "vue";
import {getClassifyList, postAddDomain} from "@/api/home";
import {Form, message} from "ant-design-vue";
const useForm = Form.useForm;

const loading = ref(false);
const emit = defineEmits(['done', 'update:visible']);

const props = defineProps({
  // 弹窗是否打开
  visible: Boolean
});

/**
 * 分类列表
 * @type {Ref<UnwrapRef<*[]>>}
 */
const classifyList = ref([]);

const form = reactive({
  id: undefined,
  classifyId: undefined, // 商品分类
  title: '',
  url: '',
  summary: ''
});

// 表单验证规则
const rules = reactive({
  title: [
    {
      required: true,
      type: 'string',
      message: '请输入网站名称',
      trigger: 'blur'
    }
  ],
  url: [
    {
      required: true,
      type: 'string',
      message: '请输入网站链接',
      trigger: 'blur'
    }
  ],
  summary: [
    {
      required: true,
      type: 'string',
      message: '请输入网站描述',
      trigger: 'blur'
    }
  ],
  classifyId: [
    {
      required: true,
      message: '请选择分类',
      type: 'number',
      trigger: 'blur'
    }
  ]
});

const { validate, validateInfos } = useForm(form, rules);

const handleOk = e => {
  validate()
      .then(() => {
        loading.value = true;
        const data = {
          ...form
        };
        const saveOrUpdate = postAddDomain;
        saveOrUpdate(data)
            .then((msg) => {
              loading.value = false;
              message.success(msg);
              updateVisible(false);
              emit('done');
            })
            .catch((e) => {
              loading.value = false;
              message.error(e.message);
            });
      })
      .catch(() => {});
};

/* 更新visible */
const updateVisible = (value) => {
  emit('update:visible', value);
};

getClassifyList().then((mData) => {
  classifyList.value = mData.map((d) => {
    return {
      ...d
    }
  })
})
</script>

<script>
export default {
  name: "domain-submit"
}
</script>

<style scoped>

</style>