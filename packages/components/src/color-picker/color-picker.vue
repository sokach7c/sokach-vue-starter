<script setup lang="ts">
import type { ColorPickerProps as Vue3ColorPickerProps } from 'vue3-colorpicker';

import { ColorPicker } from 'vue3-colorpicker';

export type ColorPickerProps = Vue3ColorPickerProps & {
  showColorValue?: boolean;
};

const props = withDefaults(defineProps<ColorPickerProps>(), {
  shape: 'square',
  format: 'hex',
  showColorValue: true,
});

const val = defineModel<string>('value');
const gradientColor = defineModel<string>('gradientColor');
</script>

<template>
  <div class="flex items-center gap-2">
    <ColorPicker
      v-bind="props"
      v-model:pure-color="val"
      v-model:gradient-color="gradientColor"
    />
    <span v-if="props.showColorValue">{{ val }}</span>
  </div>
</template>

<style scoped></style>
