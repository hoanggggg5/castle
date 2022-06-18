<script lang="ts">
export default defineComponent({
  props: {
    trigger: String,
    active: {
      type: Boolean,
      default: false,
    },
    title: String,
    placement: {
      type: String as () => 'bottom' | 'top' | 'left' | 'right',
      default: 'top',
    },
    overlayStyle: String,
  },
  data() {
    return {
      visible: false,
    }
  },
  computed: {
    parent_node() {
      return this.$el.parentNode
    },
  },
  methods: {
    showVisible() {
      this.visible = true
    },
    hideVisible() {
      this.visible = false
    },
    onTriggerHover() {
      this.showVisible()
    },
    onTriggerBlur() {
      this.hideVisible()
    },
  },
})
</script>

<template>
  <div class="z-tooltip">
    <div class="z-tooltip-trigger" @mouseover="onTriggerHover" @mouseleave="onTriggerBlur">
      <slot />
    </div>
    <transition name="z-tooltip">
      <div v-if="visible || active" class="z-tooltip-overlay" :class="[`z-tooltip-${placement}`]" :style="overlayStyle">
        <div class="z-tooltip-arrow" />
        {{ title }}
      </div>
    </transition>
  </div>
</template>

<style lang="less">
.z-tooltip {
  position: relative;

  &-trigger {
    //
  }

  &-overlay {
    position: absolute;
    font-size: 14px;
    left: 50%;
    top: -44px;
    width: max-content;
    background-color: rgba(0, 0, 0, 0.75);
    border-radius: 4px;
    padding: 8px 6px;
    transform: translateX(-50%);
    transition: all 0.3s;
    color: @white-color;
  }

  &-arrow {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    display: block;
    width: 13.07106781px;
    height: 13.07106781px;
    overflow: hidden;
    background: transparent;
    pointer-events: none;

    // &::before {
    //   position: absolute;
    //   top: 0;
    //   right: 0;
    //   bottom: 0;
    //   left: 0;
    //   display: block;
    //   width: 5px;
    //   height: 5px;
    //   margin: auto;
    //   background-color: rgba(0, 0, 0, 0.75);
    //   content: "";
    //   pointer-events: auto;
    // }
  }

  &-top &-arrow {
    bottom: -13px;

    &::before {
      transform: translateY(-6.53553391px) rotate(45deg);
    }
  }

  &-bottom &-arrow {
    top: -13px;

    &::before {
      transform: translateY(6.53553391px) rotate(135deg);
    }
  }

  &-enter-active, &-leave-active {
    //
  }

  &-enter, &-leave-to {
    opacity: 0;
  }
}
</style>
