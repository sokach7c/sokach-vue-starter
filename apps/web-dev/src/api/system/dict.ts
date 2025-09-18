import type { DictItem } from '@sokach/api';

import { requestClient } from '@sokach/utils';

enum Api {
  list = '/system/dict/list',
  root = '/system/dict',
}

/**
 * 类型
 */
export namespace Dict {
  /**
   * 请求参数
   */
  export interface Req {
    builtIn: boolean;
    code: string;
    description: string;
    name: string;
  }

  /**
   * 响应
   */
  export type Res = BaseEntity &
    Req & {
      id: ID;
    };

  /**
   * 查询参数
   */
  export interface Query {
    code?: string;
    name?: string;
  }
}

/**
 * 分页查询字典列表
 */
export function queryDictPage(query: Dict.Query & PageQuery) {
  return requestClient.get<Dict.Res[]>(Api.root, { params: query });
}

/**
 * 查询字典列表
 */
export function queryDictList(query: Dict.Query = {}) {
  return requestClient.get<Dict.Res[]>(Api.list, { params: query });
}

/**
 * 根据ID查询字典
 */
export function queryDictById(id: ID) {
  return requestClient.get<Dict.Res>(`${Api.root}/${id}`);
}

/**
 * 创建字典
 */
export function createDict(data: Dict.Req) {
  return requestClient.postWithMsg(Api.root, data);
}

/**
 * 更新字典
 */
export function updateDict(id: ID, data: Dict.Req) {
  return requestClient.putWithMsg(`${Api.root}/${id}`, data);
}

/**
 * 删除字典
 */
export function deleteDictByIds(ids: IDS) {
  return requestClient.deleteWithMsg(`${Api.root}/${ids}`);
}

/**
 * 根据字典编码查询字典
 */
export function getDictByCode(code: string) {
  return requestClient.get<DictItem.Res[]>(`${Api.root}/q/${code}`);
}
