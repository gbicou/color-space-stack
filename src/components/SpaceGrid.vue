<script setup lang="ts">
import { computed, ref } from "vue";
import {
  ColorSpace,
  sRGB,
  P3,
  LCH,
  OKLCH,
  Lab,
  OKLab,
  sRGB_Linear,
  HSL,
  HWB,
  Lab_D65,
  Jzazbz,
  JzCzHz,
  display,
  contrastWCAG21,
} from "colorjs.io/fn";
import type { ColorObject } from "colorjs.io";

ColorSpace.register(sRGB);
ColorSpace.register(sRGB_Linear);
ColorSpace.register(P3);
ColorSpace.register(LCH);
ColorSpace.register(OKLCH);
ColorSpace.register(Lab);
ColorSpace.register(Lab_D65);
ColorSpace.register(OKLab);
ColorSpace.register(HSL);
ColorSpace.register(HWB);
ColorSpace.register(Jzazbz);
ColorSpace.register(JzCzHz);

function percent_coordinates(pct: [number, number, number], option: Option): ColorObject {
  const spaceCoords = Object.entries(option.space.coords);
  const min = spaceCoords.map(([, c]) => (c.refRange ? c.refRange[0] : c.range ? c.range[0] : 0) ?? 0);
  const max = spaceCoords.map(([, c]) => (c.refRange ? c.refRange[1] : c.range ? c.range[1] : 0) ?? 1);

  // reorder coordinates to match color space
  const coord_1 = pct[option.coordinates.indexOf(spaceCoords[0][0])];
  const coord_2 = pct[option.coordinates.indexOf(spaceCoords[1][0])];
  const coord_3 = pct[option.coordinates.indexOf(spaceCoords[2][0])];

  return {
    space: option.space,
    coords: [
      (coord_1 / 100) * (max[0] - min[0]) + min[0],
      (coord_2 / 100) * (max[1] - min[1]) + min[1],
      (coord_3 / 100) * (max[2] - min[2]) + min[2],
    ],
  };
}

function percent_to_css(pct: [number, number, number], option: Option): string {
  const color = percent_coordinates(pct, option);
  return display(color);
}

const black = { space: sRGB, coords: [0, 0, 0] } as ColorObject;

function percent_to_css_text(pct: [number, number, number], option: Option): string {
  const color = percent_coordinates(pct, option);
  const constrast = contrastWCAG21(color, black);
  return constrast >= 4.5 ? "black" : "white";
}

interface Option {
  space: ColorSpace;
  coordinates: readonly [string, string, string];
}

const Options = {
  srgb: { space: sRGB, coordinates: ["r", "g", "b"] },
  srgb_linear: { space: sRGB_Linear, coordinates: ["r", "g", "b"] },
  p3: { space: P3, coordinates: ["r", "g", "b"] },
  lab: { space: Lab, coordinates: ["l", "a", "b"] },
  lab_d65: { space: Lab_D65, coordinates: ["l", "a", "b"] },
  oklab: { space: OKLab, coordinates: ["l", "a", "b"] }, // OKLab,
  lch: { space: LCH, coordinates: ["l", "c", "h"] }, // LCH,
  oklch: { space: OKLCH, coordinates: ["l", "c", "h"] }, // OKLCH,
  hsl: { space: HSL, coordinates: ["l", "s", "h"] }, // HSL,
  // hsv: { space: HSV, coordinates: ["v", "s", "h"] }, // HSV,
  hwb: { space: HWB, coordinates: ["w", "b", "h"] }, // HWB,
  jzazbz: { space: Jzazbz, coordinates: ["jz", "az", "bz"] },
  jzczhz: { space: JzCzHz, coordinates: ["jz", "cz", "hz"] },
} as const satisfies Record<string, Option>;
type OptionsType = typeof Options;
type OptionKey = keyof OptionsType;

const options = ref<OptionKey[]>(["hsl", "lch", "oklch"]);
const selectedOptions = computed(() =>
  Object.entries(Options)
    .filter(([key]) => options.value.includes(key as OptionKey))
    .map(([, option]) => option),
);

const range = (start: number, end: number, step = 1) =>
  Array.from(Array(Math.abs((end - start) / step) + 1), (_, i) => start + i * step);

const range_0_100 = range(0, 100, 10);

const comp_1 = ref(50);
const comp_2 = ref(50);
const comp_3 = ref(50);
</script>

<template>
  <div>
    <span v-for="(s, k) in Options" :key="k" class="mr-3">
      <input :id="k" v-model="options" type="checkbox" :value="k" />
      <label :for="k" class="ml-1">{{ s.space.name }}</label>
    </span>
  </div>
  <div v-for="space of selectedOptions" :key="space.space.id" class="mt-4 border-t pt-4">
    <div class="mb-3 flex items-baseline">
      <p>
        <b class="text-lg">{{ space.space.name }}</b>
      </p>
      <div
        class="ml-auto px-4 py-2 text-xs"
        :style="{
          background: percent_to_css([comp_1, comp_2, comp_3], space),
          color: percent_to_css_text([comp_1, comp_2, comp_3], space),
        }"
      >
        {{ percent_to_css([comp_1, comp_2, comp_3], space) }}
      </div>
    </div>
    <div class="grid grid-cols-3 gap-10">
      <div>
        <label>
          {{ space.space.coords[space.coordinates[0]].name }}: {{ Math.round(comp_1) }}%
          <input v-model.number="comp_1" type="range" min="0" max="100" class="w-full" />
        </label>

        <div class="text-xs">{{ space.space.coords[space.coordinates[2]].name }} &rarr;</div>
        <div class="grid grid-cols-11 gap-px">
          <template v-for="y in range_0_100" :key="y">
            <div
              v-for="z in range_0_100"
              :key="z"
              class="aspect-square size-full"
              :style="{ background: percent_to_css([comp_1, y, z], space) }"
            />
          </template>
        </div>
        <div class="vertical text-xs">&larr; {{ space.space.coords[space.coordinates[1]].name }}</div>
      </div>
      <div>
        <label>
          {{ space.space.coords[space.coordinates[1]].name }}: {{ Math.round(comp_2) }}%
          <input v-model.number="comp_2" type="range" min="0" max="100" class="w-full" />
        </label>
        <div class="text-xs">{{ space.space.coords[space.coordinates[2]].name }} &rarr;</div>
        <div class="grid grid-cols-11 gap-px">
          <template v-for="x in range_0_100" :key="x">
            <div
              v-for="z in range_0_100"
              :key="z"
              class="aspect-square size-full"
              :style="{ background: percent_to_css([x, comp_2, z], space) }"
            />
          </template>
        </div>
        <div class="vertical text-xs">&larr; {{ space.space.coords[space.coordinates[0]].name }}</div>
      </div>
      <div>
        <label>
          {{ space.space.coords[space.coordinates[2]].name }}: {{ Math.round(comp_3) }}%
          <input v-model.number="comp_3" type="range" min="0" max="100" class="w-full" />
        </label>
        <div class="text-xs">{{ space.space.coords[space.coordinates[1]].name }} &rarr;</div>
        <div class="grid grid-cols-11 gap-px">
          <template v-for="x in range_0_100" :key="x">
            <div
              v-for="y in range_0_100"
              :key="y"
              class="aspect-square size-full"
              :style="{ background: percent_to_css([x, y, comp_3], space) }"
            />
          </template>
        </div>
        <div class="vertical text-xs">&larr; {{ space.space.coords[space.coordinates[0]].name }}</div>
      </div>
    </div>
  </div>
</template>
