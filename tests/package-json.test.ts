import { expect, test } from "bun:test";

test("package should not run install script for consumers", async () => {
  const pkg = (await Bun.file(
    new URL("../package.json", import.meta.url)
  ).json()) as {
    scripts?: Record<string, unknown>;
  };

  expect(pkg.scripts?.install).toBeUndefined();
});
