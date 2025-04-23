<template>
  <div class="mx-2 flex flex-col flex-1 overflow-y-auto">
    <div class="flex items-center my-2 justify-between">
      <div>
        <el-upload
          ref="upload"
          v-model="fileList"
          :limit="1"
          :on-change="onFileChange"
          :auto-upload="false"
          :show-file-list="false"
          :on-exceed="handleExceed"
        >
          <template #trigger>
            <UButton>{{ t("uploadExcel") }}</UButton>
          </template>
        </el-upload>
      </div>
      <div>
        <UTabs v-model="selectedTab" class="flex min-w-96" :items="items" />
      </div>
      <div class="flex items-center gap-6">
        <UCheckbox v-model="options.allowJson" class="cursor-pointer" label="JSON" />
        <UCheckbox v-model="options.allowNull" class="cursor-pointer" label="Null" />
        <UFormField :label="t('headers')" class="flex items-center">
          <UInput v-model="options.targetDepth" type="number" class="ml-1 w-24" :min="1" />
        </UFormField>
        <UButton @click="handleDownloadExcel">{{ t("downLoadExcel") }}</UButton>
      </div>
    </div>
    <div class="flex flex-col gap-6 flex-1 pb-1 box-border overflow-y-auto">
      <JsonArea v-show="selectedTab === '0'" v-model="code" class="overflow-auto" />
      <el-table v-show="selectedTab === '1'" :data="json_list" style="width: 100%">
        <TableColumn
          v-for="col in colTree"
          :key="col.path"
          :column="col"
          v-bind="options"
          min-width="100"
        />
      </el-table>
    </div>
  </div>
</template>

<script setup lang="tsx">
import CodeMirror from "~/components/CodeMirror.vue";
import JsonArea from "~/components/JsonArea.vue";
import { lang, tLocales } from "~/i18n";
import { useAppStore } from "~/store/modules/app";
import { parseJSON, json2type, downloadBlob } from "soon-utils";
import { genFileId, type UploadFile, type UploadFiles, type UploadInstance, type UploadProps, type UploadRawFile } from "element-plus";
import { get } from "lodash-es";

// 状态和选项
const selectedTab = ref("0");
const fileList = ref<UploadFile[]>([]);
const upload = ref<UploadInstance>();
const code = ref(demoCode());
const options = reactive({
  allowJson: true,
  targetDepth: 1,
  allowNull: true,
});

// Tabs 选项
const items = [
  { label: "JSON", value: "0" },
  { label: "EXCEL", value: "1" },
];

// 国际化
const t = tLocales({
  zh: {
    convert: "转换",
    copied: "已复制",
    title: "JSON Excel 互转",
    headers: "表头层级",
    downLoadExcel: "下载Excel",
    uploadExcel: "导入Excel",
    tip: { jsonErr: "JSON 或 JS 输入错误" },
  },
  en: {
    convert: "Convert",
    copied: "Copied",
    title: "JSON Excel Conversion",
    headers: "Table Headers",
    downLoadExcel: "Download Excel",
    uploadExcel: "Upload Excel",
    tip: { jsonErr: "JSON or JS Error !" },
  },
  ko: {
    convert: "변환",
    copied: "복사되었습니다",
    title: "JSON과 Excel 상호 변환",
    headers: "테이블 헤더",
    downLoadExcel: "Excel 다운로드",
    uploadExcel: "Excel 업로드",
    tip: { jsonErr: "JSON 또는 JS 입력 오류!" },
  },
});

// 初始化
onMounted(() => {
  useAppStore().title = t("title");
  watch(lang, () => (useAppStore().title = t("title")));

  const config = soon_local.json2excel.get();
  if (config) {
    Object.assign(options, config.options);
    code.value = config.code;
  }

  watch(
    [options, code],
    () => soon_local.json2excel.set({ code: code.value, options }),
    { deep: true }
  );
});

// 文件上传处理
const handleExceed: UploadProps["onExceed"] = (files) => {
  upload.value?.clearFiles();
  const file = files[0] as UploadRawFile;
  file.uid = genFileId();
  upload.value?.handleStart(file);
};

const onFileChange = (uploadFile: UploadFile) => {
  const blob = new Blob([uploadFile.raw!], { type: uploadFile.raw!.type });
  blob.arrayBuffer().then((arrayBuffer) => {
    const buffer = new Uint8Array(arrayBuffer);
    const items: any[] = readExcel(buffer, "buffer");
    code.value = JSON.stringify(items);
  });
};

// JSON 数据解析
const json_list = computed(() => {
  const list = parseJSON(trimCommaOrSemi(code.value));
  if (Array.isArray(list)) {
    const item = list[0];
    if (Array.isArray(item)) {
      return list.map((row) => {
        const obj: Record<string, any> = {};
        row.forEach((col: any, index: number) => {
          obj[getExcelColumnName(index)] = col;
        });
        return obj;
      });
    } else if (typeof item === "object" && item !== null) {
      return list;
    }
  }
  return [];
});

// 结果计算
const colTree = computed(() => {
  const source_list = json_list.value;
  if (!source_list.length) return []
  const [tree] = genJsonTreeFromJsonList(source_list);
  return  tree ;
});

// 下载 Excel
const handleDownloadExcel = () => {
  const buffer = genExcelFromJson(json_list.value, { fitWidth: true, ...options });
  downloadBlob(new Blob([buffer]), "soon-tools-json2excel.xlsx");
};

// 示例代码
function demoCode() {
  return `[{
    name: "John Doe",
    age: 30,
    job: {
      title: "Software Engineer",
      years: 5,
      address: "123 Main St, Springfield",
      details: {
        department: "IT",
        projects: [
          { name: "Project Alpha", duration: "6 months" }
        ]
      }
    },
    education: {
      degree: "Bachelor's in Computer Science",
      university: "Springfield University",
      graduationYear: null
    }
  }, {
    name: "Jane Smith",
    age: null,
    job: {
      title: "Product Manager",
      years: 3,
      address: "456 Elm St, Springfield",
      details: {
        department: "Product",
        projects: []
      }
    },
    education: {
      degree: "Master's in Business Administration",
      university: "Springfield Business School",
      graduationYear: 2017
    }
  }]`;
}
</script>

<style>
.cm-editor {
  height: 100%;
}
</style>
