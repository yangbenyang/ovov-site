(function () {
  function setupPluginCopyButtons() {
    function fallbackCopy(text) {
      var textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.setAttribute("readonly", "");
      textarea.style.position = "fixed";
      textarea.style.left = "-9999px";
      textarea.style.top = "0";
      document.body.appendChild(textarea);
      textarea.select();

      var copied = false;
      try {
        copied = document.execCommand("copy");
      } catch (error) {
        copied = false;
      }
      document.body.removeChild(textarea);
      return copied;
    }

    document.querySelectorAll("[data-copy]").forEach(function (button) {
      if (button.dataset.copyReady === "true") return;
      button.dataset.copyReady = "true";
      button.addEventListener("click", function () {
        var text = button.getAttribute("data-copy") || "";
        var setStatus = function (label, className) {
          var oldText = button.textContent;
          button.textContent = label;
          if (className) button.classList.add(className);
          window.setTimeout(function () {
            button.textContent = oldText;
            if (className) button.classList.remove(className);
          }, 1400);
        };
        var done = function () {
          setStatus("已复制", "is-copied");
        };
        var failed = function () {
          setStatus("复制失败", "");
        };
        var showPrompt = function () {
          try {
            window.prompt("复制这段提示词", text);
          } catch (error) {
            failed();
          }
        };

        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(text).then(done).catch(function () {
            if (fallbackCopy(text)) {
              done();
              return;
            }
            showPrompt();
          });
          return;
        }

        if (fallbackCopy(text)) {
          done();
          return;
        }

        showPrompt();
      });
    });
  }

  function setupPluginExpandButtons() {
    document.querySelectorAll("[data-expand-group]").forEach(function (button) {
      if (button.dataset.expandReady === "true") return;
      button.dataset.expandReady = "true";
      button.dataset.defaultText = button.textContent;

      button.addEventListener("click", function () {
        var groupName = button.getAttribute("data-expand-group");
        var group = document.querySelector('[data-plugin-group="' + groupName + '"]');
        if (!group) return;

        var expanded = group.classList.toggle("is-expanded");
        button.textContent = expanded ? "收起插件" : button.dataset.defaultText;
        button.setAttribute("aria-expanded", expanded ? "true" : "false");
      });
    });
  }

  function createHomeIntro() {
    var isHome = window.location.pathname === "/" || window.location.pathname === "/index.html";
    if (!isHome) return;
    if (document.querySelector(".home-product-intro")) return;

    var recentPosts = document.querySelector("#recent-posts");
    if (!recentPosts) return;

    var intro = document.createElement("section");
    intro.className = "home-product-intro";
    intro.innerHTML = [
      '<div class="home-intro-copy">',
      '<span class="home-kicker">OpenClaw 中文教程站</span>',
      "<h1>模型配置、能力安装、案例教程一站式整理</h1>",
      "<p>先跑通模型，再给 OpenClaw 安装专业能力，最后跟着案例生成网页、PPT、办公文档和社媒动效。</p>",
      '<div class="home-intro-actions">',
      '<a class="home-primary-link" href="/categories/入门教程/">先看新手入门</a>',
      '<a class="home-secondary-link" href="/plugins/">进入能力中心</a>',
      "</div>",
      "</div>",
      '<div class="home-entry-grid">',
      '<a href="/categories/入门教程/"><span>01</span><strong>新手入门</strong><em>配置模型，解决 API Key 和模型 ID</em></a>',
      '<a href="/plugins/"><span>02</span><strong>能力中心</strong><em>按目标安装设计、办公、社媒和 OCR 能力</em></a>',
      '<a href="/categories/网页设计/"><span>03</span><strong>案例教程</strong><em>照着文章复现真实作品</em></a>',
      "</div>"
    ].join("");

    recentPosts.parentNode.insertBefore(intro, recentPosts);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () {
      createHomeIntro();
      setupPluginCopyButtons();
      setupPluginExpandButtons();
    });
  } else {
    createHomeIntro();
    setupPluginCopyButtons();
    setupPluginExpandButtons();
  }
  document.addEventListener("pjax:complete", function () {
    createHomeIntro();
    setupPluginCopyButtons();
    setupPluginExpandButtons();
  });
})();
