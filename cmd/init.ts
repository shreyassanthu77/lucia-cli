import { Command } from "https://deno.land/x/cliffy@v1.0.0-rc.3/command/mod.ts";

export const initCommand = new Command()
  .name("init")
  .description("Adds Lucia Auth to your project")
  .action(() => {
    console.log("Lucia Auth has been added to your project!");
  });
