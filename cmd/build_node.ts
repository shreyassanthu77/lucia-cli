// ex. scripts/build_npm.ts
import { build, emptyDir } from "https://deno.land/x/dnt@0.39.0/mod.ts";

await emptyDir("./npm");

await build({
  entryPoints: [
    {
      kind: "bin",
      name: "lucia",
      path: "./cmd/main.ts",
    },
  ],
  outDir: "./npm",
  shims: {
    deno: true,
  },
  skipSourceOutput: true,
  esModule: false,
  typeCheck: false,
  declaration: false,
  package: {
    name: "lucia-cli",
    version: Deno.args[0],
    description: "A CLI for Lucia Auth",
    license: "MIT",
    repository: {
      type: "git",
      url: "git+https://github.com/shreyassanthu77/lucia-cli.git",
    },
    bugs: {
      url: "https://github.com/shreyassanthu77/lucia-cli/issues",
    },
  },
  postBuild() {
    Deno.copyFileSync("Readme.md", "npm/README.md");
  },
});
