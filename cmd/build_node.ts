import { build, emptyDir } from "https://deno.land/x/dnt@0.39.0/mod.ts";
import { version } from "./version.ts";

await emptyDir("./npm");

await build({
  entryPoints: [
    "./cmd/main.ts",
  ],
  outDir: "./npm",
  shims: {
    deno: true,
  },
  typeCheck: false,
  declaration: false,
  esModule: false,
  test: false,
  package: {
    name: "lucia-cli",
    version,
    description: "A CLI for Lucia Auth",
    license: "MIT",
    bin: {
      lucia: "./script/main.js",
    },
    repository: {
      type: "git",
      url: "git+https://github.com/shreyassanthu77/lucia-cli.git",
    },
    bugs: {
      url: "https://github.com/shreyassanthu77/lucia-cli/issues",
    },
  },
  postBuild() {
    addShebang("npm/script/main.js");
    Deno.copyFileSync("Readme.md", "npm/README.md");
  },
});

function addShebang(path: string) {
  const content = Deno.readTextFileSync(path);
  Deno.writeTextFileSync(
    path,
    `#!/usr/bin/env node\n${content}`,
  );
}
