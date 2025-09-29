<script setup lang="ts" >
import {createConfig, updateConfig, queryConfigById} from '#/api/system/config';
import type { Config } from '#/api/system/config';

import {computed, ref} from 'vue';
import {cloneDeep} from 'lodash-es';

import { Button, Modal, Spin } from 'ant-design-vue';

import {useVbenForm} from '#/adapter/form';
import {defaultFormValueGetter, useBeforeCloseDiff} from '#/utils';

import {NAME, formSchema} from './data';

const emit = defineEmits<{
    (e: 'refresh'): void;
  }>();

  const dataId = ref<ID>('');
  const loading = ref(true);
  const open = ref(false);
  const isUpdate = computed(() => !!dataId.value);
  const title = computed(() => (isUpdate.value ? `编辑${NAME}` : `新增${NAME}`));

  // 保存
  const handleSubmit = async () => {
    try {
      const res = await formApi.validate();

      if (!res.valid) {
        return;
      }
      const data = cloneDeep(await formApi.getValues());
      await (isUpdate.value
          ? updateConfig(dataId.value, data as Config.Req)
          : createConfig(data as Config.Req));
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
  const setupForm = async () => {
    open.value = true;
    loading.value = true;
    try {
      // 更新模式，。查询数据
      if (dataId.value) {
        const record = await queryConfigById(dataId.value);
        formApi.setValues(record);
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
    const confirm = await onBeforeClose();
    if (confirm) {
      open.value = false;
      formApi.resetForm();
    } else {
      open.value = true;
    }
  };

  // 提交
  const onSubmit = async () => {
    await formApi.submitForm();
    resetInitialized();
  };

  // 新增
  const onAdd = async () => {
      dataId.value = '';
    await setupForm();
  };

  // 修改
  const onUpdate = async (id: ID) => {
      dataId.value = id;
    await setupForm();
  };

  defineExpose({ onAdd, onUpdate });
</script>

<template>
  <Modal
      :footer-style="{ textAlign: 'right' }"
      v-model:open="open"
      :title="title"
      :width="600"
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

