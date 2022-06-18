<script lang="ts">
import { Model, Options, Vue } from 'vue-property-decorator'
import type ZTabItem from './ZTabItem.vue'

@Options({})
export default class ZTab extends Vue {
  @Model('modelValue') value!: string

  currentActiveTab: ZTabItem | null = null

  get InrBarStyles() {
    if (!this.currentActiveTab) return

    const parent_element = this.$el as Element
    const tab_element = this.currentActiveTab.$el as Element

    // get rect of parent and tab
    const parent_rect = parent_element.getBoundingClientRect()
    const tab_rect = tab_element.getBoundingClientRect()

    return {
      width: `${tab_rect.width}px`,
      left: `${tab_rect.left - parent_rect.left}px`,
    }
  }

  mounted() {
    if (this.currentActiveTab) this.MountActiveTab(this.currentActiveTab)
  }

  MountActiveTab(tab: ZTabItem) {
    if (this.value === tab.tab) this.SetTabActive(tab)
  }

  SetTabActive(tab: ZTabItem) {
    if (this.currentActiveTab) this.currentActiveTab.isActive = false
    this.currentActiveTab = tab
    this.currentActiveTab.isActive = true
    this.value = tab.tab
  }
}
</script>

<template>
  <div class="z-tab flex">
    <slot />
    <div
      class="z-tab-inr-bar"
      :style="InrBarStyles"
    />
  </div>
</template>

<style lang="less">
.z-tab {
  position: relative;
  height: 32px;
  user-select: none;

  &-inr-bar {
    position: absolute;
    display: block;
    bottom: 1px;
    height: 2px;
    background-color: @primary-color;
    transition: transform .3s cubic-bezier(.645,.045,.355,1),width .2s cubic-bezier(.645,.045,.355,1),left .3s cubic-bezier(.645,.045,.355,1);
  }

  &-item {
    margin-right: 24px;
    cursor: pointer;
    transition: all 0.3s;
    font-size: 14px;

    &:last-child {
      margin-right: 0;
    }

    &-active {
      color: @primary-color;
    }
  }
}
</style>
