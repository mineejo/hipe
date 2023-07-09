import { Mod } from "../mod.js";

/// Redirect is a simplified HTML redirect entry that is more visible and readable.
/// Read more on [GitHub...](https://github.com/mineejo/hipe#redirect)
export class Redirect extends Mod {
  // Hipe Element Description.
  // For this implementation, "insert" is the functional
  // tag that will implement or insert the rest of the html.
  public static readonly insert = {
    tag: "insert",
    attr: "redirect",
    optionalAttr: "delay",
  } as const;

  // If the Hipe tag is not in the HTML specification, add it to this array.
  public static readonly tags: string[] = [Redirect.insert.tag];

  public constructor(document: Document) {
    super(document);

    const elementsForRemoves: Element[] = [];

    const elements = this.document.getElementsByTagName(Redirect.insert.tag);
    for (let i = 0; i < elements.length; i++) {
      const element: Element | undefined = elements[i];
      if (!element) continue;

      // The delay is measured in seconds.
      const minDelay = "0" as const;
      const delay =
        element.getAttribute(Redirect.insert.optionalAttr) ?? minDelay;

      const url: string | null = element.getAttribute(Redirect.insert.attr);
      if (url) {
        const meta = this.document.createElement("meta");
        meta.setAttribute("http-equiv", "refresh");
        meta.setAttribute("content", `${delay}; ${url}`);
        this.document.getElementsByTagName("head")[0]?.appendChild(meta);
        elementsForRemoves.push(element);
      }
    }

    for (const element of elementsForRemoves) element.remove();
  }
}
