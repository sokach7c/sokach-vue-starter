<script setup lang="ts">
import { ref } from 'vue';

import { Modal } from 'ant-design-vue';

import { useVbenVxeGrid } from '#/adapter/vxe-table';
import { deleteDictItemByIds, queryDictItemPage } from '#/api/system';

import BaseForm from './base-form.vue';
import { columns, NAME, querySchema } from './data';

const dictId = ref<ID>('');
const open = ref(false);

const [BasicTable, tableApi] = useVbenVxeGrid({
  formOptions: {
    commonConfig: {
      componentProps: {
        allowClear: true,
      },
      labelWidth: 80,
    },
    collapsed: false,
    schema: querySchema(),
    wrapperClass: 'grid-cols-3',
  },
  gridOptions: {
    height: 600,
    columns,
    proxyConfig: {
      ajax: {
        query: async ({ page }, formValues = {}) => {
          return await queryDictItemPage({
            pageNum: page.currentPage,
            pageSize: page.pageSize,
            dictId: dictId.value,
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
const handleAdd = (dictId: ID) => {
  formRef.value?.onAdd(dictId);
};

// 编辑
const handleEdit = (id: ID) => {
  formRef.value?.onUpdate(id);
};

// 删除
const handleDelete = (id: ID) => {
  Modal.confirm({
    title: '提示',
    content: `确定删除选择的${NAME} 吗？`,
    okType: 'danger',
    onOk: async () => {
      try {
        await deleteDictItemByIds([id]);
        await refresh();
      } catch (error) {
        console.error(error);
      }
    },
  });
};

// 打开
const onOpen = async (id: ID) => {
  dictId.value = id;
  open.value = true;
};

defineExpose({ onOpen });
</script>

<template>
  <div>
    <Modal
      :footer-style="{ textAlign: 'right' }"
      v-model:open="open"
      :title="`${NAME}管理`"
      :width="900"
      :mask-closable="false"
      destroy-on-close
      :footer="null"
    >
      <BasicTable :table-title="`${NAME}管理`">
        <template #toolbar-tools>
          <a-button type="primary" @click="handleAdd(dictId)">
            {{ `新增${NAME}` }}
          </a-button>
        </template>
        <template #action="{ row }">
          <a-button type="link" size="small" @click="handleEdit(row.id)">
            编辑
          </a-button>
          <a-button
            type="link"
            danger
            size="small"
            :disabled="row.builtIn"
            @click="handleDelete(row.id)"
          >
            删除
          </a-button>
        </template>
      </BasicTable>
    </Modal>
    <BaseForm ref="formRef" @refresh="refresh" />
  </div>
</template>
