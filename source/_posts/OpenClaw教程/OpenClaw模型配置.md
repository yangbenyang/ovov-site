---
title: OpenClaw 模型配置：API Key、默认模型与本地模型
date: 2026-05-03 08:40:00
updated: 2026-05-03 08:40:00
categories: 模型配置
tags:
  - OpenClaw
  - 模型配置
  - API Key
abbrlink: openclaw-model-config
cover: /img/default.avif
---

模型配置决定了 OpenClaw 的响应质量、成本和稳定性。建议先配置一个主力模型，再按任务类型逐步增加备用模型。

## API Key

把 API Key 放在环境变量中，不要提交到仓库。多人协作时要区分开发、测试和生产密钥，避免权限混用。

## 默认模型

默认模型应该选择稳定、上下文能力足够的版本。对于高频自动化任务，可以单独配置更低成本的模型，减少日常运行费用。

## 本地模型

如果你使用本地模型，需要确认接口格式、上下文长度、并发能力和显存占用。先用简单 prompt 测通，再接入复杂工作流。
