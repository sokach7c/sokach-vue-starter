<script setup lang="ts">
import VueOfficePdf from '@vue-office/pdf';

const props = defineProps<{
  errorHandler?: (event: any) => void;
  options?: any;
  renderedHandler?: (event: any) => void;
  requestOptions?: any;
  src: ArrayBuffer | Blob | string;
}>();
</script>

<template>
  <VueOfficePdf v-bind="props" />
</template>
