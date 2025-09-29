import { isHttpUrl } from '@vben/utils';

import { camelCase, upperFirst } from 'lodash-es';

export function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

/**
 * @desc 去除空格
 * @param {string} str - 字符串
 * @param {string} pos - 去除空格的位置
 * pos="both": 去除两边空格
 * pos="left": 去除左边空格
 * pos="right": 去除右边空格
 * pos="all": 去除所有空格
 */
type Pos = 'all' | 'both' | 'left' | 'right';
export function trim(str: string, pos: Pos = 'both'): string {
  switch (pos) {
    case 'all': {
      return str.replaceAll(/\s+/g, '');
    }
    case 'both': {
      return str.replaceAll(/^\s+|\s+$/g, '');
    }
    case 'left': {
      return str.replace(/^\s*/, '');
    }
    case 'right': {
      return str.replaceAll(/(\s*$)/g, '');
    }
    default: {
      return str;
    }
  }
}

/**
 * 根据数字获取对应的汉字
 * @param {number} num - 数字(0-10)
 */
export function getHanByNumber(num: number): string {
  const str = '零一二三四五六七八九十';
  return str.charAt(num);
}

/**
 * 获取指定整数范围内的随机整数
 * @param {number} start - 开始范围
 * @param {number} end - 结束范围
 */
export function getRandomInterger(start = 0, end: number): number {
  const range = end - start;
  return Math.floor(Math.random() * range + start);
}

/** @desc 千分位格式化 */
export function formatMoney(money: string) {
  return money.replaceAll(
    new RegExp(
      `(?!^)(?=(\\d{3})+${money.includes('.') ? String.raw`\.` : '$'})`,
      'g',
    ),
    ',',
  );
}

/** @desc 数据类型检测方法 */
export function getTypeOf(value: any) {
  return Object.prototype.toString.call(value).slice(8, -1).toLowerCase();
}

/**
 * @desc 格式化电话号码
  @demo 183-7983-6654 */
export function formatPhone(mobile: string, formatStr = '-') {
  return mobile.replaceAll(/(?=(\d{4})+$)/g, formatStr);
}

/**
 * @desc 手机号脱敏
  @demo 155****8810  */
export function hidePhone(phone: string) {
  return phone.replace(/^(\d{3})\d{4}(\d{4})$/, '$1****$2');
}

/** @desc 检测数据是否为空数据 */
export function isEmpty(data: unknown) {
  if (
    data === '' ||
    data === 'undefined' ||
    data === undefined ||
    data === null ||
    data === 'null'
  ) {
    return true;
  }
  return (
    JSON.stringify(data) === '{}' ||
    JSON.stringify(data) === '[]' ||
    JSON.stringify(data) === '[{}]'
  );
}

/**
 * @desc 大小写转换
 * @param {string} str 待转换的字符串
 * @param {number} type 1:全大写 2:全小写 3:首字母大写
 */
export function toCase(str: string, type: number) {
  switch (type) {
    case 1: {
      return str.toUpperCase();
    }
    case 2: {
      return str.toLowerCase();
    }
    case 3: {
      return str[0].toUpperCase() + str.slice(1).toLowerCase();
    }
    default: {
      return str;
    }
  }
}

/**
 * @desc 获取随机数
 * @param {number} min 最小值
 * @param {number} max 最大值
 */
export const randomNum = (min: number, max: number) => {
  return Math.floor(min + Math.random() * (max + 1 - min));
};

/**
  @desc 获取最大值 */
export const max = (arr: number[]) => {
  return Math.max.apply(null, arr);
};

/**
  @desc 获取最小值 */
export const min = (arr: number[]) => {
  return Math.min.apply(null, arr);
};

/**
  @desc 求和 */
export const sum = (arr: number[]) => {
  return arr.reduce((pre, cur) => pre + cur);
};

/**
  @desc 获取平均值 */
export const average = (arr: number[]) => {
  return sum(arr) / arr.length;
};

/**
  @desc 深拷贝 */
export const deepClone = (data: any) => {
  if (typeof data !== 'object' || data === null) return '不是对象';
  const newData: any = Array.isArray(data) ? [] : {};
  for (const key in data) {
    newData[key] =
      typeof data[key] === 'object' ? deepClone(data[key]) : data[key];
  }
  return newData;
};

/**
 * @desc 判断是否是闰年
 * @param {number} year 年份
 */
export const isLeapYear = (year: number) => {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
};

/**
 * @desc 判断是否是奇数
 * @param {number} num 数字
 */
export const isOdd = (num: number) => {
  return num % 2 !== 0;
};

/**
 * @desc 判断是否是偶数
 * @param {number} num 数字
 */
export const isEven = (num: number) => {
  return !isOdd(num);
};

/**
  @desc 将RGB转化为十六机制 */
export const rgbToHex = (r: number, g: number, b: number) => {
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
};

/**
 * @description 动态路由 path 转 name
 * @demo /system => System
 * @demo /system/menu => SystemMenu
 * @demo /data-manage/detail => DataManageDetail
 */
export const transformPathToName = (path: string) => {
  if (!path) return '';
  if (isHttpUrl(path)) return '';
  return upperFirst(camelCase(path));
};

/** @desc 格式化文件大小 */
export const formatFileSize = (fileSize: number) => {
  if (fileSize === null || fileSize === 0) {
    return '0 Bytes';
  }
  const unitArr = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  let index = 0;
  const srcSize = Number.parseFloat(fileSize.toString());
  index = Math.floor(Math.log(srcSize) / Math.log(1024));
  const size = srcSize / 1024 ** index;
  return `${size.toFixed(2)} ${unitArr[index]}`;
};

/** @desc 复制文本 */
export const copyText = (text: any) => {
  const textarea = document.createElement('textarea');
  textarea.value = text;
  document.body.append(textarea);
  textarea.select();
  document.execCommand('copy');
  textarea.remove();
};

export const YMD_HMS = 'yyyy-MM-dd HH:mm:ss';

/**
 * 格式化时间
 */
export function dateFormat(date = new Date(), pattern = YMD_HMS) {
  if (!date) {
    return '';
  }

  const o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'H+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds(),
    'q+': Math.floor((date.getMonth() + 3) / 3),
    'S+': date.getMilliseconds(),
  };

  let formattedDate = pattern; // Start with the pattern

  // Year Handling
  const yearMatch = formattedDate.match(/(y+)/);
  if (yearMatch) {
    formattedDate = formattedDate.replace(
      yearMatch[0],
      `${date.getFullYear()}`.slice(Math.max(0, 4 - yearMatch[0].length)),
    );
  }

  // Other Formatters
  for (const k in o) {
    const reg = new RegExp(`(${k})`);
    const match = formattedDate.match(reg);
    if (match) {
      formattedDate = formattedDate.replace(
        match[0],
        match[0].length === 1 ? o[k] : `00${o[k]}`.slice(`${o[k]}`.length),
      );
    }
  }

  return formattedDate;
}
