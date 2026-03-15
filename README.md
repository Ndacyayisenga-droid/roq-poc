# Roq POC Documentation Site

Proof of Concept built with **[Quarkus Roq](https://iamroq.com/)**, **aligned with the [MkDocs POC](https://github.com/Ndacyayisenga-droid/mkdocs-poc)** so the same doc set and requirements can be compared (nav: Getting Started, Code Examples, Accessibility, AsciiDoc-style page).

## Features vs MkDocs POC

| Requirement | MkDocs POC | This Roq POC |
|-------------|------------|--------------|
| Docs-as-Code | `docs/*.md` | `content/docs/*.md`, `content/index.md` |
| Syntax highlight + line numbers + copy | Material + PyMdown | Prism + `public/js/syntax-highlighting.js` |
| Code tabs (Bash/YAML/JSON) | pymdownx.tabbed | Same content as stacked sections on [Code Examples](content/docs/code-examples.md) |
| Mermaid | SuperFences | Mermaid 10 via CDN on Code Examples + home |
| Search | Material built-in | ○ Not built-in; static HTML — optional client search |
| PDF | mkdocs-with-pdf | ○ Browser print or external tool |
| TOC / linkable headers | `toc.permalink` | Sidebar + right TOC (JS) |
| Responsive | Material | Custom CSS (domtrip-style layout) |
| Accessibility | `docs/accessibility.md` | Same topics, Roq-specific notes |
| AsciiDoc | `asciidoc-example.adoc` | [asciidoc-example.md](content/docs/asciidoc-example.md) (Markdown equivalent) |
| Dead links | Lychee in CI | Lychee on `target/roq/` in CI |
| CI/CD | gh-deploy | `deploy.yml` → GitHub Pages |

## Prerequisites

- **Java 17+**
- **Maven 3.8+**

## Run locally

```bash
mvn quarkus:dev
```

Open [http://localhost:8080](http://localhost:8080).

## Build static site

```bash
QUARKUS_ROQ_GENERATOR_BATCH=true mvn package quarkus:run -DskipTests
```

Output: **`target/roq/`**.

## Project structure

| Path | Purpose |
|------|---------|
| **content/** | Pages (mirror MkDocs: index + docs/*) |
| **data/** | `menu.yml`, **`authors.yml`** (required for default theme blog templates) |
| **public/** | CSS, JS (Prism, layout, Mermaid not needed globally) |
| **templates/layouts/** | Custom `index` / `page` layouts |
| **src/main/java** | Minimal CDI bean so Roq resolves project root |
| **src/main/resources/application.properties** | Site + generator config |

## CI/CD (GitHub Pages)

Workflow builds with `QUARKUS_ROQ_GENERATOR_BATCH=true`, runs **Lychee** on the generated site (excludes intentional 404 test link), deploys **target/roq**.

## Links

- [Roq](https://iamroq.com/) · [quarkus-roq](https://github.com/quarkiverse/quarkus-roq)
- [MkDocs POC](https://github.com/Ndacyayisenga-droid/mkdocs-poc) (reference alignment)
