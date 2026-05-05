<template>
    <div id="dragfield" class="absolute left-0 right-0 top-0 bottom-0 flex flex-col justify-center items-center pointer-events-auto">
        <div 
            class="h-96 max-w-[760px] transition-all duration-800 ease-in-out touch-none" 
            :class="{'h-full w-full': !store.page.open}" 
            ref="container">
        </div>
    </div>
</template>

<script lang="ts" setup>
import { AmbientLight, PerspectiveCamera, Scene, WebGLRenderer, Clock, HemisphereLight, DirectionalLight, Object3D, Raycaster, Vector2, Mesh, MeshBasicMaterial, MeshPhongMaterial, Material, Color, Quaternion, Vector3, Euler } from 'three';
import { useElementSize, useWindowSize } from '@vueuse/core';
import { useStore } from '~/store/store';
import { useProjectStore} from '~/store/projectStore';
import { OrbitControls, GLTFLoader, type GLTF, CSS3DRenderer, CSS3DObject, TransformControls } from 'three/examples/jsm/Addons.js';
import { gsap } from 'gsap';
import { Draggable } from 'gsap/Draggable';

let renderer: WebGLRenderer
let orbit: OrbitControls
let basicRoom: GLTF
let camera: PerspectiveCamera
let hiddenCamera: PerspectiveCamera
let scene: Scene
let container: Ref<HTMLCanvasElement | null>
let clock: Clock
let camTarget: Object3D
let down: boolean
let matBuffer: Array<Material> = []
let dragger: Draggable
let transformControl: TransformControls
type projectVis = {
    gltf: GLTF | undefined
    url: string
}

var scale = 0.00005;
var lastX = 0;
var lastY = 0;
var meshX = 0;
var meshY = 0;

//const raycaster = new Raycaster()
const store = useStore()
const projectsStore = useProjectStore()
const loader = new GLTFLoader()
const highlighted = computed(() => store.highlighted)
const pages = ['bureau', 'statafel', 'piano']

const el = useTemplateRef('container')
const size = reactive(useElementSize(el, {width: 0, height: 0}))

const aspectRatio = computed(() => size.width / size.height)
const mobile = computed(() => useWindowSize().width.value < 1024)
const currentProject = computed(() => projectsStore.getProject())
const nextProject = computed(() => projectsStore.getNextProject())

//Setup function
function init() {
    //Initialize clock for animations
    clock = new Clock()

    //Initialize a new 3D object for the camera to look at
    camTarget = new Object3D()

    //Create scene
    scene = new Scene();

    //Initialize container & dragfield
    container = ref(null)

    //Add camera
    camera = new PerspectiveCamera(70, aspectRatio.value, 0.1, 1000)
    if (!mobile.value) camera.position.set(0, 3, -5)
    else camera.position.set(0, 3, -7)
    camera.lookAt(0, -1, 0)
    scene.add(camera)

    hiddenCamera = camera.clone()



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

    //----- Load the room ------
    loadFirst(currentProject.value)

    //----- Load next item -----
    loadNext(nextProject.value)
}

//Add transform controls
function setTransformControls() {
    // orbit = new OrbitControls( camera, renderer.domElement );
    // orbit.update();
    // orbit.addEventListener( 'change', updateRender );

    transformControl = new TransformControls( camera, renderer.domElement)
    transformControl.addEventListener( 'change', updateRender );
    transformControl.addEventListener( 'dragging-changed', function ( event ) {

        //orbit.enabled = ! event.value;
        console.log('dragging changed')

    } );

    transformControl.setMode("rotate");
    transformControl.size = 4
    transformControl.space = 'world'

    transformControl.showX = true;
    transformControl.showY = true;
    transformControl.showZ = true;

    scene.add(transformControl)
}

//load modal function
async function loadFirst(model: projectVis) {
    [model.gltf] = await Promise.all([loader.loadAsync(model.url)])
    model.gltf.scene.position.set(0, -2, 0)
    scene.add(model.gltf.scene)
}

async function loadNext(model: projectVis) {
    [model.gltf] = await Promise.all([loader.loadAsync(model.url)])
    model.gltf.scene.position.set(-20, -2, 0)
    //transformControl.attach(model.gltf.scene)
    scene.add(model.gltf.scene)
}

function nextModel() {
    if (currentProject.value.gltf) {
        gsap.to(currentProject.value.gltf!.scene.position, {x: 0, y: -2, z: 0, duration: 2, ease: "power2.inOut"})
        orbit.reset()
        gsap.to(nextProject.value.gltf!.scene.position, {x: 20, y: -2, z: 0, onComplete: removeModel, onCompleteParams: [nextProject.value.gltf!.scene], duration: 2, ease: "power2.inOut"})
    }
}

function removeModel(model: Object3D) {
    scene.remove(model)
    loadNext(nextProject.value)
}
    

//Update functions
function updateRender() {
    renderer.setSize(size.width, size.height)
    renderer.render(scene, camera)
}

function updateCamera() {
    camera.aspect = aspectRatio.value;
    camera.updateProjectionMatrix();
}

//Add Renderer
function setRenderer() {
    if (container.value) {
        renderer = new WebGLRenderer({ antialias: true })
        renderer.setClearColor( 0x000000, 0 )
        // renderer.shadowMap.enabled = true
        // renderer.shadowMap.type = PCFSoftShadowMap
        renderer.setPixelRatio( window.devicePixelRatio )
        updateRender()
        container.value.appendChild(renderer.domElement)
    }
}

//Add orbit controls
function setOrbitControls() {
    // const dragfield = document.getElementById('dragfield')
    // if (!dragfield) {
    //     console.log('dragfield not defined')
    //     return
    // } 
    // else {
    //     //dragfield.addEventListener('mousemove', onHighlight)
    //     renderer.domElement.addEventListener('pointermove', function(e) {
    //         if (down) {
    //             lastX = e.clientX
    //             lastY = e.clientY
    //             down = false
    //             console.log('stuck')
    //         } else if (currentProject.value.gltf) {
    //             const model = currentProject.value.gltf.scene
    //             const dX = lastX - e.clientX
    //             const dY = lastY - e.clientY
    //             const currentRot = model.rotation
    //             lastX = e.clientX
    //             lastY = e.clientY
    //             model.rotateX(currentRot.x + (dX * scale))
    //             model.rotateY(currentRot.y + (dY * scale))
    //         }
    //     })
    //     dragfield.addEventListener('pointerup', function() {
    //         down = false
    //         console.log('up')
    //     })
        
    //     dragfield.addEventListener('pointerdown', function() {
    //         down = true
    //         console.log('down')
    //     })
    // }

    orbit = new OrbitControls( hiddenCamera, renderer.domElement)
    orbit.enableDamping = true
    orbit.maxPolarAngle = Math.PI / 2;
    



    // controls = new OrbitControls( camera, dragfield)
    // controls.target.set(0, -1, 0)
    // controls.enablePan = false
    // controls.enableDamping = true
    // controls.zoomSpeed = 4
    // if (mobile.value) controls.maxDistance = 15
    // else controls.maxDistance = 8
    // controls.maxPolarAngle = Math.PI / 2

    // controls.autoRotate = true
}

//Add animations
function animate() {
    orbit.update()

    var polar = orbit.getPolarAngle() - Math.PI / 3
    var azimuth = orbit.getAzimuthalAngle() * -1

    var q = new Quaternion()
    var axis = new Vector3(0, 1, 0)

    q.setFromAxisAngle(axis, azimuth)
    q.setFromEuler(new Euler(polar, azimuth, 0))

    currentProject.value.gltf?.scene.quaternion.copy( q )

    renderer.render(scene, camera)
}

// function checkIntersection(event: MouseEvent): Object3D | undefined {
//     const coords = new Vector2(
//         (event.clientX / renderer.domElement.clientWidth) * 2 - 1,
//         - ((event.clientY / renderer.domElement.clientHeight) * 2 - 1)
//     )

//     raycaster.setFromCamera(coords, camera)
//     const intersections = raycaster.intersectObject(currentProject.value.gltf!.scene, true)

//     if (intersections.length > 0) {
//         console.log(intersections[0])
//         return intersections[0].object.parent!
//     }
// }

//Object hover function
// function onHighlight(event: MouseEvent) {
//     down = true
//     const object = checkIntersection(event)
//     if (object === store.highlighted) return
//     else if (object && pages.includes(object.name)) store.highlighted = object
//     else store.highlighted = null
// }

//Object click function
// function onSelect(event: MouseEvent) {
//     if (down === false) {
//         const object = checkIntersection(event)
//         if (object && pages.includes(object.name)) {
//             store.setSelected(object)
//         }
//         else store.closePage()
//     }
// }

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

watch(highlighted, (newHighlighted: Object3D, oldHighlighted: Object3D) => {
    if (oldHighlighted) {
        oldHighlighted.children.forEach(resetMat)
    }
    if (newHighlighted) {
        newHighlighted.children.forEach(highlight)
    }
})

//client side renderer
watch(aspectRatio, () => {
    updateCamera()
    updateRender()
})

watch(currentProject, () => {
    nextModel()
})

onMounted(() => {
    setRenderer()
    setOrbitControls()
    //setTransformControls()
    renderer.setAnimationLoop(animate)
})

</script>

<style>

</style>