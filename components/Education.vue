<template>
  <div class="flex flex-col justify-end h-0 transition-all duration-500 ease-in-out overflow-hidden" :class="{'h-full' : store.page.subject == 'education'}">
    <div class="flex flex-col h-screen"> 
      <h1>Education</h1>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useStore } from '~/store/store';
const store = useStore()


</script>

