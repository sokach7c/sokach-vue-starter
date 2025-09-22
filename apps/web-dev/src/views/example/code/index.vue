<script setup lang="ts">
import { ref } from 'vue';

import { CodeMirror } from '@sokach/codemirror';
import { Card } from 'ant-design-vue';

const code = ref(`function hello() {
  console.log('Hello, CodeMirror!');
}`);

const handleChange = (value: string) => {
  console.warn('代码变化:', value);
};
</script>

<template>
  <div class="p-4">
    <Card title="代码编辑器">
      <CodeMirror
        v-model="code"
        placeholder="请输入代码..."
        language="javascript"
        @change="handleChange"
        class="h-[500px] overflow-auto"
      />
    </Card>
  </div>
</template>
