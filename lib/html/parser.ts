import { JSDOM } from "jsdom";
import { wrap } from "multitry";

type Mods = {
  [name: string]: () => void;
};

/**
 * Parser uses a web-like DOM implementation to parses
 * HTML and implements Hipe elements, etc., modifying existing elements.
 */
export class Parser {
  private readonly _document: Document | undefined;
  private mods: Mods = {
    // https://github.com/mineejo/hipe#store
    insertStore: () => {
      if (!this._document) return this;

      const data = {
        tagInsert: "insert",
        tagStore: "store",
        attrStore: "store",
        attrValue: "value",
        attrName: "name",
      } as const;

      const elementsForRemoves: Element[] = [];
      const elementsForUpdates: [[Element | undefined, string | undefined]] = [
        [undefined, undefined],
      ];

      const elements = this._document.getElementsByTagName(data.tagInsert);
      for (let i = 0; i < elements.length; i++) {
        const element: Element | undefined = elements[i];
        const storeName = element?.getAttribute(data.attrStore);
        const storeValueName = element?.getAttribute(data.attrValue);
        if (storeName) {
          const storeQuery = `${data.tagStore}[${data.attrName}=${storeName}]`;
          const store = this._document.querySelector(storeQuery);

          if (store) {
            elementsForRemoves.push(store);
            const storeValues: HTMLCollection = store?.children ?? [];
            for (let j = 0; j <= storeValues.length - 1; j++) {
              const storeValue: Element | undefined = storeValues[j];
              const valueName = storeValue?.getAttribute(data.attrName);
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
      return this;
    },
    // https://github.com/mineejo/hipe#container
    insertContainer: () => {
      if (!this._document) return this;

      const data = {
        tagInsert: "insert",
        tagContainer: "container",
        attrContainer: "container",
        attrName: "name",
      } as const;

      const elementsForRemoves: Element[] = [];
      const elementsForUpdates: [[Element | undefined, Element | undefined]] = [
        [undefined, undefined],
      ];

      const elements = this._document.getElementsByTagName(data.tagInsert);
      for (let i = 0; i < elements.length; i++) {
        const element: Element | undefined = elements[i];
        const containerName = element?.getAttribute(data.attrContainer);
        if (containerName) {
          const container = this._document.querySelector(
            `${data.tagContainer}[${data.attrName}=${containerName}]`
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
            element?.replaceWith(element, item.cloneNode(true));
          });
          elementsForRemoves.push(element);
        }
      }

      for (const element of elementsForRemoves) element.remove();
      return this;
    },
  };

  /**
   * @param {string} str - HTML file, HTML strings, etc.
   */
  constructor(str: string) {
    this._document = new JSDOM(str).window._document;

    Object.keys(this.mods).forEach((modName: string): void => {
      wrap({
        try: () => this.mods[modName]?.(),
        catch: (e: Error) => console.error(e),
      });
    });
  }

  /**
   * @returns {string} The finished HTML document as a string.
   */
  htmlToString(): string {
    const html: string | undefined =
      this._document?.documentElement.outerHTML.toString();
    const blankStrings = /^\s*\n/gm;
    return "<!DOCTYPE html>\n" + html?.replace(blankStrings, "");
  }
}
