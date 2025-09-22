<script lang="ts" setup>
import { computed, watch } from 'vue';
import { useRouter } from 'vue-router';

import { useWatermark } from '@vben/hooks';
import { BookOpenText } from '@vben/icons';
import { BasicLayout, UserDropdown } from '@vben/layouts';
import { preferences } from '@vben/preferences';
import { useUserStore } from '@vben/stores';

import { useAuthStore } from '#/store';

const router = useRouter();
const userStore = useUserStore();
const authStore = useAuthStore();
const { destroyWatermark, updateWatermark } = useWatermark();

const menus = computed(() => [
  {
    handler: () => {
      router.push('/user/center');
    },
    icon: BookOpenText,
    text: '个人中心',
  },
]);

const avatar = computed(() => {
  return userStore.userInfo?.avatar ?? preferences.app.defaultAvatar;
});

async function handleLogout() {
  await authStore.logout(false);
}

// 折叠侧边栏
// function handleCollapse() {
//   updatePreferences({ sidebar: { collapsed: !preferences.sidebar.collapsed } });
// }

watch(
  () => preferences.app.watermark,
  async (enable) => {
    if (enable) {
      await updateWatermark({
        content: `${userStore.userInfo?.username} - ${userStore.userInfo?.nickname}`,
      });
    } else {
      destroyWatermark();
    }
  },
  {
    immediate: true,
  },
);
</script>

<template>
  <BasicLayout @clear-preferences-and-logout="handleLogout">
    <!-- 侧边栏插槽 -->
    <!-- <template #side-header> </template> -->
    <!-- <template #side-footer> </template> -->

    <!-- 顶栏插槽：header-left-xxx, 大于 50 放在右边，小于 50 放在左边 -->
    <template #header-left-5> </template>

    <!-- 用户下拉菜单插槽 -->
    <template #user-dropdown>
      <UserDropdown
        :avatar
        :menus
        :text="userStore.userInfo?.nickname"
        description="ann.vben@gmail.com"
        tag-text="Pro"
        @logout="handleLogout"
      />
    </template>
  </BasicLayout>
</template>
