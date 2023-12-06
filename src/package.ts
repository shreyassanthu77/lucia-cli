export type PackageJSON = {
  name: string;
  version?: string;
  description?: string;
  main?: string;
  license?: string;
  scripts: {
    [key: string]: string;
  };
  dependencies?: {
    [key: string]: string;
  };
  devDependencies?: {
    [key: string]: string;
  };
};

const pacmans = {
  npm: {
    install: ["install"],
  },
  yarn: {
    install: ["install"],
  },
  pnpm: {
    install: ["install"],
  },
  bun: {
    install: ["install"],
  },
} as const;

export type PackageManager = keyof typeof pacmans;

type PackageVersionsOf<Name extends string> = {
  name: Name;
  latest: string;
  next: string;
  [key: string]: string;
};

export class Package {
  public json: PackageJSON;

  constructor(public path = "./package.json", public cwd = Deno.cwd()) {
    const jsonStr = Deno.readTextFileSync(path);
    this.json = JSON.parse(jsonStr);
  }

  hasDependency(name: string) {
    return this.json.dependencies && this.json.dependencies[name];
  }

  hasDevDependency(name: string) {
    return this.json.devDependencies && this.json.devDependencies[name];
  }

  addDependency<Name extends string>(
    name: PackageVersionsOf<Name>,
    tag?: keyof PackageVersionsOf<Name>,
  ): Package;
  addDependency(name: string, version: string): Package;
  addDependency(
    name: string | PackageVersionsOf<string>,
    version?: string | keyof PackageVersionsOf<string>,
  ) {
    if (!this.json.dependencies) {
      this.json.dependencies = {};
    }
    if (typeof name === "object") {
      const tag = version || "latest";
      this.json.dependencies[name.name] = name[tag];
    } else {
      this.json.dependencies[name] = version as string;
    }
    return this;
  }

  addDevDependency<Name extends string>(
    name: PackageVersionsOf<Name>,
    tag?: keyof PackageVersionsOf<Name>,
  ): Package;
  addDevDependency(name: string, version: string): Package;
  addDevDependency(
    name: string | PackageVersionsOf<string>,
    version?: string | keyof PackageVersionsOf<string>,
  ) {
    if (!this.json.devDependencies) {
      this.json.devDependencies = {};
    }
    if (typeof name === "object") {
      const tag = version || "latest";
      this.json.devDependencies[name.name] = name[tag];
    } else {
      this.json.devDependencies[name] = version as string;
    }
    return this;
  }

  removeDependency(name: string) {
    if (this.json.dependencies) {
      delete this.json.dependencies[name];
    }
    return this;
  }

  removeDevDependency(name: string) {
    if (this.json.devDependencies) {
      delete this.json.devDependencies[name];
    }
    return this;
  }

  save() {
    const jsonStr = JSON.stringify(this.json, null, 2);
    Deno.writeTextFileSync(this.path, jsonStr);
    return this;
  }

  async install(pacman: PackageManager = "npm") {
    const cmd = pacmans[pacman].install;
    const p = new Deno.Command(
      pacman,
      {
        // @ts-expect-error args expects string[] but cmd is readonly string[]
        args: cmd,
        cwd: this.cwd,
        stdout: "piped",
        stderr: "piped",
      },
    ).spawn();

    p.stdout.pipeTo(Deno.stdout.writable);
    p.stderr.pipeTo(Deno.stderr.writable);

    const { success } = await p.status;
    return success;
  }

  static async fetchDependency<Name extends string>(name: Name) {
    const res = await fetch(
      `https://registry.npmjs.org/-/package/${name}/dist-tags`,
    );
    const versions = await res.json() as PackageVersionsOf<Name>;
    versions.name = name;
    return versions;
  }
}

// if (import.meta.main) {
//   const lucia = await Package.fetchDependency("lucia");
//   const ts = await Package.fetchDependency("typescript");
//   new Package()
//     .addDependency(lucia)
//     .addDevDependency(ts)
//     .save()
//     .install();
// }
