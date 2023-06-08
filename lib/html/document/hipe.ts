import { JSDOM } from "jsdom";
import { HipeTags } from "./hipe-tags.js";
import { wrap } from "multitry";

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
      // "wrap" handles a type error when the class method
      // is a getter or setter that is not a function, but is a method.
      const err = wrap({
        try: () => hipeTags[method](),
        catch: (e) => e,
      });

      if (err instanceof Error && !err.message.includes("is not a function")) {
        console.error(err);
      }
    }
  }
}
