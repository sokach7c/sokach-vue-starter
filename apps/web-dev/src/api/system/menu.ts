import { requestClient } from '#/api/request';

enum Api {
  list = '/system/menu/list',
  root = '/system/menu',
}

// 菜单类型
export namespace Menu {
  export interface Req {
    title: string;
    parentId: number;
    type: number;
    path: string;
    name: string;
    component: string;
    redirect: string;
    icon: string;
    external: boolean;
    cache: boolean;
    hidden: boolean;
    permission: string;
    sort: number;
    status: number;
    query: string;
    meta: string;
  }
  export type Res = Req & {
    createTime: string;
    createUser: number;
    id: ID;
    updateTime: string;
    updateUser: number;
  };

  export interface Query {
    title?: string;
    parentId?: number;
    type?: number;
    path?: string;
    name?: string;
    component?: string;
    redirect?: string;
    icon?: string;
    external?: boolean;
    cache?: boolean;
    hidden?: boolean;
    permission?: string;
    sort?: number;
    status?: number;
    query?: string;
    meta?: string;
  }

  export interface Tree {
    id: ID;
    title: string;
    icon?: string;
    parentId: ID;
    type: number;
    children: Tree[];
  }
}

/** @desc 分页查询菜单列表 */
export function queryMenuPage(query: Menu.Query & PageQuery) {
  return requestClient.get<Menu.Res[]>(Api.root, { params: query });
}

/** @desc 查询菜单列表 */
export function queryMenuList(query: Menu.Query = {}) {
  return requestClient.get<Menu.Res[]>(Api.list, { params: query });
}

/** @desc 通过ID查询菜单 */
export function queryMenuById(id: ID) {
  return requestClient.get<Menu.Res>(`${Api.root}/${id}`);
}

/** @desc 新增菜单 */
export function createMenu(data: Partial<Menu.Req>) {
  return requestClient.postWithMsg(Api.root, data);
}

/** @desc 修改菜单 */
export function updateMenu(id: ID, data: Partial<Menu.Req>) {
  return requestClient.putWithMsg(`${Api.root}/${id}`, data);
}

/** @desc 批量删除菜单 */
export function deleteMenuByIds(ids: IDS) {
  return requestClient.deleteWithMsg(`${Api.root}/${ids}`);
}
