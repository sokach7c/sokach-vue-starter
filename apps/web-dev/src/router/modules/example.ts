import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    meta: {
      icon: 'mdi:feature-highlight',
      keepAlive: true,
      order: 1000,
      title: '功能演示',
    },
    name: 'Example',
    path: '/example',
    children: [
      {
        meta: {
          icon: 'mdi:form-select',
          title: '表单示例',
        },
        name: 'ExampleForm',
        path: '/example/form',
        component: () => import('#/views/example/form/index.vue'),
      },
      {
        meta: {
          icon: 'mdi:map-minus',
          title: '高德地图',
        },
        name: 'ExampleAmap',
        path: '/example/amap',
        component: () => import('#/views/example/amap/index.vue'),
      },
      {
        meta: {
          icon: 'mdi:video-4k-box',
          title: '视频播放器',
        },
        name: 'ExampleArtPlayer',
        path: '/example/art-player',
        component: () => import('#/views/example/video/index.vue'),
      },
      {
        meta: {
          icon: 'mdi:web-camera',
          title: '摄像头',
        },
        name: 'ExampleCamera',
        path: '/example/camera',
        component: () => import('#/views/example/camera/index.vue'),
      },
      {
        meta: {
          icon: 'mdi:face-recognition',
          title: '人脸识别',
        },
        name: 'ExampleFaceDetection',
        path: '/example/face-detection',
        component: () => import('#/views/example/face-detection/index.vue'),
      },
      {
        meta: {
          icon: 'mdi:code',
          title: '代码编辑器',
        },
        name: 'ExampleCodeEditor',
        path: '/example/code-editor',
        component: () => import('#/views/example/code/index.vue'),
      },
      {
        meta: {
          icon: 'mdi:microsoft-office',
          title: 'office 预览',
        },
        name: 'ExampleOffice',
        path: '/example/office',
        component: () => import('#/views/example/office/index.vue'),
      },
      {
        meta: {
          icon: 'mdi:file-arrow-up-down',
          title: '文件上传',
        },
        name: 'ExampleUpload',
        path: '/example/upload',
        component: () => import('#/views/example/upload/index.vue'),
      },
    ],
  },
];

export default routes;
