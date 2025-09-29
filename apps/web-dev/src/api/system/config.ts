import {requestClient} from '#/api/request';

enum Api {
    list = '/system/config/list',
    root = '/system/config',
}

// 配置类型
export namespace Config {
    export interface Req {
        category: string;
        name: string;
        code: string;
        value: string;
        defaultValue: string;
        description: string;
    }
    export type Res =  Req & {
        id: ID;
        createUser: number;
        createTime: string;
        updateUser: number;
        updateTime: string;
    };

    export interface Query {
        category?: string;
        name?: string;
        code?: string;
        value?: string;
        defaultValue?: string;
        description?: string;
    }
}

/** @desc 分页查询配置列表 */
export function queryConfigPage(query: PageQuery & Config.Query) {
    return requestClient.get<Config.Res[]>(Api.root, { params: query });
}

/** @desc 查询配置列表 */
export function queryConfigList(query: Config.Query = {}) {
    return requestClient.get<Config.Res[]>(Api.list, { params: query });
}

/** @desc 通过ID查询配置 */
export function queryConfigById(id: ID) {
    return requestClient.get<Config.Res>(`${Api.root}/${id}`);
}

/** @desc 新增配置 */
export function createConfig(data: Partial<Config.Req>) {
    return requestClient.postWithMsg(Api.root, data);
}

/** @desc 修改配置 */
export function updateConfig(id: ID, data: Partial<Config.Req>) {
    return requestClient.putWithMsg(`${Api.root}/${id}`, data);
}

/** @desc 批量删除配置 */
export function deleteConfigByIds(ids: IDS) {
    return requestClient.deleteWithMsg(`${Api.root}/${ids}`);
}


