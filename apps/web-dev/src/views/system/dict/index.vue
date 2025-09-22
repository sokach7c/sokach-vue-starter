<script setup lang="ts">
import { ref } from 'vue';

import { Page } from '@vben/common-ui';

import { Modal } from 'ant-design-vue';

import { useVbenVxeGrid } from '#/adapter/vxe-table';
import { deleteDictByIds, queryDictPage } from '#/api/system';

import BaseForm from './base-form.vue';
import { columns, NAME, querySchema } from './data';
import DictItemModal from './dict-item/index.vue';

const [BasicTable, tableApi] = useVbenVxeGrid({
  formOptions: {
    commonConfig: {
      labelWidth: 80,
      componentProps: {
        allowClear: true,
      },
    },
    schema: querySchema(),
    wrapperClass: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
  },
  gridOptions: {
    columns,
    proxyConfig: {
      ajax: {
        query: async ({ page }, formValues = {}) => {
          return await queryDictPage({
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
const formRef = ref<InstanceType<typeof BaseForm>>();

// 新增
const handleAdd = () => {
  formRef.value?.onAdd();
};

// 编辑
const handleEdit = (id: ID) => {
  formRef.value?.onUpdate(id);
};

// 删除
const handleDelete = (id: ID) => {
  Modal.confirm({
    title: '提示',
    content: `确定删除选择的${NAME}吗？`,
    okType: 'danger',
    onOk: async () => {
      try {
        await deleteDictByIds([id]);
        await refresh();
      } catch (error) {
        console.error(error);
      }
    },
  });
};

// 管理字典项
const dictItemModalRef = ref<InstanceType<typeof DictItemModal>>();

const handleManage = (id: ID) => {
  dictItemModalRef.value?.onOpen(id);
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
        <a-button type="link" size="small" @click="handleManage(row.id)">
          {{ `管理${NAME}` }}
        </a-button>
        <a-button type="link" size="small" @click="handleEdit(row.id)">
          编辑
        </a-button>
        <a-button type="link" danger size="small" @click="handleDelete(row.id)">
          删除
        </a-button>
      </template>
    </BasicTable>
    <BaseForm ref="formRef" @refresh="refresh" />
    <DictItemModal ref="dictItemModalRef" />
  </Page>
</template>
