<script setup lang="ts">
import { computed, ref } from "vue";
import spaces from "color-space";

interface Space {
  name: string;
  bg: (coords: number[]) => string;
  labels: string[];
}

const pctToCoords = (
    pct: number[],
    sp: {
      min: number[];
      max: number[];
    },
) => {
  const min = sp.min;
  const max = sp.max;
  return [
    (pct[0] / 100) * (max[0] - min[0]) + min[0],
    (pct[1] / 100) * (max[1] - min[1]) + min[1],
    (pct[2] / 100) * (max[2] - min[2]) + min[2],
  ];
};

const pctToBg = (
    pct: number[],
    sp: {
      min: number[];
      max: number[];
      rgb: (coords: number[]) => [number, number, number];
    },
) => {
  const coords = pctToCoords(pct, sp);
  const [r, g, b] = sp.rgb(coords);
  return `rgb(${r},${g},${b})`;
};

const xyz: Space = {
  name: spaces.xyz.name,
  bg: (pct) => pctToBg(pct, spaces.xyz),
  labels: spaces.xyz.channel,
};

const rgb: Space = {
  name: spaces.rgb.name,
  bg: (pct) => {
    const [r, g, b] = pctToCoords(pct, {
      min: [0, 0, 0],
      max: [255, 255, 255],
    });
    return `rgb(${r},${g},${b})`;
  },
  labels: spaces.rgb.channel,
};

const oklab: Space = {
  name: "oklab",
  bg: (pct) => {
    const [l, a, b] = pctToCoords(pct, {
      min: [0, -100, -100],
      max: [100, 100, 100],
    });
    return `oklab(${l}%,${a}%,${b}%)`;
  },
  labels: ["L", "a", "b"],
};

const oklch: Space = {
  name: "oklch",
  bg: (pct) => {
    const [l, c, h] = pctToCoords(pct, {
      min: [0, 0, 0],
      max: [100, 100, 360],
    });
    return `oklch(${l}%,${c}%,${h})`;
  },
  labels: ["L", "c", "h"],
};

const lab: Space = {
  name: spaces.lab.name,
  bg: (pct) => pctToBg(pct, spaces.lab),
  labels: spaces.lab.channel,
};

const luv: Space = {
  name: spaces.luv.name,
  bg: (pct) => pctToBg(pct, spaces.luv),
  labels: spaces.luv.channel,
};

const lchab: Space = {
  name: spaces.lchab.name,
  bg: (pct) => pctToBg(pct, spaces.lchab),
  labels: spaces.lchab.channel,
};

const lchuv: Space = {
  name: spaces.lchuv.name,
  bg: (pct) => pctToBg(pct, spaces.lchuv),
  labels: spaces.lchuv.channel,
};

const lms: Space = {
  name: spaces.lms.name,
  bg: (pct) => pctToBg(pct, spaces.lms),
  labels: spaces.lms.channel,
};

const yuv: Space = {
  name: spaces.yuv.name,
  bg: (pct) => pctToBg(pct, spaces.yuv),
  labels: spaces.yuv.channel,
};

const hsl: Space = {
  name: spaces.hsl.name,
  bg: (pct) => pctToBg(pct, spaces.hsl),
  labels: spaces.hsl.channel,
};

const hwb: Space = {
  name: spaces.hwb.name,
  bg: (pct) => pctToBg(pct, spaces.hwb),
  labels: spaces.hwb.channel,
};

const Spaces = {
  xyz,
  lab,
  lchab,
  luv,
  lchuv,
  oklab,
  oklch,
  hwb,
  hsl,
  lms,
  yuv,
  rgb,
} as const;
type SpacesType = typeof Spaces;
type SpaceKey = keyof SpacesType;

const spaceKey = ref<SpaceKey[]>(["lab"]);
const spaceLs = computed(() => spaceKey.value.map((k) => Spaces[k]));

const range = (start: number, end: number, step = 1) => Array.from(
    Array(Math.abs((end - start) / step) + 1),
    (_, i) => start + i * step
)

const range_1 = range(0, 100, 10);
const range_2 = range(0, 100, 10);
const range_3 = range(0, 100, 10);

const comp_1 = ref(50);
const comp_2 = ref(50);
const comp_3 = ref(50);
</script>

<template>
  <div style="padding: 1em 0">
    <span v-for="(s, k) in Spaces" :key="k">
      <input type="checkbox" :id="k" :value="k" v-model="spaceKey">
      <label :for="k">{{s.name}}</label>
    </span>
  </div>
  <div class="comps" v-for="space of spaceLs" :key="space.name">
    <div class="grid">
      <b>{{ space.name }}</b>
      {{ space.labels[0] }}:
      <input
          v-model.number="comp_1"
          type="range"
          min="0"
          max="100"
          style="width: 100%"
      />
      <div class="label">{{ space.labels[2] }}</div>
      <div v-for="y in range_2" :key="y" class="row">
        <div
            v-for="z in range_3"
            :key="z"
            class="d"
            :style="{ background: space.bg([comp_1, y, z]) }"
        />
      </div>
      <div class="vlabel">{{ space.labels[1] }}</div>
    </div>
    <div class="grid">
      {{ space.labels[1] }}:
      <input
          v-model.number="comp_2"
          type="range"
          min="0"
          max="100"
          style="width: 100%"
      />
      <div class="label">{{ space.labels[2] }}</div>
      <div v-for="x in range_1" :key="x" class="row">
        <div
            v-for="z in range_3"
            :key="z"
            class="d"
            :style="{ background: space.bg([x, comp_2, z]) }"
        />
      </div>
      <div class="vlabel">{{ space.labels[0] }}</div>
    </div>
    <div class="grid">
      {{ space.labels[2] }}:
      <input
          v-model.number="comp_3"
          type="range"
          min="0"
          max="100"
          style="width: 100%"
      />
      <div class="label">{{ space.labels[1] }}</div>
      <div v-for="x in range_1" :key="x" class="row">
        <div
            v-for="y in range_2"
            :key="y"
            class="d"
            :style="{ background: space.bg([x, y, comp_3]) }"
        />
      </div>
      <div class="vlabel">{{ space.labels[0] }}</div>
    </div>
    <div class="res" :style="{ background: space.bg([comp_1, comp_2, comp_3]) }">
      &nbsp;
    </div>
  </div>
</template>

<style scoped>
.comps {
  display: flex;
  gap: 40px;
}

.label {
  text-align: center;
  font-size: .8em;
}

.vlabel {
  text-align: center;
  font-size: .8em;
  transform: rotate(-90deg) translateY(-1.5em);
  transform-origin: 0 0;
}

.res {
  margin: 20px 1px 1px;
  height: 40px;
  width: 40px;
}

.grid {
}

.row {
  display: flex;

  .d {
    margin: 1px;
    width: 30px;
    height: 30px;
  }
}
</style>
