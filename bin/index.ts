#!/usr/bin/env node

import yargs, { ArgumentsCamelCase, Argv } from "yargs";
import { hideBin } from "yargs/helpers";
import {
  HipeFinder,
  removeHipeExtension,
  removePathFile,
} from "../lib/fs/hipe-finder.js";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import { Parser } from "../lib/index.js";
import { Dyer } from "../lib/terminal/dyer.js";
import { join } from "path";

yargs(hideBin(process.argv))
  .command(
    "$0 <dir>",
    "Generate HTML files from Hipe HTML",
    (args: Argv) => {
      args.positional("dir", {
        describe: "Path to directory with `.hipe.html` files or path to file",
        default: ".",
        type: "string",
      });
    },
    ({ dir }: ArgumentsCamelCase<{ dir: string }>) => {
      const hipeFinder = new HipeFinder(dir);
      const files: string[] = hipeFinder.foundFiles;
      if (!files) return;

      const argv: string[] = process.argv;

      // Leave comments in the output
      const comment = !argv.includes("-C") && !argv.includes("--comment");

      let output: string | undefined;
      const outputIndex = argv.indexOf("--output");
      if (outputIndex >= 0) {
        output = argv.at(outputIndex + 1);
        if (!output)
          return console.error(
            `${Dyer.strToRed("×")} OPTION: ${Dyer.str(
              "No path",
              true
            )} is specified for the ${Dyer.strToYellow(`--output`)} option`
          );
        if (!existsSync(output)) mkdirSync(output, { recursive: true });
      }

      for (const file of files) {
        let text: string = readFileSync(file, "utf8");
        if (!text) continue;

        const commentRegExp = /<!--(.*?)-->/gm;
        text = comment ? text.replace(commentRegExp, "") : text;

        const html: string = new Parser(text).htmlToString();

        if (output) {
          writeFileSync(
            join(output, removePathFile(removeHipeExtension(file))),
            html
          );
        } else {
          writeFileSync(removeHipeExtension(file), html);
        }
      }

      // The format of the message follows the CPO format.
      console.log(
        `${Dyer.strToGreen("✓")} HIPE: ${Dyer.strToMagenta(
          files.length.toString()
        )} HTML files were ${Dyer.str("generated", true)}` +
          (output ? ` (${output})` : "")
      );
    }
  )
  .option("comment", {
    alias: "C",
    type: "boolean",
    description: "Leave comments in the output",
  })
  .option("output", {
    type: "string",
    description:
      "The output directory of the generated HTML files, without this parameter, " +
      "the files will be located next to the source files",
  })
  .locale("en")
  .example("hipe <dir> [<options>]", "")
  .example(
    "hipe ./src --output ./dist",
    "generates files from `src` directory to `dist`"
  )
  .example(
    "hipe ./src --output ./dist --comment",
    "generates files from `src` directory to `dist` and leaves comments"
  )
  .demandCommand()
  .parse();
