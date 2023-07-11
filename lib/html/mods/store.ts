import { Mod } from "../mod.js";
import { HipeElement, hipeTagAttr } from "../parser.js";

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

    const elementsForRemoves: HipeElement[] = [];
    const elementsForUpdates: (HipeElement | string)[][] = [];
    const elements: HipeElement[] = this.getHipeElementsByTag(Store.insert.tag);
    if (!elements) return;

    for (const e of elements) {
      const insertValueName: string | null = e.getAttribute(Store.insert.attr);
      const insertStoreName: string | null = e.getAttribute(
        Store.insert.secondAttr
      );
      if (!insertStoreName) return;

      const store: HipeElement | undefined = this.getHipeElementByTagAttrValue({
        tag: Store.store.tag,
        attr: Store.store.attr,
        value: insertStoreName,
      });

      if (!store) return;
      elementsForRemoves.push(store);
      const storeValues: HTMLCollection = store.children ?? [];

      for (let j = 0; j <= storeValues.length - 1; j++) {
        const value: Element | undefined = storeValues[j];
        const tagName: string = value?.getAttribute(hipeTagAttr) ?? "";
        if (!value || tagName !== Store.value.tag) continue;

        const valueName = value.getAttribute(Store.value.attr);
        if (valueName === insertValueName && value) {
          elementsForUpdates.push([e, value.innerHTML]);
        }
      }
    }

    for (const [element, storeValue] of elementsForUpdates) {
      if (element && storeValue && typeof element !== "string") {
        element.replaceWith(storeValue);
      }
    }

    for (const element of elementsForRemoves) element.remove();
  }
}
