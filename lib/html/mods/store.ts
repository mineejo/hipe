/// Store for data that changes frequently but is a constant.
/// For example, the config store can be listed above all other elements
/// in `<body>`, so you don't have to search for it amongst the many
/// elements and be aware of the information used.
/// Read more on [GitHub...](https://github.com/mineejo/hipe#store)
export class Store {
  // Hipe Element Description.
  // For this implementation, "insert" is the functional
  // tag that will implement or insert the rest of the html.
  readonly insert = {
    tag: "insert",
    attr: "value",
    secondAttr: "store",
  } as const;

  // Hipe Element Description.
  readonly value = {
    tag: "value",
    attr: "name",
  } as const;

  // Hipe Element Description.
  readonly store = {
    tag: "store",
    attr: "name",
  } as const;

  private readonly _document: Document;

  constructor(document: Document) {
    this._document = document;

    const elementsForRemoves: Element[] = [];
    const elementsForUpdates: [[Element | undefined, string | undefined]] = [
      [undefined, undefined],
    ];

    const elements = this._document.getElementsByTagName(this.insert.tag);
    for (let i = 0; i < elements.length; i++) {
      const element: Element | undefined = elements[i];
      if (!element) continue;

      const storeValueName = element.getAttribute(this.insert.attr);
      const storeName = element.getAttribute(this.insert.secondAttr);
      if (storeName) {
        const storeQuery = `${this.store.tag}[${this.store.attr}=${storeName}]`;
        const store = this._document.querySelector(storeQuery);
        if (store) {
          elementsForRemoves.push(store);

          const storeValues: HTMLCollection = store.children ?? [];
          for (let j = 0; j <= storeValues.length - 1; j++) {
            const storeValue: Element | undefined = storeValues[j];
            const tagName = storeValue?.tagName.toLowerCase();
            if (!storeValue || tagName !== this.value.tag) continue;

            const valueName = storeValue.getAttribute(this.value.attr);
            if (valueName === storeValueName && storeValue) {
              elementsForUpdates.push([element, storeValue.innerHTML]);
            }
          }
        }
      }
    }

    for (const [element, storeValue] of elementsForUpdates) {
      if (element && storeValue) element.replaceWith(storeValue);
    }

    for (const element of elementsForRemoves) element.remove();
  }

  get document(): Document {
    return this._document;
  }
}
