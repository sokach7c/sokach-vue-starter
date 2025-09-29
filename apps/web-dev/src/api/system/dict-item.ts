import {requestClient} from '#/api/request';

enum Api {
    list = '/system/dict-item/list',
    root = '/system/dict-item',
}

// 字典项类型
export namespace DictItem {
    export interface Req {
        label: string;
        value: string;
        color: string;
        sort: number;
        description: string;
        status: number;
        dictId: number;
    }
    export type Res =  Req & {
        id: ID;
        createUser: number;
        createTime: string;
        updateUser: number;
        updateTime: string;
    };

    export interface Query {
        label?: string;
        value?: string;
        color?: string;
        sort?: number;
        description?: string;
        status?: number;
        dictId?: number;
    }
}

/** @desc 分页查询字典项列表 */
export function queryDictItemPage(query: PageQuery & DictItem.Query) {
    return requestClient.get<DictItem.Res[]>(Api.root, { params: query });
}

/** @desc 查询字典项列表 */
export function queryDictItemList(query: DictItem.Query = {}) {
    return requestClient.get<DictItem.Res[]>(Api.list, { params: query });
}

/** @desc 通过ID查询字典项 */
export function queryDictItemById(id: ID) {
    return requestClient.get<DictItem.Res>(`${Api.root}/${id}`);
}

/** @desc 新增字典项 */
export function createDictItem(data: Partial<DictItem.Req>) {
    return requestClient.postWithMsg(Api.root, data);
}

/** @desc 修改字典项 */
export function updateDictItem(id: ID, data: Partial<DictItem.Req>) {
    return requestClient.putWithMsg(`${Api.root}/${id}`, data);
}

/** @desc 批量删除字典项 */
export function deleteDictItemByIds(ids: IDS) {
    return requestClient.deleteWithMsg(`${Api.root}/${ids}`);
}


