import type { AMapOptions } from './types';

import {
  defineComponent,
  h,
  nextTick,
  onBeforeUnmount,
  onMounted,
  ref,
} from 'vue';

import AMapLoader from '@amap/amap-jsapi-loader';

import { globalOptions } from './init';

export function useAmap(options: Partial<AMapOptions>) {
  const mapEl = ref<HTMLElement>();
  let map: any = null;

  const Amap = defineComponent({
    setup(props, { attrs, slots }) {
      onBeforeUnmount(() => {
        map?.destroy();
      });

      onMounted(() => {
        nextTick(() => {
          if (!map) {
            (window as any)._AMapSecurityConfig = {
              securityJsCode: globalOptions.securityJsCode,
            };
            AMapLoader.load({
              key: globalOptions.key,
              version: '2.0',
              plugins: options.plugins,
            })
              .then((AMap) => {
                map = new AMap.Map(mapEl.value, {
                  ...options.options,
                });
              })
              .catch((error) => {
                console.error(error);
              });
          }
        });
      });

      return () => {
        return h(
          'div',
          {
            ref: mapEl,
            ...props,
            ...attrs,
            style: { width: '100%', height: '100%' },
          },
          slots,
        );
      };
    },
    extraOptions() {
      return {
        inheritAttrs: false,
        name: 'Amap',
      };
    },
  });

  return [Amap, map] as const;
}
