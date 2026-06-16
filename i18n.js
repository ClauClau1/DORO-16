/* ============================================================
   DORO 16 — bilingual (EN / RO) engine
   ============================================================ */
(function () {
  "use strict";

  const I18N = {
    en: {
      "nav.house": "The House", "nav.offer": "What We Do", "nav.events": "Events",
      "nav.gallery": "Gallery", "nav.spaces": "Spaces", "nav.people": "People",
      "nav.journal": "Journal", "nav.cta": "Plan an event", "nav.menu": "Open menu",

      "journal.eyebrow": "From the house", "journal.h2": "The Journal",
      "journal.intro": "Stories from the events that have filled these rooms.",
      "journal.readmore": "Read more",
      "post.back": "Back to the Journal", "post.missing": "This story could not be found.",

      "hero.eyebrow": "Dorobanți 16 Events · Bucharest",
      "hero.lede": "We are the space for <em>extraordinary&nbsp;events.</em>",
      "hero.cta1": "Plan your event", "hero.cta2": "Discover the house",
      "hero.scroll": "Scroll to content",

      "about.eyebrow": "A brief background",
      "about.h2": "What is <br />DORO&nbsp;16?",
      "about.lead": "A multifunctional 117-year-old house, blending curated events with a thoughtful selection of local design and artistry.",
      "about.body": "Behind a quiet façade on one of Bucharest's most storied boulevards, the house opens into six rooms of patina, candlelight and conversation — a living salon where dinners, performances and gatherings find their stage.",
      "about.link": "See what happens here",

      "atdoro.eyebrow": "From a quiet dinner to a full production",
      "atdoro.sub": "Whatever the occasion — it finds its room, and its mood, <em>at doro.</em>",
      "reel.dinners": "dinners", "reel.parties": "parties", "reel.live": "live acts",
      "reel.workshops": "workshops", "reel.launches": "launches", "reel.brunches": "brunches",
      "reel.celebrations": "celebrations", "reel.activations": "activations",

      "stats.established": "Established", "stats.events": "Events hosted", "stats.guests": "Guests welcomed",

      "quote.p": "“Because a house finds its soul<br /> in the people who fill&nbsp;it.”",
      "quote.cite": "— and there is nothing that wins us over more than good stories well&nbsp;told.",

      "dream.eyebrow": "Why we do it",
      "dream.h2": "A daily drive<br />to bring people together",
      "dream.lead": "Bringing the most inspiring people together to create a better future for each — and creating meaningful connections along the way.",

      "offer.eyebrow": "How we do it",
      "offer.h2": "Just come and… experience.",
      "offer.intro": "Brunch, dinners, parties, live acts — three ways to spend an evening at&nbsp;doro.",
      "offer.c1.title": "Our House", "offer.c1.kicker": "Private gatherings",
      "offer.c1.body": "Brunches, dinners, parties and live acts curated by us — the house at its most intimate, open to those who love a good evening.",
      "offer.c2.title": "Our Homes", "offer.c2.kicker": "Concept store &amp; design",
      "offer.c2.body": "A promoting platform and concept store for the local designers and makers we admire — artistry woven through every room.",
      "offer.c3.title": "Your House", "offer.c3.kicker": "Your events",
      "offer.c3.body": "Corporate dinners, workshops, parties and product launches. Yes — we can do it for you, too. The house becomes yours for the night.",

      "gath.eyebrow": "Private gatherings", "gath.h2": "Three kinds of evening",
      "gath.dinners.t": "Dinners", "gath.dinners.b": "Immersive, multisensory experiences crafted by our handpicked selection of expert chefs.",
      "gath.parties.t": "Parties", "gath.parties.b": "Mingling &amp; dance — because we all need it. The salon turns warm, loud and alive.",
      "gath.live.t": "Live Acts", "gath.live.b": "From symphonic evenings to theatre and dance performances — we fold art into our everyday cravings.",

      "events.eyebrow": "A few of the things that have happened here",
      "events.h2": "Curated, every&nbsp;time", "events.more": "…and many more",

      "gallery.eyebrow": "The mood", "gallery.h2": "A house after dark",

      "guests.eyebrow": "Our ideal guests",
      "guests.h2": "Creators, visionaries &amp; the curious",
      "guests.lead": "A house finds its soul in the people who fill it — so we love the presence of:",
      "guests.g1.t": "Entrepreneurs", "guests.g1.b": "Our beloved hustlers.",
      "guests.g2.t": "Creatives", "guests.g2.b": "Our most creative dreamers.",
      "guests.g3.t": "The Young Generation", "guests.g3.b": "Because we love to nurture potential.",

      "specs.eyebrow": "The space, in numbers", "specs.h2": "Technicalities",
      "specs.body": "Six rooms of restored interior, a bar, a working kitchen and a terrace — equipped for everything from a board dinner to a product launch.",
      "specs.sqm": "sqm", "specs.rooms": "rooms", "specs.baths": "bathrooms", "specs.terrace": "terrace",
      "specs.bar.v": "Bar", "specs.bar.u": "+ full F&amp;B", "specs.kitchen.v": "Kitchen", "specs.kitchen.u": "on site",
      "specs.tv": "TV screen", "specs.proj.v": "Projector", "specs.proj.u": "+ sound system",
      "specs.parking.v": "Parking", "specs.parking.u": "available",

      "team.eyebrow": "The people behind the house", "team.h2": "OK, but who?",
      "team.intro": "A house is only as warm as its hosts.",
      "team.dora.role": "Owner &amp; Co-founder",
      "team.dora.bio": "New Projects Architect, high on dreams and out-of-the-box-ideas driven entrepreneur. Bold visionary and keen on disruptive beginnings. Restless.",
      "team.sergio.role": "Co-founder · Kitchen specialist",
      "team.sergio.bio": "Soft soul with a hard shell, a storyteller with a multicultural heritage, a very strong professional passionate about kitchenware and with the sharpest eye for details. Complex.",
      "team.camelia.role": "Co-founder",
      "team.camelia.bio": "The big heart who sees and celebrates beauty all around, finds the pattern in big environments and within big teams and keeps patience in crisis, especially in the presence of good company. Unifier.",

      "partners.eyebrow": "Friends &amp; partners", "partners.h2": "In good company",
      "partners.design": "Design", "partners.fb": "Food &amp; Beverage", "partners.prod": "Production", "partners.more": "&amp; more",

      "contact.eyebrow": "Want to find out more?",
      "contact.h2": "Let's host something<br />extraordinary.",
      "contact.lead": "Tell us what you're dreaming up — a dinner, a launch, a party, a performance — and we'll shape the house around it.",
      "contact.k.address": "Address", "contact.k.phone": "Phone", "contact.k.email": "Email",
      "contact.address": "Calea Dorobanți 16, Bucharest",

      "form.name": "Name", "form.name.ph": "Your name",
      "form.email": "Email", "form.type": "Type of event", "form.msg": "Tell us about it",
      "form.msg.ph": "Date, number of guests, the mood you're after…", "form.submit": "Send enquiry",
      "form.opt.dinner": "Private dinner", "form.opt.party": "Party / celebration",
      "form.opt.corporate": "Corporate dinner", "form.opt.workshop": "Workshop",
      "form.opt.launch": "Product launch", "form.opt.live": "Live act / performance", "form.opt.other": "Something else",
      "form.err": "Please add your name and a valid email so we can reply.",
      "form.ok": "Thank you — opening your email to send. We'll be in touch shortly.",
      "form.subject": "Event enquiry — ",

      "footer.tagline": "The space for extraordinary events.",
      "footer.contact": "Contact", "footer.city": "Bucharest, Romania",

      "ev.0.cat": "Brand activation", "ev.0.title": "“House Lancôme” activation",
      "ev.0.text": "A maison-style takeover where the house became Lancôme's world for a night — interactive installations and a multisensory beauty journey, with each of the rooms styled as another chapter of the story.",
      "ev.1.cat": "Brand activation", "ev.1.title": "“House Disney” activation",
      "ev.1.text": "An immersive brand world that reimagined the salon as a piece of the Disney universe — themed set design, experiential moments and a sense of wonder threaded through all six rooms.",
      "ev.2.cat": "Product launch", "ev.2.title": "New Collection Launch",
      "ev.2.text": "The unveiling of a new line in a setting built to make it shine — bespoke lighting, considered staging and an atmosphere that lets the collection take centre stage.",
      "ev.3.cat": "Corporate gathering", "ev.3.title": "Strategy Board Meeting",
      "ev.3.text": "A focused working session far from the boardroom cliché — daylight, calm and quiet luxury across the house's restored rooms, the kind of setting that keeps great minds sharp and at ease.",
      "ev.4.cat": "Workshop", "ev.4.title": "Creative Team Workshop",
      "ev.4.text": "A hands-on creative session — part masterclass, part collaboration — where teams build, make and think together around the kitchen and the long table.",
      "ev.5.cat": "Community", "ev.5.title": "Monthly Community Meetings",
      "ev.5.text": "Our recurring gathering of makers, founders and friends of the house — because great minds think alike, and we like to keep them under one roof as often as possible.",
      "ev.6.cat": "Anniversary", "ev.6.title": "5-Year Anniversary Party",
      "ev.6.text": "Five years of the house, celebrated the way we know best — bespoke lighting, live music and a room full of the people who gave the place its soul.",
      "ev.7.cat": "Private dinner", "ev.7.title": "Sponsors' Dinner",
      "ev.7.text": "An intimate, multisensory dinner crafted by our handpicked chefs — candlelight, long tables dressed with flowers, and conversation that runs late into the night.",
    },

    ro: {
      "nav.house": "Casa", "nav.offer": "Ce Facem", "nav.events": "Evenimente",
      "nav.gallery": "Galerie", "nav.spaces": "Spații", "nav.people": "Echipa",
      "nav.journal": "Jurnal", "nav.cta": "Planifică un eveniment", "nav.menu": "Deschide meniul",

      "journal.eyebrow": "Din casă", "journal.h2": "Jurnalul",
      "journal.intro": "Povești din evenimentele care au umplut aceste camere.",
      "journal.readmore": "Citește mai mult",
      "post.back": "Înapoi la Jurnal", "post.missing": "Această poveste nu a putut fi găsită.",

      "hero.eyebrow": "Dorobanți 16 Events · București",
      "hero.lede": "Suntem spațiul pentru <em>evenimente&nbsp;extraordinare.</em>",
      "hero.cta1": "Planifică-ți evenimentul", "hero.cta2": "Descoperă casa",
      "hero.scroll": "Derulează în jos",

      "about.eyebrow": "Pe scurt",
      "about.h2": "Ce este <br />DORO&nbsp;16?",
      "about.lead": "O casă multifuncțională, veche de 117 ani, care îmbină evenimente atent curatoriate cu o selecție rafinată de design și artă locală.",
      "about.body": "În spatele unei fațade discrete, pe unul dintre cele mai cu istorie bulevarde ale Bucureștiului, casa se deschide în șase camere de patină, lumină de lumânare și conversație — un salon viu, unde cinele, spectacolele și întâlnirile își găsesc scena.",
      "about.link": "Vezi ce se întâmplă aici",

      "atdoro.eyebrow": "De la o cină intimă la o producție completă",
      "atdoro.sub": "Indiferent de ocazie — își găsește camera și atmosfera, <em>at doro.</em>",
      "reel.dinners": "dineuri", "reel.parties": "petreceri", "reel.live": "momente live",
      "reel.workshops": "ateliere", "reel.launches": "lansări", "reel.brunches": "brunch-uri",
      "reel.celebrations": "celebrări", "reel.activations": "activări",

      "stats.established": "Înființat", "stats.events": "Evenimente găzduite", "stats.guests": "Invitați primiți",

      "quote.p": "„Pentru că o casă își găsește sufletul<br /> în oamenii care o&nbsp;umplu.”",
      "quote.cite": "— și nimic nu ne cucerește mai mult decât poveștile bune, bine&nbsp;spuse.",

      "dream.eyebrow": "De ce o facem",
      "dream.h2": "O dorință zilnică<br />de a aduce oamenii împreună",
      "dream.lead": "Aducem împreună cei mai inspiraționali oameni pentru a construi un viitor mai bun pentru fiecare — creând, pe parcurs, conexiuni cu sens.",

      "offer.eyebrow": "Cum o facem",
      "offer.h2": "Vino pur și simplu și… trăiește experiența.",
      "offer.intro": "Brunch, cine, petreceri, momente live — trei feluri de a petrece o seară at&nbsp;doro.",
      "offer.c1.title": "Casa Noastră", "offer.c1.kicker": "Întâlniri private",
      "offer.c1.body": "Brunch-uri, cine, petreceri și momente live curatoriate de noi — casa în forma ei cea mai intimă, deschisă celor care iubesc o seară bună.",
      "offer.c2.title": "Casele Noastre", "offer.c2.kicker": "Concept store &amp; design",
      "offer.c2.body": "O platformă de promovare și un concept store pentru designerii și creatorii locali pe care îi admirăm — artă țesută în fiecare cameră.",
      "offer.c3.title": "Casa Ta", "offer.c3.kicker": "Evenimentele tale",
      "offer.c3.body": "Cine corporate, ateliere, petreceri și lansări de produs. Da — o putem face și pentru tine. Casa devine a ta pentru o seară.",

      "gath.eyebrow": "Întâlniri private", "gath.h2": "Trei feluri de seară",
      "gath.dinners.t": "Cine", "gath.dinners.b": "Experiențe imersive, multisenzoriale, create de selecția noastră atent aleasă de chefi experți.",
      "gath.parties.t": "Petreceri", "gath.parties.b": "Socializare &amp; dans — pentru că toți avem nevoie. Salonul devine cald, zgomotos și plin de viață.",
      "gath.live.t": "Momente Live", "gath.live.b": "De la seri simfonice la spectacole de teatru și dans — împletim arta în poftele noastre de zi cu zi.",

      "events.eyebrow": "Câteva dintre lucrurile care s-au întâmplat aici",
      "events.h2": "Curatoriat, de fiecare&nbsp;dată", "events.more": "…și multe altele",

      "gallery.eyebrow": "Atmosfera", "gallery.h2": "O casă după lăsarea serii",

      "guests.eyebrow": "Invitații noștri ideali",
      "guests.h2": "Creatori, vizionari &amp; curioși",
      "guests.lead": "O casă își găsește sufletul în oamenii care o umplu — așa că iubim prezența:",
      "guests.g1.t": "Antreprenori", "guests.g1.b": "Luptătorii noștri dragi.",
      "guests.g2.t": "Creativi", "guests.g2.b": "Cei mai creativi visători ai noștri.",
      "guests.g3.t": "Tânăra Generație", "guests.g3.b": "Pentru că ne place să cultivăm potențialul.",

      "specs.eyebrow": "Spațiul, în cifre", "specs.h2": "Detalii tehnice",
      "specs.body": "Șase camere de interior restaurat, un bar, o bucătărie funcțională și o terasă — echipate pentru orice, de la o cină de board la o lansare de produs.",
      "specs.sqm": "mp", "specs.rooms": "camere", "specs.baths": "băi", "specs.terrace": "terasă",
      "specs.bar.v": "Bar", "specs.bar.u": "+ F&amp;B complet", "specs.kitchen.v": "Bucătărie", "specs.kitchen.u": "la fața locului",
      "specs.tv": "ecran TV", "specs.proj.v": "Proiector", "specs.proj.u": "+ sistem audio",
      "specs.parking.v": "Parcare", "specs.parking.u": "disponibilă",

      "team.eyebrow": "Oamenii din spatele casei", "team.h2": "Bine, dar cine?",
      "team.intro": "O casă e la fel de caldă ca gazdele ei.",
      "team.dora.role": "Proprietar &amp; Co-fondator",
      "team.dora.bio": "Arhitect de proiecte noi, antreprenoare plină de vise și de idei neconvenționale. Vizionară curajoasă, atrasă de începuturi care schimbă regulile. Neobosită.",
      "team.sergio.role": "Co-fondator · Specialist bucătărie",
      "team.sergio.bio": "Suflet blând într-o carapace dură, povestitor cu o moștenire multiculturală, profesionist puternic, pasionat de arta bucătăriei și cu cel mai ascuțit ochi pentru detalii. Complex.",
      "team.camelia.role": "Co-fondator",
      "team.camelia.bio": "Inima mare care vede și celebrează frumusețea de pretutindeni, găsește tiparul în medii și echipe mari și păstrează răbdarea în criză, mai ales în compania bună. Liantul.",

      "partners.eyebrow": "Prieteni &amp; parteneri", "partners.h2": "În companie bună",
      "partners.design": "Design", "partners.fb": "Mâncare &amp; Băutură", "partners.prod": "Producție", "partners.more": "&amp; altele",

      "contact.eyebrow": "Vrei să afli mai multe?",
      "contact.h2": "Hai să găzduim ceva<br />extraordinar.",
      "contact.lead": "Spune-ne ce visezi — o cină, o lansare, o petrecere, un spectacol — și modelăm casa în jurul ideii tale.",
      "contact.k.address": "Adresă", "contact.k.phone": "Telefon", "contact.k.email": "Email",
      "contact.address": "Calea Dorobanți nr. 16, București",

      "form.name": "Nume", "form.name.ph": "Numele tău",
      "form.email": "Email", "form.type": "Tip de eveniment", "form.msg": "Spune-ne despre el",
      "form.msg.ph": "Data, numărul de invitați, atmosfera dorită…", "form.submit": "Trimite solicitarea",
      "form.opt.dinner": "Cină privată", "form.opt.party": "Petrecere / celebrare",
      "form.opt.corporate": "Cină corporate", "form.opt.workshop": "Atelier",
      "form.opt.launch": "Lansare de produs", "form.opt.live": "Moment live / spectacol", "form.opt.other": "Altceva",
      "form.err": "Te rugăm să adaugi numele și un email valid, ca să îți putem răspunde.",
      "form.ok": "Mulțumim — îți deschidem aplicația de email. Revenim în curând.",
      "form.subject": "Solicitare eveniment — ",

      "footer.tagline": "Spațiul pentru evenimente extraordinare.",
      "footer.contact": "Contact", "footer.city": "București, România",

      "ev.0.cat": "Activare de brand", "ev.0.title": "Activare „House Lancôme”",
      "ev.0.text": "O preluare în stil maison, în care casa a devenit pentru o noapte lumea Lancôme — instalații interactive și o călătorie senzorială a frumuseții, fiecare cameră fiind un alt capitol al poveștii.",
      "ev.1.cat": "Activare de brand", "ev.1.title": "Activare „House Disney”",
      "ev.1.text": "O lume de brand imersivă care a reimaginat salonul ca o parte din universul Disney — decor tematic, momente experiențiale și un sentiment de magie țesut prin toate cele șase camere.",
      "ev.2.cat": "Lansare de produs", "ev.2.title": "Lansare de colecție nouă",
      "ev.2.text": "Dezvăluirea unei linii noi într-un cadru creat pentru a o pune în valoare — lumini personalizate, scenografie atentă și o atmosferă care lasă colecția în prim-plan.",
      "ev.3.cat": "Întâlnire corporate", "ev.3.title": "Ședință de strategie (Board)",
      "ev.3.text": "O sesiune de lucru concentrată, departe de clișeul sălii de board — lumină naturală, calm și un lux discret în camerele restaurate ale casei, genul de cadru care ține mințile ascuțite și relaxate.",
      "ev.4.cat": "Atelier", "ev.4.title": "Atelier de echipă creativă",
      "ev.4.text": "O sesiune creativă practică — parte masterclass, parte colaborare — în care echipele construiesc, creează și gândesc împreună în jurul bucătăriei și al mesei lungi.",
      "ev.5.cat": "Comunitate", "ev.5.title": "Întâlniri lunare de comunitate",
      "ev.5.text": "Întâlnirea noastră recurentă a creatorilor, fondatorilor și prietenilor casei — pentru că mințile mari gândesc la fel, iar nouă ne place să le ținem sub același acoperiș cât mai des.",
      "ev.6.cat": "Aniversare", "ev.6.title": "Petrecere aniversară — 5 ani",
      "ev.6.text": "Cinci ani ai casei, sărbătoriți așa cum știm noi mai bine — lumini personalizate, muzică live și o cameră plină de oamenii care i-au dat suflet.",
      "ev.7.cat": "Cină privată", "ev.7.title": "Cina sponsorilor",
      "ev.7.text": "O cină intimă, multisenzorială, creată de chefii noștri atent aleși — lumină de lumânare, mese lungi împodobite cu flori și conversații care se întind până târziu în noapte.",
    },
  };

  const SUPPORTED = ["en", "ro"];
  let current = "en";

  const dict = (lang) => I18N[lang] || I18N.en;

  // Public translation helper used by script.js for dynamic content
  window.t = (key) => {
    const d = dict(current);
    return d[key] != null ? d[key] : (I18N.en[key] != null ? I18N.en[key] : key);
  };
  window.currentLang = () => current;

  function apply(lang) {
    if (!SUPPORTED.includes(lang)) lang = "en";
    current = lang;
    const d = dict(lang);
    document.documentElement.lang = lang;

    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const v = d[el.dataset.i18n];
      if (v != null) el.innerHTML = v;
    });
    document.querySelectorAll("[data-i18n-ph]").forEach((el) => {
      const v = d[el.dataset.i18nPh];
      if (v != null) el.setAttribute("placeholder", v);
    });
    document.querySelectorAll("[data-i18n-aria]").forEach((el) => {
      const v = d[el.dataset.i18nAria];
      if (v != null) el.setAttribute("aria-label", v);
    });

    document.querySelectorAll(".lang-btn").forEach((b) =>
      b.classList.toggle("is-active", b.dataset.lang === lang)
    );

    try { localStorage.setItem("doro-lang", lang); } catch (e) {}
    window.dispatchEvent(new CustomEvent("languagechanged", { detail: { lang } }));
  }
  window.setLang = apply;

  // Initial language: saved choice → browser language → English
  let initial = null;
  try { initial = localStorage.getItem("doro-lang"); } catch (e) {}
  if (!initial) initial = (navigator.language || "").toLowerCase().indexOf("ro") === 0 ? "ro" : "en";

  document.querySelectorAll(".lang-btn").forEach((b) =>
    b.addEventListener("click", () => apply(b.dataset.lang))
  );
  apply(initial);
})();
