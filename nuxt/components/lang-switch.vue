<template>
  <UDropdown :items="items" :popper="{ placement: 'bottom-start' }">
    <UButton icon="i-fluent-local-language-zi-24-regular" color="gray" />
  </UDropdown>
</template>
<script setup lang="ts">

import { lang } from "@/i18n"

import type { Lang } from "~/i18n/type"
const activeBg = ' bg-primary-200'
const items = computed(() => [
  [{
    label: '中文',
    click: () => handleLangChange('zh'),
    class: lang.value === 'zh' ? activeBg : ''
  },
  {
    label: 'English',
    click: () => handleLangChange('en'),
    class: lang.value === 'en' ? activeBg : ''
  },
  {
    label: '한국어',
    click: () => handleLangChange('ko'),
    class: lang.value === 'ko' ? activeBg : ''
  }
  ]
])


const handleLangChange = (e: Lang) => {
  lang.value = e
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
