<script setup lang="ts">
import type { CSSProperties } from 'vue';

import { computed } from 'vue';

import { useNamespace } from '@vben-core/composables';

interface Props {
  /**
   * 高度
   */
  height: number;
}

const props = withDefaults(defineProps<Props>(), {});

const { b } = useNamespace('layout-tabbar');

const style = computed((): CSSProperties => {
  const { height } = props;
  return {
    height: `${height}px`,
  };
});
</script>

<template>
  <section
    :style="style"
    :class="b()"
    class="border-border bg-background flex w-full border-b transition-all"
  >
    <slot></slot>
  </section>
</template>
