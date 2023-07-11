import { HipeElement, hipeTag, hipeTagAttr } from "./parser.js";

/**
 * The mod contains basic methods
 * and fields for other modifications.
 */
export class Mod {
  public readonly document: Document;

  public constructor(document: Document) {
    this.document = document;
  }

  /**
   * Hipe elements can't be obtained using normal methods
   * like getElementBy... because of the specific work of the parser,
   * which changes the element at work.
   *
   * @param {string} tag - Hipe tag from an HTML file.
   *
   * @returns {Array<HipeElement>}
   * @protected
   */
  protected getHipeElementsByTag(tag: string): HipeElement[] {
    const elements: HipeElement[] = [];
    this.document.querySelectorAll(hipeTag).forEach((e) => {
      if (e.getAttribute(hipeTagAttr) && e.getAttribute(hipeTagAttr) === tag) {
        elements.push(e);
      }
    });

    return elements;
  }

  /**
   * Hipe elements can't be obtained using normal methods
   * like getElementBy... because of the specific work of the parser,
   * which changes the element at work.
   *
   * @param {string} tag - Hipe tag from an HTML file.
   * @param {string} attr - Attribute name of the element.
   * @param {string} value - A value that must be equal to the value of the attribute.
   *
   * @returns {HipeElement}
   * @protected
   */
  protected getHipeElementByTagAttrValue({
    tag,
    attr,
    value,
  }: {
    tag: string;
    attr: string;
    value: string;
  }): HipeElement | undefined {
    const elements: HipeElement[] = [];
    this.document.querySelectorAll(hipeTag).forEach((e) => {
      if (
        e.getAttribute(hipeTagAttr) &&
        e.getAttribute(hipeTagAttr) === tag &&
        e.getAttribute(attr) === value
      ) {
        elements.push(e);
      }
    });

    return elements[0];
  }
}
