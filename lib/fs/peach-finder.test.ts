// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { HipeFinder } from "./hipe-finder.ts";

test("hipe-finder: search for a file in the folder in which it exists", () => {
  const hipeFinder = new HipeFinder("./lib/fs/test");

  expect(hipeFinder.foundFiles.length).toBe(1);
});

test("hipe-finder: does the hipe file have an extension", () => {
  const hipeFinder = new HipeFinder("./lib/fs/test");
  const file: string | undefined = hipeFinder.foundFiles[0];

  expect(file?.includes(".hipe.html")).toBe(true);
});

test("hipe-finder: search for a file in a folder where it does not exist", () => {
  const hipeFinder = new HipeFinder("./lib/fs/undefined");

  expect(hipeFinder.foundFiles.length).toBe(0);
});
