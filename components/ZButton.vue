<script lang="ts">
import type { ButtonHTMLAttributes } from '@vue/runtime-dom'
import { Options, Prop, Vue } from 'vue-property-decorator'

@Options({
  emits: ['click'],
})
export default class ZButton extends Vue {
  @Prop() readonly type!: string
  @Prop({ default: 'button' }) readonly htmlType!: ButtonHTMLAttributes['type']
  @Prop() readonly selected!: boolean
  @Prop() readonly loading!: boolean
  @Prop() readonly disabled!: boolean
  @Prop() readonly isRouterLink!: boolean
  @Prop() readonly to!: string
  @Prop() readonly delay!: {
    time: number
    content: string
  }

  protected delayInterval!: NodeJS.Timer
  remainingTime = 0

  get isDelaying() {
    return this.remainingTime > 0
  }

  StartDelay() {
    this.remainingTime = this.delay.time

    this.delayInterval = setInterval(() => {
      this.remainingTime = this.remainingTime - 1

      if (this.remainingTime === 0) {
        this.clearDelay()
      }
      this.$forceUpdate()
    }, 1000)
  }

  clearDelay() {
    clearInterval(this.delayInterval)
    this.remainingTime = 0
  }

  beforeUnmount() {
    this.clearDelay()
  }

  onButtonClicked() {
    if (this.disabled) return
    if (this.loading) return
    if (this.isDelaying) return

    this.$emit('click', this)
  }
}
</script>

<template>
  <NuxtLink v-if="isRouterLink && !delay && !disabled && to" :to="to">
    <ZButton :type="type" :html-type="htmlType" :selected="selected" :loading="loading" :disabled="disabled" :delay="delay">
      <slot />
    </ZButton>
  </NuxtLink>
  <button
    v-else
    class="z-button" :class="[
      { 'z-button-selected': selected, [`z-button-${type}`]: !!type, 'z-button-delay': !!delay, 'z-button-delaying': isDelaying },
    ]"
    :type="htmlType"
    :disabled="disabled || isDelaying"
    @click="onButtonClicked"
  >
    <ZLoading v-if="loading" />
    <span>
      <template v-if="isDelaying">
        {{ delay?.content?.replace("#{time}", remainingTime.toString()) }}
      </template>
      <slot v-else />
    </span>
  </button>
</template>

<style lang="less">
.z-button {
  display: flex;
  justify-content: center;
  align-items: center;
  width: auto;
  text-align: center;
  color: @primary-color;
  border: 1px solid;
  border-color: @primary-color;
  border-radius: 2px;
  font-weight: 400;
  line-height: initial;
  padding: 2px 16px;
  user-select: none;
  touch-action: manipulation;
  transition: all 0.3s;

  &-delay {
    color: @primary-color !important;
    border: none;
    background-color: transparent !important;
  }

  &-delaying {
    color: @gray-color !important;
    cursor: default;
  }

  a {
    color: @white-color !important;
  }

  span {
    display: flex;
    flex: none;
  }

  &:hover {
    color: @white-color;
    background-color: @primary-color;
  }

  &:disabled {
    background-color: @btn-disabled-color;
    border-color: @btn-disabled-color;
    color: @gray-color;
    cursor: not-allowed;
  }

  &-primary {
    color: @white-color;
    background-color: @primary-color;
    border-color: @primary-color;
  }

  &-selected {
    background-color: @primary-color;
    border-color: @primary-color;
    color: @white-color;
  }

  &-selected&-primary,
  &-primary:hover {
    background-color: @primary-color;
    border-color: @primary-color;
  }

  .z-loading {
    position: relative;
    background-color: transparent;
    height: auto;
    width: auto;
    display: flex;
    margin-right: 8px;
  }

  .z-loading-icon {
    border: 3px solid @white-color !important;
    width: 20px !important;
    height: 20px !important;
  }

  .z-loading-icon-inner {
    background-color: @white-color !important;
  }
}
</style>
