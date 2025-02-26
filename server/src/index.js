const express = require("express");
const path = require("path");

const app = express();

const { program } = require("commander");

program.option("-p,--port <number>");

program.parse();
const options = program.opts();
const { port = "9000" } = options;

const webHome = path.resolve(__dirname, "../web");
app.use(express.static(webHome));

const open = require("opn");

app.listen(port, () => {
    const url = `http://localhost:${port}`;
    console.log(`soon-tools is running at ${url}`);
    // 使用系统默认浏览器打开网址
    open(url);
});
