import type { VxeUIExport } from '@sokach/vxe-table';

import { CheckOutlined, CloseOutlined } from '@ant-design/icons-vue';
import { Switch } from 'ant-design-vue';

/**
 * CellSwitch 单元格渲染器，用于显示开关
 * 使用：cellRender: { name: 'CellSwitch' },
 *
 *
 * @param vxeUI vxe-table 实例
 */
export function setupCellSwitch(vxeUI: VxeUIExport) {
  vxeUI.renderer.add('CellSwitch', {
    renderTableDefault({ attrs, props }, { column, row }) {
      const loadingKey = `__loading_${column.field}`;
      const finallyProps = {
        checkedChildren: <CheckOutlined />,
        checkedValue: true,
        unCheckedChildren: <CloseOutlined />,
        unCheckedValue: false,
        ...props,
        checked: row[column.field],
        loading: row[loadingKey] ?? false,
        'onUpdate:checked': onChange,
      };
      async function onChange(newVal: any) {
        row[loadingKey] = true;
        try {
          const result = await attrs?.beforeChange?.(newVal, row);
          if (result !== false) {
            row[column.field] = newVal;
          }
        } finally {
          row[loadingKey] = false;
        }
      }
      return <Switch {...finallyProps} />;
    },
  });
}
