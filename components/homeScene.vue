<template>
    <div>
        <div ref="container" class="scene-container"></div>
    </div>
</template>

<script lang="ts" setup>
import { AmbientLight, Color, PerspectiveCamera, Scene, WebGLRenderer, AnimationMixer, Clock, PointLight, Vector3, HemisphereLight, DirectionalLight, Object3D, MeshPhongMaterial, NoBlending, BoxGeometry, Mesh, Group, DoubleSide, MeshBasicMaterial, PlaneGeometry, BasicShadowMap, PCFSoftShadowMap, CameraHelper, PCFShadowMap, CullFaceBack, LoopOnce, MOUSE } from 'three';
import { useWindowSize } from '@vueuse/core';
import { OrbitControls, GLTFLoader, type GLTF, CSS3DRenderer, CSS3DObject } from 'three/examples/jsm/Addons.js';
import gsap from 'gsap';
import { useStore } from '~/store/store';

let renderer: WebGLRenderer
let controls: OrbitControls
let basicRoom: GLTF
let camera: PerspectiveCamera
let scene: Scene
let container: Ref<HTMLCanvasElement | null>
let clock: Clock
let camTarget: Object3D
let mobile: Ref<boolean | null>
  
//aspect ratio for adjusting scenes
const { width, height } = useWindowSize()
const aspectRatio = computed(() => width.value / height.value)
if (width.value > 1024) {
    console.log(width.value)
    mobile = ref(false)
} else {
    mobile = ref(true)
}

//Setup function
function init() {
    //Initialize clock for animations
    clock = new Clock()

    //Initialize refs WebGL- and CSS3Drenderer container
    container = ref(null)

    //Initialize a new 3D object for the camera to look at
    camTarget = new Object3D()

    //Create scene
    scene = new Scene();

    //Add camera
    camera = new PerspectiveCamera(70, aspectRatio.value, 0.1, 1000)
    if (!mobile.value) camera.position.set(-3.6, 2, -12)
    else camera.position.set(3.6, 6, -12)
    scene.add(camera)

    //----- AmbientLight for lighting up all faces (switch or light/dark mode)
    const ambientLight = new AmbientLight(0xffffff, 0.6);

    // light coming down from top 
    const hemiLight = new HemisphereLight( 0xffffff, 0xeeffee, 0.6 )
    hemiLight.color.setHSL( 0.6, 0.75, 0.5 )
    hemiLight.groundColor.setHSL( 0.095, 0.5, 0.9 )
    hemiLight.position.set( 0, 500, 0 )

    // direct shadows
    const dirLight = new DirectionalLight( 0xffffff, 2 )
    dirLight.position.set( -1, 0.75, -2 );
    dirLight.position.multiplyScalar( 50);
    dirLight.name = "dirlight";

    // roomlights
    //const roomLightL = new PointLight(0xffffff, 1, 100, 1)
    //const roomLightR = new PointLight(0xffffff, 1, 100, 1)
    //roomLightL.position.set(-1.5, 0, 0)
    //roomLightR.position.set(1.5, 0, 0)
    //scene.add(roomLightL, roomLightR)

    //----- Add lights to the scene ------
    scene.add(ambientLight, hemiLight, dirLight)

    const loader = new GLTFLoader()
    //----- Load the room ------
    loader.load( 'models/basicRoom.glb', function ( gltf ) {
        basicRoom = gltf
        basicRoom.scene.position.set(0, -2, 0)
        scene.add(basicRoom.scene)
    })
}

//Update functions
function updateRender() {
    renderer.setSize(width.value, height.value)
    renderer.render(scene, camera)
}

function updateCamera() {
    camera.aspect = aspectRatio.value;
    camera.updateProjectionMatrix();
}

//Add Renderer
function setRenderer() {
    if (container.value) {
        renderer = new WebGLRenderer({ antialias: true });
        renderer.setClearColor( 0x000000, 0 );
        // renderer.shadowMap.enabled = true
        // renderer.shadowMap.type = PCFSoftShadowMap
        renderer.setPixelRatio( window.devicePixelRatio );
        updateRender();
        container.value.appendChild(renderer.domElement)
    }
}

//Add orbit controls
function setOrbitControls() {
    controls = new OrbitControls( camera, renderer.domElement)
    controls.target.set(0, -1, 0)
    controls.enablePan = false
    controls.enableDamping = true
    controls.zoomSpeed = 4
    if (mobile.value) controls.maxDistance = 15
    else controls.maxDistance = 8
    controls.maxPolarAngle = Math.PI / 2

    controls.autoRotate = true
}

//Add animations
function animate() {
    controls.update()
    renderer.render(scene, camera)
}

init()

//client side renderer
watch(aspectRatio, () => {
    updateCamera();
    updateRender();
})

onMounted(() => {
    setRenderer()
    setOrbitControls()
    renderer.setAnimationLoop(animate)
})

</script>

<style>

</style>