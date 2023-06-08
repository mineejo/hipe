import { JSDOM } from "jsdom";
import { wrap } from "multitry";

type Mods = {
  [name: string]: () => void;
};

export class Parser {
  private readonly _document: Document | undefined;
  private mods: Mods = {
    // https://github.com/mineejo/hipe#store
    insertStore: () => {
      if (!this._document) return this;

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

      const elements = this._document.getElementsByTagName(tag.insert);
      for (let i = 0; i < elements.length; i++) {
        const element: Element | undefined = elements[i];

        const storeName = element?.getAttribute(tag.attrs.store);
        const storeValueName = element?.getAttribute(tag.attrs.value);

        if (storeName) {
          const store = this._document.querySelector(
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
    },
    // https://github.com/mineejo/hipe#container
    insertContainer: () => {
      if (!this._document) return this;

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

      const elements = this._document.getElementsByTagName(tag.insert);
      for (let i = 0; i < elements.length; i++) {
        const element: Element | undefined = elements[i];

        const containerName = element?.getAttribute(tag.attrs.container);
        if (containerName) {
          const container = this._document.querySelector(
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
    },
  };

  constructor(str: string) {
    this._document = new JSDOM(str).window._document;

    Object.keys(this.mods).forEach((modName: string): void => {
      wrap({
        try: () => this.mods[modName]?.(),
        catch: (e: Error) => console.error(e),
      });
    });
  }

  htmlToString(): string {
    const html: string | undefined =
      this._document?.documentElement.outerHTML.toString();
    const blankStrings = /^\s*\n/gm;
    return "<!DOCTYPE html>\n" + html?.replace(blankStrings, "");
  }
}
