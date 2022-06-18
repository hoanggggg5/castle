<script lang="ts">
import { FindBy } from '~/mixins'
import type { ZTableColumn } from '~/types'

export default defineComponent({
  props: {
    title: String,
    value: String,
    loading: Boolean,
    columns: {
      type: Array as () => ZTableColumn[],
      required: true,
    },
    dataSource: {
      type: Array,
      required: true,
    },
    border: Boolean,
    pagination: Boolean,
    page: Number,
    pageSize: Number,
    scroll: Boolean,
    hover: Boolean,
    isRouterLink: Boolean,
    routerBuilder: String,
    selectedIndex: Number,
    searchEnabled: Boolean,
    findBy: {
      type: Array as () => string[],
    },
    headEnabled: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      search: '',
    }
  },
  computed: {
    headExtendClass() {
      return [this.title, this.$slots.head, this.searchEnabled].filter(v => !!v).length === 1 && this.searchEnabled ? 'justify-end' : 'justify-between'
    },
    dataFilter() {
      if (!this.findBy) return this.dataSource

      return FindBy(this.dataSource, this.findBy, this.search)
    },
  },
})
</script>

<template>
  <div class="z-table-pro shadow-md">
    <div class="z-table-pro-head flex" :class="[headExtendClass]">
      <div v-if="title" class="z-table-pro-title bold-text text-xl">
        {{ title }}
      </div>
      <slot name="head" />
      <ClientOnly>
        <ZInputSearch
          v-if="searchEnabled"
          v-model="search"
          class="z-table-pro-head-search"
          placeholder="Search"
        />
      </ClientOnly>
    </div>
    <ZTable
      :loading="loading"
      :columns="columns"
      :data-source="dataFilter"
      :border="border"
      :pagination="pagination"
      :page="page"
      :page-size="pageSize"
      :scroll="scroll"
      :hover="hover"
      :is-router-link="isRouterLink"
      :router-builder="routerBuilder"
      :selected-index="selectedIndex"
      :head-enabled="headEnabled"
    >
      <template
        v-for="column in columns.filter((column) => column.scopedSlots)"
        #[column.key]="slotProps"
      >
        <slot :name="slotProps.column.key" :item="slotProps.item" :column="slotProps.column" />
      </template>
    </ZTable>
  </div>
</template>

<style lang="less">
.z-table {
  &-pro {
    background-color: @card-background;
    border-radius: 6px;

    &-head {
      padding: 16px 24px;
    }

    .z-table {
      &-content {
        padding-bottom: 20px;
      }

      &-head, &-row {
        padding: 0 24px;
      }

      &-row {
        height: 42px;
        line-height: 42px;
        border-top: 1px solid @base-border-color;
      }
    }
  }
}
</style>
