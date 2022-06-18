<template>
  <ZInput ref="input" v-model="value" class="z-input-search" :placeholder="placeholder">
    <template #prefix>
      <ZIcon type="search" />
    </template>
  </ZInput>
</template>

<script lang="ts">
import { Model, Options, Prop, Ref, Vue } from 'vue-property-decorator'
import type ZInput from './ZInput.vue'

@Options({})
export default class ZInputSearch extends Vue {
  @Prop() readonly type!: string
  @Prop() readonly placeholder!: string

  @Model('modelValue') readonly value!: string

  @Ref('input') input!: ZInput

  focus() {
    this.input.focus()
  }
}
</script>

<style lang="less">
.z-input-search {
  padding: 4px 8px;
  border-radius: 4px;

  .z-input-prefix {
    font-size: 18px;
    margin-right: 8px;
    color: @action-color;
  }
}
</style>
