import { defineNuxtConfig } from 'nuxt'
import colors from './colors'

export default defineNuxtConfig({
  buildModules: [
    '@vueuse/nuxt',
    '@pinia/nuxt',
    'nuxt-windicss',
  ],
  vueuse: {
    ssrHandlers: true,
  },
  build: {
    loaders: {
      less: {
        lessOptions: {
          javascriptEnabled: true,
        },
      },
    },
    babel: {
      plugins: ['@vue/babel-plugin-jsx'],
    },
    transpile: ['@antv/g2'],
  },
  vite: {
    build: {
      chunkSizeWarningLimit: 1500,
    },
    css: {
      preprocessorOptions: {
        less: {
          additionalData: (function () {
            let variables = ''

            for (const key in colors) {
              const variable = `@${key}`
              const color = colors[key]

              variables += `${variable}: ${color};\n`
            }

            return variables
          }()),
        },
      },
    },
  },
})
