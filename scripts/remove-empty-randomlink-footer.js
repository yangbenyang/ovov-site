"use strict";

const cheerio = require("cheerio");

hexo.extend.filter.register("after_render:html", function removeEmptyRandomLinkFooter(html) {
  const randomlink = this.theme && this.theme.config && this.theme.config.footer
    ? this.theme.config.footer.randomlink
    : false;

  if (randomlink) return html;

  const $ = cheerio.load(html, { decodeEntities: false });
  $("#friend-links-in-footer").closest(".footer-group").remove();

  return $.html();
});
