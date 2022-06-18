<script lang="ts">
import { Options, Ref, Watch, mixins } from 'vue-property-decorator'
import { setup } from 'vue-class-component'
import { AuthMixin, ButtonDisabled } from '@/mixins'
import type ZButton from '~/components/ZButton.vue'
import config from '~/config'

@Options({})
export default class PageLogin extends mixins(AuthMixin, ButtonDisabled) {
  @Ref('delay-button-email') DelayButtonEmail!: ZButton
  @Ref('delay-button-phone') DelayButtonPhone!: ZButton

  // setupContext = setup(() => {
  //   definePageMeta({
  //     middleware: ['guest-only'],
  //   })

  //   return {}
  // })

  config = config

  button_rules = [
    {
      key: 'email',
      required: true,
    }, {
      key: 'password',
      required: true,
    },
  ]

  beforeUnmount() {
    this.userStore.need_2fa = false
    this.userStore.need_email = false
    this.userStore.need_phone = false
  }

  GenerateLoginCodeEmail() {
    this.userStore.GenerateCodeLogin(this.email, 'email', this.DelayButtonEmail.StartDelay)
  }

  GenerateLoginCodePhone() {
    this.userStore.GenerateCodeLogin(this.email, 'phone', this.DelayButtonPhone.StartDelay)
  }

  @Watch('userStore.need_2fa')
  onNeed2FAChanged(need_2fa: boolean) {
    if (need_2fa) {
      this.button_rules.push({
        key: 'otp_code',
        required: true,
      })
    }
  }

  @Watch('userStore.need_email')
  onNeedEmailChanged(need_email: boolean) {
    if (need_email) {
      this.button_rules.push({
        key: 'email_code',
        required: true,
      })
    }
  }

  @Watch('userStore.need_phone')
  onNeedPhoneChanged(need_phone: boolean) {
    if (need_phone) {
      this.button_rules.push({
        key: 'phone_code',
        required: true,
      })
    }
  }
}
</script>

<template>
  <ZLayoutContent>
    <ZAuthForm :title="$t('page.login.form.login.title', { name: config.name })" @submit.prevent="login">
      <template v-if="!userStore.need_2fa && !userStore.need_email && !userStore.need_phone">
        <ZAuthInput
          v-model="email"
          name="email"
          :placeholder="$t('page.global.placeholder.email')"
          :required="true"
          :error="email_error"
        />
        <ZAuthInput
          v-model="password"
          name="password"
          type="password"
          :placeholder="$t('page.global.placeholder.password')"
          :required="true"
          :error="email_code_error"
        />
      </template>
      <template v-else>
        <ZAuthInput
          v-if="userStore.need_email"
          v-model="email_code"
          name="email_code"
          type="text"
          :label="$t('page.global.label.email_code')"
          :placeholder="$t('page.global.placeholder.e-confirmation_code')"
          :max-length="6"
          :required="true"
          :error="email_code_error"
        >
          <template #suffix>
            <ZButton
              ref="delay-button-email"
              :delay="{
                time: 60,
                content: 'Get [#{time}] again',
              }"
              @click="GenerateLoginCodeEmail"
            >
              Get Code
            </ZButton>
          </template>
        </ZAuthInput>
      </template>
      <ZAuthButton type="submit" :loading="loading || userStore.isAuthenticated" :disabled="button_disabled">
        {{ $t("page.global.action.login") }}
      </ZAuthButton>

      <div class="page-login-links">
        <nuxt-link to="/forgot-password" class="bold-text">
          {{ $t("page.global.action.forgot_password") }}
        </nuxt-link>
        <nuxt-link to="/register" class="bold-text">
          {{ $t("page.global.action.register") }}
        </nuxt-link>
      </div>
    </ZAuthForm>
  </ZLayoutContent>
</template>

<style lang="less">
@import '~/assets/styles/layouts/auth.less';

.page-login {
  &-links {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
