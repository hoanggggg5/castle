<template>
  <nuxt-link v-if="isRouterLink && to" :to="to" :class="['z-menu-item', { 'z-menu-item-selected': selected || isActive }]" @click="onClick">
    <slot />
  </nuxt-link>
  <div v-else :class="['z-menu-item', { 'z-menu-item-selected': selected || isActive }]" @click="onClick">
    <slot />
  </div>
</template>

<script lang="ts">
import { Options, Prop, Vue } from 'vue-property-decorator'
import type ZMenu from './ZMenu.vue'

@Options({})
export default class ZMenuItem extends Vue {
  @Prop() readonly selected!: boolean
  @Prop() readonly isRouterLink!: boolean
  @Prop() readonly to!: string

  declare $parent: ZMenu

  isActive = false

  get key() {
    return (this.$.vnode.key as string).toString()
  }

  mounted() {
    this.$parent.MountActiveItem(this)
  }

  onClick() {
    this.$parent.SetItemActive(this)
  }
}
</script>
