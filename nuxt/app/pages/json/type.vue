<template>
    <div class="mx-2 flex flex-col flex-1 overflow-y-auto ">
        <div class="flex items-center my-2 justify-end">
            <div class="flex items-center gap-6">
                <UCheckbox v-model="options.addExport" class="cursor-pointer" label="Export"/>
                <UCheckbox v-model="options.addDeclare" class="cursor-pointer" label="Declare"/>
                <UCheckbox v-model="options.useInterface" class="cursor-pointer" label="Interface"/>

                <UFormField :label="t('extract')" class="flex items-center">
                    <UInput v-model="options.extract" type="number" class="ml-1" :min="0"/>
                </UFormField>
                <UCheckbox v-model="options.nullable" class="cursor-pointer" label="Nullable"/>
                <UCheckbox v-model="options.optional" class="cursor-pointer" label="Optional"/>
                <UButton @click="handleClick">{{ t("convert") }}</UButton>
            </div>
        </div>

        <div class="flex gap-6 flex-1 pb-1 box-border overflow-y-auto">
            <JsonArea v-model="code" class="w-3/5 overflow-y-auto "/>

            <div class="w-2/5 relative overflow-y-auto">
                <CodeMirror :model-value="type" class="h-full overflow-y-auto" />
                <div class="absolute right-0 top-0">
                    <UButton icon="i-fluent-copy-24-regular" @click="handleCopy(type)"/>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import CodeMirror from "~/components/CodeMirror.vue"
import JsonArea from "~/components/JsonArea.vue"
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
    addExport: true,
    addDeclare: false,
    optional: false,
    nullable: false,
})
onMounted(() => {
    const config = soon_local.json2type.get()
    if (config) {
        Object.assign(options, config.options)
        code.value = config.code
    }
    watch([options, code], () => {
        soon_local.json2type.set({ code: code.value, options })
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
    const _code = parseJSON(trimCommaOrSemi(code.value))
    if (!_code) { 
         toast.add({ title: t('tip.jsonErr'), duration: 1000, color: 'error' }) 
    return}

    const result = json2type(_code, "result", options)
        .map((a) => a.code)
        .join("\n\n")

    type.value = await prettierTs(result)
}

const { text, copy, isSupported } = useClipboard()

const toast = useToast()
const handleCopy = (content: string) => {
    if (content)
        copy(content).then(() => {
            toast.add({ title: t('copied'), duration: 1000 })
        })
}


</script>
<style>
.cm-editor {
    height: 100%;
}
</style>
