# Roq POC Documentation Site

Proof of Concept built with **[Quarkus Roq](https://iamroq.com/)**, 



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

## Search + PDF (proof features)

- **Search**: Pagefind, available at `/docs/search/` after deployment (index built in CI).
- **PDF**: generated in CI and deployed at `/pdf/documentation.pdf`.

## Project structure

| Path | Purpose |
|------|---------|
| **content/** | Pages; **AsciiDoc**: `content/docs/asciidoc-example.adoc` (`quarkus-roq-plugin-asciidoc`) |
| **data/** | `menu.yml`, **`authors.yml`** (required for default theme blog templates) |
| **public/** | CSS, JS (Prism, layout, Mermaid not needed globally) |
| **templates/layouts/** | Custom `index` / `page` layouts |
| **package.json** | Tooling for PDF + search index (Pagefind, Playwright) |
| **src/main/java** | Minimal CDI bean so Roq resolves project root |
| **src/main/resources/application.properties** | Site + generator config |

## CI/CD (GitHub Pages)

Workflow builds with `QUARKUS_ROQ_GENERATOR_BATCH=true`, runs **Lychee** on the generated site (excludes intentional 404 test link), deploys **target/roq**.

## Links

- [Roq](https://iamroq.com/) · [quarkus-roq](https://github.com/quarkiverse/quarkus-roq)
- [MkDocs POC](https://github.com/Ndacyayisenga-droid/mkdocs-poc) (reference alignment)
