<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';

// Reactive state
const showSettings = ref(false);
const videoElement = ref(null);
const stream = ref<any>(null);
const showGrid = ref(false);
const showSwitchCamera = ref(false);
const isCapturing = ref(false);
const flashActive = ref(false);
const facingMode = ref('environment');
const selectedResolution = ref('1920x1080');
const capturedPhoto = defineModel<string>('modelValue');

// Initialize camera
const initCamera = async () => {
  try {
    const constraints = {
      video: {
        facingMode: facingMode.value,
        width: { ideal: 1920 },
        height: { ideal: 1080 },
      },
    };

    stream.value = await navigator.mediaDevices.getUserMedia(constraints);
    if (videoElement.value) {
      videoElement.value.srcObject = stream.value;
    }
  } catch (error) {
    console.error('Error accessing camera:', error);
  }
};

// Switch camera
const switchCamera = async () => {
  facingMode.value = facingMode.value === 'user' ? 'environment' : 'user';
  if (stream.value) {
    stream.value.getTracks().forEach((track) => track.stop());
  }
  await initCamera();
};

// Capture photo
const capturePhoto = async () => {
  if (!videoElement.value || isCapturing.value) return;

  isCapturing.value = true;

  // Capture the photo
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');

  canvas.width = videoElement.value.videoWidth;
  canvas.height = videoElement.value.videoHeight;

  if (facingMode.value === 'user') {
    context.scale(-1, 1);
    context.translate(-canvas.width, 0);
  }

  context.drawImage(videoElement.value, 0, 0);

  const photoDataUrl = canvas.toDataURL('image/jpeg', 0.9);
  capturedPhoto.value = photoDataUrl;

  isCapturing.value = false;
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
</script>

<template>
  <div class="flex h-full w-full">
    <!-- Main Camera View -->
    <div class="relative flex-1 overflow-hidden">
      <!-- Camera Preview -->
      <div class="bg-card relative h-full w-full">
        <video
          ref="videoElement"
          autoplay
          muted
          playsinline
          class="h-full w-full object-cover"
          :class="{ 'scale-x-[-1]': facingMode === 'user' }"
        ></video>

        <!-- Grid Overlay -->
        <div
          v-if="showGrid"
          class="pointer-events-none absolute inset-0"
          style="
            background-image:
              linear-gradient(
                to right,
                rgb(255 255 255 / 30%) 1px,
                transparent 1px
              ),
              linear-gradient(
                to bottom,
                rgb(255 255 255 / 30%) 1px,
                transparent 1px
              );
            background-size: 33.333% 33.333%;
          "
        ></div>

        <!-- Camera Controls Overlay -->
        <div
          class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6"
        >
          <div class="flex items-center justify-between">
            <div></div>

            <!-- Capture Button -->
            <button
              @click="capturePhoto"
              :disabled="isCapturing"
              class="relative h-20 w-20 rounded-full border-4 border-white bg-white/20 backdrop-blur-sm transition-all duration-200 hover:bg-white/30 disabled:opacity-50"
              :class="{ 'scale-95': isCapturing }"
            >
              <div class="absolute inset-2 rounded-full bg-white"></div>
              <div
                v-if="isCapturing"
                class="border-primary absolute inset-0 animate-pulse rounded-full border-4"
              ></div>
            </button>

            <!-- Camera Switch -->
            <button
              v-if="showSwitchCamera"
              @click="switchCamera"
              class="flex h-12 w-12 items-center justify-center rounded-xl border border-white/30 bg-white/20 backdrop-blur-sm transition-colors hover:bg-white/30"
            >
              <VbenIcon icon="rotate-ccw" class="h-6 w-6 text-white" />
            </button>
            <div v-else></div>
          </div>
        </div>

        <!-- Flash Indicator -->
        <div
          v-if="flashActive"
          class="absolute inset-0 animate-pulse bg-white"
          style="animation-duration: 0.1s; animation-iteration-count: 1"
        ></div>
      </div>
    </div>

    <!-- Settings Sidebar -->
    <div
      v-if="showSettings"
      class="bg-card border-border w-80 overflow-y-auto border-l p-6"
    >
      <div class="space-y-6">
        <div>
          <h3 class="mb-4 text-lg font-semibold">拍摄</h3>

          <!-- Resolution -->
          <div class="mt-2 space-y-2">
            <label class="text-sm font-medium">分辨率</label>
            <select
              v-model="selectedResolution"
              class="bg-input border-border text-foreground w-full rounded-lg border p-2"
            >
              <option value="1920x1080">1920 × 1080 (Full HD)</option>
              <option value="1280x720">1280 × 720 (HD)</option>
              <option value="640x480">640 × 480 (SD)</option>
            </select>
          </div>

          <!-- Timer -->
          <div class="mt-2 space-y-2">
            <label class="text-sm font-medium">九宫格</label>
            <select
              v-model="showGrid"
              class="bg-input border-border text-foreground w-full rounded-lg border p-2"
            >
              <option :value="false">Off</option>
              <option :value="true">On</option>
            </select>
          </div>
        </div>

        <!-- Photo Count -->
        <div class="bg-muted rounded-lg p-4">
          <div class="flex items-center justify-between">
            <span class="text-sm font-medium">拍摄结果</span>
          </div>
        </div>
        <div class="rounded-md" v-if="capturedPhoto">
          <img :src="capturedPhoto" alt="拍摄照片" class="object-cover" />
        </div>
      </div>
    </div>
  </div>
</template>
