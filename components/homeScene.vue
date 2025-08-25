<template>
    <div>
        <div ref="container" class="scene-container"></div>
    </div>
</template>

<script lang="ts" setup>
import { AmbientLight, PerspectiveCamera, Scene, WebGLRenderer, Clock, HemisphereLight, DirectionalLight, Object3D, Raycaster, Vector2, Mesh, MeshBasicMaterial, MeshPhongMaterial, Material, Color } from 'three';
import { useWindowSize } from '@vueuse/core';
import { useStore } from '~/store/store';
import { OrbitControls, GLTFLoader, type GLTF, CSS3DRenderer, CSS3DObject } from 'three/examples/jsm/Addons.js';

let renderer: WebGLRenderer
let controls: OrbitControls
let basicRoom: GLTF
let camera: PerspectiveCamera
let scene: Scene
let container: Ref<HTMLCanvasElement | null>
let clock: Clock
let camTarget: Object3D
let mobile: Ref<boolean | null>
let hoverItem: Object3D
let moved: boolean
let matBuffer: Array<Material> = []

const raycaster = new Raycaster()
const store = useStore()
const highlighted = computed(() => store.highlighted)
const pages = ['bureau', 'statafel', 'piano']

  
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
        console.log(basicRoom.scene.children)
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

    //controls.autoRotate = true
}

//Add animations
function animate() {
    controls.update()
    renderer.render(scene, camera)
}

function checkIntersection(event: MouseEvent): Object3D | undefined {
    const coords = new Vector2(
        (event.clientX / renderer.domElement.clientWidth) * 2 - 1,
        - ((event.clientY / renderer.domElement.clientHeight) * 2 - 1)
    )

    raycaster.setFromCamera(coords, camera)
    const intersections = raycaster.intersectObject(basicRoom.scene, true)

    if (intersections.length > 0) {
        return intersections[0].object.parent!
    }
}

//Object hover function
function onHighlight(event: MouseEvent) {
    moved = true
    const object = checkIntersection(event)
    if (object === store.highlighted) return
    else if (object && pages.includes(object.name)) store.highlighted = object
}

//Object click function
function onSelect(event: MouseEvent) {
    if (moved === false) {
        const object = checkIntersection(event)
        if (object && pages.includes(object.name)) {
            store.setSelected(object)
        }
    }
}

function highlight(child: Object3D) {
    const mesh = <Mesh>child
    const mat = <Material>mesh.material
    matBuffer.push(mat)
    mesh.material = new MeshBasicMaterial()
}

function resetMat(child: Object3D) {
    const mesh = <Mesh>child
    mesh.material = matBuffer[0]
    matBuffer.splice(0, 1)
}

init()

//client side renderer
watch(aspectRatio, () => {
    updateCamera()
    updateRender()
})

watch(highlighted, (newHighlighted: Object3D, oldHighlighted: Object3D) => {
    if (oldHighlighted) {
        oldHighlighted.children.forEach(resetMat)
    }
    newHighlighted.children.forEach(highlight)
})

onMounted(() => {
    setRenderer()
    setOrbitControls()
    renderer.setAnimationLoop(animate)
    document.addEventListener('mousemove', onHighlight)
    document.addEventListener('pointerup', onSelect)
    document.addEventListener('pointerdown', function() {
        moved = false
    })
})

</script>

<style>

</style>