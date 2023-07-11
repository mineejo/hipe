import { JSDOM } from "jsdom";
import { Redirect } from "./mods/redirect.js";
import { Store } from "./mods/store.js";
import { Container } from "./mods/container.js";
import { Mod } from "./mod.js";
import { DocumentIntegrity, DocumentWrapper } from "./document-wrapper.js";

export type HipeElement = HTMLElement;
// HTML tag to replace the Hipe tag before parsing.
export const hipeTag = "noscript" as const;
// HTML attribute that must contain the name of the Hipe tag.
export const hipeTagAttr = "data-hipe-tag" as const;

/**
 * Parser uses a web-like DOM implementation to parses
 * HTML and implements Hipe elements, etc., modifying existing elements.
 */
export class Parser {
  private _content: string;
  private _document: Document | undefined;
  private readonly _doctype: string;
  private readonly _documentIntegrity: DocumentIntegrity;

  /**
   * @param {string} content - HTML file, HTML strings, etc.
   */
  public constructor(content: string) {
    this._content = content;

    const documentWrapper = new DocumentWrapper(this._content);
    this._content = documentWrapper.content;
    this._doctype = documentWrapper.doctype;
    this._documentIntegrity = documentWrapper.documentIntegrity;

    this.addMods([Redirect, Container, Store]);
  }

  /**
   * @returns {string} The finished HTML document as a string.
   */
  public documentToString(): string {
    if (!this._document) return "";

    let str = this._document.documentElement.outerHTML.toString();
    if (this._documentIntegrity.doctypeTag) str = this._doctype + str;
    return str;
  }

  /**
   * The Hipe parser uses the JSDOM parser,
   * adding its own modifications implemented on the DOM API.
   *
   * @param {Array<Mod>} mods
   * @private
   */
  private addMods(mods: (typeof Mod)[]): void {
    // Before adding mods, resets "noscript" tag names to an attribute
    // with a tag to work more adequately with the JSDOM parser.
    for (const mod of mods) {
      const tags: string[] = mod?.["tags"];
      if (!tags) continue;

      for (const tag of tags) {
        if (!tag) continue;
        this._content = this._content
          .replaceAll(`<${tag}`, `<${hipeTag} ${hipeTagAttr}="${tag}" `)
          .replaceAll(`</${tag}>`, `</${hipeTag}>`);
      }
    }

    this._document = new JSDOM(this._content).window._document;
    if (!this._document) return;
    for (const mod of mods) this._document = new mod(this._document).document;
  }
}
