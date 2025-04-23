import { createI18nSafe } from "soon-i18n-vue"

import zh_global from "./locales/zh/global"
import en_global from "./locales/en/global"
import ko_global from "./locales/ko/global"
import type { Lang } from "./type"
const global_locales = { zh: zh_global, en: en_global, ko: ko_global }
export const { tLocales, lang } = createI18nSafe(
  {
    lang: 'en' as Lang,
    fallbacks: ["en"],
  },
  global_locales,
)
 