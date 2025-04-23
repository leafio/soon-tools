<template>
    <el-table-column :label="column.path" :prop="column.path" >
        <template #default="{ row }">
            <template v-if="column.children.length && Number(depth ?? 1) + 1 <= Number(targetDepth)">
                <TableColumn v-for="col in column.children" :key="col.key" :column="col" :depth="Number(depth ?? 1) + 1"
                    :target-depth="targetDepth" :allow-json="allowJson" :allow-null="allowNull">
                </TableColumn>
            </template>
            <template v-else> {{ getValue(row, column.path) }} </template>
        </template>
    </el-table-column>
</template>
<script lang="ts" setup>
import { get } from "lodash-es"

const props = defineProps<{
    column: TableColItem
    allowJson?: boolean
    targetDepth?: number
    allowNull?: boolean
    depth?: number
}>()

const getValue = (row: any, path: string) => {
    const { allowNull, allowJson } = props
    const value = get(row, path)

    let result = value
    if (typeof value === "object") {
        if (value === null) {
            if (allowNull) result = "null"
        } else if (allowJson) {
            result = JSON.stringify(value)
        } else {
            result = ""
        }
    }

    return result
}
</script>
