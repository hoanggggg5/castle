<template>
  <div class="z-code-input">
    <ZInput
      v-for="(code, index) in codeSplit"
      :key="index"
      :ref="`input-${index}`"
      :value="code"
      type="text"
      @input="(v) => onInput(v, index)"
      @paste="onInputPaste($event, index)"
      @keydown="onInputKeydown($event, index)"
    />
  </div>
</template>

<script lang="ts">
import { Model, Options, Prop, Vue } from 'vue-property-decorator'
import { normalizeArray } from '~/mixins'

@Options({})
export default class ZCodeInput extends Vue {
  @Prop({ default: 0 }) readonly length!: number

  @Model('modelValue') value!: string

  codeSplit: string[] = []
  focusIndex = -1

  mounted() {
    this.codeSplit = Array(this.length).fill('')
    for (let index = 0; index < this.value.length; index++) {
      this.codeSplit[index] = this.value[index]
    }
  }

  onInputFocus(index: number) {
    this.focusIndex = index
  }

  onInputBlur() {
    this.focusIndex = -1
  }

  onInputPaste(event: any, index: number) {
    const value: string = event.clipboardData.getData('text')

    if (!this.codeSplit || !value) {
      return
    }

    for (let i = 0; i < this.length - (index); i++) {
      this.focusInput(index + i)
    }

    this.codeSplit = [this.value.slice(0, index), value, this.value.slice(index + 1, 6)].join('').slice(0, this.length).split('')
    this.reloadValue()
  }

  onInput(value: string, index: number) {
    if (!value || !this.codeSplit) {
      return
    }

    this.setValue(value[value.length - 1] || '', index)
    this.focusInput(index + 1)
  }

  onInputKeydown(event: any, index: number) {
    if (!this.codeSplit) {
      return
    }

    if (event.key === 'Backspace' || event.key === 'Delete') {
      event.preventDefault()

      if (!this.codeSplit[index]) {
        this.focusInput(index - 1)
      } else {
        this.setValue('', index)
      }
    } else if (event.key === 'ArrowLeft') {
      this.focusInput(index - 1)
    } else if (event.key === 'ArrowRight') {
      this.focusInput(index + 1)
    }
  }

  focusInput(index: number) {
    if (index === -1 || index >= this.length) {
      return
    }

    const input = normalizeArray<HTMLInputElement>(this.$refs[`input-${index}`] as never)
    input?.focus()
  }

  reloadValue() {
    this.value = this.codeSplit.join('')
    this.$forceUpdate()
  }

  setValue(value: string, index: number) {
    if (index === -1 || index >= this.length) {
      return
    }
    this.codeSplit[index] = value[0] || ''
    this.value = this.codeSplit.join('')
    this.$forceUpdate()
  }
}
</script>

<style lang="less">
.z-code-input {
  width: 100%;
  display: flex;
  justify-content: space-between;

  .z-input {
    height: 62px;
    width: 40px;
    border-radius: 4px;
    border: 1px solid @base-border-color;
    padding: 0;

    input {
      height: 100%;
      padding: 0;
      text-align: center;
      color: @primary-color;
      font-size: 20px;
    }
  }
}
</style>
