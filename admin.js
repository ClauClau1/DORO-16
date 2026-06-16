/* ============================================================
   DORO 16 — Journal admin
   Edits posts and publishes them straight to the GitHub repo
   (GitHub Contents API) using a fine-grained token kept only
   in this browser. Static-site friendly — no backend.
   ============================================================ */
(function () {
  "use strict";

  // ---- Config (edit PASS to your own passphrase) --------------------------
  const PASS = "doro16";
  const REPO = { owner: "ClauClau1", repo: "DORO-16", branch: "main" };
  const POSTS_PATH = "data/posts.json";
  const IMG_DIR = "assets/blog/";
  const API = `https://api.github.com/repos/${REPO.owner}/${REPO.repo}/contents/`;

  const $ = (id) => document.getElementById(id);
  // Safe storage — never let a blocked/sandboxed storage abort the script
  const ss = {
    get(k) { try { return sessionStorage.getItem(k); } catch (e) { return null; } },
    set(k, v) { try { sessionStorage.setItem(k, v); } catch (e) {} },
    del(k) { try { sessionStorage.removeItem(k); } catch (e) {} },
  };
  const ls = {
    get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch (e) {} },
    del(k) { try { localStorage.removeItem(k); } catch (e) {} },
  };
  const utf8b64 = (str) => btoa(unescape(encodeURIComponent(str)));
  const slugify = (s) =>
    (s || "").toLowerCase().trim()
      .replace(/[ăâ]/g, "a").replace(/î/g, "i").replace(/[șş]/g, "s").replace(/[țţ]/g, "t")
      .replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 60) || "post";
  const ts = () => new Date().toISOString().slice(0, 10);

  let token = "";
  let posts = [];
  let activeId = null;
  let pendingImages = []; // {path, b64}
  let coverFileData = null; // {b64, ext}
  let galleryFileData = []; // [{b64, ext}]

  /* ---------- toast ---------- */
  let toastTimer;
  const toast = (msg, kind) => {
    const t = $("toast");
    t.textContent = msg;
    t.className = "toast show" + (kind ? " toast--" + kind : "");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => (t.className = "toast"), kind === "err" ? 6000 : 3500);
  };

  /* ---------- gate ---------- */
  const unlock = () => { $("gate").classList.add("hidden"); $("app").classList.remove("hidden"); boot(); };
  if (ss.get("doro-admin-ok") === "1") unlock();
  $("gateForm").addEventListener("submit", (e) => {
    e.preventDefault();
    if ($("gatePass").value === PASS) { ss.set("doro-admin-ok", "1"); unlock(); }
    else $("gateErr").textContent = "Wrong passphrase.";
  });
  $("lockBtn").addEventListener("click", () => { ss.del("doro-admin-ok"); location.reload(); });

  /* ---------- token ---------- */
  const refreshTokenPill = () => {
    const p = $("tokenPill");
    if (token) { p.textContent = "Token connected"; p.className = "pill pill--ok"; }
    else { p.textContent = "No GitHub token"; p.className = "pill pill--no"; }
  };
  const tokenDialog = $("tokenDialog");
  $("tokenBtn").addEventListener("click", () => { $("tokenInput").value = token; tokenDialog.showModal(); });
  $("tokenSave").addEventListener("click", () => {
    token = $("tokenInput").value.trim();
    ls.set("doro-gh-token", token);
    refreshTokenPill(); tokenDialog.close(); toast(token ? "Token saved." : "Token cleared.");
  });
  $("tokenClear").addEventListener("click", () => {
    token = ""; ls.del("doro-gh-token");
    $("tokenInput").value = ""; refreshTokenPill(); tokenDialog.close();
  });

  /* ---------- GitHub API ---------- */
  async function ghGetSha(path) {
    const r = await fetch(API + path + "?ref=" + REPO.branch, {
      headers: { Authorization: "Bearer " + token, Accept: "application/vnd.github+json" },
    });
    if (r.status === 404) return null;
    if (!r.ok) throw new Error("GitHub read failed (" + r.status + ")");
    return (await r.json()).sha;
  }
  async function ghPut(path, contentB64, message) {
    const sha = await ghGetSha(path);
    const r = await fetch(API + path, {
      method: "PUT",
      headers: { Authorization: "Bearer " + token, Accept: "application/vnd.github+json" },
      body: JSON.stringify({ message, content: contentB64, branch: REPO.branch, sha: sha || undefined }),
    });
    if (!r.ok) {
      let m = r.status;
      try { m = (await r.json()).message || m; } catch (e) {}
      throw new Error("Publish failed: " + m);
    }
    return r.json();
  }

  /* ---------- data ---------- */
  function loadWorking() {
    try { const local = ls.get("doro-posts-working"); if (local) return JSON.parse(local); } catch (e) {}
    return null;
  }
  function saveWorking() { ls.set("doro-posts-working", JSON.stringify({ posts })); }

  async function boot() {
    token = ls.get("doro-gh-token") || "";
    refreshTokenPill();

    const working = loadWorking();
    if (working && working.posts) {
      posts = working.posts;
      toast("Restored unsaved local changes.");
    } else {
      try {
        const d = await (await fetch("data/posts.json?t=" + Date.now())).json();
        posts = d.posts || [];
      } catch (e) { posts = []; }
    }
    renderList();
  }

  const blank = () => ({
    id: "", slug: "", date: ts(), status: "draft", cover: "",
    title: { en: "", ro: "" }, excerpt: { en: "", ro: "" }, body: { en: "", ro: "" }, gallery: [],
  });

  /* ---------- list ---------- */
  function renderList() {
    const list = $("plist");
    list.innerHTML = "";
    if (!posts.length) { list.innerHTML = '<p style="color:var(--muted);font-size:.85rem">No posts yet.</p>'; }
    posts.forEach((p) => {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "pitem" + (p.id === activeId ? " is-active" : "");
      b.innerHTML =
        `<span class="pitem__t">${(p.title && p.title.en) || "(untitled)"}</span>` +
        `<span class="pitem__m">${p.date || ""}<span class="badge ${p.status === "published" ? "badge--pub" : "badge--draft"}">${p.status}</span></span>`;
      b.addEventListener("click", () => selectPost(p.id));
      list.appendChild(b);
    });
  }

  /* ---------- editor ---------- */
  function selectPost(id) {
    activeId = id;
    coverFileData = null; galleryFileData = []; $("coverThumb").innerHTML = ""; $("galleryThumb").innerHTML = "";
    const p = posts.find((x) => x.id === id) || blank();
    $("emptyState").classList.add("hidden");
    $("editor").classList.remove("hidden");
    $("f-date").value = p.date || ts();
    $("f-status").value = p.status || "draft";
    $("f-slug").value = p.slug || "";
    $("f-title-en").value = (p.title && p.title.en) || "";
    $("f-title-ro").value = (p.title && p.title.ro) || "";
    $("f-excerpt-en").value = (p.excerpt && p.excerpt.en) || "";
    $("f-excerpt-ro").value = (p.excerpt && p.excerpt.ro) || "";
    $("f-body-en").value = (p.body && p.body.en) || "";
    $("f-body-ro").value = (p.body && p.body.ro) || "";
    $("f-cover").value = p.cover || "";
    $("f-gallery").value = (p.gallery || []).join("\n");
    $("previewBtn").href = "post.html?slug=" + encodeURIComponent(p.slug || "");
    renderList();
  }

  function readForm() {
    let slug = slugify($("f-slug").value || $("f-title-en").value || $("f-title-ro").value);
    return {
      id: activeId && activeId !== "" ? activeId : slug,
      slug: slug,
      date: $("f-date").value || ts(),
      status: $("f-status").value,
      cover: $("f-cover").value.trim(),
      title: { en: $("f-title-en").value.trim(), ro: $("f-title-ro").value.trim() },
      excerpt: { en: $("f-excerpt-en").value.trim(), ro: $("f-excerpt-ro").value.trim() },
      body: { en: $("f-body-en").value, ro: $("f-body-ro").value },
      gallery: $("f-gallery").value.split("\n").map((s) => s.trim()).filter(Boolean),
    };
  }

  function commitToArray(post) {
    const i = posts.findIndex((x) => x.id === activeId);
    if (i >= 0) posts[i] = post; else posts.push(post);
    activeId = post.id;
  }

  /* ---------- images ---------- */
  const fileToB64 = (file) =>
    new Promise((res, rej) => {
      const r = new FileReader();
      r.onload = () => res(String(r.result).split(",")[1]);
      r.onerror = rej;
      r.readAsDataURL(file);
    });
  const extOf = (name) => (name.match(/\.[a-z0-9]+$/i) || [".jpg"])[0].toLowerCase();
  const thumb = (b64, container) => {
    const img = document.createElement("img");
    img.className = "thumb"; img.src = "data:image/*;base64," + b64;
    $(container).appendChild(img);
  };

  $("f-cover-file").addEventListener("change", async (e) => {
    const f = e.target.files[0]; if (!f) return;
    coverFileData = { b64: await fileToB64(f), ext: extOf(f.name) };
    $("coverThumb").innerHTML = ""; thumb(coverFileData.b64, "coverThumb");
    toast("Cover ready — will upload on Publish.");
  });
  $("f-gallery-file").addEventListener("change", async (e) => {
    for (const f of e.target.files) {
      const b64 = await fileToB64(f);
      galleryFileData.push({ b64, ext: extOf(f.name) });
      thumb(b64, "galleryThumb");
    }
    toast(galleryFileData.length + " image(s) ready — will upload on Publish.");
  });

  /* ---------- save / delete ---------- */
  $("newBtn").addEventListener("click", () => {
    activeId = "";
    coverFileData = null; galleryFileData = []; $("coverThumb").innerHTML = ""; $("galleryThumb").innerHTML = "";
    const p = blank();
    $("emptyState").classList.add("hidden"); $("editor").classList.remove("hidden");
    $("f-date").value = p.date; $("f-status").value = "draft";
    ["f-slug","f-title-en","f-title-ro","f-excerpt-en","f-excerpt-ro","f-body-en","f-body-ro","f-cover","f-gallery"].forEach((k)=>$(k).value="");
    renderList();
  });

  $("saveBtn").addEventListener("click", () => {
    if (!$("f-title-en").value && !$("f-title-ro").value) return toast("Add a title first.", "err");
    commitToArray(readForm());
    saveWorking(); renderList();
    toast("Saved locally (not yet published).");
  });

  $("deleteBtn").addEventListener("click", () => {
    if (!activeId) { $("editor").classList.add("hidden"); $("emptyState").classList.remove("hidden"); return; }
    if (!confirm("Delete this post? You still need to Publish to remove it from the live site.")) return;
    posts = posts.filter((x) => x.id !== activeId);
    activeId = null; saveWorking(); renderList();
    $("editor").classList.add("hidden"); $("emptyState").classList.remove("hidden");
    toast("Deleted locally — Publish to apply on the site.");
  });

  /* ---------- publish ---------- */
  $("publishBtn").addEventListener("click", async () => {
    if (!token) { toast("Add a GitHub token first.", "err"); $("tokenBtn").click(); return; }
    if (!$("f-title-en").value && !$("f-title-ro").value) return toast("Add a title first.", "err");

    const post = readForm();
    pendingImages = [];

    // queue uploaded images
    if (coverFileData) {
      const path = IMG_DIR + post.slug + "-cover-" + Date.now() + coverFileData.ext;
      pendingImages.push({ path, b64: coverFileData.b64 });
      post.cover = path;
    }
    galleryFileData.forEach((g, i) => {
      const path = IMG_DIR + post.slug + "-" + Date.now() + "-" + i + g.ext;
      pendingImages.push({ path, b64: g.b64 });
      post.gallery.push(path);
    });

    commitToArray(post);
    saveWorking();

    const btn = $("publishBtn"); btn.disabled = true; btn.textContent = "Publishing…";
    try {
      for (const img of pendingImages) {
        toast("Uploading image…");
        await ghPut(img.path, img.b64, "blog: add image " + img.path);
      }
      toast("Saving posts…");
      await ghPut(POSTS_PATH, utf8b64(JSON.stringify({ posts }, null, 2)), "blog: update " + post.slug);
      coverFileData = null; galleryFileData = [];
      $("coverThumb").innerHTML = ""; $("galleryThumb").innerHTML = "";
      selectPost(post.id);
      toast("Published! Live in ~1 minute.", "ok");
    } catch (err) {
      toast(err.message || "Publish failed.", "err");
    } finally {
      btn.disabled = false; btn.textContent = "Publish to site";
    }
  });
})();
