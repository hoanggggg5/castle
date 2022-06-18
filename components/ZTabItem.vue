<script lang="ts">
import { Options, Prop, Vue } from 'vue-property-decorator'
import type ZTab from './ZTab.vue'

@Options({})
export default class ZTabItem extends Vue {
  @Prop() readonly tab!: string

  declare $parent: ZTab

  isActive = false

  mounted() {
    this.$parent.MountActiveTab(this)
  }

  onClick() {
    this.$parent.SetTabActive(this)
  }
}
</script>

<template>
  <div class="z-tab-item" :class="[{ 'z-tab-item-active': isActive }]" @click="onClick">
    <slot />
  </div>
</template>
