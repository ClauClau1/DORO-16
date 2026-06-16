# DORO 16 — Website

A single-page website for **DORO 16**, the 117-year-old event house on Calea Dorobanți 16, Bucharest.
*"We are the space for extraordinary events."*

Built from the DORO 16 General Presentation (2025): all copy, photography, logo and the
hand-drawn façade illustration are sourced from that deck, kept in the brand's dark / cream /
gold editorial style.

## Structure

```
doro-16-site/
├── index.html        # All page content (one scrolling page)
├── styles.css        # Theme, layout, components, responsive rules
├── script.js         # Nav, scroll reveals, stat count-up, gallery lightbox, contact form
└── assets/img/        # Photos + logo + façade line-art, optimised from the PDF
```

## Sections
Hero · The House (about) · Stats · Philosophy · Why · What We Do (Our/Our/Your House) ·
Private Gatherings · Events · Gallery · Ideal Guests · Spaces (technicalities) · People ·
Friends & Partners · Contact · Footer.

## Run it locally
No build step — it's static HTML/CSS/JS. From this folder:

```bash
python3 -m http.server 4173
# then open http://localhost:4173
```

## Notes
- **Fonts** load from Google Fonts (Playfair Display, Cormorant Garamond, Jost).
- The **contact form** has no backend; on submit it composes a `mailto:` to `camelia@doro-16.com`.
  Wire it to a form service (Formspree, Basin, a serverless function, …) for production.
- Images were extracted and compressed from the presentation PDF; swap in higher-resolution
  originals where available for the best result.
