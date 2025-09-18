type ID = number | string;
type IDS = (number | string)[];

interface BaseEntity {
  createTime?: string;
  createUser?: string;
  updateTime?: string;
  updateUser?: string;
}

/**
 * 分页信息
 * @param records 结果集
 * @param total 总数
 */
interface PageResult<T = any> {
  records: T[];
  total: number;
}

/**
 * 分页查询参数
 *
 * 排序支持的用法如下:
 * {isAsc:"asc",orderByColumn:"id"} order by id asc
 * {isAsc:"asc",orderByColumn:"id,createTime"} order by id asc,create_time asc
 * {isAsc:"desc",orderByColumn:"id,createTime"} order by id desc,create_time desc
 * {isAsc:"asc,desc",orderByColumn:"id,createTime"} order by id asc,create_time desc
 *
 * @param pageNum 当前页
 * @param pageSize 每页大小
 * @param orderByColumn 排序字段
 * @param isAsc 是否升序
 */
interface PageQuery {
  [key: string]: any;
  isAsc?: string;
  orderByColumn?: string;
  pageNum?: number;
  pageSize?: number;
}
