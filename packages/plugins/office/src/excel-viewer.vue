<script setup lang="ts">
import VueOfficeExcel from '@vue-office/excel';

const props = defineProps<{
  errorHandler?: (event: any) => void;
  options?: any;
  renderedHandler?: (event: any) => void;
  requestOptions?: any;
  src: ArrayBuffer | Blob | string;
}>();
</script>

<template>
  <VueOfficeExcel v-bind="props" />
</template>
