import { Finder } from "./finder.js";
import test from "ava";

test("file in the folder in which it exists - found", (t) => {
  const hipeFinder = new Finder("./lib/fs/test");

  t.is(hipeFinder.foundFiles.length, 1);
});

test("file has the extension `.hipe.html`", (t) => {
  const hipeFinder = new Finder("./lib/fs/test");
  const file: string | undefined = hipeFinder.foundFiles[0];

  t.is(file?.includes(".hipe.html"), true);
});

test("file in the folder where it is - not found", (t) => {
  const hipeFinder = new Finder("./lib/fs/undefined");

  t.is(hipeFinder.foundFiles.length, 0);
});
