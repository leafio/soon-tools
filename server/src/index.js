const express = require("express")
const path = require("path")
const fs = require("fs")

const app = express()
const { createProxyMiddleware } = require("http-proxy-middleware")

const { program } = require("commander")

program
    .option("-p,--port <number>")
    .option("-s,--source [folder]")
    .option("-r,--redirect <url>")

program.parse()

const options = program.opts()
// console.log("options", options)

const { port, source, redirect } = options
let webHome = path.resolve(__dirname, "../web")

//本地 dist 预览功能
if (source) {
    const basePath = process.cwd()
    webHome = path.resolve(basePath, typeof source === "string" ? source : "./")
}

app.use(express.static(webHome))

const tryFiles = (rootDir) => (req, res, next) => {
    // console.log('req.path', req.path, rootDir)

    for (const p of [".html", "./index.html"]) {
        const targetPath = p.startsWith("./")
            ? path.join(rootDir, req.path, p)
            : path.join(rootDir, req.path + p)
        // console.log('targetPath', targetPath)
        if (fs.existsSync(targetPath)) {
            // console.log('serve', targetPath)
            return res.sendFile(targetPath)
        }
    }
    next()
}

// 使用示例
app.get("*", tryFiles(webHome))

if (typeof redirect === "string") {
    // console.log("redirect", redirect)
    app.use(
        "/",
        createProxyMiddleware(["**"], {
            target: redirect,
            changeOrigin: true,
            logLevel: "debug",
        })
    )
}

const open = require("opn")

function startServer(port, tryNext) {
    // console.log('port',port,tryNext)
    app
        .listen(port, () => {
            const url = `http://localhost:${port}`
            console.log(`soon-tools is running at ${url}`)
            // 使用系统默认浏览器打开网址
            open(url)
        })
        .on("error", (err) => {
            if (err.code === "EADDRINUSE") {
                if (tryNext) {
                    console.log(`Port ${port} is occupied, trying ${port + 1}`)
                    startServer(port + 1,tryNext)
                }
            }
        })
}

// console.log("port", port)
let _port = 9000
if (typeof port === "string") {
    const parsePort = parseInt(port)
    if (!isNaN(parsePort)) _port = parsePort
}
// console.log(port,!!port)
startServer(_port, !port) // 开始自动递增

// app.listen(_port, () => {
//     const url = `http://localhost:${port}`
//     console.log(`soon-tools is running at ${url}`)
//     // 使用系统默认浏览器打开网址
//     open(url)
// })
