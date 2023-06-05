import { existsSync, lstatSync, readdirSync } from "fs";
import { join, sep } from "path";
import { Dyer } from "../terminal/dyer.js";

const htmlExtension = ".html" as const;
const fileExtension = ".hipe.html" as const;

export function removePathFile(file: string): string {
  const dirs: string[] = file.split(sep);
  return dirs[dirs.length - 1] ?? file;
}

export function removeHipeExtension(file: string): string {
  return file.replace(fileExtension, htmlExtension);
}

/**
 * The HipeFinder class looks for files with the extension .hipe.html.
 */
export class HipeFinder {
  private readonly _dir;

  constructor(dir: string) {
    this._dir = dir;
    this.finder(dir);
  }

  get dir() {
    return this._dir;
  }

  private _foundFiles: string[] = [];

  get foundFiles(): string[] {
    return this._foundFiles;
  }

  private finder(startPath) {
    if (!existsSync(startPath)) {
      // The format of the message follows the CPO format.
      console.warn(
        `${Dyer.strToRed("×")} FINDER: Directory \`${this._dir}\` ${Dyer.str(
          "not found",
          true
        )}`
      );
      return;
    }

    const files = readdirSync(startPath);
    for (const file of files) {
      const filename = join(startPath, file);
      const stat = lstatSync(filename);
      if (stat.isDirectory()) {
        this.finder(filename);
      } else if (filename.endsWith(fileExtension)) {
        this._foundFiles.push(filename);
      }
    }
  }
}
