---
title: AsciiDoc-style example
description: Same narrative as MkDocs asciidoc-example.adoc (Markdown; Roq has no AsciiDoc plugin like mkdocs-asciidoctor-backend)
layout: page
---

# AsciiDoc-style example

This page mirrors **MkDocs** `docs/asciidoc-example.adoc`: same ideas in **Markdown**. The MkDocs POC uses AsciiDoc via `mkdocs-asciidoctor-backend`; **Roq** is Markdown/HTML-first, so this file stands in for that page for a fair comparison with the [Docusaurus POC](https://github.com/Ndacyayisenga-droid/docusaurus-poc) (which also uses a Markdown equivalent).

## Why AsciiDoc (in MkDocs)?

In the MkDocs stack, AsciiDoc offers:

- Strong semantics (sections, admonitions, cross-references)
- Long-form technical docs and multi-output (HTML, PDF) via Asciidoctor

For Roq, you author in **Markdown** or **HTML** in `content/`; for AsciiDoc-native workflows, MkDocs + Asciidoctor or Antora may be a better fit.

## Quick example

YAML snippet (same as MkDocs AsciiDoc sample):

```yaml
site_name: MkDocs POC
docs_dir: docs
theme:
  name: material
```

## Cross-references

- [Home](/) — site index
- [Getting Started](/docs/getting-started/)

See the repo **README** for how this POC maps to the MkDocs and Docusaurus checklists.
