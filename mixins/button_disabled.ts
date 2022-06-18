import { Options, Vue } from 'vue-property-decorator'
import type { DisabledRule } from '~/types'

@Options({})
export class ButtonDisabled extends Vue {
  button_rules!: DisabledRule[]

  get button_disabled() {
    const that = this as any

    return this.button_rules.map((rule) => {
      if (rule.required) return !that[rule.key]
      return !!(that[`${rule.key}_error`] as string)
    }).reduce((a, b) => a || b, false)
  }
}
