<template>
  <div class="flex flex-col bg-main">
    <div class="absolute h-2/3 w-full bg-sub top-1/3 flex flex-col justify-end overflow-hidden">
      <div class="flex flex-col h-2/3 mx-8 mt-8 mb-1 gap-2">
        <h2 class="text-main">{{ currentProject.title }}</h2>
        <span class="flex flex-row gap-2 overflow-x-scroll">
          <p class="px-2 py-1 border-2 border-solid border-main rounded-lg" v-for="topic in currentProject.topics" :key="topic">{{ topic }}</p>
        </span>
        <p id="projectText" v-for="paragraph in currentProject.text" :key="paragraph">{{ paragraph }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import gsap from 'gsap';
import { useProjectStore} from '~/store/projectStore';

const text: Ref<HTMLElement | null> = ref(null)

const projectStore = useProjectStore()
const currentProject = computed(() => projectStore.getProject())

// watch(currentProject, () => {
//   text.value!.innerText = currentProject.value.text[1]
//   console.log(text.value!.innerText)
// })

// onMounted(() => {
//   text.value = document.getElementById('projectText')
// })
</script>

<style>

</style>