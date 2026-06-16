/* ============================================================
   DORO 16 — public blog / "Journal" renderer
   Reads data/posts.json and renders the homepage list + post.html
   ============================================================ */
(function () {
  "use strict";

  const lang = () => (window.currentLang ? window.currentLang() : "en");
  const pick = (obj) => (obj && (obj[lang()] || obj.en || "")) || "";
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const fmtDate = (iso) => {
    try {
      return new Date(iso + "T00:00:00").toLocaleDateString(lang() === "ro" ? "ro-RO" : "en-GB", {
        year: "numeric", month: "long", day: "numeric",
      });
    } catch (e) { return iso; }
  };
  const bodyToHtml = (text) =>
    String(text).split(/\n{2,}/).map((p) => "<p>" + esc(p.trim()).replace(/\n/g, "<br>") + "</p>").join("");

  let POSTS = [];
  const load = () =>
    fetch("data/posts.json", { cache: "no-cache" })
      .then((r) => (r.ok ? r.json() : { posts: [] }))
      .then((d) => {
        POSTS = (d.posts || [])
          .filter((p) => p.status === "published")
          .sort((a, b) => (a.date < b.date ? 1 : -1));
        return POSTS;
      })
      .catch(() => (POSTS = []));

  /* ---------- Homepage "Journal" list ---------- */
  function renderList() {
    const grid = document.getElementById("journalGrid");
    if (!grid) return;
    const section = document.getElementById("journal");
    const max = parseInt(grid.dataset.max || "3", 10);
    const items = POSTS.slice(0, max);
    if (!items.length) { if (section) section.hidden = true; return; }
    if (section) section.hidden = false;
    grid.innerHTML = items
      .map(
        (p) => `
      <a class="jcard reveal is-in" href="post.html?slug=${encodeURIComponent(p.slug)}">
        <div class="jcard__media">${p.cover ? `<img src="${esc(p.cover)}" alt="" loading="lazy">` : ""}</div>
        <div class="jcard__body">
          <time class="jcard__date">${esc(fmtDate(p.date))}</time>
          <h3 class="jcard__title">${esc(pick(p.title))}</h3>
          <p class="jcard__excerpt">${esc(pick(p.excerpt))}</p>
          <span class="jcard__more">${esc(window.t ? window.t("journal.readmore") : "Read more")} →</span>
        </div>
      </a>`
      )
      .join("");
  }

  /* ---------- Single post (post.html) ---------- */
  function renderPost() {
    const article = document.getElementById("postArticle");
    if (!article) return;
    const slug = new URLSearchParams(location.search).get("slug");
    const post = POSTS.find((p) => p.slug === slug) || (function () {
      // also allow viewing a draft if opened directly is not supported; published only
      return null;
    })();
    if (!post) {
      article.innerHTML = `<p class="post__missing">${window.t ? window.t("post.missing") : "Post not found."} <a href="index.html#journal">← ${window.t ? window.t("post.back") : "Back to Journal"}</a></p>`;
      return;
    }
    document.title = pick(post.title) + " · DORO 16";
    article.innerHTML = `
      <a class="post__back" href="index.html#journal">← <span data-i18n="post.back">${window.t ? window.t("post.back") : "Back to Journal"}</span></a>
      <time class="post__date">${esc(fmtDate(post.date))}</time>
      <h1 class="post__title">${esc(pick(post.title))}</h1>
      ${post.cover ? `<figure class="post__cover"><img src="${esc(post.cover)}" alt=""></figure>` : ""}
      <div class="post__body">${bodyToHtml(pick(post.body))}</div>
      ${
        (post.gallery && post.gallery.length)
          ? `<div class="post__gallery">${post.gallery.map((g) => `<img src="${esc(g)}" alt="" loading="lazy">`).join("")}</div>`
          : ""
      }
      <a class="post__back post__back--bottom" href="index.html#journal">← <span>${window.t ? window.t("post.back") : "Back to Journal"}</span></a>`;
  }

  function renderAll() { renderList(); renderPost(); }

  load().then(renderAll);
  window.addEventListener("languagechanged", () => { if (POSTS.length || document.getElementById("postArticle")) renderAll(); });
})();
