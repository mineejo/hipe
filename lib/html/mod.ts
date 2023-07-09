import { HipeElement, hipeTag, hipeTagAttr } from "./parser.js";

/**
 * The mod contains basic methods
 * and fields for other modifications.
 */
export class Mod {
  readonly document: Document;

  constructor(document: Document) {
    this.document = document;
  }
}
