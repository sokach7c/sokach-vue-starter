import { setupWangEditor } from './init';
// 导入函数用于默认导出
import { useWangEditor } from './use-wang-editor';

// 导入样式
import '@wangeditor/editor/dist/css/style.css';

// 导出配置函数
export { getEditorConfig, getToolbarConfig, setupWangEditor } from './init';

// 导出组件
export { default as RichTextEditor } from './rich-text-editor.vue';

// 导出类型
export type {
  DocumentEditorInstance,
  EditorInstance,
  EditorMode,
  IDomEditor,
  IEditorConfig,
  IToolbarConfig,
  UseWangEditorOptions,
  UseWangEditorReturn,
  WangEditorSetupOptions,
} from './types';

// 导出 Hook
export { useWangEditor } from './use-wang-editor';

// 默认导出
export default {
  FormEditor: () => import('./rich-text-editor.vue'),
  useWangEditor,
  setupWangEditor,
};
