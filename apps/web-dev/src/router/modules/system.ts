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
      {
        name: 'SystemMenu',
        path: '/system/menu',
        component: () => import('#/views/system/menu/index.vue'),
        meta: {
          affixTab: true,
          icon: 'mdi:menu',
          title: '菜单管理',
        },
      },
      {
        name: 'SystemRole',
        path: '/system/role',
        component: () => import('#/views/system/role/index.vue'),
        meta: {
          affixTab: true,
          icon: 'mdi:account-group',
          title: '角色管理',
        },
      },
    ],
  },
];

export default routes;
