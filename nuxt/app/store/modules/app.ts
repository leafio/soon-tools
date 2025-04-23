import { defineStore } from "pinia"
export const DEFAULT_THEME_COLORS = {
  primary: "#409EFF",
  success: "#67C23A",
  warning: "#E6A23C",
  // danger: "#F56C6C",
  info: "#909399",
  error: "#f56c6c",
}

export const useAppStore = defineStore("app", {

  state: () => ({
    title: ''
  }),
  actions: {},
})
