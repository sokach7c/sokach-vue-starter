import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    meta: {
      icon: 'mdi:settings',
      order: -1,
      title: '系统管理',
    },
    name: 'System',
    path: '/system',
    children: [
      {
        name: 'SystemDict',
        path: '/system/dict',
        component: () => import('#/views/system/dict/index.vue'),
        meta: {
          affixTab: true,
          icon: 'mdi:dictionary',
          title: '字典管理',
        },
      },
    ],
  },
];

export default routes;
