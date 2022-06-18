<script setup lang="ts">
import ZEventBus from '~/library/ZEventBus'
import { Placement } from '~/types'

const childrens = reactive<any[]>([])

const lstMessageTopCenter = computed(() => {
  return childrens.filter(child => child.key.includes(Placement.TopCenter))
})

const lstMessageTopRight = computed(() => {
  return childrens.filter(child => child.key.includes(Placement.TopRight))
})

onMounted(() => {
  ZEventBus.on('z-new-message', appendNewMessage)
  ZEventBus.on('z-remove-message', removeMessage)
})

onBeforeUnmount(() => {
  ZEventBus.off('z-new-message', appendNewMessage)
  ZEventBus.off('z-remove-message', removeMessage)
})

function removeMessage(key: any) {
  const index = childrens.findIndex(child => child.key === key)

  if (index === -1) return
  childrens.splice(index, 1)
}

function appendNewMessage(message: any) {
  childrens.push(message)
}
</script>

<template>
  <div class="z-message-group">
    <div class="z-message-group-topCenter">
      <transition-group name="z-message-group-topCenter" tag="div">
        <template v-for="child in lstMessageTopCenter" :key="child.key">
          <component :is="child" />
        </template>
      </transition-group>
    </div>
    <div class="z-message-group-topRight">
      <transition-group name="z-message-group-topRight" tag="div">
        <template v-for="child in lstMessageTopRight" :key="child.key">
          <component :is="child" />
        </template>
      </transition-group>
    </div>
  </div>
</template>

<style lang="less">
.z-message {
  position: relative;
  display: flex;
  background-color: @white-color;
  padding: 8px 12px;
  margin-bottom: 8px;
  overflow: hidden;
  border-radius: 2px;
  box-shadow: 0 4px 12px rgba(140, 162, 214, 0.1);
  transition: all 0.3s;

  &-icon {
    font-size: 16px;
    margin-right: 8px;
  }

  &-group {
    &-topCenter {
      position: fixed;
      top: 55px;
      left: 50%;
      transform: translateX(-50%);
      opacity: 1;

      &-enter-active, &-leave-active {
        transition: all 0.3s;
      }

      &-enter-active, &-leave-to {
        opacity: 0;
        transform: translateY(-100%);
      }
    }
  }

  &-content {
    display: flex;
    justify-content: center;
    flex-flow: column;
    flex-direction: column;
  }

  &-title {
    display: inline-block;
    padding-right: 24px;
    font-size: 16px;
    line-height: 24px;
  }

  &-title + &-description {
    margin-top: 8px;
  }

  &-description {
    font-size: 14px;
    font-weight: normal;
  }

  &-close {
    font-size: 12px;
    cursor: pointer;
    position: absolute;
    right: 14px;
    color: @gray-color;
    transition: all 0.3s;

    &:hover {
      color: @action-color;
    }
  }
}
</style>
