<script setup lang="ts">
import type { Menu } from '#/api/system/menu';

import { computed, ref } from 'vue';

import { addFullName, getPopupContainer, listToTree } from '@vben/utils';

import { Button, Modal, Spin } from 'ant-design-vue';
import { cloneDeep } from 'lodash-es';

import { useVbenForm } from '#/adapter/form';
import {
  createMenu,
  queryMenuById,
  queryMenuList,
  updateMenu,
} from '#/api/system/menu';
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

// 保存
const handleSubmit = async () => {
  try {
    const res = await formApi.validate();

    if (!res.valid) {
      return;
    }
    const data = cloneDeep(await formApi.getValues());
    await (isUpdate.value
      ? updateMenu(dataId.value, data as Menu.Req)
      : createMenu(data as Menu.Req));
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
const setupForm = async (pid: ID = '') => {
  open.value = true;
  loading.value = true;
  try {
    // 更新模式，。查询数据
    if (dataId.value) {
      const record = await queryMenuById(dataId.value);
      formApi.setValues(record);
    }

    // 获取菜单树
    const menuList = await queryMenuList();
    /**
     * 这里需要过滤掉按钮类型
     * 不允许在按钮下添加数据
     */
    const filteredList = menuList.filter((item) => item.type !== 3);
    const menuTree = listToTree(filteredList, {
      id: 'id',
      pid: 'parentId',
    });
    const fullMenuTree = [
      {
        id: 0,
        title: '根菜单',
        children: menuTree,
      },
    ];
    addFullName(fullMenuTree, 'title', ' / ');

    formApi.updateSchema([
      {
        componentProps: {
          fieldNames: {
            label: 'title',
            value: 'id',
          },
          getPopupContainer,
          // 设置弹窗滚动高度 默认256
          listHeight: 300,
          showSearch: true,
          treeData: fullMenuTree,
          treeDefaultExpandAll: false,
          // 默认展开的树节点
          treeDefaultExpandedKeys: [0],
          treeLine: { showLeafIcon: false },
          // 筛选的字段
          treeNodeFilterProp: 'title',
          treeNodeLabelProp: 'fullName',
        },
        fieldName: 'parentId',
      },
    ]);

    // 处理parentId
    if (pid) {
      await formApi.setFieldValue('parentId', pid);
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
const onAdd = async (pid: ID = '') => {
  dataId.value = '';
  await setupForm(pid);
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
