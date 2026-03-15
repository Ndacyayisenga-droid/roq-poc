---
title: Code Examples
description: Syntax highlighting, line numbers, copy, tabs, Mermaid — aligned with MkDocs POC
layout: page
---

# Code Examples

This page mirrors the **MkDocs POC** [code-examples](https://github.com/Ndacyayisenga-droid/mkdocs-poc/blob/main/docs/code-examples.md): **syntax highlighting**, **line numbers**, **copy-to-clipboard**, **language tabs** (as stacked sections), and **Mermaid** diagrams.

## Java example

The following Java snippet matches the MkDocs POC service class:

```java
package com.example.service;

import java.util.Optional;

/**
 * Example service class for the documentation POC.
 */
public class HelloService {

    public Optional<String> greet(String name) {
        if (name == null || name.isBlank()) {
            return Optional.empty();
        }
        return Optional.of("Hello, " + name + "!");
    }

    public static void main(String[] args) {
        var service = new HelloService();
        service.greet("Roq").ifPresent(System.out::println);
    }
}
```

## YAML example

Roq / Maven CI-style configuration:

```yaml
name: Deploy Documentation

on:
  push:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-java@v4
        with:
          java-version: '17'
          distribution: 'temurin'
      - run: QUARKUS_ROQ_GENERATOR_BATCH=true mvn -B package quarkus:run -DskipTests
```

## Bash example

```bash
#!/bin/bash
set -e

# Dev server
mvn quarkus:dev

# Static site → target/roq/
QUARKUS_ROQ_GENERATOR_BATCH=true mvn package quarkus:run -DskipTests
```

## Language tabs (MkDocs-style)

MkDocs uses **pymdownx.tabbed** for Bash / YAML / JSON. Here the same idea in three blocks:

### Bash

```bash
npm install
npm run start
npm run build
```

### YAML

```yaml
scripts:
  start: docusaurus start
  build: docusaurus build
```

### JSON

```json
{
  "scripts": {
    "start": "docusaurus start",
    "build": "docusaurus build"
  }
}
```

## Code tabs (shells)

### Bash

```bash
cd roq-poc
mvn quarkus:dev
```

### PowerShell

```powershell
cd roq-poc
mvn quarkus:dev
```

### Command Prompt

```cmd
cd roq-poc
mvn quarkus:dev
```

## Mermaid diagrams

<script type="module">
import mermaid from 'https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.esm.min.mjs';
mermaid.initialize({ startOnLoad: true, theme: 'neutral' });
</script>

### Sequence diagram

<div class="mermaid">
sequenceDiagram
    participant User
    participant Roq
    participant GitHub
    User->>Roq: mvn package (generator)
    Roq->>Roq: Render Markdown
    Roq->>User: target/roq/
    User->>GitHub: Push to main
    GitHub->>GitHub: Deploy workflow
    GitHub->>User: Live at GitHub Pages
</div>

### Class diagram

<div class="mermaid">
classDiagram
    class Roq {
        +generate()
        +dev()
    }
    class Qute {
        +templates
    }
    Roq --> Qute : uses
</div>

### Flowchart

<div class="mermaid">
flowchart LR
    subgraph Source
        MD[Markdown Files]
        Config[application.properties]
    end
    subgraph Build
        Roq[Roq Generator]
    end
    subgraph Output
        HTML[Static Site]
        Site[GitHub Pages]
    end
    MD --> Roq
    Config --> Roq
    Roq --> HTML
    HTML --> Site
</div>

## Tables and notes

### Feature support

| Feature | Roq POC |
|---------|---------|
| Markdown | Yes |
| Static export | Yes (`target/roq/`) |
| Dead link check | Lychee in CI (see workflow) |
| Search | Not built-in (static); add client-side search if needed |

> **Tip:** Use `mvn quarkus:dev` during development; content under `content/` is picked up with reload.

> **Warning:** PDF is not built into Roq like MkDocs-with-PDF; use print-to-PDF or a separate pipeline if required.

> **Note:** Internal links: [Getting Started](/docs/getting-started/) or [Installation](#bash-example).
