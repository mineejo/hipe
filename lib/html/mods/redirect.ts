import { Mod } from "../mod.js";
import { HipeElement } from "../parser.js";

/**
 * Redirect is a simplified HTML redirect entry that is more visible and readable.
 * Read more on [GitHub...](https://github.com/mineejo/hipe#redirect)
 */
export class Redirect extends Mod {
  /**
   * Hipe Element Description.
   * For this implementation, "insert" is the functional
   * tag that will implement or insert the rest of the html.
   */
  public static readonly insert = {
    tag: "insert",
    attr: "redirect",
    optionalAttr: "delay",
  } as const;

  /**
   * HTML Element Description.
   */
  public static readonly meta = {
    tag: "meta",
    attr: "http-equiv",
    attrValue: "refresh",
    secondAttr: "content",
  };

  // If the Hipe tag is not in the HTML specification, add it to this array.
  public static readonly tags: string[] = [Redirect.insert.tag];

  public constructor(document: Document) {
    super(document);

    const elementsForRemoves: HipeElement[] = [];
    const elementsForUpdates: HipeElement[][] = [];
    const elements: HipeElement[] = this.getHipeElementsByTag(
      Redirect.insert.tag,
    );
    if (!elements) return;

    for (const e of elements) {
      // The delay is measured in seconds.
      const minDelay = "0" as const;
      const delay = e.getAttribute(Redirect.insert.optionalAttr) ?? minDelay;

      const url: string | null = e.getAttribute(Redirect.insert.attr);
      if (!url) continue;

      const meta = this.document.createElement(Redirect.meta.tag);
      meta.setAttribute(Redirect.meta.attr, Redirect.meta.attrValue);
      meta.setAttribute(Redirect.meta.secondAttr, `${delay}; ${url}`);

      elementsForRemoves.push(e);
      elementsForUpdates.push([e, meta]);
    }

    for (const [element, newElement] of elementsForUpdates) {
      if (!element || !newElement) continue;
      element.replaceWith(element, newElement);
    }

    for (const e of elementsForRemoves) e.remove();
  }
}
