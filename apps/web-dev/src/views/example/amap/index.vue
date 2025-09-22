<script setup lang="ts">
import { Page } from '@vben/common-ui';

import { useAmap } from '@sokach/amap';
import { Card } from 'ant-design-vue';

const [Amap] = useAmap({
  options: {
    viewMode: '2D',
    zoom: 11,
    center: [116.397_428, 39.909_23],
  },
});
</script>

<template>
  <Page>
    <Card title="高德地图">
      <div class="h-[500px]">
        <Amap />
      </div>
    </Card>
  </Page>
</template>

<style scoped></style>
