<template>
  <div class="z-layout">
    <slot />
  </div>
</template>

<style lang="less">
.z-layout {
  display: flex;
  flex: auto;
  flex-direction: column;
  min-height: 100vh;
  background: @layout-background-color;
  color: @text-color;
  font-size: 14px;
  font-family: URWDIN-Regular,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol;
  font-weight: 400;
  caret-color: @primary-color;

  &, * {
    box-sizing: border-box;
  }
}
</style>
