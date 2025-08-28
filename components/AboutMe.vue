<template>
  <div class="flex flex-col justify-end h-0 transition-all duration-500 ease-in-out overflow-hidden" :class="{'h-full' : store.page.subject == 'about me'}">
    <div class="flex flex-row gap-2 h-screen px-4 py-8">
      <div class="flex flex-col gap-4"> 
        <h1>Hi!</h1>
        <p-large>
          <span>I’m an Industrial Design Engineer Master student at the University of Twente. </span>
          <span class="text-primary-900 font-medium">Combining passion and knowledge</span> is my core principle with everything I do. 
          It is as well a never ending circle. 
          My passions feed the need for knowledge and knowledge provides for new passions.
        </p-large>
        <p-large>
          I’m always exploring new things; 
          I’ve tried almost all sports and my study has introduced me to many different topics within technical engineering.
        </p-large>
        <p-large>
          Subjects I like to work most with are 
          User Interface design, 
          Material selection
          and 3D moddeling
        </p-large>
        <p-large>
          But there are way more passions for me!
        </p-large>
      </div>
      <div class="flex h-96 mt-24"> 
        <svg xmlns="http://www.w3.org/2000/svg" style="position:absolute">
          <defs>
            <clipPath id="mask">
              <path 
                d="M56.1262 344.312C38.2222 286.783 8.17154 282.719 1.8648 222.798C-5.76809 150.278 37.7661 35.3198 107.126
                12.8121C182.626 -11.6879 256.854 -0.943192 298.865 72.2984C328.126 123.312 307.573 160.166 282.626 189.812C229.626 
                252.799 314.4 267.291 305.126 344.312C298.865 396.312 262.219 389.972 220.126 419.312C170.312 454.035 133.376 507.317 
                96.8648 458.798C72.0059 425.764 68.4114 383.787 56.1262 344.312Z" 
              />
            </clipPath>
          </defs>
        </svg>
        <svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 316 506" >
            <image id="image" class="image__svg-image" width="100%" height="100%" clip-path="url(#mask)" y="-16" href="\images\me.png" />
        </svg>
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