import { Command } from "https://deno.land/x/cliffy@v1.0.0-rc.3/command/mod.ts";
import { version } from "../src/version.ts";
import { initCommand } from "./init.ts";

const root = new Command()
  .name("lucia")
  .version(version)
  .description("A CLI for Lucia Auth")
  .globalOption("-d", "Set the current working directory")
  .action(() => {
    root.showHelp();
  })
  .command("init", initCommand);

root.parse(Deno.args);
