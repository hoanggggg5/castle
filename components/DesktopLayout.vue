<script setup lang="ts">
import colors from '~/colors'

defineProps<{
  classContent: string | string[]
  footerDisabled: boolean
}>()

const style = computed(() => {
  const style: { [key: string]: string | number } = {}
  for (const key in colors) {
    const value = (colors as any)[key]

    style[`--${key}`] = value
  }

  return style
})
</script>

<template>
  <ZLayout :style="style">
    <Header />
    <ZLayoutContent :class="classContent">
      <slot />
    </ZLayoutContent>
    <Footer v-if="!footerDisabled" />
  </ZLayout>
</template>
