<template>
    <USlideover v-model="store.projectsDialog" side="bottom" :ui="{ wrapper: 'justify-center', base: 'w-full max-w-3xl overflow-hidden', rounded: 'rounded-t-2xl', height: '' }">
        <div class="flex flex-col h-[624px] px-4 pt-2 gap-4 lg:flex-row lg:gap-0 lg:px-0 lg:pt-0">
            
            <div class="flex items-center justify-between lg:hidden">
                <h1 class="text-2xl">Projects</h1>
                <!-- TODO: add dropdown for project selection -->
                <UButton variant="ghost" icon="i-heroicons-x-mark-20-solid" size="xl" @click="[ store.projectsDialog = false ]"></UButton>
            </div>
            <div class="hidden lg:flex flex-col w-64 h-full bg-primary-50">
                <h1 class="text-2xl text-primary-950 px-4 pt-4 pb-8">Projects</h1>
                <div v-for="page in pages" class="p-6 w-full cursor-pointer hover:bg-primary-100" :class="active === page ? 'bg-white' : ''" @click="active = page" :key="page">
                <h6 class="text-lg text-medium">{{ page }}</h6>
                </div>
            </div>
            <!-- TODO: configure for web -->
            <div class="flex flex-col gap-4  h-full overflow-y-scroll items-center lg:w-full lg:pt-6" v-if="active === 'All'">
                <div class="flex flex-col gap-4 lg:w-[416px]" v-for="project in projects" :key="project.name">
                    <p class="text-primary-600 text-lg text-semibold m-0"> {{ project.name }} </p>
                    <img :src="'/images/' + project.image">
                    <div class="flex items-start content-start gap-y-[4px] gap-x-[6px] self-stretch flex-wrap"> 
                        <div class="px-[6px] py-[2px] border-2 border-solid rounded-md" v-for="skill in project.skils" :key="skill"> 
                            <p class="text-xs text-medium text-gray-400 m-0">{{ skill }}</p>
                        </div>
                    </div>
                    <p class="text-gray-800">{{ project.text }}</p>
                </div>
            </div>
            <div v-else class="flex flex-col gap-4  h-full overflow-y-scroll items-center lg:w-full lg:pt-6"> 
                <p>More projects will be added soon, together with filtering of the projects.</p>
            </div>
        </div>
    </USlideover>
</template>

<script setup lang="ts">
import { useStore } from '~/store/store';

const store = useStore()

const projects = [
    {
        name: 'Ski-boot data',
        image: '/skiboot_data.png',
        skils: ['Arduino', 'Python', 'Electronics', 'Smart materials', 'UX', 'Ideation', 'Prototyping'],
        text: 'I developed a prototype which is able to provide live data about forward pressure put into the ski boot.'
    },
    {
        name: 'Portfolio website',
        image: '/portfolio_website.png',
        skils: ['Nuxt', 'Figma', 'Tailwind', 'ThreeJS', 'Vue', 'Blender', 'UI', 'GIT', 'Server hosting', 'GSAP'],
        text: 'Everything visible on this website is made by me with various tools.'
    }
]

const pages = [ 'All', 'CAD', 'Program', 'Create', 'Design']
const active = ref('All')

onMounted(() => {
  active.value = pages[0]
})

</script>