<script setup lang="ts">
withDefaults(defineProps<{ label: string; required: boolean }>(), {
  required: false,
})
</script>

<template>
  <div class="z-form-row">
    <div class="z-form-row-label">
      {{ label }} <span v-if="required" class="text-down">(*)</span>
    </div>
    <div class="z-form-row-content">
      <slot />
    </div>
  </div>
</template>

<style lang="less">
.z-form-row {
  &-label {
    margin-bottom: 4px;
  }

  & + & {
    margin-top: 16px;
  }
}
</style>
