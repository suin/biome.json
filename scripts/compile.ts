import type { Biome } from "@biomejs/biome";
import { deepmerge } from "deepmerge-ts";
import base from "ultracite";
import custom from "../src/custom.jsonc";

const biome = deepmerge(base, custom) as Biome;
const file = Bun.file(new URL(import.meta.resolve("../dist/biome.json")));
await file.write(changeLevelToWarn(JSON.stringify(biome, null, 2)));

function changeLevelToWarn(jsonString: string): string {
  return jsonString.replaceAll(': "error"', ': "warn"');
}
