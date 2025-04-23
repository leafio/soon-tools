<template>
  <UApp>
    <NuxtLayout>
    <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>
<script lang="ts" setup>
import { lang } from './i18n'
onMounted(() => {
  lang.value = soon_local.lang.get() ?? 'zh'
})
</script>