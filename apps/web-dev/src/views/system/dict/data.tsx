import type { FormSchemaGetter } from '#/adapter/form';
import type { VxeGridProps } from '#/adapter/vxe-table';

import { z } from '#/adapter/form';

export const NAME = '字典';

export const querySchema: FormSchemaGetter = () => [
  {
    component: 'Input',
    fieldName: 'name',
    label: '字典名称 ',
  },
];

export const columns: VxeGridProps['columns'] = [
  {
    title: '字典名称',
    field: 'name',
  },
  {
    title: '字典编码',
    field: 'code',
  },
  {
    title: '字典描述',
    field: 'description',
    width: 400,
  },
  {
    title: '创建时间',
    field: 'createTime',
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
    componentProps: {
      placeholder: '请输入字典名称',
    },
    label: '字典名称',
    rules: z
      .string()
      .min(1, { message: '请输入字典名称' })
      .max(50, { message: '字典名称不能超过50个字符' }),
  },
  {
    component: 'Input',
    fieldName: 'code',
    componentProps: {
      placeholder: '请输入字典编码',
    },
    label: '字典编码',
    rules: z
      .string()
      .min(1, { message: '请输入字典编码' })
      .max(50, { message: '字典编码不能超过50个字符' })
      .regex(/^\w+$/, { message: '字典编码只能包含字母数字下划线' }),
  },
  {
    component: 'Textarea',
    fieldName: 'description',
    componentProps: {
      placeholder: '请输入字典描述',
    },
    label: '字典描述',
    rules: z
      .string()
      .max(200, { message: '字典描述不能超过200个字符' })
      .optional(),
  },
];
