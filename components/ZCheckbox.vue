<template>
  <div :class="['z-checkbox', { 'z-checkbox-selected': value }]" @click="onClick">
    <div class="z-checkbox-inner">
      <ZIcon type="check" />
    </div>

    <div class="z-checkbox-label">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { Model, Options, Vue } from 'vue-property-decorator'

@Options({
  emits: ['change'],
})
export default class ZCheckbox extends Vue {
  @Model('modelValue', { default: false }) value!: boolean

  onClick() {
    this.value = !this.value

    this.$nextTick(() => {
      this.$emit('change', this.value)
    })
  }
}
</script>

<style lang="less">
.z-checkbox {
  display: inline-flex;
  align-items: center;
  cursor: pointer;

  &-inner {
    position: relative;
    width: 16px;
    height: 16px;
    border: 1px solid @base-border-color;
    border-radius: 2px;
    transition: all .3s;

    i {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translateX(-50%) translateY(-50%);
      font-size: 8px;
    }
  }

  &-label {
    margin-left: 6px;
    transition: all .3s;
  }

  &-selected {
    .z-checkbox {
      &-inner {
        background-color: @primary-color;
      }
    }
  }
}
</style>
