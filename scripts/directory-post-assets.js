"use strict";

const fs = require("fs");
const path = require("path");

const IMAGE_EXTENSIONS = new Set([
  ".avif",
  ".gif",
  ".jpeg",
  ".jpg",
  ".png",
  ".svg",
  ".webp",
]);

function isExternalUrl(url) {
  return /^(?:[a-z]+:)?\/\//i.test(url)
    || url.startsWith("/")
    || url.startsWith("#")
    || url.startsWith("data:")
    || url.startsWith("mailto:");
}

function isDirectoryPost(data) {
  return data.source && path.basename(data.source) === "index.md";
}

function assetBase(data) {
  return `/posts/${data.abbrlink || data.slug}`;
}

function rewriteMarkdownImageUrls(content, base) {
  return content.replace(/(!\[[^\]]*\]\()([^)\s]+)(\))/g, (match, prefix, url, suffix) => {
    const rewrittenUrl = rewriteAssetUrl(url, base);
    if (!rewrittenUrl) return match;

    return `${prefix}${rewrittenUrl}${suffix}`;
  });
}

function rewriteAssetUrl(url, base) {
  if (!url || isExternalUrl(url)) return null;

  const cleanUrl = url.replace(/^\.\//, "");
  const ext = path.extname(cleanUrl.split(/[?#]/)[0]).toLowerCase();
  if (!IMAGE_EXTENSIONS.has(ext)) return null;

  return `${base}/${cleanUrl}`;
}

hexo.extend.filter.register("before_post_render", function rewriteDirectoryPostAssets(data) {
  if (!isDirectoryPost(data)) return data;
  const base = assetBase(data);
  data.content = rewriteMarkdownImageUrls(data.content, base);
  data.cover = rewriteAssetUrl(data.cover, base) || data.cover;
  return data;
});

hexo.extend.filter.register("after_generate", async function copyDirectoryPostAssets() {
  const sourceRoot = path.join(hexo.source_dir, "_posts");
  const publicRoot = hexo.public_dir;

  async function copyImageAssets(sourceDir, targetDir, relativeDir = "") {
    const entries = await fs.promises.readdir(path.join(sourceDir, relativeDir), { withFileTypes: true });
    for (const entry of entries) {
      const relativePath = path.join(relativeDir, entry.name);
      const sourcePath = path.join(sourceDir, relativePath);
      const targetPath = path.join(targetDir, relativePath);

      if (entry.isDirectory()) {
        await copyImageAssets(sourceDir, targetDir, relativePath);
        continue;
      }

      if (!entry.isFile() || entry.name === "index.md") continue;
      const ext = path.extname(entry.name).toLowerCase();
      if (!IMAGE_EXTENSIONS.has(ext)) continue;

      await fs.promises.mkdir(path.dirname(targetPath), { recursive: true });
      await fs.promises.copyFile(sourcePath, targetPath);
    }
  }

  async function walk(dir) {
    const entries = await fs.promises.readdir(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        await walk(fullPath);
        continue;
      }

      if (entry.name !== "index.md") continue;

      const content = await fs.promises.readFile(fullPath, "utf8");
      const match = content.match(/^---\s*[\r\n]+([\s\S]*?)[\r\n]+---/);
      if (!match) continue;

      const abbrlink = match[1].match(/^abbrlink:\s*([^\r\n#]+)/m);
      if (!abbrlink) continue;

      const targetDir = path.join(publicRoot, "posts", abbrlink[1].trim());
      await fs.promises.mkdir(targetDir, { recursive: true });

      await copyImageAssets(path.dirname(fullPath), targetDir);
    }
  }

  if (fs.existsSync(sourceRoot)) {
    await walk(sourceRoot);
  }
});
