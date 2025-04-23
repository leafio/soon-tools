<template>
  <UDropdownMenu :items="items" :popper="{ placement: 'bottom-start' }">
    <UButton icon="i-fluent-local-language-zi-24-regular" variant="ghost" />
  </UDropdownMenu>
</template>
<script setup lang="ts">

import { lang } from "@/i18n"
import type { DropdownMenuItem } from "@nuxt/ui"

import type { Lang } from "~/i18n/type"
const activeBg = ' bg-primary-200'
const items = computed(() => 
  [{
    label: '中文',
    onSelect: () => handleLangChange('zh'),
    class: lang.value === 'zh' ? activeBg : ''
  },
  {
    label: 'English',
    onSelect: () => handleLangChange('en'),
    class: lang.value === 'en' ? activeBg : ''
  },
  {
    label: '한국어',
    onSelect: () => handleLangChange('ko'),
    class: lang.value === 'ko' ? activeBg : ''
  }
  ]satisfies DropdownMenuItem[]
)


const handleLangChange = (e: Lang) => {
  lang.value = e
  console.log('set-lang',e)
  soon_local.lang.set(lang.value)
}
onMounted(() => {
  watch(
    lang,
    () => {
      document.documentElement.lang = lang.value
    },
    { immediate: true },
  )
})

</script>
