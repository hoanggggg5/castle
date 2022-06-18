import type { VueUseNuxtOptions } from '@vueuse/nuxt'
import type { PersistedStateOptions } from '~/types'

/* eslint-disable */

declare module '#app' {
  interface NuxtApp {
    $t: (t: string, p?: Record<string, any>) => string
  }
}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $t: (t: string, p?: Record<string, any>) => string
  }
}

declare module '@nuxt/schema' {
  interface NuxtConfig {
    vueuse?: VueUseNuxtOptions
    unocss?: {}
  }
}

declare module 'pinia' {
  export interface DefineStoreOptions<Id extends string, S extends StateTree, G, A> {
    /**
     * Persist store in storage.
     * @docs https://github.com/prazdevs/pinia-plugin-persistedstate.
     */
    persist?: boolean | PersistedStateOptions
  }
}

export { }
