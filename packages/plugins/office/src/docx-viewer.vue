<script setup lang="ts">
import VueOfficeDocx from '@vue-office/docx';

const props = defineProps<{
  errorHandler?: (event: any) => void;
  options?: any;
  renderedHandler?: (event: any) => void;
  requestOptions?: any;
  src: ArrayBuffer | Blob | string;
}>();
</script>

<template>
  <VueOfficeDocx v-bind="props" />
</template>
