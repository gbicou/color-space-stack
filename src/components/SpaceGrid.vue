<script setup lang="ts">
import { computed, ref } from 'vue'
import { type OptionKey, Options } from '@/option.ts'
import { percent_to_css, percent_to_css_text } from '@/percent.ts'
import { range } from '@/range.ts'
import GridLabel from '@/components/GridLabel.vue'

const options = ref<OptionKey[]>(['hsl', 'lch', 'oklch'])
const selectedOptions = computed(() =>
  Object.entries(Options)
    .filter(([key]) => options.value.includes(key as OptionKey))
    .map(([, option]) => option),
)

const range_0_100 = range(0, 100, 10)

const comp_1 = ref(50)
const comp_2 = ref(50)
const comp_3 = ref(50)
</script>

<template>
  <div>
    <span
      v-for="(s, k) in Options"
      :key="k"
      class="mr-3"
    >
      <input
        :id="k"
        v-model="options"
        type="checkbox"
        :value="k"
      >
      <label
        :for="k"
        class="ml-1"
      >{{ s.space.name }}</label>
    </span>
  </div>
  <div
    v-for="space of selectedOptions"
    :key="space.space.id"
    class="mt-4 border-t border-gray-200 pt-4"
  >
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
        <grid-label
          v-model="comp_1"
          :space="space"
          :index="0"
        />

        <div class="text-xs">
          {{ space.space.coords[space.coordinates[2]]?.name }} &rarr;
        </div>
        <div class="grid grid-cols-11 gap-px">
          <template
            v-for="y in range_0_100"
            :key="y"
          >
            <div
              v-for="z in range_0_100"
              :key="z"
              class="aspect-square size-full"
              :style="{ background: percent_to_css([comp_1, y, z], space) }"
            />
          </template>
        </div>
        <div class="vertical text-xs">
          &larr; {{ space.space.coords[space.coordinates[1]]?.name }}
        </div>
      </div>
      <div>
        <grid-label
          v-model="comp_2"
          :space="space"
          :index="1"
        />
        <div class="text-xs">
          {{ space.space.coords[space.coordinates[2]]?.name }} &rarr;
        </div>
        <div class="grid grid-cols-11 gap-px">
          <template
            v-for="x in range_0_100"
            :key="x"
          >
            <div
              v-for="z in range_0_100"
              :key="z"
              class="aspect-square size-full"
              :style="{ background: percent_to_css([x, comp_2, z], space) }"
            />
          </template>
        </div>
        <div class="vertical text-xs">
          &larr; {{ space.space.coords[space.coordinates[0]]?.name }}
        </div>
      </div>
      <div>
        <grid-label
          v-model="comp_3"
          :space="space"
          :index="2"
        />
        <div class="text-xs">
          {{ space.space.coords[space.coordinates[1]]?.name }} &rarr;
        </div>
        <div class="grid grid-cols-11 gap-px">
          <template
            v-for="x in range_0_100"
            :key="x"
          >
            <div
              v-for="y in range_0_100"
              :key="y"
              class="aspect-square size-full"
              :style="{ background: percent_to_css([x, y, comp_3], space) }"
            />
          </template>
        </div>
        <div class="vertical text-xs">
          &larr; {{ space.space.coords[space.coordinates[0]]?.name }}
        </div>
      </div>
    </div>
  </div>
</template>
