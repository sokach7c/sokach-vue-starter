import type { VxeUIExport } from '@sokach/vxe-table';

import { get } from '@vben/utils';

import { objectOmit } from '@vueuse/core';
import { Tag } from 'ant-design-vue';

/**
 * CellTag 单元格渲染器，用于显示图片
 * 使用：cellRender: { name: 'CellTag' },
 *
 *
 * @param vxeUI vxe-table 实例
 */
export function setupCellTag(vxeUI: VxeUIExport) {
  vxeUI.renderer.add('CellTag', {
    renderTableDefault({ options, props }, { column, row }) {
      const value = get(row, column.field);
      const tagOptions = options ?? [
        { label: '是', value: true, color: 'blue' },
        { label: '否', value: false, color: 'red' },
      ];
      const tagItem = tagOptions.find((item) => item.value === value);
      return (
        <Tag {...props} {...objectOmit(tagItem ?? {}, ['label', 'icon'])}>
          {tagItem?.label}
        </Tag>
      );
    },
  });
}
