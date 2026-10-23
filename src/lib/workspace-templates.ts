// TEKA NEXUS — Workspace starter templates (Task ws-1).
// Offered in the "New file" dialog; keyed by id, each carries a suggested
// name and a small skeleton so teams boot files in one click.

export type WsTemplate = {
  id: string;
  nameKey: string; // i18n key under workspace.templates.*
  fileName: string;
  content: string;
};

export const WS_TEMPLATES: WsTemplate[] = [
  {
    id: "empty",
    nameKey: "empty",
    fileName: "notes.txt",
    content: "",
  },
  {
    id: "readme",
    nameKey: "readme",
    fileName: "README.md",
    content: `# Project

> One-liner about this project.

## What is inside?

- ...
- ...

## Run it

\`\`\`bash
# steps to run
\`\`\`

---
Watermarked with 💙 **TEKA NEXUS**
`,
  },
  {
    id: "html",
    nameKey: "html",
    fileName: "index.html",
    content: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>TEKA App</title>
    <link rel="stylesheet" href="styles.css" />
  </head>
  <body>
    <main>
      <h1>Hello from TEKA Workspace 👋</h1>
    </main>
    <script src="app.js"></script>
  </body>
</html>
`,
  },
  {
    id: "python",
    nameKey: "python",
    fileName: "main.py",
    content: `"""TEKA Workspace starter script."""


def main() -> None:
    print("Hello from TEKA Workspace 👋")


if __name__ == "__main__":
    main()
`,
  },
  {
    id: "ts",
    nameKey: "ts",
    fileName: "app.ts",
    content: `// TEKA Workspace starter module.

export function greet(name: string): string {
  return \`Hello, \${name}! — built with TEKA NEXUS\`;
}

console.log(greet("world"));
`,
  },
  {
    id: "json",
    nameKey: "json",
    fileName: "config.json",
    content: `{
  "name": "teka-project",
  "version": "1.0.0",
  "teka": {
    "watermark": "TEKA NEXUS"
  }
}
`,
  },
  {
    id: "css",
    nameKey: "css",
    fileName: "styles.css",
    content: `/* TEKA Workspace starter styles */
:root {
  --teka-cyan: #22d3ee;
  --teka-violet: #a78bfa;
}

body {
  font-family: system-ui, sans-serif;
  margin: 2rem;
}

.badge::after {
  content: "TEKA";
  color: var(--teka-cyan);
}
`,
  },
];

export function templateById(id: string): WsTemplate | undefined {
  return WS_TEMPLATES.find((tpl) => tpl.id === id);
}
