<template>
  <div class="flex flex-col bg-main">
    <div class="pt-32 pl-8 text-sub"> 
      <h2>Projects</h2>
    </div>
    <div class="absolute h-1/2 w-full bg-sub top-1/2 flex flex-col justify-end overflow-hidden">
      <div class="flex flex-col m-8">
        <h2>My student room in blender</h2>
        <p v-for="paragraph in itemText" :key="paragraph">{{ paragraph }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
var itemText: Array<string> = [
'Made as a navigation tool for my website, functions now as a nice artefact and as a symbol for the first building brick starting this website.',
'It thought me as well an important lesson, not all ideas which are beautiful are useful. I am not saying that it should not be tried, but test before too much time goes into it'
]
</script>

<style>

</style>