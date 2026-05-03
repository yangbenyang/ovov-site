---
title: OpenClaw 快速开始：5 分钟跑通第一条指令
date: 2026-05-03 09:00:00
updated: 2026-05-03 09:00:00
categories: 入门教程
tags:
  - OpenClaw
  - 快速开始
  - 入门
abbrlink: openclaw-quick-start
cover: /img/default.avif
---

这篇教程用于快速确认 OpenClaw 是否能在你的环境里正常运行。先完成最小安装，再配置一个可用模型，最后发送第一条指令验证链路。

## 准备环境

先确认本机已经安装 Node.js、Git，并准备好一个可用的模型服务或 API Key。不要一开始就接入所有频道，先让核心流程跑通。

## 获取项目

克隆 OpenClaw 项目后进入目录，安装依赖并复制环境变量模板。配置完成后启动开发服务，观察终端是否有明显报错。

```bash
git clone https://github.com/openclaw/openclaw.git
cd openclaw
pnpm install
cp .env.example .env
```

## 配置模型

在 `.env` 中填写模型服务地址、API Key 和默认模型名称。第一次建议使用一个你确认可用的模型，避免同时排查网络、权限和模型兼容问题。

## 发送第一条指令

启动服务后，在本地控制台或已接入的测试入口发送一条简单指令，例如“总结当前工作区”。如果能返回稳定结果，就可以继续接入频道和技能。
