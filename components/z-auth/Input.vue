<script lang="ts">
import { Model, Options, Prop, Vue } from 'vue-property-decorator'

@Options({})
export default class ZInputAuth extends Vue {
  @Prop() readonly type!: 'text' | 'password' | 'code'
  @Prop() readonly label!: string
  @Prop() readonly placeholder!: string
  @Prop() readonly required!: boolean
  @Prop() readonly name!: string
  @Prop() readonly error!: string
  @Prop() readonly maxLength!: number

  @Model('modelValue') value!: string

  inputFocused = false
  show_password = false

  get input_type() {
    return this.show_password ? 'text' : this.type
  }
}
</script>

<template>
  <div class="z-auth-input" :class="[{ 'z-auth-input-focused': inputFocused, 'z-auth-input-code': type == 'code', 'z-auth-input-error': !!error }]">
    <div class="z-auth-input-container flex">
      <label class="z-auth-input-label bold-text">
        {{ label || placeholder }}:
      </label>
      <ZCol>
        <ZCodeInput
          v-if="type === 'code'"
          v-model="value"
          :length="maxLength"
        />
        <ZInput
          v-else
          ref="z-input"
          v-model="value"
          :type="input_type"
          :max-length="maxLength"
          :placeholder="placeholder"
          @focus="inputFocused = true"
          @blur="inputFocused = false"
        >
          <template v-if="type == 'password'" #suffix>
            <ZIcon :type="show_password ? 'visible' : 'invisible'" @click="show_password = !show_password" />
          </template>
          <template v-else-if="$slots.suffix" #suffix>
            <slot name="suffix" />
          </template>
        </ZInput>
        <div class="z-auth-input-error-container">
          <transition name="z-auth-input-error">
            <div v-if="error" class="z-auth-input-error-content">
              {{ error }}
            </div>
          </transition>
        </div>
      </ZCol>
    </div>
  </div>
</template>

<style lang="less">
.z-auth-input {
  position: relative;
  height: 70px;

  .z-input {
    height: 50px;
    background-color: transparent;
  }

  :not(.z-code-input .z-input).z-input {
    box-shadow: none !important;
    border: none !important;
  }

  input {
    height: 50px;
    padding: 0 20px;

    &:-webkit-autofill,
    &:-webkit-autofill:hover,
    &:-webkit-autofill:focus,
    &:-webkit-autofill:active {
      box-shadow: 0 0 0 1000px @card-background inset !important;
      -webkit-text-fill-color: @text-color !important;
    }
  }

  &::after {
    content: "";
    position: absolute;
    left: 50%;
    transform: translate(-50%);
    top: 50px;
    height: 1px;
    width: 10px;
    background-color: transparent;
    transition: all .2s ease-in-out;
  }

  &-focused:not(&-error) {
    &::after {
      width: 100%;
      background-color: @primary-color;
    }
  }

  &-code &-container {
    border-bottom: none;
  }

  &-container {
    position: relative;
    width: 100%;
    border-bottom: 1px solid @base-border-color;
    transition: all .2s ease-in-out;
  }

  &-label {
    font-weight: 500;
    min-width: 80px;
    line-height: 50px;
  }

  &-error {
    &-container {
      position: absolute;
      height: 20px;
      width: 100%;
      overflow: hidden;
    }

    &-content {
      position: absolute;
      width: 100%;
      height: 20px;
      line-height: 20px;
      color: @down-color;
      top: 0;
      left: 0;
      padding: 0 28px;
      opacity: 1;
      transition: all 0.3s;
    }

    &-enter,
    &-leave-active {
      opacity: 0;
      left: 0;
      top: -20px;
    }

    .z-auth-input-container {
      border-color: @down-color !important;
    }
  }

  i {
    font-size: 18px;
    cursor: pointer;
    color: @gray-color;
  }
}
</style>
