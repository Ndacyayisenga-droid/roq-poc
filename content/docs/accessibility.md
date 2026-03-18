---
title: Accessibility
description: Accessibility 
layout: page
---

# Accessibility

This page aligns with the **MkDocs POC** [accessibility](https://github.com/Ndacyayisenga-droid/mkdocs-poc/blob/main/docs/accessibility.md) page, adapted for this Roq layout (navbar, sidebar, TOC, Prism).

## Configuration

### Layout

- **Keyboard navigation** — Focusable nav links, sidebar, and copy buttons (with `aria-label` on copy).
- **Semantic structure** — One main heading per page; Markdown renders as paragraphs, lists, and tables.
- **Table of contents** — Right-hand TOC links to in-page headings (`h2`–`h4`); supports keyboard activation after click (smooth scroll).

### Color and contrast

The custom CSS uses a green primary palette and dark code blocks (Prism *tomorrow*). For stricter WCAG tuning, adjust variables in `public/css/layout.css` and `public/css/docusaurus-style.css`.

MkDocs Material offers a built-in light/dark toggle; this POC uses a single scheme. You can add a theme toggle via extra CSS/JS if needed.

## Best practices

1. **Heading hierarchy** — Use H1 once per page (title), then H2 → H3; do not skip levels.
2. **Link text** — Prefer descriptive text, e.g. [Getting Started guide]({site.url('/docs/getting-started/')}) instead of “click here”.
3. **Images** — Provide `alt` text for meaningful images in Markdown or templates.
4. **Tables** — Use header rows for data tables.
5. **Code blocks** — Use language tags (`java`, `yaml`, `bash`) for highlighting and context.

## Linkable headers

Anchor IDs are generated for headings. Examples:

- [Configuration](#configuration)
- [Best practices](#best-practices)
- [Responsive design](#responsive-design)

## Responsive design

- **Desktop** — Sidebar, main column, and TOC column.
- **Tablet / narrow** — TOC hidden; sidebar remains or toggles via menu button on small screens.
- **Mobile** — Sidebar can be toggled; touch-friendly tap targets on nav.

## Resources

- [Quarkus Roq](https://iamroq.com/)
- [WCAG 2.1 Quick Reference](https://www.w3.org/WAI/WCAG21/quickref/)
