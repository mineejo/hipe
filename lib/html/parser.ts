import { JSDOM } from "jsdom";
import { Redirect } from "./mods/redirect.js";
import { Store } from "./mods/store.js";
import { Container } from "./mods/container.js";

/**
 * Parser uses a web-like DOM implementation to parses
 * HTML and implements Hipe elements, etc., modifying existing elements.
 */
export class Parser {
  private readonly _document: Document | undefined;

  /**
   * @param {string} str - HTML file, HTML strings, etc.
   */
  public constructor(str: string) {
    this._document = new JSDOM(str).window._document;
    if (this._document) {
      this._document = new Redirect(this._document).document;
      this._document = new Container(this._document).document;
      this._document = new Store(this._document).document;
    }
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
}
