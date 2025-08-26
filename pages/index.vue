<template>
  <div class="flex flex-row h-screen">
    <div class="absolute top-0 left-0 p-8 text-primary-100 z-10">
        <h1 class="text-5xl">Dani&euml;l KvG</h1>
        <h2 class="text-2xl">Kooyman van Guldener</h2>
        <div class="mb-8 items-baseline pt-8 text-secondary-300">
            <div class="flex flex-row items-baseline"><p>I’m an &nbsp; </p><h3 class="text-primary-300">Industrial design Engineer</h3><p>&nbsp; with</p></div>
            <div class="flex flex-row items-baseline"><p>passion for &nbsp;</p><h3 class="text-primary-300">UX</h3><p>&nbsp; - digital and physical.</p></div>
        </div>
        <div class="py-8 flex flex-col">
          <p>Selected object:</p>
          <p v-if="store.selected">{{ store.selected.name }}</p>
          <button @click="store.page.open = !store.page.open">click me</button>
        </div>
    </div>
    <div class="relative w-full h-full bg-gradient-to-r from-primary-950 to-[#12072B]">
      <homeScene ref="homeScene"/>
      <div class="absolute bottom-0 left-0 right-0 flex flex-col text-secondary-300 pb-4 gap-4 items-center">
        <i class="ph ph-arrow-up text-5xl"></i>
        <p class="text-2xl">Get to know me!</p>
      </div>
    </div>

    <div class="flex flex-col w-[0px] bg-secondary-600 transition-all duration-500 ease-in-out" :class="{ 'w-[1040px]': store.page.open }">
      <div class="opacity-0 transition-all duration-50 ease-in delay-50" :class="{ 'opacity-100 delay-300 duration-500': store.page.open }">
        <Education/>
      </div>
    </div>

  </div>
</template>

<script lang="ts" setup>
import { useStore } from '~/store/store';
const store = useStore()

</script>

<style>

</style>