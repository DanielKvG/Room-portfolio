<template>
  <div class="flex flex-col justify-end h-0 transition-all duration-500 ease-in-out overflow-hidden" :class="{'h-full' : store.page.subject == 'passions'}">
    <div class="flex flex-col h-screen my-24">
      <div class="relative flex flex-row h-full items-center" @mouseenter="showDes = true" @mouseleave="showDes = false"> 
        <div class="absolute top-0 left-0 right-0 bottom-0 flex flex-col justify-center"> 
          <h1 class="text-5xl pl-6 text-primary-900">Design</h1>
        </div>
        <div class="embla overflow-hidden h-full max-w-0 transition-all duration-500 ease-in-out" :class="{'max-w-full' : showDes }" ref="desRef">
          <div class="embla__container flex flex-row h-full">
            <div v-for="(passion, index) in design" class="embla__slide min-w-[240px] h-full even:bg-primary-50 odd:bg-primary-100 flex flex-col py-2 items-center justify-end" :key="index">
              <img :src="passion.icon" />
              <h2 class="whitespace-nowrap">{{ passion.name }}</h2>
            </div>
          </div>
        </div>
      </div>

      <div class="relative flex flex-row h-full items-center" @mouseenter="showMat = true" @mouseleave="showMat = false"> 
        <div class="absolute top-0 left-0 right-0 bottom-0 flex flex-col justify-center"> 
          <h1 class="text-5xl pl-6 text-primary-900">Materials</h1>
        </div>
        <div class="embla overflow-hidden h-full max-w-0 transition-all duration-500 ease-in-out" :class="{'max-w-full' : showMat }" ref="matRef">
          <div class="embla__container flex flex-row h-full">
            <div v-for="(passion, index) in materials" class="embla__slide min-w-[240px] h-full even:bg-primary-50 odd:bg-primary-100 flex flex-col py-2 items-center justify-end" :key="index">
              <img :src="passion.icon" />
              <h2 class="whitespace-nowrap">{{ passion.name }}</h2>
            </div>
          </div>
        </div>
      </div>

      <div class="relative flex flex-row h-full items-center" @mouseenter="showSpo = true" @mouseleave="showSpo = false"> 
        <div class="absolute top-0 left-0 right-0 bottom-0 flex flex-col justify-center"> 
          <h1 class="text-5xl pl-6 text-primary-900">Sports</h1>
        </div>
        <div class="embla overflow-hidden h-full max-w-0 transition-all duration-500 ease-in-out" :class="{'max-w-full' : showSpo }" ref="spoRef">
          <div class="embla__container flex flex-row h-full">
            <div v-for="(passion, index) in sports" class="embla__slide min-w-[240px] h-full even:bg-primary-50 odd:bg-primary-100 flex flex-col py-2 items-center justify-end" :key="index">
              <img :src="passion.icon" />
              <h2 class="whitespace-nowrap">{{ passion.name }}</h2>
            </div>
          </div>
        </div>
      </div>

      <div class="relative flex flex-row h-full items-center" @mouseenter="showSoc = true" @mouseleave="showSoc = false"> 
        <div class="absolute top-0 left-0 right-0 bottom-0 flex flex-col justify-center"> 
          <h1 class="text-5xl pl-6 text-primary-900">Social</h1>
        </div>
        <div class="embla overflow-hidden h-full max-w-0 transition-all duration-500 ease-in-out" :class="{'max-w-full' : showSoc }" ref="socRef">
          <div class="embla__container flex flex-row h-full">
            <div v-for="(passion, index) in social" class="embla__slide min-w-[240px] h-full even:bg-primary-50 odd:bg-primary-100 flex flex-col py-2 items-center justify-end" :key="index">
              <img :src="passion.icon" />
              <h2 class="whitespace-nowrap">{{ passion.name }}</h2>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script lang="ts" setup>
import { useStore } from '~/store/store';
import AutoScroll from 'embla-carousel-auto-scroll'
import emblaCarouselVue from 'embla-carousel-vue'

const [desRef] = emblaCarouselVue({ loop: true }, [AutoScroll({ stopOnInteraction: false, speed: 1, startDelay: 0, direction: 'backward' })])
const [matRef] = emblaCarouselVue({ loop: true }, [AutoScroll({ stopOnInteraction: false, speed: 1, startDelay: 0, direction: 'backward' })])
const [spoRef] = emblaCarouselVue({ loop: true }, [AutoScroll({ stopOnInteraction: false, speed: 1, startDelay: 0, direction: 'backward' })])
const [socRef] = emblaCarouselVue({ loop: true }, [AutoScroll({ stopOnInteraction: false, speed: 1, startDelay: 0, direction: 'backward' })])

const store = useStore()

const showDes = ref(false)
const showMat = ref(false)
const showSpo = ref(false)
const showSoc = ref(false)

const design = [
    {name: '3D printing', icon: '/icons/3Dprint.svg'}, 
    {name: 'Front-End', icon: '/icons/3Dprint.svg'}, 
    {name: 'Video', icon: '/icons/3Dprint.svg'}, 
    {name: 'Graphic', icon: '/icons/3Dprint.svg'},
]

const materials = [
    {name: 'Polymers', icon: '/icons/3Dprint.svg'}, 
    {name: 'Smart mat.', icon: '/icons/3Dprint.svg'},
    {name: 'Life cycle', icon: '/icons/3Dprint.svg'}, 
]

const sports = [
    {name: 'Ice skating', icon: '/icons/3Dprint.svg'}, 
    {name: 'Cycling', icon: '/icons/3Dprint.svg'},
    {name: 'Running', icon: '/icons/3Dprint.svg'},
    {name: '(Tour) ski', icon: '/icons/3Dprint.svg'},
    {name: 'Hiking', icon: '/icons/3Dprint.svg'},
    {name: 'Windsurf', icon: '/icons/3Dprint.svg'},
    {name: 'Tennis', icon: '/icons/3Dprint.svg'},
]

const social = [
    {name: 'Coffee', icon: '/icons/3Dprint.svg'}, 
    {name: 'Boardgames', icon: '/icons/3Dprint.svg'},
    {name: 'Skeuvel', icon: '/icons/3Dprint.svg'}, 
]

function extendArr(arr: Array<object>): Array<object> {
  while (arr.length < 5) {
    arr.push(...arr)
  }
  console.log(arr)
  return arr
}

onBeforeMount(() => {
  let categories = [design, materials, sports, social]
  categories.forEach(extendArr)
})
</script>

<style>

</style>