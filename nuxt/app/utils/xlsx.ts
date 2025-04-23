import { get } from "lodash-es"
import { writeFileXLSX, utils, writeXLSX, read, type Range } from "xlsx"

// 获取 Excel 列名
export function getExcelColumnName(columnNumber: number): string {
  if (columnNumber <= 0) return ""
  return getExcelColumnName(Math.floor((columnNumber - 1) / 26)) + String.fromCharCode(((columnNumber - 1) % 26) + 65)
}

// 读取 Excel 文件
export function readExcel(filename: any, type: "string" | "buffer" | "base64" | "binary" | "file" | "array" = "file") {
  const workbook = read(filename, { type })
  const sheetName = workbook.SheetNames[0] ?? "Sheet1"
  const sheet = workbook.Sheets[sheetName]
  return sheet ? utils.sheet_to_json(sheet) : []
}

// 自动计算单元格宽度
function getCellWidth(value: unknown): number {
  if (value == null) return 0
  return value.toString().replace(/[\u0391-\uFFE5]/g, "aa").length + 0.5
}

function autoCalcAoACellWidths(data: any[][]): number[] {
  if (data.length === 0) return []
  const colWidths: number[] = []
  data.forEach((row) => {
    row.forEach((col, index) => {
      if (["string", "number", "boolean"].includes(typeof col)) {
        const cellWidth = getCellWidth(col)
        colWidths[index] = Math.max(colWidths[index] || 4, cellWidth)
      }
    })
  })
  return colWidths
}

// 生成 Excel 文件（基于 AoA 数据）
export function genExcelFromAoA(
  tableData: any[][],
  options?: {
    headerData?: any[][]
    fileName?: string
    fitWidth?: boolean
  },
) {
  const workbook = utils.book_new()
  const headerData = options?.headerData ?? []
  const _tableData = [...headerData, ...tableData]

  const worksheet = utils.aoa_to_sheet(_tableData)

  // 合并单元格
  const mergeList: Range[] = []
  headerData.forEach((row, r) => processRowMerges(row, r, mergeList))
  processColumnMerges(headerData, mergeList)

  worksheet["!merges"] = mergeList

  // 设置列宽
  if (options?.fitWidth) {
    worksheet["!cols"] = autoCalcAoACellWidths(_tableData).map((wch) => ({ wch }))
  }

  utils.book_append_sheet(workbook, worksheet, "sheet1")

  if (options?.fileName) {
    return writeFileXLSX(workbook, `${options.fileName}.xlsx`, { compression: true })
  } else {
    return writeXLSX(workbook, { type: "buffer" })
  }
}

// 处理行合并
function processRowMerges(row: any[], rowIndex: number, mergeList: Range[]) {
  let lastValue: any = undefined
  let span = 1
  row.forEach((col, colIndex) => {
    if (col === lastValue) {
      span++
      if (colIndex === row.length - 1) {
        mergeList.push({ s: { r: rowIndex, c: colIndex - span + 1 }, e: { r: rowIndex, c: colIndex } })
      }
    } else {
      if (span > 1) {
        mergeList.push({ s: { r: rowIndex, c: colIndex - span }, e: { r: rowIndex, c: colIndex - 1 } })
      }
      lastValue = col
      span = 1
    }
  })
}

// 处理列合并
function processColumnMerges(headerData: any[][], mergeList: Range[]) {
  const colLength = headerData[0]?.length ?? 0
  for (let c = 0; c < colLength; c++) {
    let lastValue: any = undefined
    let span = 1
    for (let r = 0; r < headerData.length; r++) {
      const item = headerData[r]?.[c]
      if (item === lastValue) {
        span++
        if (r === headerData.length - 1) {
          mergeList.push({ s: { r: r - span + 1, c }, e: { r, c } })
        }
      } else {
        if (span > 1) {
          mergeList.push({ s: { r: r - span, c }, e: { r: r - 1, c } })
        }
        lastValue = item
        span = 1
      }
    }
  }
}

export function genExcel<T extends object>(
  tableData: T[],
  options?: {
    fileName?: string
    tableHeader?: Partial<{ [P in keyof T]: string }>
    colsWidth?: Partial<{ [P in keyof T]: number }>
    fitWidth?: boolean
  },
) {
  //处理数据
  const headerKeys = Object.keys(options?.tableHeader || tableData[0] || [])
  //1.根据表头筛选
  let data = [...tableData].map((item) => {
    const result = {} as Record<string, any>
    headerKeys.forEach((key) => {
      let value = item[key as keyof T] as any
      //数组转为,间隔字符串
      if (value) {
        if (Array.isArray(value)) {
          value = value.join(",")
        } else if (typeof value === "object") {
          value = JSON.stringify(value)
        }
      }
      result[key] = value
    })
    return result
  })

  //2.插入表头
  if (options?.tableHeader) {
    data = [options.tableHeader, ...data]
  } else if (data[0]) {
    const header = {} as T
    Object.keys(data[0]).forEach((key) => {
      //@ts-ignore
      header[key] = key
    })
    data = [header, ...data]
  }

  // console.log('导出Excel', tableData)
  //3.创建工作簿
  const workbook = utils.book_new()
  //将数据添加到工作表   //skipHeader不把key值当做表头
  const worksheet = utils.json_to_sheet(data, {
    skipHeader: true,
  })
  //4.列宽
  let _widths = {} as Partial<{ [P in keyof T]: number }>
  if (options?.colsWidth) {
    _widths = options.colsWidth
  } else if (options?.fitWidth) {
    console.log("data", data)
    _widths = autoCalcCellWidths(data)
  }
  worksheet["!cols"] = headerKeys.map((key) => {
    return {
      wch: _widths[key as keyof T] || 20,
    }
  })
  // worksheet['!merges'] = [{ s: { r: 0, c: 0 }, e: { r: 0, c: 2 } }];

  //5.保存 工作簿、工作表、工作表名
  utils.book_append_sheet(workbook, worksheet, "sheet1")
  if (options?.fileName) {
    return writeFileXLSX(workbook, options?.fileName + ".xlsx", {
      compression: true,
    })
  } else {
    return writeXLSX(workbook, { type: "buffer" })
  }
  // writeFileXLSX(workbook, (options?.fileName ?? (new Date()).toLocaleString()) + ".xlsx", { compression: true })
}

function autoCalcCellWidths<T extends object>(data: T[]) {
  if (data.length === 0) return {}
  const colWidths = {} as { [P in keyof T]: number }
  //初始化列宽
  Object.keys(data[0] as object).forEach((key) => {
    colWidths[key as keyof T] = 4
  })
  // 计算每一列的所有单元格宽度
  // 先遍历行
  data.forEach((row) => {
    // 遍历列
    for (const key in row) {
      switch (typeof row[key]) {
        case "string":
        case "number":
        case "boolean": {
          const cellWidth = getCellWidth(row[key])
          // 每一列取最大值最为列宽
          if (colWidths[key] < cellWidth) colWidths[key] = cellWidth
          break
        }
      }
    }
  })
  return colWidths
}

function getAllPaths(obj: { [x: string]: any }, ignoreArray = false) {
  const paths: string[] = []
  function traverse(currentObj: { [x: string]: any }, currentPath = "") {
    Object.keys(currentObj).forEach((key) => {
      const newPath = currentPath ? `${currentPath}.${key}` : key
      paths.push(newPath)
      const value = currentObj[key]
      if (typeof value === "object" && value !== null) {
        if (!(ignoreArray && Array.isArray(value))) traverse(value, newPath) // 递归处理嵌套对象或数组
      }
    })
  }
  traverse(obj)
  return paths
}

export type TableColItem = {
  key: string
  children: TableColItem[]
  path: string
}
function convertPathsToTree(paths: string[]) {
  // 创建虚拟根节点
  const root: TableColItem = { key: "", path: "", children: [] }
  paths.forEach((path: string) => {
    // 拆分路径为层级数组（如 ['a', 'b']）
    const parts = path.split(".")
    let currentNode = root

    parts.forEach((part: string) => {
      // 查找或创建子节点
      let childNode = currentNode.children.find((n) => n.key === part)
      if (!childNode) {
        childNode = { key: part, children: [], path: currentNode.path ? currentNode.path + "." + part : part }
        currentNode.children.push(childNode)
      }
      // 向下一层遍历
      currentNode = childNode
    })
  })

  // 返回根节点的直接子节点（即顶层结构）
  return root.children
}

function getTreeChildrenLength(obj: { children: any[] }, targetDepth: number, depth = 0): number {
  if (!(obj.children.length && depth < targetDepth)) return 1
  const length_list = obj.children.map((ch) => {
    return getTreeChildrenLength(ch, targetDepth, depth + 1)
  })
  return length_list.reduce((accumulator, currentValue) => accumulator + currentValue, 0) || 1
}
export function calPathLength(
  arr: TableColItem[],
  rows: { path: string; colSpan: number }[][],
  maxDepth: number,
  targetDepth: number,
  depth = 0,
  parent?: { path: string; colSpan: number },
) {
  const _maxDepth = maxDepth - 1
  const _targetDepth = targetDepth - 1
  if (depth > _maxDepth) return
  if (!rows[depth]) rows[depth] = []
  const list = rows[depth]
  if (arr.length) {
    arr.forEach((ch) => {
      const curPath = parent ? parent.path + "." + ch.key : ch.key
      const curItem = {
        path: curPath,
        colSpan: getTreeChildrenLength(ch, _targetDepth - depth),
      }
      list.push(curItem)
      if (depth < _targetDepth) {
        calPathLength(ch.children, rows, maxDepth, targetDepth, depth + 1, curItem)
      }
    })
  } else {
    if (parent) {
      list.push(parent)
    }
    if (depth < _targetDepth) {
      calPathLength([], rows, maxDepth, targetDepth, depth + 1, parent)
    }
  }
}

export function genJsonTreeFromJsonList(list: object[]) {
  //获取完整json tree
  const path_list: string[] = []
  list.forEach((item) => {
    path_list.push(...getAllPaths(item, true))
  })
  const all_paths = Array.from(new Set(path_list))
  let maxDepth = 0
  all_paths.forEach((item) => {
    const curDepth = item.split(".").length
    if (curDepth > maxDepth) maxDepth = curDepth
  }, 0)
  const tree = convertPathsToTree(all_paths)
  return [tree, maxDepth] as const
}

export function genExcelFromJson(
  tableData: object[],
  options?: {
    fileName?: string
    fitWidth?: boolean
    targetDepth?: number
    allowJson?: boolean
    allowNull?: boolean
  },
) {
  //获取完整json tree
  const [tree, maxDepth] = genJsonTreeFromJsonList(tableData)

  //分层计算列宽
  const tableHeaders: { path: string; colSpan: number }[][] = []
  calPathLength(tree, tableHeaders, maxDepth, options?.targetDepth ?? 1)

  const headerData = tableHeaders.map((r) => {
    const row: string[] = []
    r.forEach((col) => {
      row.push(...Array(col.colSpan).fill(col.path))
    })
    return row
  })

  const tableList = tableData.map((row) => {
    return (
      headerData[headerData.length - 1]?.map((col) => {
        const value = get(row, col)
        if (typeof value === "object") {
          if (value === null) {
            if (options?.allowNull) return "null"
          } else {
            if (options?.allowJson) return JSON.stringify(value)
          }
        }

        return value
      }) ?? []
    )
  })

  return genExcelFromAoA(tableList, { ...options, headerData })
}
