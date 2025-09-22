import { requestClient } from '../request';

enum Api {
  list = '/system/dict-item/list',
  root = '/system/dict-item',
}

/**
 * 类型
 */
export namespace DictItem {
  /**
   * 请求参数
   */
  export interface Req {
    color: string;
    description: string;
    dictId: ID;
    label: string;
    sort: number;
    status: number;
    value: string;
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
 * 分页查询字典项列表
 */
export function queryDictItemPage(query: DictItem.Query & PageQuery) {
  return requestClient.get<DictItem.Res[]>(Api.root, { params: query });
}

/**
 * 查询字典项列表
 */
export function queryDictItemList(query: DictItem.Query) {
  return requestClient.get<DictItem.Res[]>(Api.list, { params: query });
}

/**
 * 根据ID查询字典项
 */
export function queryDictItemById(id: ID) {
  return requestClient.get<DictItem.Res>(`${Api.root}/${id}`);
}

/**
 * 创建字典项
 */
export function createDictItem(data: DictItem.Req) {
  return requestClient.postWithMsg(Api.root, data);
}

/**
 * 更新字典项
 */
export function updateDictItem(id: ID, data: DictItem.Req) {
  return requestClient.putWithMsg(`${Api.root}/${id}`, data);
}

/**
 * 删除字典项
 */
export function deleteDictItemByIds(ids: IDS) {
  return requestClient.deleteWithMsg(`${Api.root}/${ids}`);
}
