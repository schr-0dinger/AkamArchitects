# PROJECT SPECIFICATION – AKAM Architects & Construction Website

## Role

You are an expert frontend architect, UI/UX designer, Astro specialist, accessibility expert, SEO engineer, and performance optimization engineer.

Build a premium, production-ready static portfolio website for AKAM Architects & Construction that positions the firm as a modern, high-end architecture and construction studio. It should communicate trust, elegance, professionalism, and design excellence - like visiting the portfolio of a renowned architecture studio, not a corporate template site.

Current website (content may be reused, UI/UX is a full redesign): https://akamarchitects.com/

**Primary objectives** - the site must:
- Showcase ~30 carefully selected flagship projects
- Present architectural photography beautifully (images do more work than copy)
- Generate enquiries and build trust
- Rank well (SEO), load extremely fast, and be mobile-first
- Be easy for a non-technical client to maintain and easy to scale with future projects

**Target audience**: prospective clients seeking luxury residences, villas, commercial buildings, interior design, renovations, or institutional projects - they should perceive quality within the first 10 seconds.

---

## Design Inspiration & Brand Personality

Primary inspiration: https://www.zha.com/ - study only its minimal interface, editorial layouts, large photography, elegant typography, white space, calm UX, and high-end transitions/hierarchy. **Do not copy its layout or branding** - inspiration only.

Also draw on: minimal typography, large immersive imagery, spacious layouts, elegant transitions, strong emphasis on projects, sophisticated white space, editorial-style layouts, minimal UI chrome, smooth scrolling.

Brand personality: elegant, modern, minimal, premium, confident, timeless, architectural, editorial, sophisticated, trustworthy, calm, professional.
**Never**: playful, colourful (beyond the accent), trendy, or generic "corporate website."

### Design Principles (apply on every page)
- **Simplicity** - remove unnecessary elements.
- **Spaciousness** - generous spacing, large margins, comfortable reading.
- **Photography first** - images dominate and communicate more than text.
- **Typography first** - typography is a design element, not just labels.
- **Motion is invisible** - animation enhances, never distracts.
- **Every pixel has purpose** - no decoration for decoration's sake.

---

## Design Tokens

**Theme**: Light only.

**Color**
- Primary: Black `#000000`
- Secondary accent: `#DCA45C` - used *sparingly* only for hover states, buttons/CTAs, small highlights, section/active-nav indicators, links, icons, accent borders. Never flood the UI with yellow.
- Background: White `#FFFFFF`, optional secondary sections `#F8F8F8`
- Text: dark gray / near-black
- Avoid colourful gradients, heavy shadows, neumorphism.

**Typography**
- Heading: Manrope · Body: Inter (or propose a superior modern pairing if justified)
- Large headings, excellent readability, strong hierarchy, editorial feel
- Avoid playful/decorative fonts

**Layout**
- Responsive, desktop-first aesthetic, excellent tablet and mobile experience
- Wide layouts, consistent spacing system

---

## Tech Stack

**Use**: Astro, TypeScript (strict, throughout), Tailwind CSS, React (islands only, where interactivity is required), Framer Motion, Astro Image, MDX/Markdown Content Collections, GitHub, Vercel, GitHub Actions, Google Analytics, Microsoft Clarity, Resend or Formspree (contact form).

**Do NOT use**: WordPress, Bootstrap, jQuery, Elementor, heavy JavaScript, unnecessary client-side hydration, FTP, cPanel, or manual deployment.

Hydrate only interactive islands. Static-first, no server-side dependencies.

**Lighthouse targets**: Performance 95+, Accessibility 100, Best Practices 100, SEO 100.

---

## Information Architecture

| Page | Purpose |
|---|---|
| Home | Hero + featured projects (compact horizontal cards) + expertise/about previews + testimonials + CTA |
| Projects | Grid of the ~30 flagship (featured) projects, optional category filtering |
| Project Detail | Full project story - hero, info, gallery, related/next project (auto-generated per entry) |
| Gallery | Pure visual inspiration; masonry layout auto-derived from project galleries |
| Expertise | Architecture & Building Design, Interior Design, Project Management, Construction Supervision, New Construction, Renovation |
| About | Founder story (Karthik & Anakha, est. 2019), vision, mission, timeline, stats |
| Testimonials | Elegant cards, no carousel gimmicks |
| Contact | Enquiry form, phone, email, address, hours, Google Maps, WhatsApp CTA |
| Privacy Policy | Standard legal page (body editable as Markdown) |
| 404 | On-brand not-found page |

There is deliberately **no Process page** and **no Design Philosophy section** - keep the
Home page short; total vertical scroll should stay tight.

### Page notes
- **Home hero**: full-width immersive photo, large typography, minimal copy, smooth fade-in, clear CTA.
- **Home imagery is grayscale** (`filter: grayscale`) - hero, featured-project thumbnails, and about preview.
- **Featured projects on Home**: compact horizontal rows (small 16:10 thumbnail + text), not tall portrait cards.
- **Projects grid**: card = cover image, name, category, location, hover effect; elegant not crowded; lazy-loaded, well-optimized images.
- **Project Detail**: hero image, location, year, services, area (if available), description, image gallery (+ optional lightbox), related projects, prev/next navigation. These pages carry significant SEO weight.
- **Gallery**: masonry, mixed image sizes, generous whitespace; hover reveals project title/category/location; click navigates to the parent project. If N images belong to one project, all N link back to it. Fully auto-generated - no duplicate data entry.
- **Navigation**: sticky navbar, transparent over hero → solid on scroll, smooth transition; mobile = full-screen hamburger menu with elegant animation.
- **Footer**: minimal - social links, quick nav, copyright.

---

## Content Architecture

Never hardcode content - use **Astro Content Collections** for everything editorial.
Nearly all written content and image references on every page must be editable through
Markdown under `src/content/`:

```
content/
  settings/site.md        site name, tagline, logo paths, contact info, social links
  home/home.md            all Home page copy + hero/about image paths
  about/about.md          story, vision, mission, timeline, stats
  expertise/*.md          one file per expertise item (title, description, order)
  testimonials/*.md       one file per testimonial (quote, name, role, order)
  pages/*.md              eyebrow/heading/intro for the simpler pages (incl. 404)
  legal/privacy-policy.md full legal body as Markdown
  projects/*.md           one file per project
```

Each project's frontmatter:
```
title, slug, category, location, year, services,
heroImage, gallery, description, featured, featuredOrder
```

- Only entries with `featured: true` appear on the Projects page, ordered by `featuredOrder`, capped at ~30.
- Categories: Residential, Commercial, Interior, Hospitality, Institutional.
- Project pages and the Gallery page are both generated automatically from this collection - client never touches HTML.
- `src/lib/site.ts` holds only structural config (routes, category list, site URL) - never editorial copy.
- The AKAM logo variants live in `src/assets/logo/` (icon, white icon for dark navbar, full lockup for footer) and are referenced from `settings/site.md`.

---

## Folder Structure

```
src/
  components/   reusable UI components
  layouts/
  pages/
  content/      content collections (projects/)
  styles/
  lib/          SEO utilities, helpers
  utils/
  assets/
public/
  images/
  seo/          robots.txt, og assets, etc.
```

Component-driven, reusable, maintainable, type-safe, future-proof.

---

## Images & Asset Pipeline

Images are the site's most important asset. Original camera files live on the client's NAS and are **never** uploaded - only optimized versions enter the repo.

- Responsive image sets, WebP, AVIF where supported
- Lazy loading, blur placeholders, proper aspect ratios, zero CLS
- Descriptive alt text on every image
- Preload the hero image; lazy-load everything below the fold

**Client workflow**: NAS originals → optimized locally → committed to GitHub with Markdown updated → automatic Vercel deployment. Client only ever edits Markdown and adds optimized images - never HTML.

---

## Animation Philosophy

Motion should feel architectural - subtle, purposeful, invisible in the sense that it never distracts.

**Use** (Framer Motion): fade in, reveal on scroll, parallax, image zoom, staggered text, smooth hover/micro-interactions, page transitions.

**Avoid**: fancy gimmicks, over-animated sections, long durations, bouncy easing, particle systems, heavy 3D.

---

## SEO

Meta titles/descriptions, canonical URLs, robots.txt, sitemap.xml, OpenGraph tags, Twitter cards, JSON-LD Schema.org (Organization, LocalBusiness, Breadcrumb), proper H1–H6 hierarchy, semantic HTML, image alt text, clean URLs, dynamic OG images where practical.

## Accessibility

WCAG-friendly, full keyboard navigation, visible focus indicators, proper color contrast, ARIA labels, screen-reader friendly, accessible forms.

## Performance

Avoid shipping unnecessary JS, minimize bundle size, tree-shake, code-split, critical CSS, preload hero image, lazy-load below-the-fold content, no render-blocking resources.

## Security

No unnecessary JavaScript, no exposed API keys (use environment variables), spam protection on the contact form, secure headers, HTTPS only.

## Code Quality

Strict TypeScript throughout, reusable components/utilities, no duplication, clear self-documenting naming, comments only where genuinely helpful (non-obvious why, not what).

## Browser Support

Latest Chrome, Firefox, Safari, Edge - fully responsive across desktop, tablet, mobile.

---

## Git Strategy & Deployment

- `main` = production. New work happens on feature branches; PRs required before merge.
- GitHub → automatic build → Vercel → production. No FTP, no cPanel, no manual deployment.

---

## Nice-to-Have Extras (backlog, not required for v1 done-ness)

Back-to-top button, scroll progress indicator, floating WhatsApp button, image lightbox, project filtering, reading-progress indicator on project pages, loading skeletons, animated counters, before/after comparison slider, keyboard shortcuts, page transitions, micro-interactions.

---

## Definition of Done

- Fully responsive across desktop/tablet/mobile
- Lighthouse: Performance ≥95, Accessibility 100, Best Practices 100, SEO 100
- Images optimized, no layout shift (CLS)
- All content editable via Markdown; project pages and Gallery auto-generated
- SEO fully implemented: sitemap.xml, robots.txt, OG metadata, structured data
- Analytics integrated (GA + Clarity); contact form working with spam protection
- Deployment automated (GitHub → Vercel)
- No unused components, no console errors, no broken links
- Consistent spacing/typography; animations smooth and purposeful
- README documents: project structure, adding new projects, updating images, deployment, local dev, build commands

## Success Criteria

A visitor should, within the first 10 seconds, perceive AKAM Architects as a premium architecture and construction firm. The site should feel comparable in quality to internationally recognized architecture studios while remaining lightweight, fast, maintainable, and easy for the client to update through Markdown content and Git-based deployment.
