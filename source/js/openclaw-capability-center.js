(function () {
  var skills = [
    {
      id: "open-design-artifacts",
      name: "open-design-artifacts",
      title: "网页、App 原型、PPT 生成技能",
      description: "适合生成官网首页、移动端原型、PPT 图文页和 HTML 预览稿。",
      category: "设计生成",
      roles: ["产品经理", "设计师", "独立开发者"],
      outputs: ["网页", "App 原型", "PPT", "HTML"],
      tags: ["网页设计", "App 原型", "PPT"],
      zipUrl: "https://img.ovov.fun/openclaw/open-design-artifacts.zip",
      installPrompt: "帮我下载并解压到本地 https://img.ovov.fun/openclaw/open-design-artifacts.zip 并安装这个技能",
      caseLinks: [
        { title: "网页案例", href: "/posts/openclaw-web-design-artifacts.html" },
        { title: "App 案例", href: "/posts/openclaw-mobile-app-design-artifacts.html" },
        { title: "PPT 案例", href: "/posts/openclaw-ppt-skill-tutorial.html" }
      ],
      hot: true
    },
    {
      id: "open-design-office",
      name: "open-design-office",
      title: "PRD、OKR、办公文档生成技能",
      description: "适合生成 PRD、OKR、项目文档、会议纪要、汇报和业务报告。",
      category: "办公文档",
      roles: ["产品经理", "团队管理者", "运营"],
      outputs: ["PRD", "OKR", "文档", "报告"],
      tags: ["PRD", "OKR", "会议纪要"],
      zipUrl: "https://img.ovov.fun/openclaw/open-design-office.zip",
      installPrompt: "帮我下载并解压到本地 https://img.ovov.fun/openclaw/open-design-office.zip 并安装这个技能",
      caseLinks: [{ title: "OKR 案例", href: "/posts/openclaw-office-okr-skill.html" }],
      hot: true
    },
    {
      id: "open-design-social-media",
      name: "open-design-social-media",
      title: "社媒图文、海报、营销素材生成技能",
      description: "适合生成小红书封面、公众号配图、视频封面、营销海报和轮播图。",
      category: "营销素材",
      roles: ["运营", "自媒体", "电商卖家"],
      outputs: ["图片", "海报", "封面", "轮播图"],
      tags: ["小红书", "海报", "电商素材"],
      zipUrl: "https://img.ovov.fun/openclaw/open-design-social-media.zip",
      installPrompt: "帮我下载并解压到本地 https://img.ovov.fun/openclaw/open-design-social-media.zip 并安装这个技能",
      caseLinks: [{ title: "社媒案例", href: "/posts/openclaw-social-media-swiss-pulse.html" }],
      hot: true
    },
    {
      id: "paddleocr-doc-parsing",
      name: "paddleocr-doc-parsing",
      title: "OCR 单据识别与 Excel 汇总技能",
      description: "适合识别进货单、手写表格、图片文档，并整理成 Excel 表格。",
      category: "OCR 数据",
      roles: ["财务", "仓库", "电商卖家"],
      outputs: ["Excel", "表格", "数据"],
      tags: ["OCR", "单据识别", "手写表格"],
      zipUrl: "https://img.ovov.fun/openclaw/paddleocr-doc-parsing.zip",
      installPrompt: "安装一下 https://img.ovov.fun/openclaw/paddleocr-doc-parsing.zip 这个技能",
      caseLinks: [{ title: "图文教程", href: "/posts/openclaw-paddleocr-doc-parsing-excel.html" }],
      hot: true
    }
  ];

  var state = {
    query: "",
    category: "全部",
    activeSkill: null
  };

  var categories = ["全部", "设计生成", "办公文档", "营销素材", "OCR 数据"];

  function escapeHtml(value) {
    return String(value || "").replace(/[&<>"']/g, function (char) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[char];
    });
  }

  function searchText(skill) {
    return [
      skill.name,
      skill.title,
      skill.description,
      skill.category,
      skill.roles.join(" "),
      skill.outputs.join(" "),
      skill.tags.join(" "),
      skill.caseLinks.map(function (item) { return item.title; }).join(" ")
    ].join(" ").toLowerCase();
  }

  function filteredSkills() {
    var query = state.query.trim().toLowerCase();
    return skills.filter(function (skill) {
      var inCategory = state.category === "全部" || skill.category === state.category;
      var inQuery = !query || searchText(skill).indexOf(query) > -1;
      return inCategory && inQuery;
    });
  }

  function tagList(items) {
    return items.slice(0, 4).map(function (item) {
      return "<span>" + escapeHtml(item) + "</span>";
    }).join("");
  }

  function caseLinks(skill) {
    if (!skill.caseLinks.length) return '<span class="oc-case-muted">案例整理中</span>';
    return skill.caseLinks.slice(0, 3).map(function (item) {
      return '<a href="' + escapeHtml(item.href) + '">' + escapeHtml(item.title) + '</a>';
    }).join("");
  }

  function skillCard(skill) {
    return [
      '<article class="oc-skill-card" data-skill-card="' + escapeHtml(skill.id) + '">',
      '<div class="oc-card-main">',
      '<div class="oc-card-head"><span class="oc-label">' + escapeHtml(skill.category) + '</span></div>',
      '<h3>' + escapeHtml(skill.name) + '</h3>',
      '<p>' + escapeHtml(skill.description) + '</p>',
      '<div class="oc-tags">' + tagList(skill.tags) + '</div>',
      '</div>',
      '<div class="oc-card-actions"><button type="button" class="oc-primary-action" data-copy-skill="' + escapeHtml(skill.id) + '">复制安装指令</button></div>',
      '</article>'
    ].join("");
  }

  function renderCategories() {
    var target = document.querySelector("[data-oc-categories]");
    if (!target) return;
    target.innerHTML = categories.map(function (category) {
      var active = category === state.category ? " is-active" : "";
      return '<button type="button" class="oc-category' + active + '" data-category="' + escapeHtml(category) + '">' + escapeHtml(category) + '</button>';
    }).join("");
  }

  function renderSkills() {
    var list = filteredSkills();
    var grid = document.querySelector("[data-oc-market-results]");
    if (!grid) return;
    grid.innerHTML = list.length
      ? list.map(skillCard).join("")
      : '<div class="oc-empty"><strong>没有找到匹配技能</strong><p>换个关键词，或切回全部分类。</p></div>';
  }

  function renderAll() {
    renderCategories();
    renderSkills();
  }

  function copyText(text, button) {
    function fallbackCopy() {
      var textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.setAttribute("readonly", "");
      textarea.style.position = "fixed";
      textarea.style.left = "-9999px";
      document.body.appendChild(textarea);
      textarea.select();
      var ok = false;
      try {
        ok = document.execCommand("copy");
      } catch (error) {
        ok = false;
      }
      document.body.removeChild(textarea);
      return ok;
    }

    function setLabel(label) {
      if (!button) return;
      var old = button.textContent;
      button.textContent = label;
      button.classList.add("is-copied");
      window.setTimeout(function () {
        button.textContent = old;
        button.classList.remove("is-copied");
      }, 1400);
    }

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(function () {
        setLabel("已复制");
      }).catch(function () {
        setLabel(fallbackCopy() ? "已复制" : "请手动复制");
      });
      return;
    }
    setLabel(fallbackCopy() ? "已复制" : "请手动复制");
  }

  function openInstallModal(skillId) {
    var skill = skills.find(function (item) { return item.id === skillId; });
    var modal = document.querySelector("[data-oc-modal]");
    if (!skill || !modal) return;
    state.activeSkill = skill;
    modal.querySelector("[data-modal-title]").textContent = skill.name;
    modal.querySelector("[data-modal-desc]").textContent = skill.description;
    modal.querySelector("[data-modal-prompt]").textContent = skill.installPrompt;
    modal.classList.add("is-open");
    document.body.classList.add("oc-modal-open");
  }

  function closeInstallModal() {
    var modal = document.querySelector("[data-oc-modal]");
    if (!modal) return;
    modal.classList.remove("is-open");
    document.body.classList.remove("oc-modal-open");
    state.activeSkill = null;
  }

  function attachEvents(root) {
    root.addEventListener("input", function (event) {
      if (!event.target.matches("[data-oc-search]")) return;
      state.query = event.target.value;
      renderSkills();
    });

    root.addEventListener("click", function (event) {
      var install = event.target.closest("[data-install]");
      if (install) {
        openInstallModal(install.getAttribute("data-install"));
        return;
      }

      var copySkill = event.target.closest("[data-copy-skill]");
      if (copySkill) {
        var skillId = copySkill.getAttribute("data-copy-skill");
        var skill = skills.find(function (item) { return item.id === skillId; });
        if (skill) copyText(skill.installPrompt, copySkill);
        return;
      }

      var category = event.target.closest("[data-category]");
      if (category) {
        state.category = category.getAttribute("data-category");
        renderAll();
        return;
      }

      if (event.target.closest("[data-clear-filters]")) {
        state.query = "";
        state.category = "全部";
        var search = document.querySelector("[data-oc-search]");
        if (search) search.value = "";
        renderAll();
        return;
      }

      if (event.target.closest("[data-modal-close]") || event.target.matches("[data-oc-modal]")) {
        closeInstallModal();
        return;
      }

      var copyInstall = event.target.closest("[data-copy-install]");
      if (copyInstall && state.activeSkill) {
        copyText(state.activeSkill.installPrompt, copyInstall);
      }
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") closeInstallModal();
    });
  }

  function appTemplate() {
    return [
      '<section class="oc-hero oc-hero-compact">',
      '<div class="oc-hero-copy">',
      '<span class="oc-eyebrow">OpenClaw 技能中心</span>',
      '<h1>OpenClaw 技能中心</h1>',
      '<p>找到技能 → 复制安装指令 → 粘贴到 OpenClaw，即可自动安装。</p>',
      '</div>',
      '<div class="oc-hero-steps" aria-label="三步安装">',
      '<strong>3 步安装</strong><span>选择技能</span><i></i><span>复制指令</span><i></i><span>粘贴到 OpenClaw</span>',
      '</div>',
      '</section>',
      '<section class="oc-search-section oc-search-compact">',
      '<label class="oc-search-box"><input data-oc-search type="search" placeholder="搜索技能、产物、角色，例如：PPT、PRD、小红书、Excel、网页"></label>',
      '</section>',
      '<section class="oc-section oc-market" id="all-skills">',
      '<div class="oc-category-tabs"><div class="oc-category-list" data-oc-categories></div></div>',
      '<div class="oc-market-layout oc-market-compact">',
      '<div class="oc-market-main"><div class="oc-market-grid oc-market-grid-compact" data-oc-market-results></div></div>',
      '</div>',
      '</section>',
      '<section class="oc-section oc-install-flow">',
      '<div class="oc-section-head"><span>怎么用</span><h2>复制指令，粘贴到 OpenClaw</h2><p>不需要手动下载 zip，OpenClaw 会自己下载、解压、安装。</p></div>',
      '<div class="oc-step-grid"><article><span>01</span><strong>选技能</strong><p>按分类或搜索找到需要的技能。</p></article><article><span>02</span><strong>复制指令</strong><p>点击卡片按钮复制安装指令。</p></article><article><span>03</span><strong>发给 OpenClaw</strong><p>粘贴到聊天窗口，等待安装完成。</p></article></div>',
      '</section>',
      '<div class="oc-install-modal" data-oc-modal><div class="oc-modal-card oc-modal-simple" role="dialog" aria-modal="true" aria-label="安装技能"><button type="button" class="oc-modal-close" data-modal-close>×</button><span class="oc-eyebrow">安装技能</span><h2 data-modal-title></h2><p data-modal-desc></p><strong>复制下面这句话发给 OpenClaw</strong><pre data-modal-prompt></pre><button type="button" class="oc-primary-action" data-copy-install>复制安装指令</button></div></div>'
    ].join("");
  }

  function initCapabilityCenter() {
    var root = document.getElementById("openclaw-capability-center");
    if (!root || root.dataset.ready === "true") return;
    root.dataset.ready = "true";
    root.innerHTML = appTemplate();
    attachEvents(root);
    renderAll();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initCapabilityCenter);
  } else {
    initCapabilityCenter();
  }
  document.addEventListener("pjax:complete", initCapabilityCenter);
})();
