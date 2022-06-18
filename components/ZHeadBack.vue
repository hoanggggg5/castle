<script setup lang="ts">
defineProps<{ to: string }>()
</script>

<template>
  <NuxtLink class="z-back" :to="to" tag="div">
    <ZIcon type="back" />
    <h3 class="z-back-title">
      <slot />
    </h3>
  </NuxtLink>
</template>

<style lang="less">
.z-back {
  display: flex;
  height: 35px;
  line-height: 35px;
  align-items: center;
  font-size: 22px;
  color: @text-color !important;
  cursor: pointer;

  &-title {
    font-size: 24px;
    margin-left: 12px;
    margin-bottom: 0;
  }
}
</style>
