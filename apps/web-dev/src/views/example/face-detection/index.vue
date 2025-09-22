<script setup lang="ts">
import { ref } from 'vue';

import { FaceDetection } from '@sokach/face-detection';
import { Card, message } from 'ant-design-vue';

const face = ref();

// 处理识别成功回调
const handleSuccess = (data: any) => {
  face.value = data.capturedImage;
  // 识别成功，更新图片显示
};

// 处理错误回调
const handleError = (error: Error) => {
  console.error('人脸识别错误:', error);
  message.error(`识别失败: ${error.message}`);
};
</script>

<template>
  <div class="p-4">
    <Card title="人脸识别示例">
      <div class="flex flex-col gap-4">
        <FaceDetection
          :min-face-count="1"
          :min-detection-confidence="0.8"
          :width="640"
          :height="480"
          @success="handleSuccess"
          @error="handleError"
        />
        <div class="flex flex-col pt-4">
          <span class="pb-4 text-xl font-bold">识别结果</span>
          <img :src="face" alt="" style="width: 320px; height: 240px" />
        </div>
      </div>
    </Card>
  </div>
</template>

<style scoped></style>
