<template>
  <div ref="edContainer"></div>
</template>
<script setup lang="ts">
import { javascript } from "@codemirror/lang-javascript";
import { EditorView } from "@codemirror/view";

import { basicSetup } from "codemirror";
import { oneDark } from "@codemirror/theme-one-dark";

const props = defineProps<{
  lineNumbers?: boolean;
}>();

const model = defineModel<string>();
const edContainer = ref<any>();
const refEditor = ref<EditorView>();
const extensions = [
  basicSetup,
  javascript({ typescript: true }),
  oneDark,
  EditorView.updateListener.of((v) => {
    if (v.docChanged) {
      lastValue.value = v.state.toJSON().doc;
      model.value = lastValue.value;
    }
  }),
  EditorView.lineWrapping
];

onMounted(() => {
  refEditor.value = new EditorView({
    doc: model.value,
    parent: edContainer.value,
    extensions,
  });
});
const lastValue = ref("");

watch(
  () => model.value,
  () => {
    if (lastValue.value !== model.value)
      refEditor.value?.dispatch({
        changes: {
          from: 0,
          to: refEditor.value.state.doc.length,
          insert: model.value,
        },
      });
  }
);
onUnmounted(() => {
  refEditor.value?.destroy(); // 注意：此后此处要随组件销毁
});
</script>
