import type { Preferences } from '@vben-core/preferences';
import type { DeepPartial } from '@vben-core/typings';

/**
 * 如果你想所有的app都使用相同的默认偏好设置，你可以在这里定义
 * 而不是去修改 @vben-core/preferences 中的默认偏好设置
 * @param preferences
 * @returns
 */
function defineOverridesPreferences(preferences: DeepPartial<Preferences>) {
  return {
    app: {
      // 不需要refresh token 由后端处理
      enableRefreshToken: false,
      // 这里可以设置默认头像 url链接或vite导入的图片链接
      defaultAvatar: '/img/avatar.jpg',
    },
    footer: {
      // 不显示footer
      enable: false,
    },
    tabbar: {
      // 标签tab 持久化 关闭
      persist: false,
      // 标签页样式
      styleType: 'plain',
    },
    theme: {
      //  默认用日间模式
      mode: 'light',
      // 深色侧边栏
      semiDarkSidebar: false,
    },
    // 设置默认的logo
    logo: {
      enable: true,
      source: '/img/logo.png',
    },
    sidebar: {
      // 固定侧边栏按钮
      fixedButton: false,
      // 收缩按钮
      collapsedButton: true,
    },
    widget: {
      // 搜索
      globalSearch: false,
      // 多语言
      languageToggle: false,
      // 锁屏
      lockScreen: false,
      // 主题切换
      themeToggle: false,
      // 全屏
      fullscreen: false,
      // 通知
      notification: false,
    },
    ...preferences,
  } as Preferences;
}

export { defineOverridesPreferences };

export * from '@vben-core/preferences';
