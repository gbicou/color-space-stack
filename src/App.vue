<script setup lang="ts">
import SpaceGrid from "@/components/SpaceGrid.vue";
</script>

<template>
  <header class="container mx-auto max-w-5xl py-5">
    <h1 class="font-bold text-2xl">Colorspace stack</h1>
    <p>
      Stacking multiple color spaces, displaying each plane of a component relative to the other and synchronized
      between spaces.
    </p>
  </header>

  <main class="container mx-auto max-w-5xl">
    <space-grid />
  </main>
</template>

<style scoped></style>
