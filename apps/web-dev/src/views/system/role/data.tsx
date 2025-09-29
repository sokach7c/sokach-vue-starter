import type { FormSchemaGetter } from '#/adapter/form';
import type { VxeGridProps } from '#/adapter/vxe-table';

import { z } from '#/adapter/form';
import { GENERAL_STATUS_OPTIONS } from '#/constant/options';

export const NAME = '角色';

export const querySchema: FormSchemaGetter = () => [
  {
    component: 'Input',
    fieldName: 'name',
    label: '名称',
  },
  {
    component: 'Input',
    fieldName: 'code',
    label: '编码',
  },
  {
    component: 'RadioGroup',
    fieldName: 'status',
    componentProps: {
      options: GENERAL_STATUS_OPTIONS,
    },
    label: '状态',
  },
];

export const columns: VxeGridProps['columns'] = [
  {
    field: 'name',
    title: '名称',
  },
  {
    field: 'code',
    title: '编码',
  },
  {
    field: 'description',
    title: '描述',
  },
  {
    field: 'status',
    title: '状态',
    cellRender: { name: 'CellTag', options: GENERAL_STATUS_OPTIONS },
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
    component: 'Input',
    fieldName: 'name',
    label: '名称',
    rules: z
      .string()
      .min(1, { message: '名称为必填项' })
      .max(50, { message: '名称长度不能超过50' }),
  },
  {
    component: 'Input',
    fieldName: 'code',
    label: '编码',
    rules: z
      .string()
      .min(1, { message: '编码为必填项' })
      .max(30, { message: '编码长度不能超过30' })
      .regex(/^\w+$/, { message: '编码只能包含字母、数字和下划线' }),
  },
  {
    component: 'InputNumber',
    fieldName: 'sort',
    label: '排序',
    defaultValue: 999,
  },
  {
    component: 'Textarea',
    fieldName: 'description',
    formItemClass: 'col-span-2',
    componentProps: {
      class: 'w-full',
      rows: 3,
      showCount: true,
      maxlength: 200,
    },
    label: '描述',
  },
  {
    component: 'Switch',
    defaultValue: true,
    fieldName: 'menuCheckStrictly',
    label: '菜单选择是否父子节点关联',
  },
  {
    component: 'RadioGroup',
    componentProps: {
      options: GENERAL_STATUS_OPTIONS,
    },
    fieldName: 'status',
    defaultValue: 1,
    label: '状态',
  },
];
