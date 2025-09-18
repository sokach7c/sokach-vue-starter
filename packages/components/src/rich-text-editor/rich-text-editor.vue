<script setup lang="ts">
import type { RichTextEditorEmits, RichTextEditorProps } from './types';

import { computed, watch } from 'vue';

import { Editor, Toolbar } from '@wangeditor/editor-for-vue';

import { getEditorConfig, getToolbarConfig } from './init';
import { useWangEditor } from './use-wang-editor';

const props = withDefaults(defineProps<RichTextEditorProps>(), {
  modelValue: '',
  placeholder: '请输入内容...',
  height: '300px',
  disabled: false,
  readonly: false,
  mode: 'simple',
  maxLength: 5000,
  editorConfig: () => ({}),
  toolbarConfig: () => ({}),
});

const emit = defineEmits<RichTextEditorEmits>();

// 计算编辑器配置
const computedEditorConfig = computed(() => {
  return getEditorConfig({
    placeholder: props.placeholder,
    readOnly: props.readonly || props.disabled,
    maxLength: props.maxLength,
    ...props.editorConfig,
  });
});

// 计算工具栏配置
const computedToolbarConfig = computed(() => {
  return getToolbarConfig(props.toolbarConfig);
});

// 使用编辑器 Hook
const {
  editorRef,
  handleCreated,
  getHtml,
  getText,
  setHtml,
  clear,
  focus,
  blur,
  disable,
  enable,
} = useWangEditor(
  {
    editorConfig: computedEditorConfig.value,
    toolbarConfig: computedToolbarConfig.value,
    modelValue: props.modelValue,
    height: props.height,
    placeholder: props.placeholder,
    disabled: props.disabled || props.readonly,
  },
  (event, args) => emit(event as any, args),
);

// 监听 modelValue 变化
watch(
  () => props.modelValue,
  (newValue) => {
    const currentHtml = getHtml();
    if (newValue !== currentHtml) {
      setHtml(newValue);
    }
  },
);

// 监听 disabled 状态变化
watch(
  () => props.disabled || props.readonly,
  (disabled) => {
    if (disabled) {
      disable();
    } else {
      enable();
    }
  },
);

// 计算编辑器样式
const editorStyle = computed(() => {
  const heightValue =
    typeof props.height === 'number' ? `${props.height}px` : props.height;
  return {
    height: heightValue,
    'overflow-y': 'hidden',
  };
});

// 暴露组件方法
defineExpose({
  getHtml,
  getText,
  setHtml,
  clear,
  focus,
  blur,
  disable,
  enable,
  editor: editorRef,
});
</script>

<template>
  <div class="form-editor">
    <div class="form-editor__container">
      <Toolbar
        class="form-editor__toolbar"
        :editor="editorRef || undefined"
        :default-config="computedToolbarConfig"
        :mode="mode"
      />
      <Editor
        :style="editorStyle"
        :model-value="modelValue"
        :default-config="computedEditorConfig"
        :mode="mode"
        @on-created="handleCreated"
        @update:model-value="
          (value: string) => emit('update:modelValue', value)
        "
      />
    </div>
  </div>
</template>

<style scoped>
.form-editor {
  width: 100%;
}

.form-editor__container {
  overflow: hidden;
  border: 1px solid #d9d9d9;
  border-radius: 6px;
  transition: border-color 0.2s;
}

.form-editor__container:hover {
  border-color: hsl(var(--primary) / 60%);
}

.form-editor__container:focus-within {
  border-color: hsl(var(--primary) / 60%);
  box-shadow: 0 0 0 2px hsl(var(--primary) / 20%);
}

.form-editor__toolbar {
  background-color: #fafafa;
  border-bottom: 1px solid #e8e8e8;
}

:deep(.w-e-text-container) {
  background-color: #fff;
}

:deep(.w-e-text-placeholder) {
  color: #bfbfbf;
}

/* 只读状态样式 */
.form-editor__container:has(.w-e-text-container[contenteditable='false']) {
  background-color: #f5f5f5;
  border-color: #d9d9d9;
}

.form-editor__container:has(
    .w-e-text-container[contenteditable='false']
  ):hover {
  border-color: #d9d9d9;
}

.form-editor__container:has(.w-e-text-container[contenteditable='false'])
  .form-editor__toolbar {
  background-color: #f0f0f0;
}
</style>
