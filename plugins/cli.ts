import { document } from "https://deno.land/x/xml/utils/types.ts";
import { Plugin } from "../plugin.ts";
import { Confirm, Input, Number, Secret } from "https://deno.land/x/cliffy@v0.25.7/prompt/mod.ts";

export class CliPlugin implements Plugin {
  name = "cli";

  init() {
    console.log("Initializing CLI plugin...");
  }

  async render(doc: document) {
    if (!doc.application) {
      console.warn("No application element found");
      return;
    }

    const language = doc?.application?.['@lang'] ?? "en";

    for (const key in doc.application as node) {
      if (/^@/.test(key)) {
        continue;
      }

      const element = doc.application[key];

      switch (key) {
        case "wizard": {
          const title = element.title;
          console.log(`\n${title}\n`);

          let mode = element.mode[0];
          while (mode) {
            const name =  mode.name;
            console.log(`\n${name}\n`);

            if (mode.warning) {
              const warning =mode.warning;
              console.log(`${warning}\n`);
            }

            if (mode.choice) {
              const options: { value: string, text: string }[] = [];

              for (const option of mode.choice.option) {
                const value = option.value as string;
                const text =  option.innerText;
                options.push({ value, text });
              }

              const choice = await Input.prompt({
                message: "Please select an option",
                options,
                default: mode.choice.option[0].value,
              });

              console.log(`Selected: ${choice}`);
            }

            if (mode["control-panel"]) {
              const controlPanel = mode["control-panel"];
              for (const setting of controlPanel.setting) {
                const name =  setting.name;
                const value = options[setting.value] ?? setting.value;
                console.log(`${name}: ${value}`);
              }
            }

            if (mode.choice || mode["control-panel"]) {
              mode = element.mode.find(m => m["@next-mode"] === mode["@id"]);
            } else {
              mode = null;
            }
          }

          break;
        }

        default:
          console.warn(`Unknown element: ${key}`);
      }
    }

    console.log("\nFinished rendering CLI.");
  }
}
