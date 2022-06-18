<script setup lang="ts">
const props = defineProps<{
  title?: string
  headClass?: string
  contentClass?: string
}>()

const headEnabled = computed(() => props.title || getCurrentInstance()?.proxy?.$slots.head)
const emit = defineEmits(['click'])
</script>

<template>
  <div :class="['z-card', 'shadow-md', { 'z-card-headable': headEnabled }]" @click="emit('click', $event)">
    <div class="z-card-overall">
      <div v-if="headEnabled" :class="['z-card-head', headClass]">
        <template v-if="title">
          <h1 class="z-card-title bold-text text-xl">
            {{ title }}
          </h1>
        </template>
        <slot name="head" />
      </div>
      <div :class="['z-card-content', contentClass]">
        <slot />
      </div>
    </div>
  </div>
</template>

<style lang="less">
.z-card {
  position: relative;
  background-color: @card-background;
  padding: 16px 24px;
  border-radius: 4px;

  &-overall {
    position: relative;
    width: 100%;
    height: 100%;
    transition: all 0.1s linear;
  }

  &-head, &-headable &-content {
    height: calc(100% - 32px);
    position: relative;
  }

  &-head {
    display: flex;
    align-items: center;
    font-size: 16px;

    i {
      margin-right: 6px;
      font-size: 18px;
    }
  }

  &-content {
    height: 100%;
  }
}
</style>
