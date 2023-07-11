import { Parser } from "./parser.js";
import { JSDOM } from "jsdom";
import test from "ava";

function parseHtml(str: string): Document | undefined {
  return new JSDOM(str).window._document;
}

test("insertStore, items are correctly updated", (t) => {
  const parser = new Parser(`
    <div>
      <store name="config">
        <value name="author">MineEjo</value>
        <value name="version">1.0.0</value>
      </store>
      <div id="content">
        <insert store="config" value="author"></insert><insert store="config" value="version"></insert>
      </div>
    </div>
  `);

  const document: Document | undefined = parseHtml(parser.documentToString());

  const div = document?.getElementById("content");
  const content = "MineEjo1.0.0" as const;
  t.is(div?.innerHTML.includes(content), true);
});

test("insertContainer, items are correctly updated", (t) => {
  const parser = new Parser(`
    <container name="list">
      List
        <div>
          Fruits
          <ul>
            <li>Mango</li>
            <li>Orange</li>
          </ul>
        </div>
    </container>
    <div id="content">
      <insert container="list"></insert>
      <div>...</div>
      <insert container="list"></insert>
    </div>
  `);

  const document: Document | undefined = parseHtml(parser.documentToString());

  const div = document?.getElementById("content");
  const firstList = div?.children[0];
  const secondList = div?.children[2];
  t.is(
    firstList?.innerHTML.startsWith("List") ===
      secondList?.innerHTML.startsWith("List"),
    true,
  );
});

test("insertRedirect, items are correctly updated", (t) => {
  const parser = new Parser(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
    <title>Title</title>
    <insert redirect="https://example.com/" delay="5"></insert>
    </head>
    </html>
  `);

  const document: Document | undefined = parseHtml(parser.documentToString());

  const meta = document?.querySelector('meta[http-equiv="refresh"]');

  t.is(
    meta && meta?.getAttribute("content") === "5; https://example.com/",
    true,
  );
});
