<script setup lang="ts">
import SpaceGrid from '@/components/SpaceGrid.vue'
</script>

<template>
  <header class="container mx-auto max-w-5xl py-5">
    <h1 class="text-2xl font-bold">
      Colorspace stack
    </h1>
    <p>
      Stacking multiple color spaces, displaying each plane of a component relative to the other and synchronized
      between spaces.
    </p>
  </header>

  <main class="container mx-auto max-w-5xl">
    <space-grid />
  </main>

  <footer class="sticky top-full mt-5 bg-neutral-200 text-neutral-700">
    <div class="container mx-auto max-w-5xl py-4">
      <p class="text-xs">
        Code available on GitHub:
        <a
          href="https://github.com/gbicou/color-space-stack"
          target="_blank"
          class="underline underline-offset-1"
        >
          gbicou/color-space-stack
        </a>
      </p>
    </div>
  </footer>
</template>
