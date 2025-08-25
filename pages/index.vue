<template>
  <div class="bg-primary-950">
    <div class="absolute top-0 left-0 p-8 text-primary-100">
        <h1 class="text-5xl">Dani&euml;l KvG</h1>
        <h2 class="text-2xl">Kooyman van Guldener</h2>
        <div class="mb-8 items-baseline pt-8 text-secondary-300">
            <div class="flex flex-row items-baseline"><p>I’m an &nbsp; </p><h3 class="text-primary-300">Industrial design Engineer</h3><p>&nbsp; with</p></div>
            <div class="flex flex-row items-baseline"><p>passion for &nbsp;</p><h3 class="text-primary-300">UX</h3><p>&nbsp; - digital and physical.</p></div>
        </div>
        <div class="py-8 flex flex-col">
          <p>Selected object:</p>
          <p v-if="store.selected">{{ store.selected.name }}</p>
        </div>
    </div>
    <div class="absolute bottom-0 left-0 right-0 flex flex-col text-secondary-300 pb-4 gap-4 items-center">
      <i class="ph ph-arrow-up text-5xl"></i>
      <p class="text-2xl">Get to know me!</p>
    </div>
    <homeScene ref="homeScene"/>
  </div>
</template>

<script lang="ts" setup>
import { useStore } from '~/store/store';
const store = useStore()

</script>

<style>

</style>