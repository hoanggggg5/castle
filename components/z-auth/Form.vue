<template>
  <div class="z-auth-form">
    <ZContainer>
      <div class="z-auth-form-title bold-text">
        {{ title }}
      </div>
      <ZForm class="z-form">
        <slot />
      </ZForm>
    </ZContainer>
  </div>
</template>

<script lang="ts">
import { Options, Prop, Vue } from 'vue-property-decorator'

@Options({})
export default class AuthForm extends Vue {
  @Prop() readonly captchaDisabled!: string
  @Prop() readonly title!: string
}
</script>

<style lang="less">
@keyframes AuthFormScale {
  0% {
    transform:scaleX(.9)
  }
  100% {
    transform:scaleX(1)
  }
}

.z-auth-form {
  width: 100%;
  padding-top: 20vh;

  &-title {
    color: @white-color;
    width: 100%;
    text-align: center;
    font-size: 28px;
  }

  .z-container {
    width: 450px;
  }

  .z-form {
    background-color: white;
    border-radius: 4px;
    padding: 19px 24px 24px;
    margin: 24px auto 12px auto;
    animation: AuthFormScale .3s;

    .z-auth-input {
      margin-top: 12px;

      &:first-child {
        margin-top: 0;
      }
    }

    .z-auth-button {
      width: 100%;
      margin: 16px 0;
    }
  }
}
</style>
