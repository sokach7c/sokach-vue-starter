import { addCollection, createIconifyIcon } from '@vben-core/icons';

import antDesign from '@iconify/json/json/ant-design.json';
import carbon from '@iconify/json/json/carbon.json';
import ic from '@iconify/json/json/ic.json';
import lucide from '@iconify/json/json/lucide.json';
import mdi from '@iconify/json/json/mdi.json';
import ri from '@iconify/json/json/ri.json';

export * from '@vben-core/icons';

export const MdiKeyboardEsc = createIconifyIcon('mdi:keyboard-esc');

export const MdiWechat = createIconifyIcon('mdi:wechat');

export const MdiGithub = createIconifyIcon('mdi:github');

export const MdiGoogle = createIconifyIcon('mdi:google');

export const MdiQqchat = createIconifyIcon('mdi:qqchat');

export const RiDingding = createIconifyIcon('ri:dingding-fill');

// 注册离线图标
addCollection(antDesign);
addCollection(mdi);
addCollection(ri);
addCollection(lucide);
addCollection(ic);
addCollection(carbon);

const antDesignKeys = Object.keys(antDesign.icons).map(
  (v) => `${antDesign.prefix}:${v}`,
);
export { antDesignKeys };
