/* ============================================================
   DORO 16 — interactions
   ============================================================ */
(function () {
  "use strict";

  const $  = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Nav: scrolled state ---------- */
  const nav = $("#nav");
  const onScroll = () => nav.classList.toggle("is-scrolled", window.scrollY > 40);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---------- Mobile menu ---------- */
  const toggle = $("#navToggle");
  const links = $("#navLinks");
  const closeMenu = () => {
    links.classList.remove("is-open");
    nav.classList.remove("is-menu-open");
    toggle.setAttribute("aria-expanded", "false");
  };
  toggle.addEventListener("click", () => {
    const open = links.classList.toggle("is-open");
    nav.classList.toggle("is-menu-open", open);
    toggle.setAttribute("aria-expanded", String(open));
  });
  $$("#navLinks a").forEach((a) => a.addEventListener("click", closeMenu));
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeMenu(); });

  /* ---------- Reveal on scroll ---------- */
  const reveals = $$(".reveal");
  if (prefersReduced || !("IntersectionObserver" in window)) {
    reveals.forEach((el) => el.classList.add("is-in"));
  } else {
    // stagger items that share a parent
    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const siblings = $$(".reveal", el.parentElement);
        const idx = siblings.indexOf(el);
        el.style.transitionDelay = Math.min(idx, 6) * 70 + "ms";
        el.classList.add("is-in");
        obs.unobserve(el);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    reveals.forEach((el) => io.observe(el));
  }

  /* ---------- Count-up stats ---------- */
  const formatNum = (n) => n.toLocaleString("en-US");
  const animateCount = (el) => {
    if (el.dataset.plain === "true") return; // e.g. the year, show as-is
    const target = parseInt(el.dataset.count, 10);
    const prefix = el.dataset.prefix ? el.dataset.prefix.replace("&gt;", ">") : "";
    if (prefersReduced) { el.textContent = prefix + formatNum(target); return; }
    const dur = 1600;
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = prefix + formatNum(Math.round(target * eased));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };
  const statNums = $$(".stat__num");
  if ("IntersectionObserver" in window) {
    const so = new IntersectionObserver((entries, obs) => {
      entries.forEach((e) => { if (e.isIntersecting) { animateCount(e.target); obs.unobserve(e.target); } });
    }, { threshold: 0.5 });
    statNums.forEach((el) => so.observe(el));
  } else {
    statNums.forEach(animateCount);
  }

  /* ---------- Lightbox ---------- */
  const lightbox = $("#lightbox");
  const lightboxImg = $("#lightboxImg");
  const openLightbox = (src, alt) => {
    lightboxImg.src = src; lightboxImg.alt = alt || "";
    lightbox.classList.add("is-open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  };
  const closeLightbox = () => {
    lightbox.classList.remove("is-open");
    lightbox.setAttribute("aria-hidden", "true");
    // keep scroll locked if the event modal is still open behind the lightbox
    const modalOpen = document.getElementById("eventModal").classList.contains("is-open");
    document.body.style.overflow = modalOpen ? "hidden" : "";
    setTimeout(() => { lightboxImg.src = ""; }, 400);
  };
  $$(".g-item img").forEach((img) => {
    img.parentElement.addEventListener("click", () => openLightbox(img.src, img.alt));
  });
  $(".lightbox__close").addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", (e) => { if (e.target === lightbox) closeLightbox(); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeLightbox(); });

  /* ---------- Event detail modal ---------- */
  const EVENTS = [
    {
      cat: "Brand activation",
      title: "“House Lancôme” activation",
      text: "A maison-style takeover where the house became Lancôme's world for a night — interactive installations and a multisensory beauty journey, with each of the rooms styled as another chapter of the story.",
      photos: ["lounge-floral.jpg", "mood-1.jpg", "salon-bw.jpg"],
    },
    {
      cat: "Brand activation",
      title: "“House Disney” activation",
      text: "An immersive brand world that reimagined the salon as a piece of the Disney universe — themed set design, experiential moments and a sense of wonder threaded through all six rooms.",
      photos: ["hero-interior.jpg", "lounge-people.jpg", "dining-room-day.jpg"],
    },
    {
      cat: "Product launch",
      title: "New Collection Launch",
      text: "The unveiling of a new line in a setting built to make it shine — bespoke lighting, considered staging and an atmosphere that lets the collection take centre stage.",
      photos: ["mood-kitchen.jpg", "salon-bw.jpg", "lounge-people.jpg"],
    },
    {
      cat: "Corporate gathering",
      title: "Strategy Board Meeting",
      text: "A focused working session far from the boardroom cliché — daylight, calm and quiet luxury across the house's restored rooms, the kind of setting that keeps great minds sharp and at ease.",
      photos: ["dining-room-day.jpg", "window-bw.jpg", "kitchen.jpg"],
    },
    {
      cat: "Workshop",
      title: "Creative Team Workshop",
      text: "A hands-on creative session — part masterclass, part collaboration — where teams build, make and think together around the kitchen and the long table.",
      photos: ["kitchen-prep.jpg", "plating.jpg", "mood-kitchen.jpg"],
    },
    {
      cat: "Community",
      title: "Monthly Community Meetings",
      text: "Our recurring gathering of makers, founders and friends of the house — because great minds think alike, and we like to keep them under one roof as often as possible.",
      photos: ["lounge-people.jpg", "mood-1.jpg", "salon-bw.jpg"],
    },
    {
      cat: "Anniversary",
      title: "5-Year Anniversary Party",
      text: "Five years of the house, celebrated the way we know best — bespoke lighting, live music and a room full of the people who gave the place its soul.",
      photos: ["mood-1.jpg", "lounge-floral.jpg", "live-gathering.jpg"],
    },
    {
      cat: "Private dinner",
      title: "Sponsors' Dinner",
      text: "An intimate, multisensory dinner crafted by our handpicked chefs — candlelight, long tables dressed with flowers, and conversation that runs late into the night.",
      photos: ["dinner-guests.jpg", "dinner-table.jpg", "long-table.jpg", "dinner-chandelier.jpg"],
    },
  ];

  const modal = $("#eventModal");
  const emCat = $("#emCat"), emTitle = $("#emTitle"), emText = $("#emText"), emGallery = $("#emGallery");
  let lastFocus = null;

  const openEvent = (i) => {
    const ev = EVENTS[i];
    if (!ev) return;
    lastFocus = document.activeElement;
    emCat.textContent = ev.cat;
    emTitle.innerHTML = ev.title;
    emText.textContent = ev.text;
    emGallery.innerHTML = "";
    ev.photos.forEach((p) => {
      const img = document.createElement("img");
      img.src = "assets/img/" + p;
      img.alt = ev.title.replace(/[“”]/g, "") + " at DORO 16";
      img.loading = "lazy";
      img.addEventListener("click", () => openLightbox(img.src, img.alt));
      emGallery.appendChild(img);
    });
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    modal.querySelector(".emodal__close").focus();
  };
  const closeEvent = () => {
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    if (!lightbox.classList.contains("is-open")) document.body.style.overflow = "";
    if (lastFocus) lastFocus.focus();
  };
  $$(".events__btn").forEach((btn) => {
    btn.addEventListener("click", () => openEvent(parseInt(btn.dataset.event, 10)));
  });
  $$("[data-emclose]", modal).forEach((el) => el.addEventListener("click", closeEvent));
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("is-open") && !lightbox.classList.contains("is-open")) closeEvent();
  });

  /* ---------- Contact form ---------- */
  const form = $("#contactForm");
  const note = $("#formNote");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = $("#cf-name");
    const email = $("#cf-email");
    if (!name.value.trim() || !email.value.trim() || !email.checkValidity()) {
      note.hidden = false;
      note.textContent = "Please add your name and a valid email so we can reply.";
      note.style.color = "var(--cream-dim)";
      (!name.value.trim() ? name : email).focus();
      return;
    }
    // Compose a mailto so the enquiry reaches the house even without a backend.
    const subject = encodeURIComponent(`Event enquiry — ${$("#cf-type").value}`);
    const body = encodeURIComponent(
      `Name: ${name.value}\nEmail: ${email.value}\nEvent type: ${$("#cf-type").value}\n\n${$("#cf-msg").value}`
    );
    window.location.href = `mailto:camelia@doro-16.com?subject=${subject}&body=${body}`;
    note.hidden = false;
    note.textContent = "Thank you — opening your email to send. We'll be in touch shortly.";
    note.style.color = "var(--gold-soft)";
    form.reset();
  });

  /* ---------- Footer year ---------- */
  $("#year").textContent = new Date().getFullYear();
})();

/* ============================================================
   DORO 16 — 3D & interactive layer
   Custom cursor · tilt+glare · hero parallax · seal tilt ·
   magnetic buttons · scroll parallax · kinetic marquee
   ============================================================ */
(function () {
  "use strict";

  const $  = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));
  const lerp  = (a, b, n) => a + (b - a) * n;
  const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const fine    = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  const pointer = fine && !reduced;          // gates mouse-driven 3D
  const motion  = !reduced;                  // gates auto-motion (marquee, scroll parallax)

  // Shared pointer position
  const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
  window.addEventListener("pointermove", (e) => { mouse.x = e.clientX; mouse.y = e.clientY; }, { passive: true });

  /* ---------- Custom cursor ---------- */
  if (pointer) {
    const ring = $("#cursorRing"), dot = $("#cursorDot");
    const root = document.documentElement;
    const c = { x: mouse.x, y: mouse.y };
    root.classList.add("has-cursor");
    requestAnimationFrame(() => root.classList.add("cursor-ready"));

    const HOVER = "a, button, .tilt, .g-item, .seal, .nav__toggle, label";
    document.addEventListener("pointerover", (e) => {
      if (e.target.closest(HOVER)) root.classList.add("cursor--hover");
    });
    document.addEventListener("pointerout", (e) => {
      if (e.target.closest(HOVER) && !(e.relatedTarget && e.relatedTarget.closest && e.relatedTarget.closest(HOVER)))
        root.classList.remove("cursor--hover");
    });
    document.addEventListener("pointerdown", () => root.classList.add("cursor--down"));
    document.addEventListener("pointerup",   () => root.classList.remove("cursor--down"));

    // Expose the smoothed ring position to the shared loop
    window.__cursorTick = () => {
      c.x = lerp(c.x, mouse.x, 0.2); c.y = lerp(c.y, mouse.y, 0.2);
      ring.style.transform = `translate(${c.x}px, ${c.y}px) translate(-50%, -50%)`;
      dot.style.transform  = `translate(${mouse.x}px, ${mouse.y}px) translate(-50%, -50%)`;
    };
  }

  /* ---------- 3D tilt + glare ---------- */
  if (pointer) {
    $$(".offer-card, .feature, .g-item, .member").forEach((el) => {
      el.classList.add("tilt");
      const glare = document.createElement("span");
      glare.className = "glare";
      el.appendChild(glare);
      const max = el.classList.contains("g-item") ? 7 : 9;

      el.addEventListener("pointerenter", () => {
        el.style.transition = "transform .25s var(--ease)";
        el.classList.add("is-tilting");
      });
      el.addEventListener("pointermove", (e) => {
        const r = el.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width;
        const py = (e.clientY - r.top) / r.height;
        const ry = (px - 0.5) * max * 2;
        const rx = -(py - 0.5) * max * 2;
        el.style.transform = `perspective(1100px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(8px)`;
        glare.style.setProperty("--gx", (px * 100) + "%");
        glare.style.setProperty("--gy", (py * 100) + "%");
      });
      el.addEventListener("pointerleave", () => {
        el.style.transform = "";
        el.classList.remove("is-tilting");
        setTimeout(() => { el.style.transition = ""; }, 320);
      });
    });
  }

  /* ---------- Hero parallax (shared rAF with cursor) ---------- */
  if (pointer) {
    const art   = $(".hero__art");
    const inner = $(".hero__inner");
    const st = { hx: 0, hy: 0 };

    (function loop() {
      if (window.__cursorTick) window.__cursorTick();

      // Hero: layered depth from screen-center offset
      const nx = mouse.x / window.innerWidth - 0.5;
      const ny = mouse.y / window.innerHeight - 0.5;
      st.hx = lerp(st.hx, nx, 0.06);
      st.hy = lerp(st.hy, ny, 0.06);
      if (art)   art.style.transform   = `translate3d(${st.hx * -38}px, ${st.hy * -26}px, 0) scale(1.05)`;
      if (inner) inner.style.transform = `rotateY(${st.hx * 5}deg) rotateX(${st.hy * -5}deg) translate3d(${st.hx * 22}px, ${st.hy * 16}px, 0)`;

      requestAnimationFrame(loop);
    })();
  }

  /* ---------- "at doro" 3D word cylinder (scroll-driven) ---------- */
  (function reel() {
    const reel = document.getElementById("reel");
    const drum = document.getElementById("reelDrum");
    if (!reel || !drum) return;
    const words = Array.from(drum.children);
    const N = words.length;
    const step = 360 / N;
    const DEG = Math.PI / 180;
    let radius = 0, current = 0, target = 0;

    const build = () => {
      const h = reel.getBoundingClientRect().height;
      radius = (h / 2) / Math.tan((step / 2) * DEG);
      // Measure the widest word with canvas (the words are absolutely stacked, so
      // layout width is unreliable) and reserve that width so "at doro" sits flush.
      const cs = getComputedStyle(words[0]);
      const ctx = build._ctx || (build._ctx = document.createElement("canvas").getContext("2d"));
      ctx.font = `${cs.fontStyle} ${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`;
      let maxW = 0;
      words.forEach((w) => { maxW = Math.max(maxW, ctx.measureText(w.textContent).width); });
      reel.style.width = Math.ceil(maxW + 4) + "px";
      words.forEach((w, i) => { w.style.transform = `rotateX(${i * step}deg) translateZ(${radius}px)`; });
    };

    const render = (a) => {
      drum.style.transform = `rotateX(${a}deg)`;
      words.forEach((w, i) => {
        const net = ((i * step + a + 540) % 360) - 180;     // -180..180, 0 = facing viewer
        const f = Math.cos(net * DEG);
        w.style.opacity = f > 0.02 ? (0.12 + 0.88 * f).toFixed(3) : "0";
      });
    };

    const SPEED = 0.32;   // degrees of drum rotation per pixel scrolled
    const setTarget = () => { target = window.scrollY * SPEED; };

    const ready = document.fonts ? document.fonts.ready : Promise.resolve();
    ready.then(() => { build(); setTarget(); current = target; render(current); });
    window.addEventListener("resize", () => { build(); render(current); }, { passive: true });

    if (reduced) { ready.then(() => render(0)); return; }   // static: shows the front word

    window.addEventListener("scroll", setTarget, { passive: true });
    (function spin() {
      current += (target - current) * 0.1;
      render(current);
      requestAnimationFrame(spin);
    })();
  })();

  /* ---------- Scroll parallax (decorative line-art) ---------- */
  if (motion) {
    const layers = [
      { el: $(".quote__art img"),   f: 0.12 },
      { el: $(".contact__art img"), f: 0.10 },
    ].filter((o) => o.el);
    if (layers.length) {
      let ticking = false;
      const update = () => {
        layers.forEach(({ el, f }) => {
          const r = el.getBoundingClientRect();
          const center = r.top + r.height / 2 - window.innerHeight / 2;
          el.style.transform = `translate3d(0, ${-center * f}px, 0)`;
        });
        ticking = false;
      };
      window.addEventListener("scroll", () => {
        if (!ticking) { ticking = true; requestAnimationFrame(update); }
      }, { passive: true });
      window.addEventListener("resize", update, { passive: true });
      update();
    }
  }

  /* ---------- Kinetic marquee (scroll-velocity reactive) ---------- */
  if (motion) {
    // Rebuild each row from one "unit" of markup, repeated until it covers
    // 2× the viewport + a spare unit, so the modulo-wrap is always seamless.
    const setup = (r) => {
      r.track.style.transform = "none";
      r.track.innerHTML = r.base;
      r.unitW = r.track.scrollWidth;
      let guard = 0;
      while (r.track.scrollWidth < window.innerWidth * 2 + r.unitW && guard < 24) {
        r.track.insertAdjacentHTML("beforeend", r.base); guard++;
      }
      r.m = r.unitW ? r.m % r.unitW : 0;
    };
    const rows = $$("[data-marquee]").map((row) => {
      const track = $(".marquee__track", row);
      const r = { track, dir: parseFloat(row.dataset.dir) || 1, base: track.innerHTML, unitW: 0, m: 0 };
      setup(r);
      return r;
    });

    if (rows.length) {
      let boost = 0, lastY = window.scrollY, rz;
      window.addEventListener("scroll", () => {
        const y = window.scrollY;
        boost += Math.min(Math.abs(y - lastY), 60) * 0.12;
        lastY = y;
      }, { passive: true });
      window.addEventListener("resize", () => {
        clearTimeout(rz);
        rz = setTimeout(() => rows.forEach(setup), 150);
      }, { passive: true });

      (function loop() {
        boost *= 0.93;
        const v = 0.45 + boost;
        rows.forEach((r) => {
          if (!r.unitW) return;
          r.m = (r.m + v) % r.unitW;
          r.track.style.transform = `translateX(${r.dir > 0 ? -r.m : r.m - r.unitW}px)`;
        });
        requestAnimationFrame(loop);
      })();
    }
  }
})();
