import { Mod } from "../mod.js";
import { HipeElement } from "../parser.js";

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

    const elementsForRemoves: HipeElement[] = [];
    const elementsForUpdates: HipeElement[][] = [];
    const elements: HipeElement[] = this.getHipeElementsByTag(
      Container.insert.tag
    );
    if (!elements) return;

    for (const e of elements) {
      const name: string | null = e.getAttribute(Container.insert.attr);
      if (!name) continue;

      const container: HipeElement | undefined = this.getHipeElements(
        Container.container.tag
      ).filter((e: HipeElement): boolean => {
        return e.getAttribute(Container.container.attr) === name;
      })[0];

      if (!container) continue;
      elementsForRemoves.push(container);
      elementsForUpdates.push([e, container]);
    }

    for (const [element, storeValue] of elementsForUpdates) {
      if (!element || !storeValue) continue;

      const nodes: ChildNode[] = Array.from(storeValue.childNodes).reverse();

      nodes.forEach(function (child: ChildNode): void {
        element.replaceWith(element, child.cloneNode(true));
      });

      elementsForRemoves.push(element);
    }

    for (const e of elementsForRemoves) e.remove();
  }
}
