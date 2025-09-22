import type {
  IDomEditor,
  IEditorConfig,
  IToolbarConfig,
} from '@wangeditor/editor';

/**
 * 编辑器模式
 */
export type EditorMode = 'default' | 'simple';

/**
 * 编辑器基础属性
 */
export interface RichTextEditorProps {
  disabled?: boolean;
  editorConfig?: Partial<IEditorConfig>;
  height?: number | string;
  maxLength?: number;
  mode?: EditorMode;
  modelValue?: string;
  placeholder?: string;
  readonly?: boolean;
  toolbarConfig?: Partial<IToolbarConfig>;
}

/**
 * 编辑器基础事件
 */
export interface RichTextEditorEmits {
  (e: 'update:modelValue', value: string): void;
  (e: 'created', editor: IDomEditor): void;
}

/**
 * 编辑器实例方法
 */
export interface EditorInstance {
  blur: () => void;
  clear: () => void;
  disable: () => void;
  editor: IDomEditor | null;
  enable: () => void;
  focus: () => void;
  getHtml: () => string;
  getText: () => string;
  setHtml: (html: string) => void;
}

/**
 * 文档编辑器实例方法
 */
export interface DocumentEditorInstance extends EditorInstance {
  save: () => void;
  startAutoSave: () => void;
  stopAutoSave: () => void;
}

/**
 * 编辑器配置选项
 */
export interface WangEditorSetupOptions {
  editorConfig?: Partial<IEditorConfig>;
  toolbarConfig?: Partial<IToolbarConfig>;
}

/**
 * Hook 选项
 */
export interface UseWangEditorOptions {
  disabled?: boolean;
  editorConfig?: Partial<IEditorConfig>;
  height?: number | string;
  mode?: EditorMode;
  modelValue?: string;
  placeholder?: string;
  toolbarConfig?: Partial<IToolbarConfig>;
}

/**
 * Hook 返回值
 */
export interface UseWangEditorReturn {
  blur: () => void;
  clear: () => void;
  disable: () => void;
  editorConfig: Partial<IEditorConfig>;
  editorRef: ReturnType<typeof import('vue').shallowRef<IDomEditor | null>>;
  enable: () => void;
  focus: () => void;
  getHtml: () => string;
  getText: () => string;
  handleCreated: (editor: IDomEditor) => void;
  handleDestroyed: () => void;
  setHtml: (html: string) => void;
  toolbarConfig: Partial<IToolbarConfig>;
}

// 导出常用类型
export type {
  IDomEditor,
  IEditorConfig,
  IToolbarConfig,
  IUploadConfig,
} from '@wangeditor/editor';
