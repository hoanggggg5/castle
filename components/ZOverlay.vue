<script setup lang="ts">
const emit = defineEmits(['click', 'click-outside'])
const instance = getCurrentInstance()

onMounted(() => {
  onClickOutside(instance?.proxy?.$el, (event) => {
    emit('click-outside', event)
  })
})
</script>

<template>
  <div class="z-overlay" @click="emit('click', $event)">
    <slot />
  </div>
</template>

<style lang="less">
.z-overlay {
  position: absolute;
}
</style>
