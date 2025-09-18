import type {
  IDomEditor,
  IEditorConfig,
  IToolbarConfig,
} from '@wangeditor/editor';

import type { UseWangEditorOptions, UseWangEditorReturn } from './types';

import { onBeforeUnmount, shallowRef } from 'vue';

/**
 * WangEditor 通用逻辑 Hook
 */
export function useWangEditor(
  options: UseWangEditorOptions = {},
  emit?: (event: string, ...args: any[]) => void,
): UseWangEditorReturn {
  const {
    editorConfig: customEditorConfig = {},
    toolbarConfig: customToolbarConfig = {},
    modelValue = '',
    placeholder = '请输入内容...',
    disabled = false,
  } = options;

  // 编辑器实例，必须用 shallowRef
  const editorRef = shallowRef<IDomEditor | null>(null);

  // 编辑器配置
  const editorConfig: Partial<IEditorConfig> = {
    placeholder,
    readOnly: disabled,
    autoFocus: false,
    scroll: true,
    ...customEditorConfig,
  };

  // 工具栏配置
  const toolbarConfig: Partial<IToolbarConfig> = {
    ...customToolbarConfig,
  };

  // 处理编辑器创建
  const handleCreated = (editor: IDomEditor) => {
    editorRef.value = editor;

    // 设置初始内容
    if (modelValue) {
      editor.setHtml(modelValue);
    }

    // 监听内容变化
    editor.on('changed', () => {
      const html = editor.getHtml();
      emit?.('update:modelValue', html);
      emit?.('change', html);
    });

    // 监听失焦事件
    editor.on('blur', () => {
      emit?.('blur', editor);
    });

    // 监听聚焦事件
    editor.on('focus', () => {
      emit?.('focus', editor);
    });

    emit?.('created', editor);
  };

  // 处理编辑器销毁
  const handleDestroyed = () => {
    const editor = editorRef.value;
    if (editor) {
      editor.destroy();
      editorRef.value = null;
    }
  };

  // 获取 HTML 内容
  const getHtml = (): string => {
    return editorRef.value?.getHtml() || '';
  };

  // 获取纯文本内容
  const getText = (): string => {
    return editorRef.value?.getText() || '';
  };

  // 设置 HTML 内容
  const setHtml = (html: string) => {
    editorRef.value?.setHtml(html);
  };

  // 清空内容
  const clear = () => {
    editorRef.value?.clear();
  };

  // 聚焦编辑器
  const focus = () => {
    editorRef.value?.focus();
  };

  // 失焦编辑器
  const blur = () => {
    editorRef.value?.blur();
  };

  // 禁用编辑器
  const disable = () => {
    editorRef.value?.disable();
  };

  // 启用编辑器
  const enable = () => {
    editorRef.value?.enable();
  };

  // 组件卸载时销毁编辑器
  onBeforeUnmount(() => {
    handleDestroyed();
  });

  return {
    editorRef,
    toolbarConfig,
    editorConfig,
    handleCreated,
    handleDestroyed,
    getHtml,
    getText,
    setHtml,
    clear,
    focus,
    blur,
    disable,
    enable,
  };
}
