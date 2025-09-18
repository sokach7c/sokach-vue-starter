import type { IEditorConfig, IToolbarConfig } from '@wangeditor/editor';

import type { WangEditorSetupOptions } from './types';

import '@wangeditor/editor/dist/css/style.css';

// 默认编辑器配置
let defaultEditorConfig: Partial<IEditorConfig> = {
  placeholder: '请输入内容...',
  autoFocus: false,
  scroll: true,
  maxLength: 50_000,
};

// 默认工具栏配置
let defaultToolbarConfig: Partial<IToolbarConfig> = {
  excludeKeys: [
    'group-video',
    'group-image',
    'fullScreen',
    'insertTable',
    'codeBlock',
  ],
  insertKeys: {
    index: 22,
    keys: ['insertTable'],
  },
};

/**
 * 初始化编辑器全局配置
 */
export function setupWangEditor(options: WangEditorSetupOptions) {
  if (options.editorConfig) {
    defaultEditorConfig = { ...defaultEditorConfig, ...options.editorConfig };
  }
  if (options.toolbarConfig) {
    defaultToolbarConfig = {
      ...defaultToolbarConfig,
      ...options.toolbarConfig,
    };
  }
}

/**
 * 获取合并后的编辑器配置
 */
export function getEditorConfig(customConfig?: Partial<IEditorConfig>) {
  return { ...defaultEditorConfig, ...customConfig };
}

/**
 * 获取合并后的工具栏配置
 */
export function getToolbarConfig(customConfig?: Partial<IToolbarConfig>) {
  return { ...defaultToolbarConfig, ...customConfig };
}
