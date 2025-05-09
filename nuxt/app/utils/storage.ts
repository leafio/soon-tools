
import { createStorage } from "soon-storage"
import type { Lang } from "~/i18n/type"

type LocalVal = {
    lang: Lang,
    json2type: {
        code: string,
        options: {
            useInterface: boolean,
            extract: number,
        }
    },
    json2excel: {
        code: string,
        options: {
            allowJson: boolean
            targetDepth: number
            allowNull: boolean
        }
    }
}

export const soon_local = createStorage<LocalVal>({
    prefix: "soon-",
    provider: () => localStorage,
    transforms: {
        lang: "string",
        json2type: "json",
        json2excel: 'json'
    },
})
