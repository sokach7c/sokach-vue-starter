import {requestClient} from '#/api/request';

enum Api {
    list = '/system/dict/list',
    root = '/system/dict',
}

// 字典类型
export namespace Dict {
    export interface Req {
        name: string;
        code: string;
        description: string;
        builtIn: boolean;
    }
    export type Res =  Req & {
        id: ID;
        createUser: number;
        createTime: string;
        updateUser: number;
        updateTime: string;
    };

    export interface Query {
        name?: string;
        code?: string;
        description?: string;
        builtIn?: boolean;
    }
}

/** @desc 分页查询字典列表 */
export function queryDictPage(query: PageQuery & Dict.Query) {
    return requestClient.get<Dict.Res[]>(Api.root, { params: query });
}

/** @desc 查询字典列表 */
export function queryDictList(query: Dict.Query = {}) {
    return requestClient.get<Dict.Res[]>(Api.list, { params: query });
}

/** @desc 通过ID查询字典 */
export function queryDictById(id: ID) {
    return requestClient.get<Dict.Res>(`${Api.root}/${id}`);
}

/** @desc 新增字典 */
export function createDict(data: Partial<Dict.Req>) {
    return requestClient.postWithMsg(Api.root, data);
}

/** @desc 修改字典 */
export function updateDict(id: ID, data: Partial<Dict.Req>) {
    return requestClient.putWithMsg(`${Api.root}/${id}`, data);
}

/** @desc 批量删除字典 */
export function deleteDictByIds(ids: IDS) {
    return requestClient.deleteWithMsg(`${Api.root}/${ids}`);
}


