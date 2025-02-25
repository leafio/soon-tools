const express = require("express")
const path = require("path")

const app = express()

const { program } = require("commander")

program.option("-p,--port <number>")

program.parse()
const options = program.opts()
const { port = "9000" } = options

const webHome = path.resolve(__dirname, "../web")
app.use(express.static(webHome))

app.listen(port, () => {
    console.log(`soon-tools is running at http://localhost:${port}`)
})
