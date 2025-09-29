<script setup lang="ts">
import type { Menu } from '#/api/system/menu';

import { ref } from 'vue';

import { Page } from '@vben/common-ui';

import { Modal } from 'ant-design-vue';

import { useVbenVxeGrid } from '#/adapter/vxe-table';
import { deleteMenuByIds, queryMenuList } from '#/api/system/menu';

import BaseForm from './base-form.vue';
import { columns, NAME, querySchema } from './data';

const [BasicTable, tableApi] = useVbenVxeGrid({
  formOptions: {
    commonConfig: {
      labelWidth: 80,
      componentProps: {
        allowClear: true,
      },
    },
    schema: querySchema(),
    wrapperClass: 'grid-cols-4',
  },
  gridOptions: {
    columns,
    pagerConfig: {
      enabled: false,
    },
    proxyConfig: {
      ajax: {
        query: async (_params, formValues = {}) => {
          return await queryMenuList({
            ...formValues,
          });
        },
      },
    },
  },
});

const refresh = async () => {
  await tableApi.query();
};

/** 操作表单 */
const baseFormRef = ref<InstanceType<typeof BaseForm>>();

// 新增
const handleAdd = () => {
  baseFormRef.value?.onAdd();
};

// 编辑
const handleEdit = (row: Menu.Res) => {
  baseFormRef.value?.onUpdate(row.id);
};

// 新增下级菜单
const handleAddSubMenu = (row: Menu.Res) => {
  baseFormRef.value?.onAdd(row.id);
};

// 删除
const handleDelete = (row: Menu.Res) => {
  Modal.confirm({
    title: '提示',
    content: `确定删除${NAME}[${row.name}]吗？`,
    okButtonProps: {
      danger: true,
      type: 'primary',
    },
    onOk: async () => {
      try {
        await deleteMenuByIds([row.id]);
        await refresh();
      } catch (error) {
        console.error(error);
      }
    },
  });
};
</script>

<template>
  <Page :auto-content-height="true">
    <BasicTable :table-title="`${NAME}管理`">
      <template #toolbar-tools>
        <a-button type="primary" @click="handleAdd">
          {{ `新增${NAME}` }}
        </a-button>
      </template>
      <template #action="{ row }">
        <a-button type="link" size="small" @click="handleAddSubMenu(row)">
          新增下级菜单
        </a-button>
        <a-button type="link" size="small" @click="handleEdit(row)">
          编辑
        </a-button>
        <a-button type="link" danger size="small" @click="handleDelete(row)">
          删除
        </a-button>
      </template>
    </BasicTable>
    <BaseForm ref="baseFormRef" @refresh="refresh" />
  </Page>
</template>
