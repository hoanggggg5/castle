<script setup lang="ts">
defineProps<{
  isRouterLink?: boolean
  to?: string
  selected: boolean
}>()

const emit = defineEmits(['click'])
</script>

<template>
  <NuxtLink v-if="isRouterLink && to" :to="to" :class="['z-table-row', { 'z-table-row-selected': selected }]">
    <slot />
  </NuxtLink>
  <div v-else :class="['z-table-row', { 'z-table-row-selected': selected }]">
    <slot />
  </div>
</template>
