<script setup lang="ts">
import { RandomString } from '~/mixins'

const emit = defineEmits(['submit'])
const element_id = RandomString()
</script>

<template>
  <form :id="element_id" class="z-form">
    <slot />
  </form>
</template>
