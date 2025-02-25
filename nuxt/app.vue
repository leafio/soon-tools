<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
  <UNotifications />
</template>
<script lang="ts" setup>
import { lang } from './i18n'

onMounted(() => {
  lang.value = soon_local.lang.get() ?? 'zh'
})
</script>