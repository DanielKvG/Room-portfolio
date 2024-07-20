<template>
  <div ref="sceneContainer" class="scene-container"></div>
</template>

<script lang="ts">
import * as THREE from 'three';
import { GLTFLoader, CSS3DRenderer, CSS3DObject, OrbitControls } from 'three/examples/jsm/Addons.js';

export default defineComponent({
  name: 'ThreeJSComponent',
  setup() {
    const sceneContainer = ref<HTMLDivElement | null>(null);

    onMounted(() => {
      if (sceneContainer.value) {
        initThreeJS(sceneContainer.value);
      }
    });

    const initThreeJS = (container: HTMLDivElement) => {
      // Set up scene, camera, and renderer
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      camera.position.z = 400;
      let controls: OrbitControls
      const renderer = new THREE.WebGLRenderer();
      renderer.setSize(window.innerWidth, window.innerHeight);
      controls = new OrbitControls(camera, renderer.domElement);
      container.appendChild(renderer.domElement);
      

      // Set up CSS3DRenderer
      const cssRenderer = new CSS3DRenderer();
      cssRenderer.setSize(window.innerWidth, window.innerHeight);
      cssRenderer.domElement.style.position = 'absolute';
      cssRenderer.domElement.style.top = '0';
      container.appendChild(cssRenderer.domElement);

      // Add lights
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
      scene.add(ambientLight);

      const pointLight = new THREE.PointLight(0xffffff, 1);
      pointLight.position.set(200, 200, 200);
      scene.add(pointLight);

      // Create a CSS3DObject with a Vue component
      const vueComponent = createVueComponent();
      const cssObject = new CSS3DObject(vueComponent);
      cssObject.position.set(0, 0, 0);
      scene.add(cssObject);

      // Load the GLTF model
      const loader = new GLTFLoader();
      loader.load('models/room1.glb', (gltf) => {
        const model = gltf.scene;
        model.position.set(10, 10, 10);
        console.log(model)
        scene.add(model);
      });

      // Animation loop
      const animate = () => {
        controls.update;
        requestAnimationFrame(animate);
        cssObject.rotation.x += 0.01;
        cssObject.rotation.y += 0.01;
        renderer.render(scene, camera);
        cssRenderer.render(scene, camera);
      };
      animate();
    };

    const createVueComponent = (): HTMLDivElement => {
      const div = document.createElement('div');
      div.style.width = '200px';
      div.style.height = '200px';
      div.style.background = 'rgba(255, 255, 255, 0.8)';
      div.style.border = '1px solid black';

      const o = document.createElement('div');
      div.appendChild(o);

      return div;
    };

    return {
      sceneContainer,
    };
  },
});
</script>

<style>
.scene-container {
  width: 100%;
  height: 100vh;
  position: relative;
  overflow: hidden;
}
</style>