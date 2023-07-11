#!/usr/bin/env node

import yargs, { ArgumentsCamelCase, Argv } from "yargs";
import { hideBin } from "yargs/helpers";
import {
  Finder,
  getFileFromPath,
  removeHipeExtension,
} from "../lib/fs/finder.js";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import { Parser } from "../lib/index.js";
import { Dyer } from "../lib/terminal/dyer.js";
import { join } from "path";
import * as prettier from "prettier";

function getCommentParam(argv: string[]): boolean {
  return argv.includes("-C") || argv.includes("--comment");
}

function getOutputParam(argv: string[]): string | undefined {
  const index: number = argv.indexOf("--output");
  if (index < 0) return;

  const output: string | undefined = argv.at(index + 1);
  if (!output) {
    console.error(
      `${Dyer.strToRed("×")} OPTION: ${Dyer.str(
        "No path",
        true
      )} is specified for the ${Dyer.strToYellow(`--output`)} option`
    );
    return;
  }

  return output;
}

// noinspection XmlDeprecatedElement,HtmlDeprecatedTag
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
      const files: string[] = new Finder(dir).foundFiles;
      if (!files) return;

      const output: string | undefined = getOutputParam(process.argv);
      if (output && !existsSync(output)) {
        // Creates missing directories from the output path.
        mkdirSync(output, { recursive: true });
      }

      let countGenerated = 0;
      for (const file of files) {
        let content: string = readFileSync(file, "utf8");
        if (!content) continue;

        const commentRegExp = /<!--(.*?)-->/gm;
        if (!getCommentParam(process.argv)) {
          // Removes HTML comments because of a false parameter.
          content = content.replace(commentRegExp, "");
        }

        let newContent: string = new Parser(content).documentToString();
        if (newContent == content) continue;
        newContent = prettier.format(newContent, {
          parser: "html",
        });

        if (output) {
          const path = join(output, getFileFromPath(removeHipeExtension(file)));
          writeFileSync(path, newContent);
        } else {
          writeFileSync(removeHipeExtension(file), newContent);
        }

        countGenerated++;
      }

      /* The format of the message follows the CPO format.
       * https://github.com/mineejo/cpo
       */
      console.log(
        `${Dyer.strToGreen("✓")} HIPE: ${Dyer.strToMagenta(
          countGenerated.toString()
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
