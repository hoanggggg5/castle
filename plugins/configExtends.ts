import { defineNuxtPlugin } from '#app'
import { enUS } from '~/locales'

export default defineNuxtPlugin(async(nuxtApp) => {
  nuxtApp.vueApp.config.globalProperties.$t = (t: string, named: Record<string, any>) => {
    let v = enUS[t]

    for (const n in named) {
      v = v.replace(`{${n}}`, named[n])
    }

    return v
  }
})
