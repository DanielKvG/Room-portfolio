<template>
  <div class="flex flex-col h-screen md:flex-row">
    <div class="absolute top-0 left-0 p-8 text-primary-100 z-10" :class="{'hidden md:inline' : store.page.open}">
        <h1 class="md:text-5xl text-4xl">Dani&euml;l KvG</h1>
        <h2 class="md:text-2xl text-xl">Kooyman van Guldener</h2>
        <div class="mb-8 items-baseline pt-8 pr-4 text-secondary-300">
            <div class="flex flex-wrap items-baseline lg:w-[300px]">
              <p class="text-base">I'm an <strong class="text-primary-300">Industrial design Engineer</strong> with passion for <strong class="text-primary-300">UX</strong> - digital and physical.</p>
            </div>
        </div>
    </div>
    <div class="relative h-full w-full bg-gradient-to-r from-primary-950 to-[#12072B]">
      <homeScene ref="homeScene"/>
      <div class="absolute bottom-0 left-0 right-0 flex flex-col text-secondary-300 pb-4 gap-4 items-center" :class="{'hidden md:inline' : store.page.open}">
        <i class="ph ph-arrow-up text-5xl"></i>
        <p class="text-2xl">Click to get to know me!</p>
      </div>
      <div class="absolute top-8 right-12 flex flex-col gap-4 items-end text-primary-100 pointer-events-auto z-20">
        <div class="mt-4 md:hidden" @click="menuOpen = true"> 
          <svg width="40" height="30" viewBox="0 0 40 30" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 2H40" stroke="#EEF6FF" stroke-width="4"/>
            <path d="M0 15H40" stroke="#EEF6FF" stroke-width="4"/>
            <path d="M0 28H40" stroke="#EEF6FF" stroke-width="4"/>
          </svg>
        </div>
        <div 
          v-for="page in pages" 
          :key="page" @click="openPage(page)" 
          class="cursor-pointer hidden lg:inline"> 
          <h2 
            class="text-[20px] transition-all duration-500 ease-in-out hover:text-secondary-300" 
            :class="{'text-secondary-300 text-[30px]' : store.page.subject == page}" 
            :key="store.page.subject">{{ page }}
          </h2>
        </div>
      </div>
    </div>
    <div 
      class="absolute top-0 left-0 right-0 bottom-0 flex justify-end opacity-0 transition-all duration-500 z-20 pointer-events-none overflow-hidden" 
      :class="{'opacity-100 pointer-events-auto' : menuOpen}"
    >
      <div class="grow bg-primary-950 opacity-80" @click="menuOpen = false"></div>
      <div class="flex flex-col justify-center shrink-0 w-0 h-full bg-black transition-all duration-500 ease-in-out gap-4 p-4" :class="{'w-4/5' : menuOpen}"> 
        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none" class="absolute top-12 right-12" @click="menuOpen = false">
          <path d="M2 2L28 28" stroke="#EEF6FF" stroke-width="4"/>
          <path d="M2 28L28 3" stroke="#EEF6FF" stroke-width="4"/>
        </svg>
        <div 
          v-for="page in pages" 
          :key="page" @click="openPage(page), menuOpen = false"
        >
          <h1 class="text-secondary-600 text-nowrap">
            {{ page }}
          </h1>
        </div>
      </div>
    </div>

    <div 
      class="flex flex-col shrink-0 h-[0px] md:max-w-[0px] md:h-full bg-secondary-500 transition-all duration-500 ease-in-out" 
      :class="{ 'h-[80%] md:max-w-[800px] md:max-h-full' : store.page.open }"
      >
      <div
        class="relative flex flex-col h-full opacity-0 transition-all duration-50 ease-in delay-50 py-4" 
        :class="{ 'opacity-100 delay-300 duration-500': store.page.open }"
        >
        <UButton 
          v-if="store.page.open"
          class="absolute opacity-inherit top-4 right-4 md:top-8 md:right-8 text-secondary-600 bg-secondary-400 hover:bg-secondary-300 transition" 
          size="xl" 
          trailing-icon="i-heroicons-x-mark"
          @click="store.closePage()"
        >
          <p class="m-0 text-secondary-600 hidden md:inline">close</p>
        </UButton>
        <UButton 
          v-if="store.page.open && store.page.subject != 'projects'"
          class="absolute opacity-inherit bottom-8 right-8 transition hidden md:inline"
          color="primary"
          variant="outline"
          size="xl" 
          trailing-icon="i-heroicons-chevron-right"
          :label="nextpage"
          @click="openPage(nextpage)"
        />
        <UButton 
          v-if="store.page.open && store.page.subject != 'projects'"
          class="absolute opacity-inherit bottom-8 left-8 transition md:hidden"
          color="primary"
          variant="outline"
          size="xl" 
          trailing-icon="i-heroicons-chevron-down"
          @click="openPage(nextpage)"
        ><p class="text-xl">{{ nextpage }}</p></UButton>
        <AboutMe/>
        <Passions/>
        <Education/>
        <Work/>
        <div class="absolute bottom-0 top-0 left-4 md:left-12 flex flex-col justify-end mt-16 md:mt-32">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2 737" fill="none" class="w-4 h-0 transition-all duration-700 ease-in-out" :class="{'h-full duration-300' : store.page.subject == 'education'}">
            <path d="M1 738V0" stroke="#EEF6FF" stroke-width="2"/>
          </svg>
        </div>
      </div>
    </div>

  </div>
</template>

<script lang="ts" setup>
import { useStore } from '~/store/store';
const store = useStore()
const pages = ['about me', 'passions', 'education', 'work experience', 'board years', 'skills', 'projects']
const nextpage = computed(() => pages[pages.findIndex(isPage) + 1])
const isPage = (element: string) => element == store.page.subject
const menuOpen = ref(false)

function openPage(name: any) {
  store.page.subject = name
  store.page.open = true
}

</script>

<style>

</style>