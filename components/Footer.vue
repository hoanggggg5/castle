<template>
  <footer class="z-footer">
    <div class="z-container z-footer-menu">
      <div class="z-footer-nav">
        <a href="#" class="z-footer-logo">
          <img src="@/assets/img/rectangular_logo.png">
        </a>
        <div class="z-footer-nav-desc">
          A Service build by Hữu Hà for fun
        </div>
        <div class="z-footer-nav-social-network">
          <a href="https://t.me/huuhait">
            <ZIcon target="_blank" type="telegram" />
          </a>
        </div>
      </div>
      <div class="z-footer-nav">
        <div class="z-footer-nav-title">
          Example
        </div>
        <a href="#" class="z-footer-nav-item">Example</a>
        <a href="#" class="z-footer-nav-item">Example</a>
        <a href="#" class="z-footer-nav-item">Example</a>
        <a href="#" class="z-footer-nav-item">Example</a>
      </div>
      <div class="z-footer-nav">
        <div class="z-footer-nav-title">
          Example
        </div>
        <a href="#" class="z-footer-nav-item">Example</a>
        <a href="#" class="z-footer-nav-item">Example</a>
        <a href="#" class="z-footer-nav-item">Example</a>
        <NuxtLink class="z-footer-nav-item" to="/fees">
          Fees
        </NuxtLink>
      </div>
      <div class="z-footer-nav">
        <div class="z-footer-nav-title">
          Contact Us
        </div>
        <div class="z-footer-nav-item">
          Service: business@zsmart.tech
        </div>
        <div class="z-footer-nav-item">
          Business: business@zsmart.tech
        </div>
        <div class="z-footer-nav-item">
          Facebook: <a href="https://fb.com/huuhait">Hữu Hà</a>
        </div>
      </div>
    </div>
    <div class="z-footer-bottom">
      © 2019-2021 <a href="#">ZSmartex</a>. All rights reserved.
    </div>
  </footer>
</template>

<style lang="less">
.z-footer {
  width: 100%;
  padding: 0 16px;
  background-color: @layout-footer-background-color;
  color: @white-color;
  font-weight: 500;

  &-logo {
    display: block;
    width: 150px;

    img {
      width: 100%;
    }
  }

  &-menu {
    display: flex;
    padding-top: 30px;
    padding-bottom: 10px;
  }

  &-nav {
    flex: 1;
    margin-bottom: 1em;

    &-social-network {
      display: flex;
      font-size: 32px;
      margin-top: 16px;

      a {
        margin-left: 16px;

        &:first-child {
          margin-left: 0;
        }
      }
    }

    &-desc {
      margin-top: 16px;
      margin-left: 8px;
      font-size: 14px;
    }

    &-title {
      margin-bottom: 24px;
      font-size: 16px;
    }

    a {
      color: @action-color;
    }

    &-item {
      display: block;
      color: @action-color;
      line-height: 25px;
    }
  }

  &-bottom {
    text-align: center;
    font-size: 14px;
    padding: 16px 0;
    border-top: 1px solid @dropdown-border-color;
    color: @action-color;
  }
}
</style>
