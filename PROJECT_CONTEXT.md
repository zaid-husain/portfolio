# Project Context & Architecture Handbook

> **Single Source of Truth** for the Portfolio codebase. This document serves as the permanent technical handbook for developers and AI engineering assistants working on this codebase.

---

## 1. Project Overview

| Attribute | Value |
| :--- | :--- |
| **Engineer Name** | Zaid Husain |
| **Location** | Amravati, Maharashtra, India |
| **Email** | zaidquazi412@gmail.com |
| **Phone** | +91 9309938127 |
| **Package Name** | `portfolio` |
| **Current Version** | `1.0.0` |
| **Status** | Version 1.0.0 — Production-Ready (Content & Architecture Updated) |
| **Degree** | B.Tech in Computer Science Engineering (G H Raisoni University Amravati, 2024–2028) |
| **Core Focus** | Full-Stack MERN Development, Python DSA, DevOps (Docker, CI/CD), MLOps Trajectory |
| **Target Audience** | Engineering Leadership, Staff/Principal Engineers, Technical Recruiters |
| **Deployment Target** | Vercel / Node.js SSG Static Hosting |

### Architecture Summary
Built on **Next.js 16 (App Router)**, **React 19**, **TypeScript 5**, and **Vanilla CSS Modules** powered by a strict custom design token system. The application maximizes performance by employing Next.js Server Components for page-level assembly and static HTML pre-rendering (`SSG`), isolating client-side state (`useState`, `useEffect`, `IntersectionObserver`) strictly to leaf-node components.

---

## 2. Tech Stack

| Category | Technology | Purpose / Details |
| :--- | :--- | :--- |
| **Framework** | Next.js `16.2.11` | App Router, Turbopack, Server Components, SSG |
| **Runtime** | Node.js `20+` | Server runtime & build system |
| **Language** | TypeScript `5.x` | Strict mode enabled (`strict: true`) |
| **Styling** | Vanilla CSS Modules | Scoped component styling (`*.module.css`) |
| **Design Tokens** | CSS Custom Properties | Defined globally in `src/app/globals.css` |
| **Fonts** | `next/font/google` | `Geist` (Sans) & `Geist_Mono` (`display: swap`) |
| **Motion** | Custom IntersectionObserver | `Reveal.tsx` component with `prefers-reduced-motion` |
| **Linting** | ESLint `9.x` | `eslint-config-next` (Core Web Vitals & TypeScript) |
| **CI/CD** | GitHub Actions | 2-stage workflow (`quality` -> `build`) in `.github/workflows/ci.yml` |
| **SEO & Data** | Schema.org JSON-LD | `@graph` schema, dynamic `sitemap.ts`, `robots.ts`, `manifest.json` |

---

## 3. Project Philosophy

1. **Engineering-First Editorial UI**: Focus on technical narrative, system architecture decisions, measurable engineering metrics, and problem-solving depth over visual flair.
2. **Accessibility-First (A11y)**: Built to WCAG standards with semantic HTML5 elements, explicit ARIA attributes, focus trap management, keyboard navigation, and native reduced-motion support.
3. **Zero-Lighthouse Bottleneck**: Server Component architecture eliminates heavy client JS runtimes. All pages are pre-rendered at build time (SSG).
4. **Strict Token Governance**: No hardcoded values for colors, font sizes, or spacing. Every CSS rule references standard tokens defined in `globals.css`.

---

## 4. Folder Architecture

```text
Portfolio/
├── .github/
│   └── workflows/
│       └── ci.yml             # GitHub Actions 2-stage CI/CD pipeline
├── public/
│   ├── favicon.ico            # Site favicon
│   └── manifest.json          # Web App Manifest for PWA support
├── src/
│   ├── app/
│   │   ├── projects/
│   │   │   └── [slug]/
│   │   │       ├── page.module.css
│   │   │       └── page.tsx   # Dynamic SSG case study route
│   │   ├── error.tsx          # Global Error Boundary component
│   │   ├── globals.css        # CSS Custom Properties & Design Tokens
│   │   ├── layout.tsx         # Root Layout (Fonts, Metadata, JSON-LD, Analytics)
│   │   ├── loading.tsx        # Root streaming loading fallback
│   │   ├── not-found.module.css
│   │   ├── not-found.tsx      # Custom 404 page
│   │   ├── page.module.css
│   │   ├── page.tsx           # Homepage (Server Component)
│   │   ├── robots.ts          # Dynamic robots.txt metadata route
│   │   ├── sitemap.ts         # Dynamic sitemap.xml metadata route
│   │   ├── template.module.css
│   │   └── template.tsx       # Root page transition wrapper
│   ├── components/
│   │   ├── case-study/        # Case study detail page components
│   │   │   ├── ArchitectureSection.tsx
│   │   │   ├── CaseStudyHero.tsx
│   │   │   ├── EngineeringDecisions.tsx
│   │   │   ├── MetricsGrid.tsx
│   │   │   ├── ProjectNavigation.tsx
│   │   │   ├── ProjectOverview.tsx
│   │   │   ├── TechStack.tsx
│   │   │   └── index.ts
│   │   ├── command/           # Command Palette modal component
│   │   │   ├── CommandPalette.module.css
│   │   │   └── CommandPalette.tsx
│   │   ├── layout/            # Layout structural components
│   │   │   ├── GlobalFooter.module.css
│   │   │   ├── GlobalFooter.tsx
│   │   │   ├── GlobalLayout.module.css
│   │   │   └── GlobalLayout.tsx
│   │   ├── navigation/        # Header & mobile navigation
│   │   │   ├── GlobalHeader.module.css
│   │   │   ├── GlobalHeader.tsx
│   │   │   ├── MobileMenu.module.css
│   │   │   ├── MobileMenu.tsx
│   │   │   ├── SkipLink.module.css
│   │   │   └── SkipLink.tsx
│   │   ├── ui/                # Reusable UI primitives
│   │   │   ├── layout/        # Section & SectionHeader primitives
│   │   │   ├── motion/        # Reveal motion primitive
│   │   │   ├── Badge.tsx
│   │   │   └── Button.tsx
│   │   ├── Analytics.tsx      # Modular analytics provider
│   │   ├── Architecture.tsx   # Architecture section component
│   │   ├── Capabilities.tsx   # Core capabilities section
│   │   ├── Contact.tsx        # Contact & conversion destination
│   │   ├── Education.tsx      # Education section
│   │   ├── Experience.tsx     # Professional experience section
│   │   ├── Focus.tsx          # Current focus section
│   │   ├── OpenSource.tsx     # Open source contributions section
│   │   ├── Philosophy.tsx     # Engineering philosophy section
│   │   ├── Skills.tsx         # Technical skills section
│   │   ├── Trust.tsx          # Professional synthesis section
│   │   ├── Work.tsx           # Selected work section
│   │   └── Writing.tsx        # Articles & writing section
│   ├── data/                  # Strongly typed data models & static objects
│   │   ├── architecture.ts
│   │   ├── capabilities.ts
│   │   ├── education.ts
│   │   ├── experience.ts
│   │   ├── focus.ts
│   │   ├── opensource.ts
│   │   ├── projects.ts
│   │   ├── skills.ts
│   │   ├── trust.ts
│   │   └── writing.ts
│   └── hooks/                 # Custom React hooks
│       ├── useCommandPaletteShortcut.ts
│       ├── useFocusTrap.ts
│       └── useLockBodyScroll.ts
├── .env.example               # Environment variable specification
├── eslint.config.mjs          # Flat ESLint configuration
├── next.config.mjs            # Production Next.js & Security configuration
├── package.json               # Dependencies & scripts
└── tsconfig.json              # TypeScript compiler settings
```

---

## 5. Routing Architecture

| Route | File Path | Type | Details |
| :--- | :--- | :--- | :--- |
| `/` | `src/app/page.tsx` | Static (Server Component) | Renders the primary homepage experience |
| `/projects/[slug]` | `src/app/projects/[slug]/page.tsx` | SSG (`generateStaticParams`) | Renders detailed engineering case studies |
| `/_not-found` | `src/app/not-found.tsx` | Static | Custom 404 error page |
| `/sitemap.xml` | `src/app/sitemap.ts` | Dynamic Route | Generates XML sitemap at build time |
| `/robots.txt` | `src/app/robots.ts` | Dynamic Route | Generates robots.txt rules at build time |

---

## 6. Component Architecture

### 1. Primitive UI Layer (`src/components/ui/`)
- `Button`: Polymorphic button component supporting `href` (renders `<a>`), variants (`primary`, `secondary`, `ghost`, `danger`), sizes (`sm`, `md`, `lg`), and loading states.
- `Badge`: Metadata tag component supporting `default`, `outline`, and `accent` variants.
- `Section` & `SectionHeader`: Enforces structural rhythm and consistent heading layouts across homepage sections.
- `Reveal`: Motion wrapper component providing scroll-driven entrance animations.

### 2. Layout & Navigation Layer (`src/components/layout/` & `navigation/`)
- `GlobalLayout`: Wraps application routes with `SkipLink`, `GlobalHeader`, `<main>`, `GlobalFooter`, and `CommandPalette`.
- `GlobalHeader`: Floating glassmorphism navbar with scroll detection, anchor links, and command palette trigger.
- `MobileMenu`: Accessible drawer menu for touch screens with body scroll locking and keyboard focus containment.
- `CommandPalette`: Keyboard-navigable modal (`⌘K` / `Ctrl+K`) for rapid site navigation.

### 3. Specialized Case Study Components (`src/components/case-study/`)
- `CaseStudyHero`: High-impact hero header displaying project role, timeline, and outbound repository/live deployment links.
- `MetricsGrid`: Key performance metrics grid showcasing measurable impact (e.g. latency reductions, uptime).
- `ProjectOverview`: Problem statement and strategic goals.
- `TechStack`: Categorized technical stack tag breakdown (Frontend, Backend, Database, Infrastructure, Tooling).
- `ArchitectureSection`: Technical architecture narrative covering frontend, backend, and database decisions.
- `EngineeringDecisions`: Deep-dive cards explaining architectural trade-offs, rationale, and outcomes.
- `ProjectNavigation`: Next/Previous case study footer navigation links.

---

## 7. Styling & Token Architecture

All global styles and design tokens reside in `src/app/globals.css`. Components import local CSS Modules (`*.module.css`).

### Key CSS Variable Token Categories

```css
/* Color System */
--bg-primary: #0a0a0a;
--surface-primary: #121212;
--surface-secondary: #1a1a1a;
--surface-tertiary: #242424;
--surface-hover: #2e2e2e;
--surface-interactive: #ffffff;

/* Text Colors */
--text-primary: #f5f5f5;
--text-secondary: #a3a3a3;
--text-tertiary: #737373;
--text-inverse: #0a0a0a;

/* Borders */
--border-subtle: #262626;
--border-hover: #404040;
--border-accent: #525252;

/* Typography Scale */
--font-geist-sans: var(--font-geist-sans);
--font-geist-mono: var(--font-geist-mono);
--text-display-lg: clamp(2.5rem, 5vw, 4rem);
--text-h1: clamp(2rem, 4vw, 3rem);
--text-h2: clamp(1.5rem, 3vw, 2.25rem);

/* Spacing Scale */
--space-1: 0.25rem;  /* 4px */
--space-2: 0.5rem;   /* 8px */
--space-4: 1rem;     /* 16px */
--space-8: 2rem;     /* 32px */
--space-12: 3rem;    /* 48px */
--space-16: 4rem;    /* 64px */

/* Safe Areas (Notched Devices) */
--safe-top: env(safe-area-inset-top, 0px);
--safe-bottom: env(safe-area-inset-bottom, 0px);
```

---

## 8. Motion System

The motion system is encapsulated in `src/components/ui/motion/Reveal.tsx`:
- Driven by `IntersectionObserver` to trigger transitions when elements enter the viewport.
- Supported animations: `fade-up`, `fade-in`, `slide-left`, `slide-right`.
- Native **Reduced Motion Support**: Automatically checks `window.matchMedia('(prefers-reduced-motion: reduce)')`. If enabled by the user's OS, all animations are immediately bypassed (`isVisible = true`).

---

## 9. Data & Type System

Content is strongly typed and managed via static TypeScript files in `src/data/`:
- `Project`: Defines full case study structure including metrics, tech stack breakdown, and engineering decisions.
- `ExperienceItem`: Work history, achievements, and impact metrics.
- `ArchitectureSystem`: System design paradigms and trade-offs.

---

## 10. Accessibility (A11y) Standards

- **Semantic HTML**: Strict usage of `<header>`, `<nav>`, `<main>`, `<footer>`, `<section>`, `<article>`, `<details>`, and `<summary>`.
- **Keyboard Navigation**: `SkipLink` enables jumping to `#main-content`. Modals utilize `useFocusTrap` to trap focus inside open dialogs.
- **Screen Reader Parity**: Buttons without text content enforce explicit `aria-label` attributes. Modals specify `role="dialog"` and `aria-modal="true"`.
- **Focus Indicators**: All interactive elements utilize custom `:focus-visible` outlines matching design tokens.

---

## 11. SEO & Metadata Architecture

- **Next.js Metadata API**: Centralized in `src/app/layout.tsx` with canonical links, OpenGraph, Twitter cards, and `metadataBase`.
- **JSON-LD Structured Data**: Injected as an `@graph` schema combining `Person` and `WebSite` entities to support Google Knowledge Graph indexing.
- **Dynamic Sitemap & Robots**: Generated at build time via `src/app/sitemap.ts` and `src/app/robots.ts`.
- **PWA Manifest**: Configured in `public/manifest.json` for home-screen shortcuts and mobile installability.

---

## 12. Security Architecture

1. **HTTP Security Headers** (`next.config.mjs`):
   - `Strict-Transport-Security` (HSTS)
   - `X-Content-Type-Options: nosniff`
   - `X-Frame-Options: SAMEORIGIN`
   - `X-XSS-Protection: 1; mode=block`
   - `Referrer-Policy: origin-when-cross-origin`
   - `Content-Security-Policy` (CSP)
2. **Fingerprinting Suppression**: `poweredByHeader: false` disables the `X-Powered-By: Next.js` header.
3. **Safe External Links**: 100% of `target="_blank"` anchor tags enforce `rel="noopener noreferrer"`.

---

## 13. CI/CD Pipeline

Defined in `.github/workflows/ci.yml`:
- **Job 1: `quality`**: Runs `npm run type-check` (`tsc --noEmit`) and `npm run lint` (`eslint`).
- **Job 2: `build`**: Dependent on `quality`. Restores `.next/cache` via `actions/cache@v4` and runs `npm run build`.

---

## 14. Completed Work (Phases 1–10)

- [x] **Phase 1 — Foundation Refactor**: Next.js App Router architecture baseline.
- [x] **Phase 2 — Design Token Enforcement**: Global CSS token system implementation.
- [x] **Phase 3 — Motion System**: Lightweight `IntersectionObserver` reveal system.
- [x] **Phase 4 — Homepage Experience**: Editorial layout implementation.
- [x] **Phase 5 — Project Showcase & Case Studies**: SSG dynamic case study detail routes.
- [x] **Phase 6 — Global Navigation & UX**: Header, mobile menu, and command palette (`⌘K`).
- [x] **Phase 7 — Responsive Refinement**: Fluid grid sizing (`clamp()`), touch target compliance, safe area padding.
- [x] **Phase 8 — Performance & SEO**: Server Component migration for `page.tsx`, JSON-LD schema, dynamic sitemap/robots.
- [x] **Phase 9 — Production Hardening & CI/CD**: Fixed TS errors, security headers in `next.config.mjs`, GitHub Actions workflow.
- [x] **Phase 10 — Final Polish & QA**: Removed dead links/placeholders, added `manifest.json`, clean zero-error build verification.

---

## 15. Known Limitations & Future Roadmap

### Known Limitations
- `public/resume.pdf` is a placeholder path and should be populated with an actual PDF file prior to public distribution.
- Domain fallback is configured to `https://zaidhusain.dev` (can be configured via `NEXT_PUBLIC_SITE_URL`).

### Future Roadmap
- **Phase 11 — Content Management / MDX Integration**: Migrate static data objects in `src/data/` to dynamic MDX files for articles and case studies.
- **Phase 12 — Interactive WebGL Diagrams**: Introduce interactive canvas/WebGL system architecture diagrams for flagship case studies.

---

## 16. Permanent Rules for Future AI Assistants

1. **Preserve Server Component Boundaries**: NEVER add `"use client"` back to `src/app/page.tsx` or root layout files. Maintain client state isolation in leaf-node components.
2. **Enforce Design Tokens**: NEVER hardcode hex colors, px font sizes, or inline margin/padding values. Always use CSS variables (`var(--...)`).
3. **Strict Type Safety**: NEVER introduce `any` types or cast with `as any`. Write explicit TypeScript interfaces in `src/data/` or component prop interfaces.
4. **Preserve Link Security**: Always pair `target="_blank"` with `rel="noopener noreferrer"`.
5. **Verify Build Integrity**: Always run `npm run build` to verify zero TypeScript errors and zero build failures before declaring a task complete.

---

## 17. Definition of Done

A task is considered complete ONLY when:
- [ ] Code builds cleanly via `npm run build` with 0 errors.
- [ ] TypeScript check (`npm run type-check`) succeeds with 0 errors.
- [ ] ESLint (`npm run lint`) succeeds with 0 warnings/errors.
- [ ] All interactive elements remain keyboard-accessible.
- [ ] No hardcoded token violations or inline style regressions are introduced.
