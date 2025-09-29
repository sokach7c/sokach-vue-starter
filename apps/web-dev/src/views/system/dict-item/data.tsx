import type { FormSchemaGetter } from '#/adapter/form';
import type { VxeGridProps } from '#/adapter/vxe-table';

export const NAME = '字典项';

export const querySchema: FormSchemaGetter = () => [
  {
    component: 'Input',
    fieldName: 'label',
    label: '标签',
  },
  {
    component: 'Input',
    fieldName: 'value',
    label: '值',
  },
  {
    component: 'Input',
    fieldName: 'color',
    label: '标签颜色',
  },
  {
    component: 'InputNumber',
    fieldName: 'sort',
    label: '排序',
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
    component: 'InputNumber',
    fieldName: 'dictId',
    label: '字典ID',
  },
];

export const columns: VxeGridProps['columns'] = [
  {
    field: 'label',
    title: '标签',
  },
  {
    field: 'value',
    title: '值',
  },
  {
    field: 'color',
    title: '标签颜色',
  },
  {
    field: 'sort',
    title: '排序',
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
    field: 'dictId',
    title: '字典ID',
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
    fieldName: 'label',
    label: '标签',
    rules: 'required',
  },
  {
    component: 'Input',
    fieldName: 'value',
    label: '值',
    rules: 'required',
  },
  {
    component: 'Input',
    fieldName: 'color',
    label: '标签颜色',
    rules: 'required',
  },
  {
    component: 'InputNumber',
    fieldName: 'sort',
    label: '排序',
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
    component: 'InputNumber',
    fieldName: 'dictId',
    label: '字典ID',
    rules: 'required',
  },
];
