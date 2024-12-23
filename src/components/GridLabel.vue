<script setup lang="ts">
import type { Option } from '@/option.ts'
import { toRefs } from 'vue'

const props = defineProps<{
  space: Option
  index: number
}>()

const { space, index } = toRefs(props)

const model = defineModel<number>({ required: true })
</script>

<template>
  <label>
    {{ space.space.coords[space.coordinates[index]].name }}: {{ Math.round(model) }}%
    <input
      v-model.number="model"
      type="range"
      min="0"
      max="100"
      class="w-full"
    >
  </label>
</template>
