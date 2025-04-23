<template>
  <div class="flex flex-col h-screen bg-neutral-50 relative overflow-hidden">
    <div class="absolute w-full h-full">
      <!-- 圆点将通过 JavaScript 动态生成 -->
      <div class="absolute rounded-full -bottom-[10vw]  -left-[10vw]  h-[30vw] w-[30vw] bg-[#8dc146] blur-[300px] " ></div>
      <div class="absolute rounded-full  h-[10vw] w-[10vw] bg-[#8dc146] blur-[300px] -right-[5vw] -top-[5vw]" ></div>
    </div>
    <header class="flex items-center justify-between py-1 px-2 z-0">
      <div class="flex items-center">
        <ULink to="/" inactive-class="text-primary" active-class="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">
          <UIcon name="i-fluent-home-12-filled" class="h-6 w-6"></UIcon>
        </ULink>
        <div class="ml-4">{{ title }}</div>
      </div>

      <div class="flex gap-6 items-center">
        <ULink to="/support" inactive-class=" text-green-600 hover:text-green-300" active-class="text-gray-500 ">
          {{ t("support") }}
        </ULink>
        <a href="https://github.com/leafio/soon-tools" target="_blank" class="flex items-center">
          <BIconGithub class="mr-1" />
        </a>
        <LangSwitch />
      </div>
    </header>
    <div class="flex-1 flex gap-2 overflow-auto p-2 z-0">
      <aside class="flex flex-col rounded-lg p-2 gap-2">
        <ULink
          v-for="item in menus"
          :key="item.title"
          :to="item.url"
          class="h-10 hover:bg-gray-200 px-4 rounded-md flex justify-center items-center"
          inactive-class="text-gray-500  hover:text-gray-700 bg-white"
          active-class=" text-green-600 bg-green-100"
        >
          {{ item.title }}
        </ULink>
      </aside>
      <main class="flex-1 flex flex-col h-full overflow-y-auto">
        <slot></slot>
      </main>
    </div>
  </div>
</template>
<script setup lang="ts">
import { tLocales } from "~/i18n"
import { useAppStore } from "~/store/modules/app"
import { BIconGithub } from "bootstrap-icons-vue"

const { title } = storeToRefs(useAppStore())

const t = tLocales({ zh: { support: "支持一下吧！" }, en: { support: "Support Me!" }, ko: { support: `지원해주세요!` } })

useSeoMeta({
  title: "Soon Tools",
  description: "Convert Json/Js to typescript types/interfaces easily.  Json/Js 转换至typescript types .",
})

const menus = [
  {
    title: "  JSON Typescript",
    url: "/json/type",
  },
  {
    title: " JSON Excel",
    url: "/json/excel",
  },
]

const route = useRoute()

watch(
  () => route,
  () => {
    console.log("route", route)
  },
  {
    deep: true,
  },
)
</script>
