<template>
  <div class="flex flex-row h-screen pointer-events-none">
    <div class="absolute top-0 left-0 p-8 text-primary-100 z-10">
        <h1 class="text-5xl">Dani&euml;l KvG</h1>
        <h2 class="text-2xl">Kooyman van Guldener</h2>
        <div class="mb-8 items-baseline pt-8 text-secondary-300">
            <div class="flex flex-row items-baseline"><p>I’m an &nbsp; </p><h3 class="text-primary-300">Industrial design Engineer</h3><p>&nbsp; with</p></div>
            <div class="flex flex-row items-baseline"><p>passion for &nbsp;</p><h3 class="text-primary-300">UX</h3><p>&nbsp; - digital and physical.</p></div>
        </div>
    </div>
    <div class="relative w-full h-full bg-gradient-to-r from-primary-950 to-[#12072B]">
      <homeScene ref="homeScene"/>
      <div class="absolute bottom-0 left-0 right-0 flex flex-col text-secondary-300 pb-4 gap-4 items-center">
        <i class="ph ph-arrow-up text-5xl"></i>
        <p class="text-2xl">Click to get to know me!</p>
      </div>
      <div class="absolute top-6 right-12 flex flex-col gap-4 items-end text-primary-100 pointer-events-auto">
        <div 
          v-for="page in pages" 
          :key="page" @click="openPage(page)" 
          class="cursor-pointer"> 
          <h2 
            class="text-[20px] transition-all duration-500 ease-in-out hover:text-secondary-300" 
            :class="{'text-secondary-300 text-[30px]' : store.page.subject == page}" 
            :key="store.page.subject">{{ page }}
          </h2>
        </div>
      </div>
    </div>

    <div 
      class="flex flex-col w-[0px] bg-secondary-500 transition-all duration-500 ease-in-out" 
      :class="{ 'w-[1040px]' : store.page.open }">
      <div
        class="flex flex-col h-full opacity-0 transition-all duration-50 ease-in delay-50 p-4" 
        :class="{ 'opacity-100 delay-300 duration-500': store.page.open }">
        <AboutMe/>
        <Passions/>
        <Education/>
      </div>
    </div>

  </div>
</template>

<script lang="ts" setup>
import { useStore } from '~/store/store';
const store = useStore()
const pages = ['about me', 'passions', 'education', 'skills', 'work experience', 'projects']

function openPage(name: any) {
  store.page.subject = name
  store.page.open = true
}

</script>

<style>

</style>