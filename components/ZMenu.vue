<template>
  <div class="z-menu">
    <slot />
  </div>
</template>

<script lang="ts">
import { Model, Options, Vue } from 'vue-property-decorator'
import type ZMenuItem from './ZMenuItem.vue'

@Options({})
export default class ZMenu extends Vue {
  @Model('modelValue') value!: string

  currentActiveMenu: ZMenuItem | null = null

  MountActiveItem(item) {
    if (this.value === item.key) this.SetItemActive(item)
  }

  SetItemActive(item: ZMenuItem) {
    if (this.currentActiveMenu) this.currentActiveMenu.isActive = false
    this.currentActiveMenu = item
    this.currentActiveMenu.isActive = true
    this.value = item.key
  }
}
</script>

<style lang="less">
.z-menu {
  position: relative;
  display: flex;

  &-item {
    display: block;
    margin-top: auto;
    margin-bottom: auto;
    cursor: pointer;
    transition: all .3s;

    &-selected {
      color: @primary-color;
    }

    &:first-child {
      margin-left: 0;
    }
  }
}
</style>
