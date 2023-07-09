import { Mod } from "../mod.js";

/**
 * The container is similar to a store, but contains HTML elements
 * instead of values. It is useful when you can avoid duplicate
 * elements or nested constructions.
 * Read more on [GitHub...](https://github.com/mineejo/hipe#container)
 */
export class Container extends Mod {
  /**
   * Hipe Element Description.
   * For this implementation, "insert" is the functional
   * tag that will implement or insert the rest of the html.
   */
  public static readonly insert = {
    tag: "insert",
    attr: "container",
  } as const;

  /**
   * Hipe Element Description.
   */
  public static readonly container = {
    tag: "container",
    attr: "name",
  } as const;

  // If the Hipe tag is not in the HTML specification, add it to this array.
  public static readonly tags: string[] = [
    Container.insert.tag,
    Container.container.tag,
  ];

  public constructor(document: Document) {
    super(document);

    const elementsForRemoves: Element[] = [];
    const elementsForUpdates: [[Element | undefined, Element | undefined]] = [
      [undefined, undefined],
    ];

    const elements = this.document.getElementsByTagName(Container.insert.tag);
    for (let i = 0; i < elements.length; i++) {
      const element: Element | undefined = elements[i];
      if (!element) continue;

      const containerName = element.getAttribute(Container.insert.attr);
      if (containerName) {
        const container = this.document.querySelector(
          `${Container.container.tag}[${Container.container.attr}=${containerName}]`
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
}
