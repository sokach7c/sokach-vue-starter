import type { ArtplayerOption } from './init';

import { defineComponent, h, onBeforeUnmount, onMounted, ref } from 'vue';

import Artplayer from 'artplayer';

import { mergeArtPlayerOptions } from './init';

export function useArtPlayer(options: ArtplayerOption) {
  const playerEl = ref<HTMLDivElement>();
  const player = ref<Artplayer>();

  const ArtplayerInstance = defineComponent({
    setup(props: ArtplayerOption, { attrs }) {
      onBeforeUnmount(() => {
        player.value?.destroy();
      });

      onMounted(() => {
        if (!player.value) {
          player.value = new Artplayer({
            container: playerEl.value,
            ...mergeArtPlayerOptions(options),
          });
        }
      });

      return () => {
        return h(
          'div',
          {
            ...props,
            ...attrs,
          },
          [
            h('div', {
              ref: playerEl,
              style: { width: '100%', height: '100%' },
            }),
          ],
        );
      };
    },
    extraOptions() {
      return {
        inheritAttrs: false,
        name: 'ArtPlayer',
      };
    },
  });

  return [ArtplayerInstance, player] as const;
}
