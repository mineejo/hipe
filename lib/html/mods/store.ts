import { Mod } from "../mod.js";

/**
 * Store for data that changes frequently but is a constant.
 * For example, the config store can be listed above all other elements
 * in `<body>`, so you don't have to search for it amongst the many
 * elements and be aware of the information used.
 * Read more on [GitHub...](https://github.com/mineejo/hipe#store)
 */
export class Store extends Mod {
  /**
   * Hipe Element Description.
   * For this implementation, "insert" is the functional
   * tag that will implement or insert the rest of the html.
   */
  public static readonly insert = {
    tag: "insert",
    attr: "value",
    secondAttr: "store",
  } as const;

  /**
   * Hipe Element Description.
   */
  public static readonly value = {
    tag: "value",
    attr: "name",
  } as const;

  /**
   * Hipe Element Description.
   */
  public static readonly store = {
    tag: "store",
    attr: "name",
  } as const;

  // If the Hipe tag is not in the HTML specification, add it to this array.
  public static readonly tags: string[] = [
    Store.insert.tag,
    Store.value.tag,
    Store.store.tag,
  ];

  public constructor(document: Document) {
    super(document);

    const elementsForRemoves: Element[] = [];
    const elementsForUpdates: [[Element | undefined, string | undefined]] = [
      [undefined, undefined],
    ];

    const elements = this.document.getElementsByTagName(Store.insert.tag);
    for (let i = 0; i < elements.length; i++) {
      const element: Element | undefined = elements[i];
      if (!element) continue;

      const storeValueName = element.getAttribute(Store.insert.attr);
      const storeName = element.getAttribute(Store.insert.secondAttr);
      if (storeName) {
        const storeQuery = `${Store.store.tag}[${Store.store.attr}=${storeName}]`;
        const store = this.document.querySelector(storeQuery);
        if (store) {
          elementsForRemoves.push(store);

          const storeValues: HTMLCollection = store.children ?? [];
          for (let j = 0; j <= storeValues.length - 1; j++) {
            const storeValue: Element | undefined = storeValues[j];
            const tagName = storeValue?.tagName.toLowerCase();
            if (!storeValue || tagName !== Store.value.tag) continue;

            const valueName = storeValue.getAttribute(Store.value.attr);
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
}
