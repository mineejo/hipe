// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { Hipe } from "./hipe.ts";

const hipe = new Hipe(`
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
    <store name="config">
      <value name="author">MineEjo</value>
      <value name="version">1.0.0</value>
    </store>
    <div>
      <insert container="list"></insert>
      <insert store="config" value="author"></insert>
      <insert store="config" value="version"></insert>
      <insert container="list"></insert>
    </div>
  `);

hipe.modifyDocument();
console.log("Preview:", hipe.document?.body.innerHTML);

test("hipe-tags: insert store value", () => {
  const hipe = new Hipe(`
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

  hipe.modifyDocument();

  const div = hipe.document?.getElementById("content");
  const content = "MineEjo1.0.0";
  expect(div?.innerHTML.includes(content)).toBe(true);
});

test("hipe-tags: insert container", () => {
  const hipe = new Hipe(`
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

  hipe.modifyDocument();

  const div = hipe.document?.getElementById("content");
  const firstList = div?.children[0];
  const secondList = div?.children[2];

  expect(
    firstList?.innerHTML.startsWith("List") ===
      secondList?.innerHTML.startsWith("List")
  ).toBe(true);
});
