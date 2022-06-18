<template>
  <Transition name="z-loading">
    <div class="z-loading">
      <span class="z-loading-icon">
        <span class="z-loading-icon-inner" />
      </span>
    </div>
  </Transition>
</template>

<style lang="less">
@keyframes z-loading-icon {
  0% {
    transform: rotate(0deg);
  }

  25% {
    transform: rotate(180deg);
  }

  50% {
    transform: rotate(180deg);
  }

  75% {
    transform: rotate(360deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

@keyframes z-loading-icon-inner {
  0% {
    height: 0%;
  }

  25% {
    height: 0%;
  }

  50% {
    height: 100%;
  }

  75% {
    height: 100%;
  }

  100% {
    height: 0%;
  }
}

.z-loading {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: @card-background;
  text-align: center;
  opacity: 1;
  top: 0;
  left: 0;
  transform: none;
  transition: all 0.3s;
  z-index: 999;

  &-enter,
  &-leave-active {
    width: 0;
    height: 0;
    opacity: 0.5;
    top: -50%;
    left: 50%;
    transform: translate(-50%, 0);
  }

  .z-loading-icon {
    display: inline-block;
    width: 60px;
    height: 60px;
    position: relative;
    border: 6px solid @primary-color;
    top: calc(50% - 30px);
    animation: z-loading-icon 3s infinite ease;
  }

  .z-loading-icon-inner {
    vertical-align: top;
    display: inline-block;
    width: 100%;
    background-color: @primary-color;
    animation: z-loading-icon-inner 3s infinite ease-in;
  }
}
</style>
