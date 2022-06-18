<script setup lang="ts">
import type ZInputSearch from './ZInputSearch.vue'
import type { ZTableColumn } from '~/types'
import { FindBy } from '~/mixins'

const props = defineProps<{
  dataSource: any[]
  findBy: string[]
  columns: ZTableColumn[]
}>()
const emit = defineEmits(['click', 'click-outside'])
const instance = getCurrentInstance()

// eslint-disable-next-line prefer-const
let search = ref('')

const dataFilter = computed(() => {
  return FindBy(props.dataSource, props.findBy, search.value)
})

onMounted(() => {
  instance?.proxy?.$nextTick(() => {
    const input = instance.proxy?.$refs.input as ZInputSearch

    input.focus()
  })
})
</script>

<template>
  <div class="z-search-box shadow-md">
    <ZInputSearch ref="input" v-model="search" class="mx-4" />
    <ZTable
      :data-source="dataFilter"
      :columns="columns"
      :scroll="true"
      :head-enabled="false"
      @click="item => emit('click', item)"
    >
      <template
        v-for="column in columns.filter((column) => column.scopedSlots)"
        #[column.key]="{ item }"
      >
        <slot :name="column.key" :item="item" :column="column" />
      </template>
    </ZTable>
  </div>
</template>

<style lang="less">
.z-search-box {
  border-radius: 4px;
  background-color: white;
  width: 100%;

  .z-table {
    height: 240px;

    &-row {
      cursor: pointer;

      &:hover {
        background-color: @btn-disabled-color;
      }
    }

    &-content {
      &::-webkit-scrollbar-thumb {
        background-color: @gray-color;
      }
    }
  }
}
</style>
