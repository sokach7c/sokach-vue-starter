import type { BasicUserInfo } from '@vben-core/typings';

/** 用户信息 */
interface UserInfo extends BasicUserInfo {
  /**
   * 首页地址
   */
  homePath: string;
  /**
   * 用户邮箱
   */
  email?: string;

  /**
   * 用户手机号
   */
  phone?: string;

  /**
   * 用户性别
   */
  gender?: number;

  /**
   * 用户状态
   */
  status?: number;

  /**
   * 用户创建时间
   */
  createTime?: string;

  /**
   * 描述
   */
  description?: string;

  /**
   * 是否内建数据
   */
  builtIn?: boolean;

  /**
   * accessToken
   */
  accessToken: string;
}

export type { UserInfo };
