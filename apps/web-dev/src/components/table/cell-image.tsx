import type { VxeUIExport } from '@sokach/vxe-table';

import { Image } from 'ant-design-vue';

/**
 * CellImage 单元格渲染器，用于显示图片
 * 使用：cellRender: { name: 'CellImage' },
 *
 *
 * @param vxeUI vxe-table 实例
 */
export function setupCellImage(vxeUI: VxeUIExport) {
  vxeUI.renderer.add('CellImage', {
    renderTableDefault({ props, attrs }, params) {
      const { column, row } = params;
      return <Image src={row[column.field]} {...attrs} {...props} />;
    },
  });
}
