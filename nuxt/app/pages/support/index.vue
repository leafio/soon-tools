<template>
    <div class="page-container">
      <div class="m-6 lg:m-12">
        <div class="text-4xl mb-2">{{ t("msg") }}</div>
  
        <div class="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-6 p-8
">
          <div v-for="(item, index) in list" :key="index" class=" shadow-xl p-4 rounded-2xl backdrop-blur-lg bg-purple-100/30 ">
            <h3 class="text-3xl">{{ item.title }}</h3>
            <div class="mt-2">{{ item.description }}</div>
            <div class="mt-2">
              <UBadge v-for="tag in item.tags" :key="tag" class="mr-2 mb-1">{{ tag }}</UBadge>
            </div>
            <a :href="item.github" target="_blank" class="flex items-center mt-2 text-sm"> <BIconGithub class="mr-1" /> {{ item.github }} </a>
          </div>
        </div>
      </div>
    </div>
  </template>
  <script setup lang="ts">
  import { lang, tLocales } from "@/i18n"
  import { BIconGithub } from "bootstrap-icons-vue"
import { useAppStore } from "~/store/modules/app"
  useAppStore().title = ''
  const t = tLocales({ zh: { msg: "请给个star支持一下吧" }, en: { msg: "Your star is important for me" } })
  
  const zh = [
  {
      title: "soon-admin-vue3",
      description: "vue3，完全 script setup 写成",
      tags: ["多标签", "i18n", "table页模板", "支持mobile"],
      github: "https://github.com/leafio/soon-admin-vue3",
    },
  {
      title: "soon-admin-react-nextjs",
      description: "next15 react19",
      tags: ["i18n", "table页模板", "支持mobile"],
      github: "https://github.com/leafio/soon-admin-react-nextjs",
    },
    {
      title: "soon-admin-express",
      description: "typescript，prisma",
      tags: ["接口级权限管理", "与登录接口结合的图片验证码"],
      github: "https://github.com/leafio/soon-admin-express",
    },
    {
      title: "soon-mock",
      description: "一键生成增删查改, apifox本地化替代",
      tags: ["数据持久化", "jwt授权", "接口级权限控制", "未mock接口可转发其他服务端"],
      github: "https://github.com/leafio/soon-mock",
    },
    {
      title: "soon-fetch",
      description: "基于fetch,不到3K,axios替代",
      tags: ["超时断开", "快速定义api方法", "解析rest url 参数"],
      github: "https://github.com/leafio/soon-fetch",
    },
    {
      title: "soon-i18n",
      description: "react , vue , svelte , solid 均可使用的i18n库",
      tags: ["不到3K", "ts智能提醒", "适配框架, 数据状态不丢失"],
      github: "https://github.com/leafio/soon-i18n",
    },
    {
      title: "soon-storage",
      description: "用TS 对 localStorage / sessionStorage 类型安全封装",
      tags: ["type-safe", "localStorage", "sessionStorage"],
      github: "https://github.com/leafio/soon-storage",
    },
    {
      title: "react-vmodel",
      description: "像v-model一样，简单、快捷地双向绑定",
      tags: ["ts智能提醒", "兼容 antd 、material ui"],
      github: "https://github.com/leafio/react-vmodel",
    },

  ]
  const en = [
  {
      title: "soon-admin-vue3",
      description: "vue3, totally written in script setup",
      tags: ["multi-tabs", "i18n", "table page template", "support pc and mobile"],
      github: "https://github.com/leafio/soon-admin-vue3",
    },
    {
      title: "soon-admin-react-nextjs",
      description: "next15 react19",
      tags: ["i18n", "table page template", "support pc and mobile"],
      github: "https://github.com/leafio/soon-admin-react-nextjs",
    },
    {
      title: "soon-admin-express",
      description: "typescript，prisma",
      tags: ["api level auth", " captcha combined login api"],
      github: "https://github.com/leafio/soon-admin-express",
    },
    {
      title: "soon-mock",
      description: "generate rest apis by just one press",
      tags: ["data persistence ", "jwt", "api level auth", "url redirect"],
      github: "https://github.com/leafio/soon-mock",
    },
    {
      title: "soon-fetch",
      description: "alternative for axios, based on fetch",
      tags: ["timeout disconnect", "fast define api", "restful url parse"],
      github: "https://github.com/leafio/soon-fetch",
    },
    {
      title: "soon-i18n",
      description: "i18n lib for react , vue , svelte , solid ...",
      tags: ["less than 3K", "ts prompt", "state keeping"],
      github: "https://github.com/leafio/soon-i18n",
    },
    {
      title: "soon-storage",
      description: "type-safe wrapper for localStorage / sessionStorage",
      tags: ["type-safe", "localStorage", "sessionStorage"],
      github: "https://github.com/leafio/soon-storage",
    },
    {
      title: "react-vmodel",
      description: "like v-model, simple and fast two-way binding",
      tags: ["ts prompt", "could use with antd 、material ui"],
      github: "https://github.com/leafio/react-vmodel",
    },
   
  ]
  
  const data = {
    zh,
    en,
    ko: en,
  }
  const list = computed(() => data[lang.value as "zh"])
  </script>
  