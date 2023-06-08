import { JSDOM } from "jsdom";
import { HipeTags } from "./hipe-tags.js";

/**
 * The Hipe class creates a new JSDOM document and provides methods to modify it.
 */
export class Hipe {
  public static document: Document | undefined;

  constructor(html: string) {
    Hipe.document = new JSDOM(html).window._document;
  }

  get document(): Document | undefined {
    return Hipe.document;
  }

  /**
   * Automatically runs methods of a modifier
   * class that modifies a document of that class.
   */
  modifyDocument(): void {
    const methods: string[] = Object.getOwnPropertyNames(HipeTags.prototype);
    methods.shift(); // removes the class constructor.

    const hipeTags: HipeTags = new HipeTags();
    for (const method of methods) {
      hipeTags[method]();
    }
  }
}
