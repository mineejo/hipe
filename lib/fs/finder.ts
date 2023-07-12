import { existsSync, lstatSync, readdirSync } from "fs";
import { join, sep } from "path";
import { Dyer } from "../terminal/dyer.js";

const htmlExtension = ".html" as const;
const hipeExtension = ".hipe.html" as const;

/**
 * @param {string} path - File path, e.g: `./dir/example.js`.
 * @returns {string} - File name, for example: `example.js` from `./dir/example.js`.
 */
export function getFileFromPath(path: string): string {
  const dirs: string[] = path.split(sep);
  return dirs[dirs.length - 1] ?? path;
}

/**
 * @param {string} file - File name Hipe, e.g: `example.hipe.html`.
 * @returns {string} - File name, for example: `example.html` from `example.hipe.html`
 */
export function removeHipeExtension(file: string): string {
  return file.replace(hipeExtension, htmlExtension);
}

/**
 * Finder starts collecting the path to files with
 * the Hipe extension from the starting directory.
 */
export class Finder {
  private readonly _dir: string;
  private readonly _foundFiles: string[] = [];

  public constructor(dir: string) {
    this._dir = dir;
    this.finder(dir);
  }

  public get dir() {
    return this._dir;
  }

  public get foundFiles(): string[] {
    return this._foundFiles;
  }

  private finder(startPath): void {
    if (!existsSync(startPath)) {
      /* The format of the message follows the CPO format.
       * https://github.com/mineejo/cpo
       */
      console.warn(
        `${Dyer.strToRed("×")} FINDER: Directory \`${this._dir}\` ${Dyer.str(
          "not found",
          true,
        )}`,
      );
      return;
    }

    const files: string[] = readdirSync(startPath);
    for (const file of files) {
      const filename: string = join(startPath, file);
      const stat = lstatSync(filename);
      if (stat.isDirectory()) {
        this.finder(filename);
      } else if (filename.endsWith(hipeExtension)) {
        this._foundFiles.push(filename);
      }
    }
  }
}
