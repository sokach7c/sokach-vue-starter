<script setup lang="ts">
import type { DictItem } from '#/api/system';

import { computed, ref } from 'vue';

import { Button, Modal, Spin } from 'ant-design-vue';
import { cloneDeep } from 'lodash-es';

import { useVbenForm } from '#/adapter/form';
import {
  createDictItem,
  queryDictItemById,
  queryDictList,
  updateDictItem,
} from '#/api/system';
import { defaultFormValueGetter, useBeforeCloseDiff } from '#/utils';

import { formSchema, NAME } from './data';

const emit = defineEmits<{
  (e: 'refresh'): void;
}>();

const dataId = ref<ID>('');
const loading = ref(true);
const open = ref(false);
const isUpdate = computed(() => !!dataId.value);
const title = computed(() => (isUpdate.value ? `编辑${NAME}` : `新增${NAME}`));
const dictId = ref<ID>('');

// 保存
const handleSubmit = async () => {
  try {
    const { valid } = await formApi.validate();
    if (!valid) {
      return;
    }
    const data = cloneDeep(await formApi.getValues());
    await (isUpdate.value
      ? updateDictItem(dataId.value, data as DictItem.Req)
      : createDictItem(data as DictItem.Req));
    resetInitialized();
    emit('refresh');
    open.value = false;
  } catch (error) {
    console.error(error);
  }
};

const [BasicForm, formApi] = useVbenForm({
  commonConfig: {
    componentProps: {},
    formItemClass: 'col-span-2',
  },
  schema: formSchema(),
  showDefaultActions: false,
  handleSubmit,
  wrapperClass: 'grid-cols-2',
});

// 数据变化警告弹窗
const { onBeforeClose, markInitialized, resetInitialized } = useBeforeCloseDiff(
  {
    initializedGetter: defaultFormValueGetter(formApi),
    currentGetter: defaultFormValueGetter(formApi),
  },
);

// 初始化表单
const setupForm = async (id: ID | null = null) => {
  open.value = true;
  loading.value = true;
  try {
    // 更新模式，。查询数据
    if (id) {
      dataId.value = id;
      const record = await queryDictItemById(id);
      formApi.setValues(record);
    } else {
      dataId.value = '';
    }

    // 加载字典列表
    const dictList = await queryDictList();
    formApi.updateSchema([
      {
        fieldName: 'dictId',
        componentProps: {
          options: dictList.map((item) => ({
            label: item.name,
            value: item.id,
          })),
        },
        disabled: true,
      },
    ]);

    if (dictId.value) {
      formApi.setFieldValue('dictId', dictId.value);
    }

    await markInitialized();
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
};

// 关闭
const onClose = async () => {
  const isChanged = await onBeforeClose();
  if (isChanged) {
    open.value = false;
    formApi.resetForm();
  }
};

// 提交
const onSubmit = async () => {
  await formApi.submitForm();
  resetInitialized();
};

// 新增
const onAdd = async (targetDictId: ID) => {
  dictId.value = targetDictId;
  await setupForm();
};

// 修改
const onUpdate = async (id: ID) => {
  dictId.value = '';
  await setupForm(id);
};

defineExpose({ onAdd, onUpdate });
</script>

<template>
  <Modal
    :footer-style="{ textAlign: 'right' }"
    v-model:open="open"
    :title="title"
    :width="600"
    :closable="false"
    :keyboard="false"
    destroy-on-close
    :mask-closable="false"
    @cancel="onClose"
  >
    <Spin :spinning="loading">
      <BasicForm />
    </Spin>

    <template #footer>
      <Button style="margin-right: 8px" @click="onClose" :disabled="loading">
        取消
      </Button>
      <Button type="primary" @click="onSubmit" :loading="loading">提交</Button>
    </template>
  </Modal>
</template>

<style scoped lang="scss"></style>
