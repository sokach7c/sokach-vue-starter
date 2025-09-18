<script setup lang="ts">
import type { VNode } from 'vue';

import { computed, ref, useAttrs, watch, watchEffect } from 'vue';

import { usePagination } from '@vben/hooks';
import { antDesignKeys, EmptyIcon, Grip, listIcons } from '@vben/icons';

import {
  Button,
  Input,
  Pagination,
  PaginationEllipsis,
  PaginationList,
  PaginationListItem,
  PaginationNext,
  PaginationPrev,
  VbenIcon,
  VbenIconButton,
  VbenPopover,
} from '@vben-core/shadcn-ui';
import { isFunction } from '@vben-core/shared/utils';

import { objectOmit, refDebounced } from '@vueuse/core';

interface Props {
  /** 是否自动请求API以获得图标集的数据.提供prefix时有效 */
  autoFetchApi?: boolean;
  /** 图标样式 */
  iconClass?: string;
  /**
   * 图标列表
   */
  icons?: string[];
  /** 图标插槽名，预览图标将被渲染到此插槽中 */
  iconSlot?: string;
  /** Input组件 */
  inputComponent?: VNode;
  /** input组件的值属性名称 */
  modelValueProp?: string;
  pageSize?: number;
  /** 图标集的名字 */
  prefix?: string;
  type?: 'icon' | 'input';
}

const props = withDefaults(defineProps<Props>(), {
  prefix: 'ant-design',
  pageSize: 36,
  icons: () => [],
  iconSlot: 'default',
  iconClass: 'size-4',
  autoFetchApi: true,
  modelValueProp: 'modelValue',
  inputComponent: undefined,
  type: 'input',
});

const emit = defineEmits<{
  change: [string];
}>();

const attrs = useAttrs();

const modelValue = defineModel({ default: '', type: String });

const visible = ref(false);
const currentSelect = ref('');
const currentPage = ref(1);
const keyword = ref('');
const keywordDebounce = refDebounced(keyword, 300);
const innerIcons = ref<string[]>(antDesignKeys);

/* 当检索关键词变化时，重置分页 */
watch(keywordDebounce, () => {
  currentPage.value = 1;
  setCurrentPage(1);
});

const currentList = computed(() => {
  try {
    if (props.prefix) {
      if (
        props.prefix !== 'svg' &&
        props.autoFetchApi &&
        props.icons.length === 0
      ) {
        return innerIcons.value;
      }
      const icons = listIcons('', props.prefix);
      if (icons.length === 0) {
        console.warn(`No icons found for prefix: ${props.prefix}`);
      }
      return icons;
    } else {
      return props.icons;
    }
  } catch (error) {
    console.error('Failed to load icons:', error);
    return [];
  }
});

const showList = computed(() => {
  return currentList.value.filter((item) =>
    item.includes(keywordDebounce.value),
  );
});

const { paginationList, total, setCurrentPage } = usePagination(
  showList,
  props.pageSize,
);

watchEffect(() => {
  currentSelect.value = modelValue.value;
});

watch(
  () => currentSelect.value,
  (v) => {
    emit('change', v);
  },
);

const handleClick = (icon: string) => {
  currentSelect.value = icon;
  modelValue.value = icon;
  close();
};

const handlePageChange = (page: number) => {
  currentPage.value = page;
  setCurrentPage(page);
};

function toggleOpenState() {
  visible.value = !visible.value;
}

function open() {
  visible.value = true;
}

function close() {
  visible.value = false;
}

function onKeywordChange(v: string) {
  keyword.value = v;
}

const searchInputProps = computed(() => {
  return {
    placeholder: '搜索',
    [props.modelValueProp]: keyword.value,
    [`onUpdate:${props.modelValueProp}`]: onKeywordChange,
    class: 'mx-2',
  };
});

function updateCurrentSelect(v: string) {
  currentSelect.value = v;
  const eventKey = `onUpdate:${props.modelValueProp}`;
  if (attrs[eventKey] && isFunction(attrs[eventKey])) {
    attrs[eventKey](v);
  }
}
const getBindAttrs = computed(() => {
  return objectOmit(attrs, [`onUpdate:${props.modelValueProp}`]);
});

defineExpose({ toggleOpenState, open, close });
</script>
<template>
  <VbenPopover
    v-model:open="visible"
    :content-props="{ align: 'end', alignOffset: -11, sideOffset: 8 }"
    content-class="p-0 pt-3 w-[400px]"
    trigger-class="w-full"
  >
    <template #trigger>
      <template v-if="props.type === 'input'">
        <component
          v-if="props.inputComponent"
          :is="inputComponent"
          :[modelValueProp]="currentSelect"
          placeholder="搜索"
          role="combobox"
          aria-label="搜索"
          aria-expanded="visible"
          :[`onUpdate:${modelValueProp}`]="updateCurrentSelect"
          v-bind="getBindAttrs"
        >
          <template #[iconSlot]>
            <VbenIcon
              :icon="currentSelect || Grip"
              class="size-4"
              aria-hidden="true"
            />
          </template>
        </component>
        <div class="relative w-full" v-else>
          <Input
            v-bind="$attrs"
            v-model="currentSelect"
            placeholder="搜索"
            class="h-8 w-full pr-8"
            role="combobox"
            aria-label="搜索"
            aria-expanded="visible"
          />
          <VbenIcon
            :icon="currentSelect || Grip"
            class="absolute right-1 top-1 size-6"
            aria-hidden="true"
          />
        </div>
      </template>
      <VbenIcon
        :icon="currentSelect || Grip"
        v-else
        class="size-4"
        v-bind="$attrs"
      />
    </template>
    <div class="mb-2 flex w-full">
      <component
        v-if="inputComponent"
        :is="inputComponent"
        v-bind="searchInputProps"
      />
      <Input
        v-else
        class="mx-2 h-8 w-full"
        placeholder="搜索"
        v-model="keyword"
      />
    </div>

    <template v-if="paginationList.length > 0">
      <div
        class="grid h-[300px] w-full grid-cols-6 justify-items-center overflow-auto"
      >
        <VbenIconButton
          v-for="(item, index) in paginationList"
          :key="index"
          :tooltip="item"
          tooltip-side="top"
          @click="handleClick(item)"
        >
          <VbenIcon
            class="size-6"
            :class="{
              'text-primary transition-all': currentSelect === item,
            }"
            :icon="item"
          />
        </VbenIconButton>
      </div>
      <div
        v-if="total >= pageSize"
        class="flex-center flex justify-center overflow-hidden py-2"
      >
        <Pagination
          :items-per-page="36"
          :sibling-count="1"
          :total="total"
          show-edges
          @update:page="handlePageChange"
        >
          <PaginationList
            v-slot="{ items }"
            class="flex w-full items-center gap-1"
          >
            <PaginationPrev class="h-7 w-7" />
            <template v-for="(item, index) in items">
              <PaginationListItem
                v-if="item.type === 'page'"
                :key="index"
                :value="item.value"
                as-child
              >
                <Button
                  :variant="item.value === currentPage ? 'default' : 'outline'"
                  class="h-7 w-7 p-0 text-sm font-normal"
                >
                  {{ item.value }}
                </Button>
              </PaginationListItem>
              <PaginationEllipsis
                v-else
                :key="item.type"
                :index="index"
                class="h-7 w-7"
              />
            </template>
            <PaginationNext class="h-7 w-7" />
          </PaginationList>
        </Pagination>
      </div>
    </template>

    <template v-else>
      <div class="flex-col-center text-muted-foreground min-h-[150px] w-full">
        <EmptyIcon class="size-10" />
        <div class="mt-1 text-sm">暂无数据</div>
      </div>
    </template>
  </VbenPopover>
</template>
