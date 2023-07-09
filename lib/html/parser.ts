import { JSDOM } from "jsdom";
import { Redirect } from "./mods/redirect.js";
import { Store } from "./mods/store.js";
import { Container } from "./mods/container.js";
import { Mod } from "./mod.js";

/**
 * Parser uses a web-like DOM implementation to parses
 * HTML and implements Hipe elements, etc., modifying existing elements.
 */
export class Parser {
  private _content: string;
  private _document: Document | undefined;

  /**
   * @param {string} content - HTML file, HTML strings, etc.
   */
  public constructor(content: string) {
    this._content = content;
    this.addMods([Redirect, Container, Store]);
  }

  /**
   * @returns {string} The finished HTML document as a string.
   */
  public htmlToString(): string {
    const html: string | undefined =
      this._document?.documentElement.outerHTML.toString();
    const blankStrings = /^\s*\n/gm;
    return "<!DOCTYPE html>\n" + html?.replace(blankStrings, "");
  }

  private addMods(mods: (typeof Mod)[]): void {
    // Before adding mods, resets "meta" tag names to an attribute
    // with a tag to work more adequately with the JSDOM parser.
    for (const mod of mods) {
      const tags: string[] = mod?.["tags"];
      if (!tags) continue;

      for (const tag of tags) {
        if (!tag) continue;
        this._content = this._content.replaceAll(
          `<${tag}`,
          `<meta data-hipe-tag="${tag}" `
        );
      }
    }

    this._document = new JSDOM(this._content).window._document;
    if (!this._document) return;
    for (const mod of mods) this._document = new mod(this._document).document;
  }
}
