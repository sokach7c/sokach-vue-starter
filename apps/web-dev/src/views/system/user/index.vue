<script setup lang="ts">
  import {ref} from 'vue';
import {queryUserPage, deleteUserByIds} from '#/api/system/user';
import type { User } from '#/api/system/user';

import { Page } from '@vben/common-ui';

  import {Modal} from 'ant-design-vue';

  import {useVbenVxeGrid} from '#/adapter/vxe-table';

  import BaseForm from './base-form.vue';
  import {columns, querySchema, NAME} from './data';

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
      proxyConfig: {
        ajax: {
          query: async ({ page }, formValues = {}) => {
            return await queryUserPage({
              pageNum: page.currentPage,
              pageSize: page.pageSize,
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
  const handleEdit = (row: User.Res) => {
    baseFormRef.value?.onUpdate(row.id);
  };

  // 删除
  const handleDelete = (row: User.Res) => {
    Modal.confirm({
      title: '提示',
      content: `确定删除${NAME}[${row.name}]吗？`,
      okButtonProps: {
        danger: true,
        type: 'primary',
      },
      onOk: async () => {
        try {
          await deleteUserByIds([row.id]);
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

