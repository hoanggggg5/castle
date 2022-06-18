<template>
  <div class="z-col" @click="$emit('click', $event)">
    <slot />
  </div>
</template>

<style lang="less">
.z-col {
  position: relative;
  width: 100%;
  flex-basis: 0;
  flex-grow: 1;
  max-width: 100%;
}
</style>
