import type { VxeUIExport } from '@sokach/vxe-table';

import { Button } from 'ant-design-vue';

/**
 * CellButton 单元格渲染器，用于显示按钮
 * 使用：cellRender: { name: 'CellButton' },
 *
 *
 * @param vxeUI vxe-table 实例
 */
export function setupCellButton(vxeUI: VxeUIExport) {
  vxeUI.renderer.add('CellButton', {
    renderTableDefault(renderOpts) {
      const { props } = renderOpts;
      const finalProps = {
        type: 'primary',
        ...props,
      };
      return <Button v-bind={finalProps}>{finalProps?.text}</Button>;
    },
  });
}
