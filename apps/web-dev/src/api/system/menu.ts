import { requestClient } from '../request';

enum Api {
  list = '/system/menu/list',
  page = '/system/menu/page',
  root = '/system/menu',
}

export namespace Menu {
  // 请求参数
  export interface Req {
    cache?: boolean;
    component?: string;
    external?: boolean;
    hidden?: boolean;
    icon?: string;
    meta?: string;
    name?: string;
    parentId?: ID;
    path?: string;
    permission?: string;
    query?: string;
    redirect?: string;
    sort?: number;
    status?: number;
    title?: string;
    type?: number;
  }

  // 响应
  export type Res = BaseEntity &
    Req & {
      id: ID;
    };

  // 查询参数
  export interface Query {
    name?: string;
  }
}

/** @desc 获取菜单列表 */
export function getMenuList(query: Menu.Query = {}) {
  return requestClient.get<Menu.Res[]>(Api.list, { params: query });
}

/** @desc 根据ID获取菜单 */
export function getMenuById(id: ID) {
  return requestClient.get<Menu.Res>(`${Api.root}/${id}`);
}

/** @desc 创建菜单 */
export function createMenu(data: Menu.Req) {
  return requestClient.postWithMsg(Api.root, data);
}

/** @desc 更新菜单 */
export function updateMenu(id: ID, data: Menu.Req) {
  return requestClient.putWithMsg(`${Api.root}/${id}`, data);
}

/** @desc 删除菜单 */
export function deleteMenu(id: ID) {
  return requestClient.deleteWithMsg(`${Api.root}/${id}`);
}
