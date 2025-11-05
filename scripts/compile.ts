import type { Biome } from "@biomejs/biome";
import { deepmerge } from "deepmerge-ts";
import angular from "../node_modules/ultracite/config/angular/biome.jsonc";
import astro from "../node_modules/ultracite/config/astro/biome.jsonc";
import core from "../node_modules/ultracite/config/core/biome.jsonc";
import next from "../node_modules/ultracite/config/next/biome.jsonc";
import qwik from "../node_modules/ultracite/config/qwik/biome.jsonc";
import react from "../node_modules/ultracite/config/react/biome.jsonc";
import remix from "../node_modules/ultracite/config/remix/biome.jsonc";
import solid from "../node_modules/ultracite/config/solid/biome.jsonc";
import svelte from "../node_modules/ultracite/config/svelte/biome.jsonc";
import vue from "../node_modules/ultracite/config/vue/biome.jsonc";
import custom from "../src/custom.jsonc";

const bases = {
  angular,
  astro,
  core,
  next,
  qwik,
  react,
  remix,
  solid,
  svelte,
  vue,
};

for (const [key, value] of Object.entries(bases)) {
  const biome = deepmerge(value, custom) as Biome;
  const file = Bun.file(new URL(import.meta.resolve(`../dist/${key}.json`)));
  await file.write(changeLevelToWarn(JSON.stringify(biome, null, 2)));
}

function changeLevelToWarn(jsonString: string): string {
  return jsonString.replaceAll(': "error"', ': "warn"');
}
