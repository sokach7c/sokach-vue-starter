import type { VxeUIExport } from '@sokach/vxe-table';

/**
 * CellLink 单元格渲染器，用于显示链接
 * 使用：cellRender: { name: 'CellLink' },
 *
 *
 * @param vxeUI vxe-table 实例
 */
export function setupCellLink(vxeUI: VxeUIExport) {
  vxeUI.renderer.add('CellLink', {
    renderTableDefault(renderOpts) {
      const { props } = renderOpts;
      const finalProps = {
        href: 'javascript:void(0)',
        ...props,
      };
      return <a v-bind={finalProps}>{props?.text}</a>;
    },
  });
}
