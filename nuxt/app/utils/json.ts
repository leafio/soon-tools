import prettier from "prettier/standalone"
import parserTs from "prettier/plugins/typescript"
import parserBabel from "prettier/plugins/babel"
import parserEsTree from "prettier/plugins/estree"

export function prettierJSON(text: string) {
    return prettier.format(text, {
        parser: "json",
        plugins: [parserBabel, parserEsTree],
        printWidth: 40,
    })
}


export function prettierTs(text: string) {
    return prettier.format(text, {
        parser: "typescript",
        plugins: [parserTs, parserEsTree],
    })
}


export function prettierJs(text: string) {
    return prettier.format(text, {
        parser: "babel-ts",
        plugins: [parserBabel, parserEsTree],
        printWidth: 40,
        trailingComma: "none",
        semi: false,
    })
}

export function trimCommaOrSemi(str: string) {
    // console.log('input', str)
    let result = str.trim()
    const first = result[0]
    if (first === ";" || first === ",") {
        result = result.slice(1)
    }

    const last = result[result.length]
    if (last === ";" || last === ",") {
        result = result.slice(0, -1)
    }
    // console.log('result', result)
    return result
}

export function getJson(text: string) {
    const startArr = ['{', '['].map(char => text.indexOf(char)).filter(num => num > -1).sort((a, b) => a - b)
    const firstIndex = startArr[0] ?? 0
    const lastArr = ['}', ']'].map(char => text.lastIndexOf(char)).filter(num => num > -1).sort((a, b) => a - b).reverse()
    const lastIndex = lastArr[0] ?? 0
    // console.log(text.length,startArr,lastArr)
    return text.slice(firstIndex, lastIndex + 1)
}



export function capitalizeFirstLetter(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1)
}

