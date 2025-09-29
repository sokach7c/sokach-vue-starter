import type { FormSchemaGetter } from '#/adapter/form';
import type { VxeGridProps } from '#/adapter/vxe-table';

import { VbenIcon } from '@vben/icons';

import { Tag } from 'ant-design-vue';

import { z } from '#/adapter/form';
import { GENERAL_STATUS_OPTIONS } from '#/constant/options';

export const NAME = '菜单';

export const menuTypeOptions: Options = [
  {
    label: '目录',
    value: 1,
    color: 'blue',
  },
  {
    label: '菜单',
    value: 2,
    color: 'green',
  },
  {
    label: '按钮',
    value: 3,
    color: 'red',
  },
];

export const querySchema: FormSchemaGetter = () => [
  {
    component: 'Input',
    fieldName: 'title',
    label: '菜单标题 ',
  },
  {
    component: 'Select',
    fieldName: 'type',
    label: '菜单类型',
    componentProps: {
      options: menuTypeOptions,
    },
  },
];

export const columns: VxeGridProps['columns'] = [
  {
    title: '菜单标题',
    field: 'title',
    treeNode: true,
    align: 'left',
    headerAlign: 'left',
    width: 200,
  },
  {
    title: '图标',
    field: 'icon',
    width: 80,
    slots: {
      default: ({ row }) => {
        if (row?.icon === '#') {
          return '';
        }
        return (
          <span class={'flex justify-center'}>
            <VbenIcon icon={row.icon} />
          </span>
        );
      },
    },
  },
  {
    title: '排序',
    field: 'sort',
    width: 120,
  },
  {
    title: '类型',
    field: 'type',
    width: 150,
    slots: {
      default: ({ row }) => {
        const current = menuTypeOptions.find((item) => item.value === row.type);
        if (!current) {
          return '未知';
        }
        return <Tag color={current.color}>{current.label}</Tag>;
      },
    },
  },
  {
    title: '权限标识',
    field: 'permission',
    width: 200,
  },
  {
    title: '组件路径',
    field: 'component',
    width: 300,
  },
  {
    title: '状态',
    field: 'status',
    cellRender: { name: 'CellTag', options: GENERAL_STATUS_OPTIONS },
    width: 80,
  },
  {
    title: '是否隐藏',
    field: 'hidden',
    cellRender: { name: 'CellTag' },
    width: 80,
  },
  {
    title: '是否外链',
    field: 'external',
    cellRender: { name: 'CellTag' },
    width: 80,
  },
  {
    title: '是否缓存',
    field: 'cache',
    cellRender: { name: 'CellTag' },
    width: 80,
  },
  {
    title: '创建时间',
    field: 'createTime',
    width: 200,
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
    component: 'TreeSelect',
    defaultValue: 0,
    componentProps: {
      class: 'w-full',
    },
    fieldName: 'parentId',
    label: '上级菜单',
    rules: 'selectRequired',
  },
  {
    component: 'RadioGroup',
    componentProps: {
      buttonStyle: 'solid',
      options: menuTypeOptions,
      optionType: 'button',
    },
    defaultValue: 1,
    dependencies: {
      componentProps: (_, api) => {
        // 切换时清空校验
        // 直接抄的源码 没有清空校验的方法
        Object.keys(api.errors.value).forEach((key) => {
          api.setFieldError(key, undefined);
        });
        return {};
      },
      triggerFields: ['type'],
    },
    fieldName: 'type',
    label: '菜单类型',
  },
  {
    component: 'Input',
    dependencies: {
      // 类型不为按钮时显示
      show: (values) => values.type !== 3,
      triggerFields: ['type'],
    },
    renderComponentContent: (model) => ({
      addonBefore: () => <VbenIcon icon={model.icon} />,
      addonAfter: () => (
        <a href="https://icon-sets.iconify.design/" target="_blank">
          搜索图标
        </a>
      ),
    }),
    fieldName: 'icon',
    help: '点击搜索图标跳转到iconify & 粘贴',
    label: '菜单图标',
  },
  {
    component: 'Input',
    fieldName: 'title',
    label: '菜单名称',
    rules: 'required',
  },
  {
    component: 'InputNumber',
    fieldName: 'sort',
    help: '排序, 数字越小越靠前',
    label: '显示排序',
    defaultValue: 999,
    rules: 'required',
  },
  {
    component: 'Input',
    componentProps: (model) => {
      const placeholder = model.external
        ? '填写链接地址http(s)://  使用新页面打开'
        : '填写`路由地址`或者`链接地址`  链接默认使用内部iframe内嵌打开';
      return {
        placeholder,
      };
    },
    dependencies: {
      rules: (model) => {
        if (!model.external) {
          return z
            .string({ message: '请输入路由地址' })
            .min(1, '请输入路由地址')
            .refine((val) => !val.startsWith('/'), {
              message: '路由地址不需要带/',
            });
        }
        // 为链接
        return z
          .string({ message: '请输入链接地址' })
          .regex(/^https?:\/\//, { message: '请输入正确的链接地址' });
      },
      // 类型不为按钮时显示
      show: (values) => values?.type !== 3,
      triggerFields: ['external', 'type'],
    },
    fieldName: 'path',
    help: `路由地址不带/, 如: menu, user\n 链接为http(s)://开头\n 链接默认使用内部iframe打开, 可通过{是否外链}控制打开方式`,
    label: '路由地址',
  },
  {
    component: 'Input',
    defaultValue: '',
    dependencies: {
      rules: () => {
        return z
          .string()
          .min(1, { message: '路由名称为必填项' })
          .max(100, { message: '路由名称长度不能超过10' });
      },
      // 类型为菜单时显示
      show: (values) => values.type !== 3,
      triggerFields: ['type', 'path'],
    },
    fieldName: 'name',
    label: '路由名称',
  },
  {
    component: 'Input',
    componentProps: (model) => {
      return {
        // 为链接时组件disabled
        disabled: model.external,
      };
    },
    defaultValue: '',
    dependencies: {
      rules: (model) => {
        // 非链接时为必填项
        if (model.path && !/^https?:\/\//.test(model.path)) {
          return z
            .string()
            .min(1, { message: '非链接时必填组件路径' })
            .refine((val) => !val.startsWith('/') && !val.endsWith('/'), {
              message: '组件路径开头/末尾不需要带/',
            });
        }
        // 为链接时非必填
        return z.string().optional();
      },
      // 类型为菜单时显示
      show: (values) => values.type === 2,
      triggerFields: ['type', 'path'],
    },
    fieldName: 'component',
    help: '填写./src/views下的组件路径, 如system/menu/index',
    label: '组件路径',
  },
  {
    component: 'Input',
    defaultValue: '',
    dependencies: {
      rules: () => {
        return z.string().optional();
      },
      // 类型为菜单时显示
      show: (values) => values.type !== 3,
      triggerFields: ['type'],
    },
    fieldName: 'redirect',
    label: '重定向地址',
  },
  {
    component: 'Switch',
    defaultValue: false,
    dependencies: {
      // 类型不为按钮时显示
      show: (values) => values.type !== 3,
      triggerFields: ['type'],
    },
    fieldName: 'external',
    help: '外链为http(s)://开头\n 选择否时, 使用iframe从内部打开页面, 否则新窗口打开',
    label: '是否外链',
  },
  {
    component: 'Switch',
    defaultValue: false,
    dependencies: {
      // 类型不为按钮时显示
      show: (values) => values.type !== 3,
      triggerFields: ['type'],
    },
    fieldName: 'hidden',
    label: '是否隐藏',
  },
  {
    component: 'RadioGroup',
    componentProps: {
      buttonStyle: 'solid',
      options: GENERAL_STATUS_OPTIONS,
      optionType: 'button',
    },
    defaultValue: 1,
    dependencies: {
      // 类型不为按钮时显示
      show: (values) => values.type !== 3,
      triggerFields: ['type'],
    },
    fieldName: 'status',
    label: '菜单状态',
  },
  {
    component: 'Input',
    dependencies: {
      // 类型为菜单/按钮时显示
      show: (values) => values.type !== 1,
      triggerFields: ['type'],
    },
    fieldName: 'permission',
    help: `权限标识，要求格式为：xx:xx:xx`,
    label: '权限标识',
  },
  {
    component: 'Input',
    componentProps: (model) => ({
      // 为链接时组件disabled
      disabled: model.isFrame === '0',
      placeholder: '必须为json字符串格式',
    }),
    dependencies: {
      // 类型为菜单时显示
      show: (values) => values.type === 2,
      triggerFields: ['type'],
    },
    fieldName: 'query',
    help: 'vue-router中的query属性\n 如{"name": "xxx", "age": 16}',
    label: '路由参数',
  },
  {
    component: 'Switch',
    defaultValue: false,
    dependencies: {
      // 类型为菜单时显示
      show: (values) => values.type === 2,
      triggerFields: ['type'],
    },
    fieldName: 'cache',
    help: '路由的keepAlive属性',
    label: '是否缓存',
  },
  {
    component: 'Textarea',
    defaultValue: '',
    dependencies: {
      // 类型为菜单时显示
      show: (values) => values.type !== 3,
      triggerFields: ['type'],
    },
    fieldName: 'meta',
    help: '扩展配置，json格式',
    label: '扩展配置',
  },
];
