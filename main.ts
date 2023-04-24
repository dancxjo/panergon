#!/usr/bin/env -S deno run --allow-all --allow-read

import { Command } from "./deps.ts";
import { readArtifactML } from "./artifactml.ts";
import { Plugin } from "./plugin.ts";
import { document } from "https://deno.land/x/xml/utils/types.ts";
import { CliPlugin } from "./plugins/cli.ts";

const command = new Command()
  .name("panergon")
  .description("A program for rendering user interfaces using ArtifactML.")
  .version("0.1.0")
  .arguments("<input:string> [plugins...:string]")
  .action(async (options, input, ...plugins) => {
    const artifactML = await readArtifactML(input);
    const loadedPlugins: Plugin[] = loadPlugins(plugins);
    renderUI(artifactML, loadedPlugins);
  });

function loadPlugins(pluginNames: string[]): Plugin[] {
  const loadedPlugins: Plugin[] = [];
  for (const name of pluginNames) {
    switch (name) {
      case "cli": {
        const plugin = new CliPlugin();
        plugin.init();
        loadedPlugins.push(plugin);
        break;
      }
      default:
        console.warn(`Unknown plugin: ${name}`);
    }
  }
  return loadedPlugins;
}


function renderUI(artifactML: document, plugins: Plugin[]): void {
  // Parse the ArtifactML file and generate the user interface based on the plugins
  // Render the user interface using the appropriate platform-specific UI toolkit (e.g. GTK)
  for (const plugin of plugins) {
    plugin.render(artifactML);
  }
}

await command.parse(Deno.args);
