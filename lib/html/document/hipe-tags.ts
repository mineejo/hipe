import { Hipe } from "./hipe.js";

/**
 * The HipeTags class provides methods for inserting and replacing
 * elements based on specific HTML tags and attributes.
 */
export class HipeTags {
  /**
   * Store for data that changes frequently but is a constant.
   * For example, the config store can be listed above
   * all other elements in `<body>`, so you don't have to search for it
   * amongst the many elements and be aware of the information used.
   *
   * **Example:**
   * ```html
   * <store name="config">
   *   <value name="version">1.0.0</value>
   *   <value name="name">Hello world!</value>
   *   <value name="link">https://www.example.com</value>
   * </store>
   *
   * <div>
   *   A version of something:
   *   <insert value="version" store="config"></insert>, more at
   *   <insert value="link" store="config"></insert>
   * </div>
   * ```
   *
   * **Output:**
   * ```html
   * <div>
   *   A version of something:
   *   1.0.0, more at
   *   https://www.example.com
   * </div>
   * ```
   */
  insertStore(): HipeTags {
    if (!Hipe.document) return this;

    const tag = {
      insert: "insert",
      store: "store",
      attrs: {
        store: "store",
        value: "value",
        name: "name",
      },
    } as const;

    const replaceList: [[Element | undefined, string | undefined]] = [
      [undefined, undefined],
    ];

    const removeList: Element[] = [];

    const elements = Hipe.document.getElementsByTagName(tag.insert);
    for (let i = 0; i < elements.length; i++) {
      const element: Element | undefined = elements[i];

      const storeName = element?.getAttribute(tag.attrs.store);
      const storeValueName = element?.getAttribute(tag.attrs.value);

      if (storeName) {
        const store = Hipe.document.querySelector(
          `${tag.store}[${tag.attrs.name}=${storeName}]`
        );

        if (store) {
          removeList.push(store);
          const storeValues = store?.children ?? [];
          for (let j = 0; j <= storeValues.length - 1; j++) {
            const storeValue: Element | undefined = storeValues[j];

            const valueName = storeValue?.getAttribute(tag.attrs.name);
            if (valueName === storeValueName && storeValue) {
              replaceList.push([element, storeValue.innerHTML]);
            }
          }
        }
      }
    }

    for (const [element, storeValue] of replaceList) {
      if (element && storeValue) element.replaceWith(storeValue);
    }

    for (const element of removeList) element.remove();
    return this;
  }

  /**
   * The container is similar to a [store](https://mineejo.github.io/hipe/classes/HipeTags.html#insertStore), but contains
   * HTML elements instead of values. It is useful when you can
   * avoid duplicate elements or nested constructions.
   *
   * **Example:**
   *
   * ```html
   * <container name="firstLink">
   *   <a href="https://example.org/">first</a>
   * </container>
   *
   * <container name="secondLink">
   *   <a href="https://www.example.org/">second</a>
   * </container>
   *
   * <container name="list">
   *   <div> Fruits
   *     <ul>
   *       <li>Apple</li>
   *         <li>Orange</li>
   *     </ul>
   *   </div>
   * </container>
   *
   * <div>
   *   <insert container="firstLink"></insert>
   *   <div>
   *     <insert container="firstLink"></insert>
   *   </div>
   * </div>
   * ```
   *
   * **Output:**
   *
   * ```html
   * <div>
   *   <a href="https://example.org/">first</a>
   *   <div>
   *     <a href="https://example.org/">first</a>
   *   </div>
   * </div>
   * ```
   */
  insertContainer(): HipeTags {
    if (!Hipe.document) return this;

    const tag = {
      insert: "insert",
      container: "container",
      attrs: {
        container: "container",
        name: "name",
      },
    } as const;

    const replaceList: [[Element | undefined, Element | undefined]] = [
      [undefined, undefined],
    ];

    const removeList: Element[] = [];

    const elements = Hipe.document.getElementsByTagName(tag.insert);
    for (let i = 0; i < elements.length; i++) {
      const element: Element | undefined = elements[i];

      const containerName = element?.getAttribute(tag.attrs.container);
      if (containerName) {
        const container = Hipe.document.querySelector(
          `${tag.container}[${tag.attrs.name}=${containerName}]`
        );

        if (container) {
          removeList.push(container);
          replaceList.push([element, container]);
        }
      }
    }

    for (const [element, storeValue] of replaceList) {
      if (element && storeValue) {
        const children: NodeListOf<ChildNode> = storeValue.childNodes;
        children.forEach(function (item: ChildNode): void {
          element?.replaceWith(element, item.cloneNode(true));
        });

        removeList.push(element);
      }
    }

    for (const element of removeList) element.remove();
    return this;
  }
}
