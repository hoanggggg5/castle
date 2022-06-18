<template>
  <ZButton :class="['z-auth-button', 'shadow-md', disabled ? 'shadow-gray-300' : 'shadow-blue-400']" :html-type="type" :loading="loading" :disabled="disabled">
    <slot />
  </ZButton>
</template>

<script lang="ts">
import { Options, Prop, Vue } from 'vue-property-decorator'

@Options({})
export default class ZAuthButton extends Vue {
  @Prop() readonly type!: string
  @Prop() readonly loading!: boolean
  @Prop() readonly disabled!: boolean
}
</script>

<style lang="less">
.z-auth-button {
  background-color: @primary-color;
  color: @white-color;
  width: 100%;
  font-size: 16px;
  border: 0;
  border-radius: 2px;
  padding: 8px 0 !important;

  .z-loading-icon {
    width: 18px !important;
    height: 18px !important;
  }
}
</style>
