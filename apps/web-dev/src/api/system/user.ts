import { requestClient } from '#/api/request';

enum Api {
  list = '/system/user/list',
  root = '/system/user',
}

// 用户类型
export namespace User {
  export interface Req {
    username: string;
    nickname: string;
    password: string;
    gender: number;
    email: string;
    phone: string;
    avatar: string;
    description: string;
    status: number;
    builtIn: boolean;
  }
  export type Res = Req & {
    createTime: string;
    createUser: number;
    id: ID;
    updateTime: string;
    updateUser: number;
  };

  export interface Query {
    username?: string;
    nickname?: string;
    password?: string;
    gender?: number;
    email?: string;
    phone?: string;
    avatar?: string;
    description?: string;
    status?: number;
    builtIn?: boolean;
  }
}

/** @desc 分页查询用户列表 */
export function queryUserPage(query: PageQuery & User.Query) {
  return requestClient.get<User.Res[]>(Api.root, { params: query });
}

/** @desc 查询用户列表 */
export function queryUserList(query: User.Query = {}) {
  return requestClient.get<User.Res[]>(Api.list, { params: query });
}

/** @desc 通过ID查询用户 */
export function queryUserById(id: ID) {
  return requestClient.get<User.Res>(`${Api.root}/${id}`);
}

/** @desc 新增用户 */
export function createUser(data: Partial<User.Req>) {
  return requestClient.postWithMsg(Api.root, data);
}

/** @desc 修改用户 */
export function updateUser(id: ID, data: Partial<User.Req>) {
  return requestClient.putWithMsg(`${Api.root}/${id}`, data);
}

/** @desc 批量删除用户 */
export function deleteUserByIds(ids: IDS) {
  return requestClient.deleteWithMsg(`${Api.root}/${ids}`);
}
