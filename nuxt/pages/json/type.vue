<template>
    <div class="mx-2 flex flex-col h-full">
        <div class="flex items-center my-2 justify-end">
            <div class="flex items-center gap-6">
                <UCheckbox class="cursor-pointer" v-model="options.addExport" label="Export"></UCheckbox>
                <UCheckbox class="cursor-pointer" v-model="options.addDeclare" label="Declare"></UCheckbox>
                <UCheckbox class="cursor-pointer" v-model="options.useInterface" label="Interface"></UCheckbox>

                <UFormGroup :label="t('extract')" class="flex items-center">
                    <UInput type="number" class="ml-1" v-model="options.extract" :min="0"></UInput>
                </UFormGroup>
                <UCheckbox class="cursor-pointer" v-model="options.nullable" label="Nullable"></UCheckbox>
                <UCheckbox class="cursor-pointer" v-model="options.optional" label="Optional"></UCheckbox>
                <UButton @click="handleClick">{{ t("convert") }}</UButton>
            </div>
        </div>

        <div class="flex gap-6 flex-1 pb-1 box-border">
            <div class="w-3/5 h-full relative">
                <CodeMirror v-model="code" class="h-full" />
                <div class="absolute right-0 top-0 flex items-center gap-2">
                    <UButton @click="handelToJs">JS</UButton>
                    <UButton @click="handelToJson">JSON</UButton>
                    <UButton icon="i-fluent-copy-24-regular" @click="handleCopy(code)"></UButton>
                </div>
            </div>

            <div class="w-2/5 h-full relative">
                <CodeMirror :model-value="type" class="h-full" />
                <div class="absolute right-0 top-0">
                    <UButton icon="i-fluent-copy-24-regular" @click="handleCopy(type)"></UButton>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import CodeMirror from "~/components/CodeMirror.vue"
import { lang, tLocales } from "~/i18n"
import { useAppStore } from "~/store/modules/app"
import { parseJSON, json2type } from 'soon-utils'

const t = tLocales({
    zh: {
        convert: "转换",
        copied: "已复制",
        title: 'JSON / JS 转换为 Type',
        extract: '提取Types深度',
        tip: {
            jsonErr: 'JSON 或 JS 输入错误'
        }
    },
    en: {
        convert: "Convert",
        copied: "Copied",
        title: 'JSON / JS Convert to Type',
        extract: 'Extract Types Level',
        tip: {
            jsonErr: 'JSON or JS Error !'
        }
    },
    ko: {
        convert: "변환",
        copied: "복사됨",
        title: 'JSON / JS Type로 변환',
        extract: '추출 Types 깊이',
        tip: {
            jsonErr: 'JSON 또는 JS 오류!'
        }
    },
})
onMounted(() => {
    useAppStore().title = t('title')
    watch(lang, () => useAppStore().title = t('title'))
})

const options = reactive({
    useInterface: false,
    extract: 0,
    addExport:true,
    addDeclare:false,
    optional:false,
    nullable:false,
})
onMounted(() => {
    const config = soon_local.json2type.get()
    if (config) {
        Object.assign(options, config.options)
        code.value=config.code
    }
    watch([options,code], () => {
        soon_local.json2type.set({code:code.value,options})
    }, { deep: true })
})

const demo_code = `{
  code:0,
    msg:'',
    data:{
    total:100,
      "page":1,
      limit:10,
      'user-list':[
        {
          'username':'',
          'create-time':''
        }
      ]
    }
}`
const code = ref(demo_code)
const type = ref("")

const handleClick = async () => {
    let _code = parseJSON(trimCommaOrSemi(code.value))
    if (!_code) { return toast.add({ title: t('tip.jsonErr'), timeout: 1000, color: 'red' }) }

    let result = json2type(_code, "result", options)
        .map((a) => a.code)
        .join("\n\n")

    type.value = await prettierTs(result)
}

const { text, copy, isSupported } = useClipboard()

const toast = useToast()
const handleCopy = (content: string) => {
    if (content)
        copy(content).then(() => {
            toast.add({ title: t('copied'), timeout: 1000 })
        })
}

const handelToJson = async () => {
    const _code = parseJSON(trimCommaOrSemi(code.value))
    if (!_code) { return toast.add({ title: t('tip.jsonErr'), timeout: 1000, color: 'red' }) }

    const json = JSON.stringify(_code)
    const parsed = await prettierJSON(json)
    code.value = parsed

}
const handelToJs = async () => {
    const _code = parseJSON(trimCommaOrSemi(code.value))
    // console.log('ccc', _code)
    if (!_code) { return toast.add({ title: t('tip.jsonErr'), timeout: 1000, color: 'red' }) }

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
