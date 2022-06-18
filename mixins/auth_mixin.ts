import { Options, Vue, Watch } from 'vue-property-decorator'
import { UserState } from '~/types'
import ZMessage from '@/library/z-message'
import { useUserStore } from '~/stores/user'

@Options({
  computed: {
    loading() {
      return this.$data.self_loading || this.userStore.state === UserState.Loading
    },
  },
})
export class AuthMixin extends Vue {
  private self_loading = false

  userStore = useUserStore()

  loading!: boolean
  email = ''
  password = ''
  email_code = ''

  code = ''

  step = 1

  get email_error() {
    if (this.email.length === 0) return

    const valid = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(this.email)

    if (!valid) return 'page.global.input.error.email'
  }

  get password_error() {
    return this.valid_password(this.password)
  }

  get email_code_error() {
    const { email_code } = this

    if (email_code.length && email_code.length !== 6) {
      return 'page.global.input.error.email_code'
    }
  }

  valid_password(password: string) {
    const regex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/

    if (password.length && !regex.test(password)) {
      return 'page.global.input.error.password'
    }
  }

  login() {
    this.userStore.Login(this.email, this.password, {
      email_code: this.email_code,
    })
  }

}
