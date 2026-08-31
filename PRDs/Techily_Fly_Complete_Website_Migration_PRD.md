# Techily Fly Complete Website Migration PRD

## 1. Project Overview
The objective is to migrate the existing static portfolio website (located in the `Old` folder) to a modern, Cloudflare-native, full-stack architecture. The new application must be lightning-fast, highly optimized for performance and SEO, and easily maintainable. Crucially, the entire website—including all page content, settings, and blog posts—must be fully manageable via a custom Admin Panel.

## 2. Goals & Key Requirements
- **Performance:** Extremely lightweight, lightning-fast on desktop and mobile, optimized for slow 2G/3G connections. Maximize Core Web Vitals.
- **Architecture:** Cloudflare-first full-stack architecture (Astro + Cloudflare Pages + Cloudflare D1 + Cloudflare R2). Minimize server-side processing where edge caching or static generation suffices.
- **Admin Panel Management:** Every section (Hero, About, Services, Experience, Education, Projects, Achievements, Testimonials), settings (navigation, footer, global SEO, social links), and content must be fully editable via the Admin Panel. No hardcoded content.
- **Blog System:** A production-ready, SEO-optimized blog system manageable from the Admin Panel, supporting drafts, scheduled publishing, categories, tags, rich-text/markdown editing, and Open Graph metadata.
- **Visual Design:** Strict adherence to the brand guidelines defined in `Techily_Fly_Colors_Fonts.md`.
  - **Colors:** TF Graphite (`#212121`), Signal Coral (`#FF7759`), Cloud Surface (`#FAFAFA`).
  - **Typography:** Manrope (Headings/Body) and Geist Mono (Code/Technical).
  - No external fonts or unapproved colors.
- **AdSense Readiness:** Implement mandatory pages for Google AdSense approval: Privacy Policy, Terms & Conditions, Disclaimer, About Us, and Contact Us.
- **Data Preservation:** Do not duplicate work. Port over all existing texts, stats, sections, images, and projects from the `Old` project.

## 3. Technology Stack (Cloudflare-Native)
- **Framework:** Astro (configured with `@astrojs/cloudflare` adapter for hybrid SSR/SSG).
- **Styling:** Tailwind CSS v4 (configured strictly with the brand tokens).
- **Database:** Cloudflare D1 (Serverless SQLite) for storing content, blog posts, configurations, and user credentials.
- **Storage:** Cloudflare R2 for storing and serving uploaded media/images.
- **Authentication:** Lucia Auth (with D1 adapter) or equivalent lightweight JWT system for Admin Panel secure access.
- **Caching & Edge:** Extensive use of Cloudflare Edge Caching, CDN delivery, and optimized static asset delivery.
- **Browser Automation / Testing:** Playwright for E2E testing and verification before completion.

## 4. Deep Project Audit (Old Project)
- **Current State:** A single-page static HTML (`index.html`) using Bootstrap 5, custom CSS (`style.css`), and vanilla JS (`script.js`) for smooth scrolling, counters, and intersection observers. Form submission via `send-email.php`.
- **Existing Sections:** Hero, About, Skills, Services, Experience, Education, Projects, Achievements, Testimonials, Contact.
- **Migration Strategy:** 
  1. Extract all section data into a structured schema (JSON/SQL).
  2. Map this schema to Cloudflare D1 tables.
  3. Rebuild the frontend UI using Astro components + Tailwind CSS, pulling content dynamically or statically generating it at build time (SSG/ISR).
  4. Replace PHP mailer with a Cloudflare Worker/Astro API endpoint using Resend or SendGrid.

## 5. Scope of Work
### Phase 1: Foundation & Database
- Initialize Astro project with Cloudflare adapter.
- Configure Tailwind CSS with strict brand tokens.
- Design and provision Cloudflare D1 database schemas (Settings, Pages, Sections, BlogPosts, Categories, Users).

### Phase 2: Admin Panel Development
- Develop a secure Admin Dashboard.
- Implement CRUD operations for site settings, hero data, portfolio projects, and resume timelines.
- Implement Blog Management System (Markdown editor, SEO metadata, categories).
- Integrate Cloudflare R2 for media uploads.

### Phase 3: Frontend Reconstruction
- Rebuild the single-page portfolio layout in Astro.
- Ensure 100% adherence to colors and typography.
- Fetch data from D1 (or pre-render via Astro's data layer).
- Implement AdSense pages (Privacy Policy, Terms, Disclaimer).
- Optimize for maximum performance (LCP, CLS, INP) via lazy loading, responsive images, and minimal JS.

### Phase 4: Testing & Deployment
- E2E testing (Admin flows, contact form, UI visual checks).
- Deploy to Cloudflare Pages.
- Final Lighthouse & Web Vitals audit.

## 6. Success Metrics
- Lighthouse scores of 95+ across Performance, Accessibility, Best Practices, and SEO.
- Fully functional Admin Panel.
- Successful email delivery from the new contact form API.
- Zero visual drift from the approved design system.
