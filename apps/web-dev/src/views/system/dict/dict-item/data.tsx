import type { FormSchemaGetter } from '#/adapter/form';
import type { VxeGridProps } from '#/adapter/vxe-table';

import { Tag } from 'ant-design-vue';

import { z } from '#/adapter/form';

export const NAME = '字典项';

export const querySchema: FormSchemaGetter = () => [
  {
    component: 'Input',
    fieldName: 'label',
    label: '标签 ',
  },
  {
    component: 'Switch',
    fieldName: 'status',
    componentProps: {
      class: 'w-auto',
    },
    label: '状态 ',
  },
];

export const columns: VxeGridProps['columns'] = [
  {
    title: '标签',
    field: 'label',
    width: 150,
    slots: {
      default: ({ row }) => {
        if (row.color) {
          return <Tag color={row.color}>{row.label}</Tag>;
        }
        return row.label;
      },
    },
  },
  {
    title: '值',
    field: 'value',
  },
  {
    title: '备注',
    field: 'description',
  },
  {
    title: '状态',
    field: 'status',
    width: 80,
    cellRender: { name: 'CellTag', options: [] },
  },
  {
    title: '创建时间',
    field: 'createTime',
    width: 180,
  },
  {
    field: 'action',
    fixed: 'right',
    slots: { default: 'action' },
    title: '操作',
    resizable: false,
    width: 'auto',
  },
];

export const formSchema: FormSchemaGetter = () => [
  {
    component: 'Select',
    fieldName: 'dictId',
    label: '字典',
    rules: 'selectRequired',
    componentProps: {
      class: 'w-full',
    },
  },
  {
    component: 'Input',
    componentProps: {
      placeholder: '请输入标签',
    },
    fieldName: 'label',
    label: '标签',
    rules: z.string().max(100, { message: '标签不能超过100个字符' }),
  },
  {
    component: 'Input',
    componentProps: {
      placeholder: '请输入字典值',
    },
    fieldName: 'value',
    label: '值',
    rules: z.string().max(100, { message: '值不能超过100个字符' }),
  },
  {
    component: 'ColorPicker',
    fieldName: 'color',
    label: '颜色',
  },
  {
    component: 'InputNumber',
    fieldName: 'sort',
    label: '排序',
    componentProps: {
      min: 1,
      max: 999,
    },
    defaultValue: 999,
    rules: 'required',
  },
  {
    component: 'Switch',
    defaultValue: true,
    fieldName: 'status',
    label: '状态',
  },

  {
    component: 'Textarea',
    componentProps: {
      placeholder: '描述',
    },
    rules: z.string().max(200, { message: '描述不能超过200个字符' }).optional(),
    fieldName: 'description',
    label: '描述',
  },
];
