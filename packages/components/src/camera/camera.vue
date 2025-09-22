<script setup lang="ts">
import { nextTick, onMounted, onUnmounted, readonly, ref, watch } from 'vue';

import { Button } from '@vben-core/shadcn-ui';

// Reactive state
const videoElement = ref<HTMLVideoElement | null>(null);
const canvasElement = ref<HTMLCanvasElement | null>(null);
const stream = ref<MediaStream | null>(null);
const isCapturing = ref(false);
const capturedPhoto = defineModel<string>('modelValue');
const isCameraInitialized = ref(false);
const showCanvas = ref(false);

// Initialize camera
const initCamera = async () => {
  try {
    // Stop any existing stream first
    if (stream.value) {
      stream.value.getTracks().forEach((track) => track.stop());
    }

    const constraints = {
      video: {
        facingMode: 'user',
        width: { ideal: 1920 },
        height: { ideal: 1080 },
      },
    };

    stream.value = await navigator.mediaDevices.getUserMedia(constraints);
    if (videoElement.value) {
      videoElement.value.srcObject = stream.value;
      videoElement.value.addEventListener('loadedmetadata', () => {
        isCameraInitialized.value = true;
      });
    }
  } catch (error) {
    console.error('Error accessing camera:', error);
    isCameraInitialized.value = false;
  }
};

// 绘制图片到canvas的专用函数
const drawImageToCanvas = async (
  imageSource: HTMLVideoElement | string,
): Promise<void> => {
  if (!canvasElement.value) {
    throw new Error('Canvas元素不可用');
  }

  const canvas = canvasElement.value;
  const context = canvas.getContext('2d');

  if (!context) {
    throw new Error('无法获取canvas上下文');
  }

  // 保存当前画布状态
  context.save();

  if (typeof imageSource === 'string') {
    // 绘制外部图片
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'anonymous'; // 处理跨域问题

      img.addEventListener('load', () => {
        try {
          // 设置canvas尺寸为图片尺寸
          canvas.width = img.naturalWidth;
          canvas.height = img.naturalHeight;

          // 清除画布
          context.clearRect(0, 0, canvas.width, canvas.height);

          // 绘制图片
          context.drawImage(img, 0, 0);

          // 恢复画布状态
          context.restore();
          resolve();
        } catch (error) {
          context.restore();
          reject(error);
        }
      });

      img.addEventListener('error', () => {
        context.restore();
        reject(new Error('图片加载失败'));
      });

      img.src = imageSource;
    });
  } else {
    // 绘制视频帧
    if (!videoElement.value) {
      throw new Error('视频元素不可用');
    }

    canvas.width = videoElement.value.videoWidth;
    canvas.height = videoElement.value.videoHeight;

    // 前置摄像头需要水平翻转以匹配预览效果
    context.scale(-1, 1);
    context.translate(-canvas.width, 0);

    // 清除画布
    context.clearRect(0, 0, canvas.width, canvas.height);

    // 绘制视频帧
    context.drawImage(videoElement.value, 0, 0);

    // 恢复画布状态
    context.restore();
  }
};

// 拍照功能
const capturePhoto = async () => {
  if (
    !videoElement.value ||
    !canvasElement.value ||
    isCapturing.value ||
    !isCameraInitialized.value
  ) {
    return;
  }

  isCapturing.value = true;

  try {
    // 从视频中拍照
    await drawImageToCanvas(videoElement.value);

    // 生成图片数据
    const photoDataUrl = canvasElement.value.toDataURL('image/jpeg', 0.9);
    capturedPhoto.value = photoDataUrl;

    // 显示canvas
    showCanvas.value = true;
  } catch (error) {
    console.error('拍照失败:', error);
  } finally {
    isCapturing.value = false;
  }
};

// 重拍逻辑
const retakePhoto = () => {
  capturedPhoto.value = '';
  showCanvas.value = false;
};

// Lifecycle
onMounted(() => {
  initCamera();
});

onUnmounted(() => {
  if (stream.value) {
    stream.value.getTracks().forEach((track) => track.stop());
  }
});

// 监听v-model值的变化，自动绘制到canvas
watch(
  capturedPhoto,
  async (newValue, oldValue) => {
    // 避免循环触发和处理空值
    if (newValue === oldValue || isCapturing.value) {
      return;
    }

    try {
      if (newValue && newValue.trim() !== '') {
        // 有新图片传入，绘制到canvas
        await nextTick(); // 等待DOM更新
        await drawImageToCanvas(newValue);
        showCanvas.value = true;
      } else {
        // 清空图片，显示视频预览
        showCanvas.value = false;
      }
    } catch (error) {
      console.error('绘制外部图片失败:', error);
      // 绘制失败时回退到视频预览
      showCanvas.value = false;
    }
  },
  { immediate: true },
);

// 暴露方法给父组件
defineExpose({
  capturePhoto,
  retakePhoto,
  drawImageToCanvas,
  // 暴露状态供父组件查询
  isCameraInitialized: readonly(isCameraInitialized),
  isCapturing: readonly(isCapturing),
  showCanvas: readonly(showCanvas),
});
</script>

<template>
  <div class="relative h-full w-full">
    <!-- 视频预览 -->
    <video
      ref="videoElement"
      autoplay
      muted
      playsinline
      class="h-full w-full scale-x-[-1] object-cover"
      :class="{ hidden: showCanvas }"
    ></video>

    <!-- 拍照后的canvas显示 -->
    <canvas
      ref="canvasElement"
      class="h-full w-full object-cover"
      :class="{ hidden: !showCanvas }"
    ></canvas>

    <!-- 加载状态 -->
    <div
      v-if="!isCameraInitialized"
      class="absolute inset-0 flex items-center justify-center"
    >
      <div class="text-center">
        <div class="mb-2 text-sm text-gray-600">初始化摄像头...</div>
      </div>
    </div>

    <!-- 拍照按钮区域 -->
    <slot name="action">
      <div class="flex items-center gap-1 pt-2">
        <!-- 拍照按钮 - 只在没有图片时显示 -->
        <Button
          v-if="!capturedPhoto || capturedPhoto.trim() === ''"
          @click.prevent="capturePhoto"
          size="sm"
          :disabled="isCapturing || !isCameraInitialized"
          :loading="isCapturing"
          class="bg-blue-600 px-6 text-white hover:bg-blue-700"
        >
          {{ isCapturing ? '拍摄中...' : '拍照' }}
        </Button>

        <!-- 重拍按钮 - 只有拍了照片或有外部图片后才显示 -->
        <Button
          v-if="capturedPhoto && capturedPhoto.trim() !== ''"
          @click.prevent="retakePhoto"
          variant="outline"
          size="sm"
          class="bg-white/80 backdrop-blur-sm"
        >
          重拍
        </Button>
      </div>
    </slot>
  </div>
</template>
