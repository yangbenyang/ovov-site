(function () {
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
      "<h1>模型配置、插件下载、案例教程一站式整理</h1>",
      "<p>先跑通模型，再下载插件，最后跟着案例生成网页、PPT、办公文档和社媒动效。</p>",
      '<div class="home-intro-actions">',
      '<a class="home-primary-link" href="/categories/入门教程/">先看新手入门</a>',
      '<a class="home-secondary-link" href="/plugins/">进入插件中心</a>',
      "</div>",
      "</div>",
      '<div class="home-entry-grid">',
      '<a href="/categories/入门教程/"><span>01</span><strong>新手入门</strong><em>配置模型，解决 API Key 和模型 ID</em></a>',
      '<a href="/plugins/"><span>02</span><strong>插件下载</strong><em>设计、办公、社媒插件集中入口</em></a>',
      '<a href="/categories/网页设计/"><span>03</span><strong>案例教程</strong><em>照着文章复现真实作品</em></a>',
      "</div>"
    ].join("");

    recentPosts.parentNode.insertBefore(intro, recentPosts);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", createHomeIntro);
  } else {
    createHomeIntro();
  }
  document.addEventListener("pjax:complete", createHomeIntro);
})();
