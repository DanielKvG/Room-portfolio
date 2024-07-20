<template>
  <div>
    <canvas ref="screens">
    </canvas>
  </div>
</template>

<script lang="ts" setup>
import { Scene } from 'three';
import { CSS3DRenderer, CSS3DObject } from 'three/examples/jsm/Addons.js';

let DOMrenderer: CSS3DRenderer

const screens: Ref<HTMLCanvasElement | null> = ref(null)

const HTMLscene = new Scene();

//Add CSS3D Render
function setCSS3DRenderer() {
  if (screens.value) {
    DOMrenderer = new CSS3DRenderer()
    DOMrenderer.setSize(window.innerWidth, window.innerHeight)
    DOMrenderer.domElement.style.position = 'absolute'
    DOMrenderer.domElement.style.top = '0px'
    screens.value.appendChild(DOMrenderer.domElement)
  }
}

//Add screen
function createScreen() {
  const p = document.createElement('p')
  p.textContent = 'hello'
  const div = document.createElement('div')
  div.appendChild(p)
  const screen = new CSS3DObject(div)
  HTMLscene.add(screen)
}

onMounted(() => { 
  setCSS3DRenderer()
  createScreen()
})


</script>

<style>

</style>