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

  modifyDocument() {
    new HipeTags().insertContainer().insertStore();
  }
}
