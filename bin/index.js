#!/usr/bin/env node


const path = require("path");

// 要传递的参数
const params = process.argv.slice(2);

const { spawn } = require('child_process');

// 创建一个新的Node.js进程来运行script.js
const child = spawn('node', [path.resolve(__dirname, 'server.js'), ...params,], { stdio: 'inherit' });

// 等待子进程结束
child.on('close', (code) => {
    // console.log(`子进程退出码：${code}`);
});

