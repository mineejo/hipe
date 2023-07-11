import { Parser } from "./parser.js";
import { JSDOM } from "jsdom";
import test from "ava";
import { Mod } from "./mod.js";

function parseHtml(str: string): Document | undefined {
  return new JSDOM(str).window._document;
}

const tagName = "test" as const;
const elementContent = "Hello world!" as const;

class ModTest extends Mod {
  public content = "";

  public constructor(document: Document) {
    super(document);
    if (!document) return;
    this.content = this.getHipeElementsByTag(tagName)[0]?.innerHTML ?? "";
  }
}

test("mod, Hipe element received", (t) => {
  const parser = new Parser(`
    <body>
      <noscript data-hipe-tag="${tagName}">${elementContent}</noscript>
    </body>
  `);

  const document: Document | undefined = parseHtml(parser.htmlToString());
  const modTest = document ? new ModTest(document) : "";

  if (modTest instanceof ModTest) {
    t.is(modTest.content, elementContent);
  } else {
    t.fail;
  }
});
