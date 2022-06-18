<template>
  <div :class="['z-dropdown', `z-dropdown-${placement}`]" @mouseover="onTriggerHover" @mouseleave="onTriggerBlur">
    <div class="z-dropdown-trigger" @click="visible ? destroy() : onTriggerClick()">
      <slot />
    </div>
    <transition :name="`z-dropdown-${placement}`">
      <ZOverlay v-if="visible" :class="['z-dropdown-overlay', `z-dropdown-${placement}-overlay`, 'shadow-md']" @click="onOverlayClick" @outside-click="onTriggerClickOutSide">
        <slot name="overlay" />
      </ZOverlay>
    </transition>
  </div>
</template>

<script lang="ts">
import { Options, Prop, Vue } from 'vue-property-decorator'

@Options({})
export default class ZDropdown extends Vue {
  @Prop({ default: 'bottomCenter' }) readonly placement!: string
  @Prop({ default: 'hover' }) readonly trigger!: string

  visible = false
  protected visibleQueue: NodeJS.Timeout | null = null

  onTriggerClick() {
    if (this.visible) return
    if (this.trigger !== 'click') return

    this.create()
  }

  onTriggerClickOutSide() {
    if (this.trigger !== 'click') return

    this.destroy()
  }

  onOverlayClick() {
    if (this.trigger !== 'click') return

    this.destroy()
  }

  onTriggerHover() {
    if (this.trigger !== 'hover') return

    this.create()
  }

  onTriggerBlur() {
    if (this.trigger !== 'hover') return

    this.destroy()
  }

  create() {
    if (this.visibleQueue) {
      clearTimeout(this.visibleQueue)
    }

    this.visible = true
  }

  destroy() {
    if (this.visibleQueue) {
      clearTimeout(this.visibleQueue)
    }

    this.visibleQueue = setTimeout(() => {
      this.visible = false
    }, 200)
  }
}
</script>

<style lang="less">
.z-dropdown {
  position: relative;

  &-trigger {
    height: 100%;
    cursor: pointer;
    z-index: 1;
  }

  &-overlay {
    opacity: 1;
    position: absolute;
    margin: 5px 0;
    transition: all 0.3s;
    z-index: 999;
  }

  &-bottomLeft {
    &-overlay {
      transform: translate(0, 0);
      top: 100%;
      left: 0;
    }

    &-enter-active,
    &-leave-active {
      opacity: 0;
      left: 0;
      top: 50%;
      transform: translateX(0);
    }
  }

  &-bottomCenter {
    &-overlay {
      transform: translate(-50%, 0);
      top: 100%;
      left: 50%;
    }

    &-enter-active,
    &-leave-active {
      opacity: 0;
      left: 50%;
      top: 50%;
      transform: translateX(-50%);
    }
  }

  &-bottomRight {
    &-overlay {
      transform: translate(-100%, 0);
      top: 100%;
      left: 100%;
    }

    &-enter-active,
    &-leave-active {
      opacity: 0;
      left: 100%;
      top: 50%;
      transform: translateX(-100%);
    }
  }

  .z-menu {
    display: block;
    margin: 0;
    outline: none;
    padding: 4px 0;
    background-color: #fff;
    text-align: left;

    &-item {
      line-height: 32px;
      padding: 0 12px;
      font-size: 14px;
      margin: 0;
      color: @text-color;
      user-select: none;
      transition: 0.3s all;

      a {
        color: inherit;
      }

      &-selected, &:hover {
        background-color: rgba(0, 0, 0, 0.05);
      }
    }
  }
}
</style>
