import type { VxeUIExport } from '@sokach/vxe-table';

import { setupCellButton } from './cell-button';
import { setupCellImage } from './cell-image';
import { setupCellLink } from './cell-link';
import { setupCellSwitch } from './cell-switch';
import { setupCellTag } from './cell-tag';

export function setupVxeTableCell(vxeUI: VxeUIExport) {
  setupCellImage(vxeUI);
  setupCellLink(vxeUI);
  setupCellSwitch(vxeUI);
  setupCellButton(vxeUI);
  setupCellTag(vxeUI);
}
