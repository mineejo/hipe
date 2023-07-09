/// Redirect is a simplified HTML redirect entry that is more visible and readable.
/// Read more on [GitHub...](https://github.com/mineejo/hipe#redirect)
export class Redirect {
  // Hipe Element Description.
  // For this implementation, "insert" is the functional
  // tag that will implement or insert the rest of the html.
  readonly insert = {
    tag: "insert",
    attr: "redirect",
    optionalAttr: "delay",
  } as const;

  private readonly _document: Document;

  constructor(document: Document) {
    this._document = document;

    const elementsForRemoves: Element[] = [];

    const elements = this._document.getElementsByTagName(this.insert.tag);
    for (let i = 0; i < elements.length; i++) {
      const element: Element | undefined = elements[i];
      if (!element) continue;

      // The delay is measured in seconds.
      const minDelay = "0" as const;
      const delay = element.getAttribute(this.insert.optionalAttr) ?? minDelay;

      const url: string | null = element.getAttribute(this.insert.attr);
      if (url) {
        const meta = this._document.createElement("meta");
        meta.setAttribute("http-equiv", "refresh");
        meta.setAttribute("content", `${delay}; ${url}`);
        this._document.getElementsByTagName("head")[0]?.appendChild(meta);
        elementsForRemoves.push(element);
      }
    }

    for (const element of elementsForRemoves) element.remove();
  }

  get document(): Document {
    return this._document;
  }
}
