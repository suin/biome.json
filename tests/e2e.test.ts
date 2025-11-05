import { expect, test } from "bun:test";
import path from "node:path";
import { $ } from "bun";

const fixtureDir = path.join(import.meta.dirname, "fixture");

test("should pass", async () => {
  const result = await $`bunx biome check --verbose`
    .cwd(fixtureDir.toString())
    .nothrow();
  expect(await result.text()).toContain("Checked 3 files");
  expect(await result.exitCode).toBe(0);
});
