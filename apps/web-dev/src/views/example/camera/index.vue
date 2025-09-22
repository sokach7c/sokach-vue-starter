<script setup lang="ts">
import { ref } from 'vue';

import { Camera } from '@sokach/components';
import { Card } from 'ant-design-vue';

const photo = ref('');
</script>

<template>
  <div class="p-4">
    <Card title="摄像头">
      <div class="h-[600px]">
        <Camera v-model="photo" />
      </div>
      <div class="mt-4" v-if="photo">
        <span class="font-bold">拍照结果</span>
        <img :src="photo" alt="拍照结果" class="h-[400px] w-auto" />
      </div>
    </Card>
  </div>
</template>

<style scoped></style>
