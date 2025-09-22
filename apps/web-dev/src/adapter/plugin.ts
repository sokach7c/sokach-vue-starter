import { addCollection } from '@vben/icons';

import antDesign from '@iconify/json/json/ant-design.json';
import carbon from '@iconify/json/json/carbon.json';
import lineMd from '@iconify/json/json/line-md.json';
import lucide from '@iconify/json/json/lucide.json';
import mdi from '@iconify/json/json/mdi.json';
import ri from '@iconify/json/json/ri.json';

/**
 * 初始化各类插件配置
 */
export function initPlugin() {
  // 注册离线图标库
  addCollection(antDesign);
  addCollection(mdi);
  addCollection(ri);
  addCollection(lucide);
  addCollection(carbon);
  addCollection(lineMd);
}
