<template>
  <div class="flex flex-col justify-end h-0 transition-all duration-500 ease-in-out overflow-hidden pointer-events-auto" :class="{'h-full' : store.page.subject == 'education'}">
    <div class="overflow-y-scroll w-full h-full mt-12 mb-20"> 
      <div class="flex flex-col justify-start md:mt-12 ml-8 md:ml-20 mr-6 md:mr-16"> 
        <div class="relative flex flex-col h-[300px] md:h-[160px] w-full bg-transparent perspective-distant overflow-visible">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="none" class="w-4 h-4 absolute left-[-16px] md:left-[-32px] top-1 z-10">
            <circle cx="8" cy="8" r="7" fill="#0CDB84" stroke="#EEF6FF" stroke-width="2"/>
          </svg> 
          <div class="relative w-full h-full transition-all duration-1000 [transform-style:preserve-3d] hover:[transform:rotateX(180deg)]">
            <div class="absolute w-full h-full [backface-visibility:hidden] bg-secondary-500 px-4"> 
              <div class="flex flex-col"> 
                <h3 class="text-secondary-600">2023 - current</h3>
                <h2 class="text-secondary-900">Master Degree - Industrial Design Engineering</h2>
              </div>
              <p>The master offers different tracks from which I chose 'Emerging Technology Design'. It focusses more in the technical aspects regarding product design.</p>
              <p>I'm now busy finishing my master degrees by doing a Master Thesis at PCV Group where I'll be partly responsible for the secondary use cases of their new product.</p>
            </div>
            <div class="absolute w-full h-full rounded-lg drop-shadow-md [backface-visibility:hidden] [transform:rotateX(180deg)] bg-secondary-400 my-3 py-3 px-4"> 
              <h3>Topics</h3>
              <div class="flex flex-wrap mt-1 gap-x-2"> 
                <p v-for="(topic, index) in masterTopics" class="flex py-1 px-2 rounded-md border-solid border-2 border-primary-950" :key="index">{{ topic }}</p>
              </div>
            </div>
          </div>
        </div>

        <div class="relative flex flex-col h-[300px] md:h-[160px] mt-6 w-full bg-transparent perspective-distant">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="none" class="w-4 h-4 absolute left-[-16px] md:left-[-32px] top-1 z-10">
            <circle cx="8" cy="8" r="7" fill="#0CDB84" stroke="#EEF6FF" stroke-width="2"/>
          </svg> 
          <div class="relative w-full h-full transition-all duration-1000 [transform-style:preserve-3d] hover:[transform:rotateX(180deg)]">
            <div class="absolute w-full h-full [backface-visibility:hidden] bg-secondary-500 px-4"> 
              <div class="flex flex-col"> 
                <h3 class="text-secondary-600">2019 - 2023</h3>
                <h2 class="text-secondary-900">Bachelor Degree - Industrial Design Engineering</h2>
              </div>
              <p>
                I decided to do the study IDE because of the many different topics it covers; 
                Insights from within different studies like Mechanical, Electrical, Biomedical etc. are connected to product design. 
                I’m now confident to tackle any challenge regarding product development, from research to the final design.
              </p>
            </div>
            <div class="absolute w-full h-full rounded-lg drop-shadow-md [backface-visibility:hidden] [transform:rotateX(180deg)] bg-secondary-400 my-3 py-3 px-4"> 
              <h3>Topics</h3>
              <div class="flex flex-wrap mt-1 gap-x-2"> 
                <p v-for="(topic, index) in bachelorTopics" class="flex py-1 px-2 rounded-md border-solid border-2 border-primary-950" :key="index">{{ topic }}</p>
              </div>
            </div>
          </div>
        </div>

        <div class="relative flex flex-col h-[300px] md:h-[160px] w-full bg-transparent perspective-distant">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="none" class="w-4 h-4 absolute left-[-16px] md:left-[-32px] top-1 z-10">
            <circle cx="8" cy="8" r="7" fill="#0CDB84" stroke="#EEF6FF" stroke-width="2"/>
          </svg> 
          <div class="relative w-full h-full transition-all duration-1000 [transform-style:preserve-3d] hover:[transform:rotateX(180deg)]">
            <div class="absolute w-full h-full [backface-visibility:hidden] bg-secondary-500 px-4"> 
              <div class="flex flex-col"> 
                <h3 class="text-secondary-600">2013 - 2019</h3>
                <h2 class="text-secondary-900">Secondary School - NT/NG</h2>
              </div>
              <p>
                During my time at the secondary school, I realized I’m quick in seeing relations. 
                This helped me in picking up things easily and sparked the habit to find uncommon relations by taking things out of context. 
                These characteristics made the choice for my subsequent study easy.
              </p>
            </div>
            <div class="absolute w-full h-full rounded-lg drop-shadow-md [backface-visibility:hidden] [transform:rotateX(180deg)] bg-secondary-400 my-3 py-3 px-4"> 
              <h3>Topics</h3>
              <div class="flex flex-wrap mt-1 gap-x-2"> 
                <p v-for="(topic, index) in secondaryTopics" class="flex py-1 px-2 rounded-md border-solid border-2 border-primary-950" :key="index">{{ topic }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useStore } from '~/store/store';
const store = useStore()
const masterTopics = [
  'Additive Manufacturing', 
  '3D Moddeling', 
  'Plastic & Elastomer Science', 
  'Durability', 
  'Surface Technologies', 
  'Graphic Language', 
  'Biomedical Product Design', 
  'Nature Inspired Design', 
  'Composites'
]

const bachelorTopics = [
  'Calculus', 
  'Ideation', 
  'Smart Products', 
  'Human Prod. Relations', 
  'Consumer Prod.', 
  'Design for Specific Users', 
  'Virtual Prod. Development', 
  'System Engineering', 
  'Abroad',
  'Scientific Research',
  'Bachelor Thesis'
]

const secondaryTopics = [
  'Math. B', 
  'English', 
  'Dutch', 
  'German', 
  'Economics', 
  'Phyisics', 
  'Chemistry', 
  'Geography', 
  'Physical Education',
  'Biology',
  'Social Studies'
]

</script>

