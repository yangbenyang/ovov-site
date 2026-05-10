# ovov-site Agent 规范

## 项目定位

这是一个基于 Hexo 7 和 hexo-theme-solitude 的中文静态教程站点，主题是 OpenClaw 教程。内容重点是安装部署、模型配置、频道接入、技能开发、安全运维和相关实战说明。

默认用中文沟通和写作。新增或修改内容时，优先保持教程型、可执行、步骤清晰的风格，避免营销化表达。

## 技术栈与目录

- 包管理器：`pnpm`，版本见 `package.json` 的 `packageManager`。
- 静态站点框架：Hexo，主要配置在 `_config.yml`。
- 主题配置：Solitude，主要配置在 `_config.solitude.yml`。
- 文章目录：`source/_posts/`。
- 文章结构：每篇教程使用一个目录，正文固定为 `index.md`，图片与正文放在同一目录。
- 页面目录：`source/about/`、`source/tags/`、`source/music/` 等。
- 站点数据：`source/_data/`。
- 自定义前端资源：`source/css/`、`source/js/`。
- Hexo 过滤器和脚本：`scripts/`、`plugins.js`、`gulpfile.js`。
- 生成产物：`public/`、`db.json`、`.deploy_git/`，通常不要手动编辑。

## 常用命令

- 安装依赖：`pnpm install`
- 本地预览：`pnpm run server`
- 清理产物：`pnpm run clean`
- 生成站点：`pnpm run build`
- 生成后压缩：`pnpm exec gulp`
- 完整发布脚本：`pnpm run u`
- 新建教程：`pnpm run new:tutorial -- <目录名> <分类> <abbrlink> [文章标题]`

改动文章、配置或脚本后，至少运行 `pnpm run build` 验证。涉及压缩发布流程时，再运行 `pnpm exec gulp` 或 `pnpm run u`。

## 内容规范

文章放在 `source/_posts/OpenClaw教程/` 下。每篇教程使用“文章目录 + `index.md` + 图片资源”的结构，目录名使用中文教程名：

```text
source/_posts/OpenClaw教程/
  OpenClaw快速开始/
    index.md
    01-install.png
    02-config-env.png
```

文章中引用同目录图片时，使用相对路径：

```md
![环境变量配置](02-config-env.png)
```

项目的 `scripts/directory-post-assets.js` 会在构建时把同目录图片复制到 `/posts/<abbrlink>/`，并自动重写 Markdown 图片路径。不要手动把教程图片移到 `public/`。

Front Matter 保持现有结构：

```yaml
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
```

- `title` 使用清晰的中文教程标题，必要时用全角冒号分隔主题和说明。
- `date` 与 `updated` 使用 `YYYY-MM-DD HH:mm:ss`。
- `categories` 使用已有分类优先：`入门教程`、`安装部署`、`模型配置`、`频道接入`、`技能开发`、`安全运维`。
- `tags` 保持少而准，至少包含 `OpenClaw`。
- `abbrlink` 使用稳定英文 slug，新增后不要随意改动。
- `cover` 默认使用 `/img/default.avif`，除非已经新增并验证了更合适的图片资源。

教程正文优先使用短段落和二级标题。步骤要能直接执行；命令使用 fenced code block，并标注语言，例如 `bash`、`yaml`、`js`。涉及密钥、Token、API Key 时，只写变量名或占位符，不写真实凭据。截图文件使用小写英文或数字序号命名，例如 `01-install.png`、`02-config-env.png`。

## 代码与配置修改

- 优先沿用项目现有 CommonJS 风格，脚本使用 Node.js 标准库和当前依赖。
- 修改 `_config.yml` 或 `_config.solitude.yml` 时，保持 YAML 缩进和注释结构，不做无关重排。
- 修改 `source/_data/` 时，先确认主题读取的数据结构，避免改名导致主题渲染失败。
- 不要直接编辑 `node_modules/hexo-theme-solitude`，主题自定义优先放在项目配置、`source/` 或 `scripts/`。
- 不要手动改 `public/`，需要更新产物时用 Hexo 命令重新生成。
- 不要提交 `.env`、日志、部署目录或生成产物。

## Git 与协作

开始修改前先检查 `git status --short`。如果发现已有用户改动，不要覆盖或回退。当前项目可能存在未提交的文章编辑，处理同一文件前必须先阅读并保留已有内容。

提交前检查变更范围，确保只包含本次任务需要的文件。除非用户明确要求，不要自动提交、推送或部署。

## 验证清单

完成改动前按需检查：

- `pnpm run build` 能成功执行。
- 新文章或页面 Front Matter 能被 Hexo 正常解析。
- 内链路径与分类、标签路径匹配。
- 外链、图片路径、代码块语言标记正确。
- 没有把密钥、个人凭据、临时日志或生成产物写入仓库。
