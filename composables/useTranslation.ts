import { enUS } from '~/locales'

export const useTranslation = (t: string, named?: Record<string, any>) => {
  let v = enUS[t]

  for (const n in named) {
    v = v.replace(`{${n}}`, named[n])
  }

  return v
}
