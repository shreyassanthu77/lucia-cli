import { Command } from "https://deno.land/x/cliffy@v1.0.0-rc.3/command/mod.ts";

const initCommand = new Command()
  .name("init")
  .description("Adds Lucia Auth to your project")
  .action(() => {
    console.log("Lucia Auth has been added to your project!");
  });

const root = new Command()
  .name("lucia")
  .version("0.0.1")
  .description("A CLI for Lucia Auth")
  .action(() => {
    root.showHelp();
  })
  .command("init", initCommand);

await root.parse(Deno.args);
