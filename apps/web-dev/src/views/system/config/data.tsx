import type {FormSchemaGetter} from '#/adapter/form';
import type {VxeGridProps} from '#/adapter/vxe-table';

export const NAME = '配置';

export const querySchema: FormSchemaGetter = () => [
    {
        component: 'Input',
        fieldName: 'category',
        label: '类别',
    },
    {
        component: 'Input',
        fieldName: 'name',
        label: '名称',
    },
    {
        component: 'Input',
        fieldName: 'code',
        label: '键',
    },
    {
        component: 'Input',
        fieldName: 'value',
        label: '值',
    },
    {
        component: 'Input',
        fieldName: 'defaultValue',
        label: '默认值',
    },
    {
        component: 'Input',
        fieldName: 'description',
        label: '描述',
    },
];

export const columns: VxeGridProps['columns'] = [
        {
            field: 'category',
            title: '类别',
        },
        {
            field: 'name',
            title: '名称',
        },
        {
            field: 'code',
            title: '键',
        },
        {
            field: 'value',
            title: '值',
        },
        {
            field: 'defaultValue',
            title: '默认值',
        },
        {
            field: 'description',
            title: '描述',
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
            fieldName: 'category',
            label: '类别',
            rules: 'required',
        },
        {
            component: 'Input',
            fieldName: 'name',
            label: '名称',
            rules: 'required',
        },
        {
            component: 'Input',
            fieldName: 'code',
            label: '键',
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
            fieldName: 'defaultValue',
            label: '默认值',
            rules: 'required',
        },
        {
            component: 'Input',
            fieldName: 'description',
            label: '描述',
            rules: 'required',
        },
];

