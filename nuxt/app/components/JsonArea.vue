<template>
    <div class="relative">
        <CodeMirror v-model="code" class="overflow-y-auto h-full" />
        <div class="absolute right-6 top-1 flex items-center gap-2">
            <UButton @click="handelToJs">JS</UButton>
            <UButton @click="handelToJson">JSON</UButton>
            <UButton @click="handleCompressJson">{{ t('compress') }}</UButton>
            <UButton icon="i-fluent-copy-24-regular" @click="handleCopy(code)" />
        </div>
    </div>
</template>
<script setup lang="ts">
import CodeMirror from "~/components/CodeMirror.vue"
import { tLocales } from "~/i18n"
import { parseJSON } from "soon-utils"

const t = tLocales({
    zh: {
        copied: "已复制",
        compress: "压缩 JSON",
        tip: {
            jsonErr: "JSON 或 JS 输入错误",
        },
    },
    en: {
        copied: "Copied",
        compress: "Compress JSON",
        tip: {
            jsonErr: "JSON or JS Error !",
        },
    },
    ko: {
        copied: "복사됨",
        compress: " JSON 압축",
        tip: {
            jsonErr: "JSON 또는 JS 오류!",
        },
    },
})

const code = defineModel<string>({ default: "" })

const { text, copy, isSupported } = useClipboard()

const toast = useToast()
const handleCopy = (content: string) => {
    if (content)
        copy(content).then(() => {
            toast.add({ title: t("copied"), duration: 1000 })
        })
}

const code2json = async (compress?: boolean) => {
    const _code = parseJSON(trimCommaOrSemi(code.value))
    if (!_code) {
        toast.add({ title: t("tip.jsonErr"), duration: 1000, color: "error" })
        return
    }
    let json = JSON.stringify(_code)
    if (!compress) json = await prettierJSON(json)
    code.value = json
}

const handelToJson = async () => {
   await code2json()
}
const handleCompressJson = async () => {
    await code2json(true)
}
const handelToJs = async () => {
    const _code = parseJSON(trimCommaOrSemi(code.value))
    // console.log('ccc', _code)
    if (!_code) {
        toast.add({ title: t("tip.jsonErr"), duration: 1000, color: "error" })
        return
    }

    const json = JSON.stringify(_code)
    // console.log('json', json)
    const parsed = await prettierJs(`(${json})`)
    // console.log('parsed', parsed, getJson(parsed))

    code.value = getJson(parsed)
}
</script>
<style>
.cm-editor {
    height: 100%;
}
</style>
