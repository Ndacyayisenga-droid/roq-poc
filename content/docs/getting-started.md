---
title: Getting Started
description: Set up and run the Roq POC (getting-started flow)
layout: page
---

# Getting Started

This guide mirrors the **MkDocs POC** [Getting Started](https://github.com/Ndacyayisenga-droid/mkdocs-poc/blob/main/docs/getting-started.md) flow, but for **Quarkus Roq**.

## Prerequisites

- **Java 17+**
- **Maven 3.8+**
- **Git**

## Installation

### Step 1: Clone the repository

```bash
git clone https://github.com/your-org/roq-poc.git
cd roq-poc
```

### Step 2: Verify Java and Maven

```bash
java -version
mvn -version
```

## Running locally

Start the development server (live reload for content changes):

```bash
mvn quarkus:dev
```

Open [http://localhost:8080](http://localhost:8080). Edit files under `content/`, `data/`, `public/`, or `templates/` and refresh.

## Building the site

### Static export (like `mkdocs build`)

```bash
QUARKUS_ROQ_GENERATOR_BATCH=true mvn package quarkus:run -DskipTests
```

Output is written to **`target/roq/`** (equivalent to MkDocs `site/`).

For GitHub Pages under a subpath, set root path during build, e.g.:

```bash
QUARKUS_ROQ_GENERATOR_BATCH=true mvn package quarkus:run -DskipTests \
  -Dquarkus.http.root-path=/roq-poc
```

## Project structure

```
roq-poc/
├── content/docs/          # Documentation source (Markdown) — like mkdocs docs/
│   ├── getting-started.md
│   ├── code-examples.md
│   ├── accessibility.md
│   └── asciidoc-example.md
├── content/index.md       # Home — like mkdocs index.md
├── data/                  # YAML data (menu, authors for theme)
│   ├── menu.yml
│   └── authors.yml
├── public/                # Static assets (CSS, JS)
├── templates/layouts/     # Optional Qute layouts
├── src/main/java/         # Minimal app bean (project root for Roq)
├── src/main/resources/
│   └── application.properties
├── pom.xml
└── .github/workflows/
    └── deploy.yml
```

## Next steps

- [Code Examples]({site.url('/docs/code-examples/')}) — Java, YAML, Bash, language-style tabs, Mermaid, tables
- [Accessibility]({site.url('/docs/accessibility/')}) — Practices page
- [AsciiDoc-style page]({site.url('/docs/asciidoc-example/')}) — Same narrative as MkDocs `asciidoc-example.adoc`
