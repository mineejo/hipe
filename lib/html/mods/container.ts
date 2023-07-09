// https://github.com/mineejo/hipe#container
export class Container {
  // Hipe Element Description.
  // For this implementation, "insert" is the functional
  // tag that will implement or insert the rest of the html.
  readonly insert = {
    tag: "insert",
    attr: "container",
  } as const;

  // Hipe Element Description.
  readonly container = {
    tag: "container",
    attr: "name",
  } as const;

  private readonly _document: Document;

  constructor(document: Document) {
    this._document = document;

    const elementsForRemoves: Element[] = [];
    const elementsForUpdates: [[Element | undefined, Element | undefined]] = [
      [undefined, undefined],
    ];

    const elements = this._document.getElementsByTagName(this.insert.tag);
    for (let i = 0; i < elements.length; i++) {
      const element: Element | undefined = elements[i];
      if (!element) continue;

      const containerName = element.getAttribute(this.insert.attr);
      if (containerName) {
        const container = this._document.querySelector(
          `${this.container.tag}[${this.container.attr}=${containerName}]`
        );

        if (container) {
          elementsForRemoves.push(container);
          elementsForUpdates.push([element, container]);
        }
      }
    }

    for (const [element, storeValue] of elementsForUpdates) {
      if (element && storeValue) {
        const children: NodeListOf<ChildNode> = storeValue.childNodes;
        children.forEach(function (item: ChildNode): void {
          element.replaceWith(element, item.cloneNode(true));
        });
        elementsForRemoves.push(element);
      }
    }

    for (const element of elementsForRemoves) element.remove();
  }

  get document(): Document {
    return this._document;
  }
}
