<template>
  <div class="flex flex-col bg-main">
    <div class="absolute h-2/3 w-full bg-sub top-1/3 flex flex-col justify-end overflow-hidden">
      <div class="flex flex-col h-2/3 m-8 gap-2">
        <h2 class="text-main">My room in blender</h2>
        <span class="flex flex-row gap-2">
          <p class="px-2 py-1 border-2 border-solid border-main rounded-lg" v-for="topic in itemTopics" :key="topic">{{ topic }}</p>
        </span>
        <p v-for="paragraph in itemText" :key="paragraph">{{ paragraph }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useProjectStore } from '~/store/projectStore';

const projectStore = useProjectStore()

var itemText: Array<string> = [
  'Made as a navigation tool for my website, now it is a seperate project and acts as a symbol for the first building brick starting this website.',
  'It thought me as well an important lesson, not all ideas which are beautiful are useful. I am not saying that it should not be tried, but test before too much time goes into it'
]

var itemTopics: Array<string> = [
  'Blender', 'ThreeJS'
]
</script>

<style>

</style>