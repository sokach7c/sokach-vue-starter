import type { VxeTableGridOptions } from '@sokach/vxe-table';

import { setupVbenVxeTable, useVbenVxeGrid } from '@sokach/vxe-table';

import { setupVxeTableCell } from '#/components/table';

import { useVbenForm } from './form';

setupVbenVxeTable({
  configVxeTable: (vxeUI) => {
    vxeUI.setConfig({
      grid: {
        // 表头对齐
        headerAlign: 'center',
        // 内容文字对齐
        align: 'center',
        // 圆角按钮
        round: true,
        // 表格尺寸
        size: 'small',
        // 斑马纹
        stripe: true,
        // 边框
        border: true,
        // 高度
        height: 'auto',
        formConfig: {
          // 全局禁用vxe-table的表单配置，使用formOptions
          enabled: false,
        },
        keepSource: true,
        minHeight: 300,
        proxyConfig: {
          autoLoad: true,
          response: {
            result: 'records',
            total: 'total',
            list: '',
          },
        },
        /**
         * 开启虚拟滚动
         * 数据量小可以选择关闭
         * 如果遇到样式问题(空白、错位 滚动等)可以选择关闭虚拟滚动
         */
        scrollY: {
          enabled: true,
          gt: 0,
        },
        // 通用树结构配置
        treeConfig: {
          parentField: 'parentId',
          rowField: 'id',
          // 自动转换为tree 由vxe处理 无需手动转换
          transform: true,
          // 刷新接口后 记录展开行的情况
          reserve: true,
        },
        // 溢出展示形式
        showOverflow: true,
        pagerConfig: {
          // 默认条数
          pageSize: 10,
          // 分页可选条数
          pageSizes: [10, 20, 30, 40, 50],
        },
        rowConfig: {
          keyField: 'id',
          // 鼠标移入行显示 hover 样式
          isHover: true,
          // 点击行高亮
          isCurrent: false,
        },
        columnConfig: {
          // 可拖拽列宽
          resizable: true,
        },
        // 右上角工具栏
        toolbarConfig: {
          // 自定义列
          custom: true,
          // 最大化
          zoom: true,
          // 刷新
          refresh: true,
        },
      } as VxeTableGridOptions,
    });

    /**
     * 解决vxeTable在热更新时可能会出错的问题
     */
    vxeUI.renderer.forEach((_item, key) => {
      if (key.startsWith('Cell')) {
        vxeUI.renderer.delete(key);
      }
    });

    /**
     * 自定义 cell 配置注册
     */
    setupVxeTableCell(vxeUI);

    // 这里可以自行扩展 vxe-table 的全局配置，比如自定义格式化
    // vxeUI.formats.add
  },
  useVbenForm,
});

export { useVbenVxeGrid };

export type * from '@sokach/vxe-table';
