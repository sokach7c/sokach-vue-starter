import type { GlobalAmapOptions } from './types';

import { reactive } from 'vue';

const globalOptions: GlobalAmapOptions = reactive({
  key: '',
  securityJsCode: '',
});

function setupAmap(options: GlobalAmapOptions) {
  Object.assign(globalOptions, options);
}

export { globalOptions, setupAmap };
