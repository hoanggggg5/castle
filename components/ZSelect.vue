<template>
  <div class="z-select">
    <div class="z-select-trigger" @click="onTriggerClick">
      <slot />
    </div>

    <ZOverlay v-if="visible" @click-outside="onOverlayClickOutside">
      <ZMenu v-model="value">
        <ZMenuItem v-for="item in list" :key="item.key" @click="onOverlayClick">
          {{ item.text }}
        </ZMenuItem>
      </ZMenu>
    </ZOverlay>
  </div>
</template>

<script lang="ts">
import { Model, Options, Prop, Vue, Watch } from 'vue-property-decorator'
import type { ZSelectList } from '~/types'

@Options({
  emits: ['change'],
})
export default class ZSelect extends Vue {
  @Prop() readonly list!: ZSelectList

  @Model('modelValue') value!: string

  visible = false

  onTriggerClick(event: MouseEvent) {
    event.stopPropagation()

    if (this.visible) {
      this.visible = false
    }
    else {
      this.visible = true
    }
  }

  onOverlayClickOutside() {
    if (!this.visible) return

    this.visible = false
  }

  onOverlayClick(event: MouseEvent) {
    if (!this.visible) return
    event.stopPropagation()

    this.visible = false
  }

  @Watch('value')
  onValueChanged() {
    this.$emit('change', this.value)
  }
}
</script>

<style lang="less">
.z-select {
  position: relative;
  height: 100%;

  .z-overlay {
    top: 100%;
    right: 0;
    z-index: 1;
  }

  .z-menu {
    display: block;
  }
}
</style>
