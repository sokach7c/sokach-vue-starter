import { requestClient } from '#/api/request';

enum Api {
  list = '/system/role/list',
  root = '/system/role',
}

// 角色类型
export namespace Role {
  export interface Req {
    name: string;
    code: string;
    description: string;
    sort: number;
    builtIn: boolean;
    menuCheckStrictly: boolean;
    status: number;
  }
  export type Res = Req & {
    createTime: string;
    createUser: number;
    id: ID;
    updateTime: string;
    updateUser: number;
  };

  export interface Query {
    name?: string;
    code?: string;
    description?: string;
    sort?: number;
    builtIn?: boolean;
    menuCheckStrictly?: boolean;
    status?: number;
  }
}

/** @desc 分页查询角色列表 */
export function queryRolePage(query: PageQuery & Role.Query) {
  return requestClient.get<Role.Res[]>(Api.root, { params: query });
}

/** @desc 查询角色列表 */
export function queryRoleList(query: Role.Query = {}) {
  return requestClient.get<Role.Res[]>(Api.list, { params: query });
}

/** @desc 通过ID查询角色 */
export function queryRoleById(id: ID) {
  return requestClient.get<Role.Res>(`${Api.root}/${id}`);
}

/** @desc 新增角色 */
export function createRole(data: Partial<Role.Req>) {
  return requestClient.postWithMsg(Api.root, data);
}

/** @desc 修改角色 */
export function updateRole(id: ID, data: Partial<Role.Req>) {
  return requestClient.putWithMsg(`${Api.root}/${id}`, data);
}

/** @desc 批量删除角色 */
export function deleteRoleByIds(ids: IDS) {
  return requestClient.deleteWithMsg(`${Api.root}/${ids}`);
}
