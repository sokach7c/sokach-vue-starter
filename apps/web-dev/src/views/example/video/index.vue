<script setup lang="ts">
import { onMounted } from 'vue';

import { useArtPlayer } from '@sokach/art-player';
import { Card } from 'ant-design-vue';

const [ArtplayerInstance, player] = useArtPlayer({});

onMounted(() => {
  setTimeout(() => {
    player.value?.switchUrl('http://192.168.2.99:9000/dev/video3.mp4');
  }, 3000);
});
</script>

<template>
  <Card title="Artplayer">
    <ArtplayerInstance class="h-[500px] w-full" />
  </Card>
</template>
