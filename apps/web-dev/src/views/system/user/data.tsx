import type { FormSchemaGetter } from '#/adapter/form';
import type { VxeGridProps } from '#/adapter/vxe-table';

export const NAME = '用户';

export const querySchema: FormSchemaGetter = () => [
  {
    component: 'Input',
    fieldName: 'username',
    label: '用户名',
  },
  {
    component: 'Input',
    fieldName: 'nickname',
    label: '昵称',
  },
  {
    component: 'Input',
    fieldName: 'password',
    label: '密码',
  },
  {
    component: 'InputNumber',
    fieldName: 'gender',
    label: '性别',
  },
  {
    component: 'Input',
    fieldName: 'email',
    label: '邮箱',
  },
  {
    component: 'Input',
    fieldName: 'phone',
    label: '手机号码',
  },
  {
    component: 'Input',
    fieldName: 'avatar',
    label: '头像',
  },
  {
    component: 'Input',
    fieldName: 'description',
    label: '描述',
  },
  {
    component: 'InputNumber',
    fieldName: 'status',
    label: '状态',
  },
  {
    component: 'Switch',
    fieldName: 'builtIn',
    label: '是否内建数据',
  },
];

export const columns: VxeGridProps['columns'] = [
  {
    field: 'username',
    title: '用户名',
  },
  {
    field: 'nickname',
    title: '昵称',
  },
  {
    field: 'password',
    title: '密码',
  },
  {
    field: 'gender',
    title: '性别',
  },
  {
    field: 'email',
    title: '邮箱',
  },
  {
    field: 'phone',
    title: '手机号码',
  },
  {
    field: 'avatar',
    title: '头像',
  },
  {
    field: 'description',
    title: '描述',
  },
  {
    field: 'status',
    title: '状态',
  },
  {
    field: 'builtIn',
    title: '是否内建数据',
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
    fieldName: 'username',
    label: '用户名',
    rules: 'required',
  },
  {
    component: 'Input',
    fieldName: 'nickname',
    label: '昵称',
    rules: 'required',
  },
  {
    component: 'Input',
    fieldName: 'password',
    label: '密码',
    rules: 'required',
  },
  {
    component: 'InputNumber',
    fieldName: 'gender',
    label: '性别',
    rules: 'required',
  },
  {
    component: 'Input',
    fieldName: 'email',
    label: '邮箱',
    rules: 'required',
  },
  {
    component: 'Input',
    fieldName: 'phone',
    label: '手机号码',
    rules: 'required',
  },
  {
    component: 'Input',
    fieldName: 'avatar',
    label: '头像',
    rules: 'required',
  },
  {
    component: 'Input',
    fieldName: 'description',
    label: '描述',
    rules: 'required',
  },
  {
    component: 'InputNumber',
    fieldName: 'status',
    label: '状态',
    rules: 'required',
  },
  {
    component: 'Switch',
    fieldName: 'builtIn',
    label: '是否内建数据',
    rules: 'required',
  },
];
