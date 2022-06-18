import { acceptHMRUpdate, defineStore } from 'pinia'
import { useAssetsStore } from './assets'
// import { useWebSocketStore } from './websocket'
import type { Activity, ActivityResult, ActivityTopic, Device, WithdrawLimit } from '~/models'
import { UserState, WebSocketType } from '~/types'
import ZMessage from '~/library/z-message'

export const useUserStore = defineStore({
  id: 'user',
  state() {
    return {
      _cache: reactive({
        email: '',
        code: '',
      }),

      email: ref<string>(),
      uid: ref<string>(),
      level: ref<number>(0),
      state: ref<UserState>(),
      role: ref<string>(),
      group: ref<string>(),
      labels: ref<any[]>([]),
      withdraw_limit: ref<WithdrawLimit>(),
      otp: ref<boolean>(false),
      phone: ref<string>(),
      username: ref<string>(),

      need_2fa: ref<boolean>(),
      need_email: ref<boolean>(),
      need_phone: ref<boolean>(),
    }
  },
  getters: {
    isAuthenticated(): boolean {
      return !!this.state && this.state !== UserState.Loading
    },
    isPending(): boolean {
      return this.state === UserState.Pending
    },
  },
  actions: {
    auth_loading() {
      this.state = UserState.Loading
    },
    auth_error() {
      this.state = undefined
      this.email = undefined
      this.uid = undefined
      this.role = undefined
      this.level = 0
      this.labels = []
      this.otp = false
      this.phone = undefined
      this.username = undefined

      if (process.client) localStorage.removeItem('csrf_token')
    },
    async auth_success(payload: any) {
      const old_state = this.state

      this.state = payload.state
      this.email = payload.email
      this.uid = payload.uid
      this.role = payload.role
      this.level = payload.level
      this.labels = payload.labels
      this.otp = payload.otp
      this.phone = payload.phone
      this.username = payload.username

      this.need_2fa = false
      this.need_phone = false
      this.need_email = false

      if (payload.csrf_token) localStorage.setItem('csrf_token', payload.csrf_token)

      if (process.server) {
        const assetsStore = useAssetsStore()

        await Promise.all([
          assetsStore.GetAllAssets(),
          this.FetchTradeProfile(),
        ])

        return
      }

      const router = useRouter()

      if (this.isPending) {
        if (process.client) {
          router.push('/confirm-email')
        }
      } else if (this.state === UserState.Active && old_state !== this.state) {
        const assetsStore = useAssetsStore()
        // const websocketStore = useWebSocketStore()

        await Promise.all([
          assetsStore.GetAllAssets(),
          this.FetchTradeProfile(),
        ])

        if (process.client) {
          router.push('/')
        }

        // websocketStore.subscribe(WebSocketType.Private, 'balance', 'order', 'trade')
        // websocketStore.connect(WebSocketType.Private)
      }
    },
    LoopGetLogged() {
      setTimeout(async () => {
        await this.GetLogged()
        if (this.state !== undefined) this.LoopGetLogged()
      }, 150000)
    },
    async GetLogged() {
      try {
        const { data } = await useBetterFetch('auth/resource/users/me')

        this.auth_success(data)
      } catch (error) {
        this.auth_error()
        return error
      }
    },
    async FetchTradeProfile() {
      try {
        const { data } = await useBetterFetch<{ group: string; withdraw_limit: WithdrawLimit }>('trade/account/members/me')

        this.group = data.group
        this.withdraw_limit = data.withdraw_limit
      } catch (error) {
        return error
      }
    },
    async Login(email: string, password: string, codes: Record<string, string>) {
      this.auth_loading()
      try {
        const { data } = await useBetterFetch('auth/identity/sessions', {
          method: 'POST',
          body: {
            email,
            password,
            ...codes,
          },
        })
        await this.auth_success(data)
        await this.FetchTradeProfile()
        this.LoopGetLogged()
      } catch (error: any) {
        this.auth_error()
        const data: { errors: string[]; phone: boolean; otp: boolean } = error.response.data
        if (error.response.status === 401) {
          this.need_2fa = data.otp
          this.need_phone = data.phone
          this.need_email = data.errors.includes('identity.session.missing_email_code')
        }
      }
    },
    async GenerateCodeLogin(email: string, type: 'email' | 'phone', callback?: () => void) {
      try {
        await useBetterFetch('auth/identity/sessions/generate_code', {
          method: 'POST',
          body: { email, type },
        })
        ZMessage.success({
          message: `Code was sent to your ${type}`,
        })
        if (callback) callback()
      } catch (error) {
        return error
      }
    },
    async GenerateCode(type: 'email' | 'phone', category: string, callback?: () => void) {
      try {
        await useBetterFetch('auth/resource/code', {
          method: 'POST',
          body: { type, category },
        })
        ZMessage.success({
          message: `Code was sent to your ${type}`,
        })
        if (callback) callback()
      } catch (error) {
        return error
      }
    },
    async Register(email: string, password: string) {
      this.auth_loading()
      try {
        const { data } = await useBetterFetch('auth/identity/users', {
          method: 'POST',
          body: { email, password },
        })
        await this.auth_success(data)
      } catch (error) {
        this.auth_error()
      }
    },
    GenerateCodeConfirmEmail(email: string) {
      return useBetterFetch('auth/identity/users/email/generate_code', {
        method: 'POST',
        body: { email },
      })
    },
    async ConfirmEmail(email: string, code: string) {
      try {
        await useBetterFetch('auth/identity/users/email/confirm_code', {
          method: 'POST',
          body: { email, code },
        })
        this.state = UserState.Active
        await this.auth_success(this)
        ZMessage.success({
          message: 'Success',
        })
        this.LoopGetLogged()
      } catch (error) {
        return error
      }
    },
    async ForgotPassword(email: string, callback?: () => void) {
      try {
        await useBetterFetch('auth/identity/users/password/generate_code', {
          method: 'POST',
          body: { email },
        })
        if (callback) callback()
      } catch (error) {
        return error
      }
    },
    async CheckCodeResetPassword(email: string, code: string, callback?: () => void) {
      try {
        await useBetterFetch('auth/identity/users/password/check_code', {
          method: 'POST',
          body: { email, code },
        })
        this._cache.code = code
        this._cache.email = email

        useRouter().push('/reset-password')
        if (callback) callback()
      } catch (error) {
        return error
      }
    },
    async ResetPassword(email: string, code: string, password: string, confirm_password: string) {
      try {
        await useBetterFetch('auth/identity/users/password/confirm_code', {
          method: 'POST',
          body: {
            email,
            code,
            password,
            confirm_password,
          },
        })
      } catch (error) {
        return error
      }
    },
    async Logout() {
      try {
        await useBetterFetch('auth/identity/sessions', {
          method: 'DELETE',
        })
        this.auth_error()
        useRouter().push('/')
        ZMessage.success({
          message: 'Success',
        })
      } catch (error) {
        return error
      }
    },
    FetchActivity(topic: ActivityTopic, result: ActivityResult, limit = 100) {
      return useBetterFetch<Activity[]>(`auth/resource/users/activity/${topic}?result=${result}&limit=${limit}`)
    },
    FetchSessions() {
      return useBetterFetch<Device[]>('auth/resource/users/devices')
    },
    async DestroySession(session_id: string, callback?: () => void) {
      try {
        await useBetterFetch(`auth/resource/users/devices/${session_id}`, {
          method: 'DELETE',
        })
        if (callback) callback()
      } catch (error) {
        return error
      }
    },
  },
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
