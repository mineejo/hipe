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

  /**
   * Hipe elements can't be obtained using normal methods
   * like getElementBy... because of the specific work of the parser,
   * which changes the element at work.
   *
   * @param tag - Hipe tag from an HTML file.
   * @protected
   */
  protected getHipeElements(tag: string): HipeElement[] {
    const elements: HipeElement[] = [];
    this.document.querySelectorAll(hipeTag).forEach((e) => {
      if (e.getAttribute(hipeTagAttr) && e.getAttribute(hipeTagAttr) === tag) {
        elements.push(e);
      }
    });

    return elements;
  }
}
