<template>
  <div class="flex flex-col  h-svh">
    <div class="  flex items-center justify-between  py-1 px-2 bg-lime-50">
      <div class="flex items-center">
        <ULink to="/" inactive-class="text-primary"
          active-class="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">
          <UIcon name="i-fluent-home-12-filled" class="h-6 w-6"></UIcon>
        </ULink>
        <div class="ml-4">{{ title }}</div>
      </div>

      <div class="flex gap-6 items-center">
        <ULink to="/support" inactive-class="text-primary"
          active-class="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">
          {{ t('support') }}
        </ULink>
        <a href="https://github.com/leafio/soon-tools" target="_blank" class="flex items-center ">
          <BIconGithub class="mr-1" />
        </a>
        <LangSwitch />
      </div>
    </div>
    <main class=" flex-1">
      <slot></slot>
    </main>

  </div>
</template>
<script setup lang="ts">
import { tLocales } from '~/i18n'
import { useAppStore } from '~/store/modules/app'
import { BIconGithub } from "bootstrap-icons-vue"

const { title } = storeToRefs(useAppStore())

const t = tLocales({ zh: { support: '支持一下吧！' }, en: { support: 'Support Me!' }, ko: { support: `지원해주세요!` } })

useSeoMeta({
  title: 'Soon Tools',
  description: 'Convert Json/Js to typescript types/interfaces easily.  Json/Js 转换至typescript types .',
})


</script>
