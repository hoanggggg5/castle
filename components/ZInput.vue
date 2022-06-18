<script lang="ts">
import { Emit, Model, Options, Prop, Ref, Vue, Watch } from 'vue-property-decorator'
import { RandomString } from '~/mixins'

@Options({})
export default class ZInput extends Vue {
  @Prop({ default: 'text' }) readonly type!: string
  @Prop() readonly placeholder!: string
  @Prop() readonly name!: string
  @Prop() readonly maxLength!: number
  @Prop() readonly disabled!: boolean

  @Model('modelValue', { default: '' }) value!: string

  focused = false
  random_name = RandomString()

  focus() {
    (this.$refs.input as HTMLElement).focus()
  }

  @Emit('focus')
  onFocus(e) {
    this.focused = true
  }

  @Emit('blur')
  onBlur(e) {
    console.log(e)
    this.focused = false
  }
}
</script>

<template>
  <div
    class="z-input" :class="[
      {
        'z-input-focused': focused,
        'z-input-disabled': disabled,
      },
    ]"
    :disabled="disabled"
  >
    <div v-if="$slots.prefix" class="z-input-prefix">
      <slot name="prefix" />
    </div>
    <input
      ref="input"
      v-model="value"
      :type="type"
      :placeholder="placeholder"
      :autocomplete="random_name"
      :name="random_name"
      :max-length="maxLength"
      @focus="onFocus"
      @blur="onBlur"
    >
    <div v-if="$slots.suffix" class="z-input-suffix">
      <slot name="suffix" />
    </div>
  </div>
</template>

<style lang="less">
.z-input {
  display: flex;
  padding: 0 8px;
  align-items: center;
  height: 35px;
  line-height: 35px;
  transition: all 0.3s ease-in-out;
  border: 1px solid @base-border-color;
  border-radius: 4px;

  &-focused {
    box-shadow: 0 0 0 1px rgba(@primary-color, 0.65);
  }

  &-focused.page-exchange-trade-action-input-error {
    box-shadow: 0 0 0 1px rgba(#fe6262, 0.65);
  }

  &-disabled {
    cursor: not-allowed;

    input {
      cursor: not-allowed;
      pointer-events: none;
    }
  }

  input {
    background-color: transparent;
    width: 100%;
    height: 100%;
    color: inherit;

    &::placeholder {
      color: @placeholder-color;
    }
  }
}
</style>
