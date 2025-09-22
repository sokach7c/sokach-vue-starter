<script setup lang="ts">
import type { Results } from '@mediapipe/face_detection';

import {
  computed,
  onBeforeUnmount,
  onMounted,
  readonly,
  ref,
  watch,
} from 'vue';

import { VbenIcon } from '@vben/icons';

import { Camera } from '@mediapipe/camera_utils';
import { FaceDetection } from '@mediapipe/face_detection';

interface Props {
  // 是否自动开始
  autoStart?: boolean;
  // 边界框样式
  boundingBoxStyle?: {
    lineWidth?: number;
    strokeStyle?: string;
  };
  height?: number;
  // 最小检测置信度
  minDetectionConfidence?: number;
  // 最小识别人脸数
  minFaceCount?: number;
  // 检测模型类型
  model?: 'full' | 'short';
  // 模型地址
  modelUrl?: string;
  // 是否显示边界框
  showBoundingBox?: boolean;
  // 画布尺寸
  width?: number;
}

interface DetectionResult {
  // 拍照的图片数据
  capturedImage?: string;
  faceCount: number;
  faceDetected: boolean;
  // 人脸边界框信息
  faces: Array<{
    boundingBox: {
      height: number;
      width: number;
      x: number;
      y: number;
    };
    confidence: number;
  }>;
  results: Results;
  sourceImage?: string;
}

interface Emits {
  // 检测结果回调
  (e: 'detection', data: DetectionResult): void;
  // 错误回调
  (e: 'error', error: Error): void;
  // 加载状态变化
  (e: 'loading', isLoading: boolean): void;
  // 相机状态变化
  (
    e: 'cameraStatus',
    status: 'error' | 'running' | 'starting' | 'stopped',
  ): void;
  // 识别成功回调（人脸数达到最小要求时触发）
  (e: 'success', data: DetectionResult): void;
}

const props = withDefaults(defineProps<Props>(), {
  model: 'short',
  minDetectionConfidence: 0.9,
  minFaceCount: 10,
  width: 640,
  height: 480,
  showBoundingBox: true,
  boundingBoxStyle: () => ({
    strokeStyle: '#00ff00',
    lineWidth: 2,
  }),
  autoStart: true,
  // modelUrl: 'https://cdn.jsdelivr.net/npm/@mediapipe/face_detection',
  modelUrl: '/model',
});

const emit = defineEmits<Emits>();

// 响应式状态
const videoRef = ref<HTMLVideoElement>();
const canvasRef = ref<HTMLCanvasElement>();
const isLoading = ref(false);
const error = ref<null | string>(null);
const isInitialized = ref(false);
const detectionCount = ref(0);
const cameraStatus = ref<'error' | 'running' | 'starting' | 'stopped'>(
  'stopped',
);
const lastDetectionResult = ref<DetectionResult | null>(null);
const isCaptured = ref(false);
const capturedImageData = ref<string>('');
const enableCapture = ref(false);

// MediaPipe 实例
let camera: Camera | null = null;
let faceDetection: FaceDetection | null = null;

// 计算属性
const containerStyle = computed(() => ({
  width: `${props.width}px`,
  height: `${props.height}px`,
}));

// 初始化人脸检测
const initializeFaceDetection = async (): Promise<void> => {
  try {
    isLoading.value = true;
    emit('loading', true);
    error.value = null;

    faceDetection = new FaceDetection({
      locateFile: (file: string) => `${props.modelUrl}/${file}`,
    });

    faceDetection.setOptions({
      model: props.model,
      minDetectionConfidence: props.minDetectionConfidence,
    });

    setTimeout(() => {
      enableCapture.value = true;
    }, 3000);

    faceDetection.onResults(onResults);

    isInitialized.value = true;
  } catch (error_) {
    const errorObj =
      error_ instanceof Error ? error_ : new Error('初始化人脸检测失败');
    error.value = errorObj.message;
    emit('error', errorObj);
    console.error('人脸检测初始化失败:', error_);
  } finally {
    isLoading.value = false;
    emit('loading', false);
  }
};

// 处理检测结果
const onResults = async (results: Results): Promise<void> => {
  try {
    const canvas = canvasRef.value;
    const ctx = canvas?.getContext('2d');

    if (!canvas || !ctx) {
      return;
    }

    // 清除画布并绘制视频帧
    ctx.save();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(results.image, 0, 0, canvas.width, canvas.height);

    const faceDetected = results.detections && results.detections.length > 0;
    const faceCount = faceDetected ? results.detections.length : 0;

    // 更新检测计数
    detectionCount.value = faceCount;

    // 解析人脸信息
    const faces = faceDetected
      ? results.detections.map((detection) => {
          const bbox = detection.boundingBox;
          return {
            boundingBox: {
              x: bbox.xCenter * canvas.width - (bbox.width * canvas.width) / 2,
              y:
                bbox.yCenter * canvas.height -
                (bbox.height * canvas.height) / 2,
              width: bbox.width * canvas.width,
              height: bbox.height * canvas.height,
            },
            confidence: props.minDetectionConfidence || 0.9,
          };
        })
      : [];

    // 绘制检测结果
    if (faceDetected && props.showBoundingBox) {
      drawBoundingBoxes(ctx, results.detections, canvas);
    }

    ctx.restore();

    // 准备检测结果数据
    const detectionData: DetectionResult = {
      results,
      faceDetected,
      faceCount,
      faces,
    };

    // 保存最后的检测结果
    lastDetectionResult.value = detectionData;

    // 发送检测结果
    emit('detection', detectionData);

    // 检查是否达到最小人脸数要求并触发拍照
    if (
      faceCount >= props.minFaceCount &&
      !isCaptured.value &&
      enableCapture.value &&
      cameraStatus.value === 'running'
    ) {
      await captureImage();
    }
  } catch (error_) {
    const errorObj =
      error_ instanceof Error ? error_ : new Error('处理检测结果时出错');
    console.error('处理检测结果失败:', error_);
    emit('error', errorObj);
  }
};

// 绘制边界框
const drawBoundingBoxes = (
  ctx: CanvasRenderingContext2D,
  detections: any[],
  canvas: HTMLCanvasElement,
): void => {
  ctx.strokeStyle = props.boundingBoxStyle.strokeStyle || '#00ff00';
  ctx.lineWidth = props.boundingBoxStyle.lineWidth || 2;

  for (const detection of detections) {
    const bbox = detection.boundingBox;
    const x = bbox.xCenter * canvas.width - (bbox.width * canvas.width) / 2;
    const y = bbox.yCenter * canvas.height - (bbox.height * canvas.height) / 2;
    const width = bbox.width * canvas.width;
    const height = bbox.height * canvas.height;

    ctx.strokeRect(x, y, width, height);

    // 显示置信度
    if (detection.V && detection.V.length > 0) {
      const confidence = Math.round(detection.V[0].ga * 100);
      ctx.fillStyle = props.boundingBoxStyle.strokeStyle || '#00ff00';
      ctx.font = '14px Arial';
      ctx.fillText(`${confidence}%`, x, y - 5);
    }
  }
};

// 初始化相机
const initializeCamera = async (): Promise<void> => {
  try {
    if (!faceDetection) {
      throw new Error('人脸检测未初始化');
    }

    // 等待视频元素准备就绪
    await new Promise<void>((resolve) => {
      const checkVideo = () => {
        if (videoRef.value) {
          resolve();
        } else {
          setTimeout(checkVideo, 50);
        }
      };
      checkVideo();
    });

    if (!videoRef.value) {
      throw new Error('视频元素未初始化');
    }

    cameraStatus.value = 'starting';
    emit('cameraStatus', 'starting');

    camera = new Camera(videoRef.value, {
      onFrame: async () => {
        if (faceDetection && videoRef.value) {
          await faceDetection.send({ image: videoRef.value });
        }
      },
      width: props.width,
      height: props.height,
    });

    await camera.start();
    cameraStatus.value = 'running';
    emit('cameraStatus', 'running');
  } catch (error_) {
    cameraStatus.value = 'error';
    emit('cameraStatus', 'error');
    const errorObj =
      error_ instanceof Error ? error_ : new Error('初始化相机失败');
    error.value = errorObj.message;
    emit('error', errorObj);
    console.error('相机初始化失败:', error_);
  }
};

// 启动检测
const startDetection = async (): Promise<void> => {
  try {
    if (!isInitialized.value) {
      await initializeFaceDetection();
    }

    if (isInitialized.value && cameraStatus.value === 'stopped') {
      await initializeCamera();
    }
  } catch (error_) {
    console.error('启动检测失败:', error_);
  }
};

// 停止检测
const stopDetection = (): void => {
  try {
    if (camera) {
      camera.stop();
      camera = null;
    }
    cameraStatus.value = 'stopped';
    emit('cameraStatus', 'stopped');
  } catch (error_) {
    console.error('停止检测失败:', error_);
  }
};

// 拍照功能
const captureImage = async (): Promise<void> => {
  try {
    const video = videoRef.value;
    if (!video) {
      throw new Error('视频元素未初始化');
    }

    // 创建一个临时画布来捕获纯净的视频帧
    const tempCanvas = document.createElement('canvas');
    const tempCtx = tempCanvas.getContext('2d');

    if (!tempCtx) {
      throw new Error('无法创建画布上下文');
    }

    // 设置画布尺寸与视频一致
    tempCanvas.width = props.width;
    tempCanvas.height = props.height;

    // 绘制当前视频帧到临时画布（不包含边界框）
    tempCtx.drawImage(video, 0, 0, tempCanvas.width, tempCanvas.height);

    // 获取纯净的图片数据
    const imageData = tempCanvas.toDataURL('image/png');
    capturedImageData.value = imageData;
    isCaptured.value = true;

    // 停止检测
    stopDetection();

    // 更新结果数据
    if (lastDetectionResult.value) {
      const resultWithImage = {
        ...lastDetectionResult.value,
        capturedImage: imageData,
        sourceImage: imageData, // 添加原始图片数据
      };

      // 触发成功回调
      emit('success', resultWithImage);
    }
  } catch (error_) {
    const errorObj = error_ instanceof Error ? error_ : new Error('拍照失败');
    console.error('拍照失败:', error_);
    emit('error', errorObj);
  }
};

// 重置检测状态（用于重新开始检测）
const resetDetection = (): void => {
  detectionCount.value = 0;
  lastDetectionResult.value = null;
  isCaptured.value = false;
  capturedImageData.value = '';
};

// 切换检测状态
const toggleDetection = async (): Promise<void> => {
  if (cameraStatus.value === 'running') {
    stopDetection();
  } else {
    await startDetection();
  }
};

// 监听配置变化
watch([() => props.model, () => props.minDetectionConfidence], async () => {
  if (isInitialized.value && faceDetection) {
    faceDetection.setOptions({
      model: props.model,
      minDetectionConfidence: props.minDetectionConfidence,
    });
  }
});

// 组件挂载
onMounted(async () => {
  try {
    // 等待DOM更新完成
    await new Promise((resolve) => setTimeout(resolve, 100));

    const canvas = canvasRef.value;
    if (canvas) {
      canvas.width = props.width;
      canvas.height = props.height;
    }

    if (props.autoStart) {
      await startDetection();
    }
  } catch (error_) {
    console.error('组件挂载失败:', error_);
  }
});

// 组件卸载
onBeforeUnmount(() => {
  stopDetection();
  if (faceDetection) {
    faceDetection.close();
    faceDetection = null;
  }
});

// 暴露方法给父组件
defineExpose({
  startDetection,
  stopDetection,
  toggleDetection,
  resetDetection,
  captureImage,
  isLoading: readonly(isLoading),
  error: readonly(error),
  detectionCount: readonly(detectionCount),
  cameraStatus: readonly(cameraStatus),
  lastDetectionResult: readonly(lastDetectionResult),
  isCaptured: readonly(isCaptured),
  capturedImageData: readonly(capturedImageData),
});
</script>

<template>
  <div
    class="relative overflow-hidden rounded-lg bg-gray-100"
    :style="containerStyle"
  >
    <!-- 加载状态 -->
    <div
      v-if="isLoading"
      class="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black/80 text-white backdrop-blur-sm"
    >
      <VbenIcon icon="camera" class="mb-4 h-8 w-8 animate-pulse" />
      <p class="text-lg font-medium">正在初始化人脸检测...</p>
    </div>

    <!-- 错误状态 -->
    <div
      v-else-if="error"
      class="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black/80 text-white backdrop-blur-sm"
    >
      <div class="max-w-md px-6 text-center">
        <div
          class="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-500/20"
        >
          <span class="text-2xl">⚠️</span>
        </div>
        <p class="mb-4 text-lg font-medium">错误: {{ error }}</p>
        <button
          @click="startDetection"
          class="rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition-colors duration-200 hover:bg-blue-700"
        >
          重试
        </button>
      </div>
    </div>

    <!-- 视频和画布 -->
    <div v-else class="relative h-full w-full">
      <video
        ref="videoRef"
        class="absolute inset-0 h-full w-full object-cover"
        :class="{ hidden: isCaptured }"
        autoplay
        muted
        playsinline
      ></video>
      <canvas
        ref="canvasRef"
        class="absolute inset-0 z-10 h-full w-full"
        :class="{ hidden: isCaptured }"
      ></canvas>

      <!-- 拍照后的图片显示 -->
      <div v-if="isCaptured" class="relative h-full w-full">
        <img
          :src="capturedImageData"
          alt="Captured face"
          class="h-full w-full object-cover"
        />
        <!-- 成功遮罩 -->
        <div
          class="absolute inset-0 z-20 flex items-center justify-center bg-black/20"
        >
          <div
            class="animate-in fade-in zoom-in-95 mx-2 max-w-sm rounded-2xl bg-black/30 p-8 text-center text-white backdrop-blur-md duration-500"
          >
            <div
              class="mx-auto flex h-16 w-16 animate-pulse items-center justify-center rounded-full"
            >
              <VbenIcon
                icon="line-md:loading-loop"
                class="h-8 w-8 text-white"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 保留必要的隐藏类 */
.hidden {
  display: none;
}
</style>
