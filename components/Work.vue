<template>
  <div class="flex flex-col justify-end h-0 transition-all duration-500 ease-in-out overflow-hidden" :class="{'h-full' : store.page.subject == 'about me'}">
    <div class="flex flex-row gap-2 h-screen px-4 py-8">
      <div class="flex flex-col gap-4"> 
        <h1>Work experience</h1>
        <h2>Figrs</h2>
        <h2>Extendas</h2>
        <h2>University of Twente</h2>
        <h2>Lidl</h2>
        <h2>Gasterij Terborgh</h2>
        <p>more coming soon</p>
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