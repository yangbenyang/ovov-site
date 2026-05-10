"use strict";

const fs = require("fs");
const path = require("path");

const [, , dirName, category, abbrlink, ...titleParts] = process.argv;

if (!dirName || !category || !abbrlink) {
  console.error("用法: pnpm run new:tutorial -- <目录名> <分类> <abbrlink> [文章标题]");
  console.error("示例: pnpm run new:tutorial -- OpenClaw快速开始 入门教程 openclaw-quick-start OpenClaw 入门教程：快速开始");
  process.exit(1);
}

const title = titleParts.join(" ") || dirName;
const now = new Date();
const pad = (value) => String(value).padStart(2, "0");
const date = [
  now.getFullYear(),
  pad(now.getMonth() + 1),
  pad(now.getDate()),
].join("-") + " " + [
  pad(now.getHours()),
  pad(now.getMinutes()),
  pad(now.getSeconds()),
].join(":");

const postDir = path.join(__dirname, "..", "source", "_posts", "OpenClaw教程", dirName);
const indexFile = path.join(postDir, "index.md");

if (fs.existsSync(indexFile)) {
  console.error(`文章已存在: ${indexFile}`);
  process.exit(1);
}

fs.mkdirSync(postDir, { recursive: true });

const content = `---
title: ${title}
date: ${date}
updated: ${date}
categories: ${category}
tags:
  - OpenClaw
abbrlink: ${abbrlink}
cover: /img/default.avif
---

这篇教程用于说明。

## 教程目标

- 

## 准备工作

这里写环境要求、账号准备、模型服务准备和注意事项。

## 操作步骤

这里写从安装、配置到验证的完整步骤。

## 验证结果

这里写如何判断已经跑通，以及常见报错应该先检查哪些地方。

## 下一步

这里写下一篇建议阅读的教程。
`;

fs.writeFileSync(indexFile, content, "utf8");
console.log(`已创建: ${indexFile}`);
