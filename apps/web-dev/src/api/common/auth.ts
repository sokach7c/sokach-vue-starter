import type { UserInfo } from '@vben/types';

import { baseRequestClient, requestClient } from '#/api/request';

enum Api {
  login = '/auth/login',
  logout = '/auth/logout',
  menus = '/auth/menus',
  userInfo = '/auth/user/info',
}

export namespace Auth {
  // 用户登录
  export interface LoginReq {
    password?: string;
    username?: string;
    uuid?: string;
    code?: string;
  }

  // 登录接口返回值
  export interface LoginRes {
    accessToken: string;
  }

  // 获取用户的
  export interface MenuItemRes {
    title?: string;
    name?: string;
  }
}

/** @desc 登录 */
export async function login(data: Auth.LoginReq) {
  return requestClient.post<Auth.LoginRes>(Api.login, data);
}

/** @desc 退出登录 */
export async function logout() {
  return baseRequestClient.post(Api.logout, {
    withCredentials: true,
  });
}

/** @desc 获取用户信息 */
export async function getUserInfo() {
  return requestClient.get<UserInfo>(Api.userInfo);
}

/** @desc 获取用户所有菜单 */
export async function getUserMenus() {
  return requestClient.get<Auth.MenuItemRes[]>(Api.menus);
}
