import pinia from "@/store/instance"

import { useAppStore } from "./modules/app"

export function resetStore() {

  useAppStore(pinia).$reset()
}
