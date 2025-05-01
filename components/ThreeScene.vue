<template>
    <div>
        <div ref="container" class="scene-container"></div>
    </div>
</template>

<script setup lang="ts">
import { AmbientLight, Color, PerspectiveCamera, Scene, WebGLRenderer, AnimationMixer, Clock, PointLight, Vector3, HemisphereLight, DirectionalLight, Object3D, MeshPhongMaterial, NoBlending, BoxGeometry, Mesh, Group, DoubleSide, MeshBasicMaterial, PlaneGeometry, BasicShadowMap, PCFSoftShadowMap, CameraHelper, PCFShadowMap, CullFaceBack, LoopOnce } from 'three';
import { useWindowSize } from '@vueuse/core';
import { OrbitControls, GLTFLoader, type GLTF, CSS3DRenderer, CSS3DObject } from 'three/examples/jsm/Addons.js';
import gsap from 'gsap';
import { useStore } from '~/store/store';



let valueX: number
let valueY: number
let valueZ: number
let targetX: number
let targetY: number
let targetZ: number

let renderer: WebGLRenderer
let DOMrenderer: CSS3DRenderer
//let controls: OrbitControls
let mixer: any
let duck: GLTF
let room: GLTF
let openDoor: any
let duckIdle: any
let camera: PerspectiveCamera
let scene: Scene
let container: Ref<HTMLCanvasElement | null>
let clock: Clock
let camTarget: Object3D
let cssObject: CSS3DObject
let mobile: Ref<boolean | null>

//store the route
const route = useRoute()
const router = useRouter()
const store = useStore()

//Expose functions to parant component
// defineExpose({
//     goToNextPos
// })

//camera positions
// x = kamer 2 1, z = deur raam
//----- Home OLD ---------
//const posHome = {x: 27, y: 30, z: 38}
//const lookHome = {x: -24, y: -4, z: 0}

//----- Home ---------
const posHome = {x: -5, y: 14, z: 45, duration: 3}
const lookHome = {x: -5, y: 10, z: -45, duration: 3}

//----- Door ---------
const posDoor = {x: -9, y: 14, z: 25, duration: 3}

//----- Mobile Home --
const posMobileHome = {x: -15.5, y: 14, z: 62, duration: 3}
const lookMobileHome = {x: -15.5, y: 10, z: -45, duration: 3}

//----- The Desk -----
const posPC = {x: -2.5, y: 12, z: -10, duration: 3}
const lookPC = {x: -14, y: 9.7, z: -10, duration: 3}

//----- Mobile Desk --
const posMobilePC = {x: 3, y: 12, z: -10.4, duration: 3}
const lookMobilePC = {x: -14, y: 10, z: -10.4, duration: 3}

//----- Roadmap ------
const posRM = {x: 0, y: 16, z: -8, duration: 3}
const lookRM = {x: 20, y: 13, z: -9, duration: 3}

//----- Mobile Roadmap ------
const posMobileRM = {x: 3, y: 15, z: -0, duration: 3}
const lookMobileRM = {x: 10, y: 12, z: -11, duration: 3}

//----- Hobby corner ------
const posHC = {x: 0, y: 16, z: -6, duration: 3}
const lookHC = {x: 16, y: 12, z: 20, duration: 3}

//----- Mobile Hobby corner ------
const posMobileHC = {x: -8, y: 16, z: -13, duration: 3}
const lookMobileHC = {x: 16, y: 10, z: 20, duration: 3}

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
    camera.position.set(30, 30, 50)
    camTarget.position.set(-24, -4, 0)
    camera.lookAt(camTarget.position)
    scene.add(camera)

    //Add Light 
    //----- Directional light for shadows and sun effect ------
    // const directionalLight = new DirectionalLight( 0xffffff, 3 );
    // directionalLight.position.set(18, 29, -45)
    // directionalLight.target.position.set(0, 0, 0)
    // directionalLight.castShadow = false
    // directionalLight.shadow.camera.top = 60
    // directionalLight.shadow.camera.bottom = -60
    // directionalLight.shadow.camera.left = 60
    // directionalLight.shadow.camera.right = -60
    // directionalLight.shadow.camera.near = 1
    // directionalLight.shadow.camera.far = 100
    // directionalLight.shadow.bias = -0.004
    // directionalLight.shadow.mapSize.width = 1024
    // directionalLight.shadow.mapSize.height = 1024
    // directionalLight.shadow.radius = 3
    // directionalLight.shadow.blurSamples = 10
    //----- AmbientLight for lighting up unlit faces ------
    const ambientLight = new AmbientLight(0xffffff, 1);

    //----- PointLight for indoor lightbulb, shadow needed for outside ------
    const pointLight = new PointLight(0xffffbb, 400)
    pointLight.castShadow = false
    // pointLight.shadow.camera.near = 1
    // pointLight.shadow.camera.far = 100
    // pointLight.shadow.bias = -0.004
    // pointLight.shadow.mapSize.width = 1024
    // pointLight.shadow.mapSize.height = 1024
    // pointLight.shadow.radius = 3
    // pointLight.shadow.blurSamples = 10
    pointLight.position.x = 4
    pointLight.position.y = 20
    pointLight.position.z = 3

    //----- PointLight for indoor lightbulb, shadow needed for outside ------
    // const hallLight = new PointLight(0xffffbb, 400)
    // hallLight.castShadow = false
    // hallLight.shadow.camera.near = 1
    // hallLight.shadow.camera.far = 100
    // hallLight.shadow.bias = -0.004
    // hallLight.shadow.mapSize.width = 1024
    // hallLight.shadow.mapSize.height = 1024
    // hallLight.shadow.radius = 3
    // hallLight.shadow.blurSamples = 10
    // hallLight.position.x = 0
    // hallLight.position.y = 23
    // hallLight.position.z = 35
    //----- Add lights to the scene ------
    scene.add(ambientLight);

    //Guide for seeing the effective range of the shadow
    //var shadowHelper = new CameraHelper( directionalLight.shadow.camera );
    //scene.add( shadowHelper );

    //Load the models
    const loader = new GLTFLoader();
    //----- Load the room ------
    loader.load( 'models/room1.glb', async function ( gltf ) {
        room = gltf
        room.scene.scale.set(10, 10, 10)
        room.scene.traverse(function(node) {
            if (node.isObject3D) {
                if (!node.name.includes('floor') && !node.name.includes('laptop')) {
                    node.castShadow = true
                }
                
                node.receiveShadow = true
            }
        })
        scene.add(room.scene)
        console.log(room.scene)
        mixer = new AnimationMixer(room.scene)
        openDoor = mixer.clipAction(room.animations[0])
        openDoor.setLoop(LoopOnce)

        var delta = clock.getDelta()
        mixer.update( delta )

        // Set timeout of 500ms to move to desired position only after the model has loaded
        await new Promise(f => setTimeout(f, 500));
        goToNextPos(route.path)
    })

    //----- Load the duck ------
    loader.load( 'models/duckkie.glb', function ( gltf ) {
        duck = gltf
        duck.scene.position.set(9.5, 11.1, -9)
        duck.scene.lookAt(0, 11.1, -5)
        duck.scene.scale.set(0.4, 0.4, 0.4)
        scene.add(duck.scene)

        mixer = new AnimationMixer(duck.scene)
        const walk = mixer.clipAction(duck.animations[5])
        duckIdle = mixer.clipAction(duck.animations[3])
        duckIdle.play()

        var delta = clock.getDelta()
        mixer.update( delta )

    }, undefined, function ( error ) {
        console.error( error );
    });

    // Create the laptop screen, scene add is on request in function pcPower
    const vueComponent = createVueComponent('1090px', '626px', 'desk/projectsScreen');
    cssObject = new CSS3DObject(vueComponent);
    cssObject.position.set(-12.58, 8.69, -10.12);
    cssObject.rotateY(Math.PI / 2)
    cssObject.rotateX(-Math.PI / 16)
    cssObject.scale.set(0.0033, 0.0033, 0.0033)
}

//Called from parant component to move 
async function goToNextPos(path: string, previous?: any) {
    console.log(path)
    let camRoute: Array<{x?: number, y?: number, z?: number, duration?: number}> = []
    let camView: {x: number, y: number, z: number} = {x: 0, y: 0, z: 0}
    if (path == '/home') {
        if (previous) {
            openDoor.stop()
            openDoor.play()
            camRoute.push(posDoor)
        }
        if (mobile.value) {
            camRoute.push(posMobileHome)
            camView = lookMobileHome
        } else {
            camRoute.push(posHome)
            camView = lookHome
        }
    }
    else if (path == '/desk') {
        if (previous == '/home') {
            openDoor.stop()
            openDoor.play()
            camRoute.push(posDoor)
        }
        if (mobile.value) {
            camRoute.push(posMobilePC)
            camView = lookMobilePC
        } else {
            camRoute.push(posPC)
            camView = lookPC
        }
        pcPower(true)
    }
    else if (path == '/roadmap') {
        if (previous == '/home') {
            openDoor.stop()
            openDoor.play()
            camRoute.push(posDoor)
        }
        if (mobile.value) {
            camRoute.push(posMobileRM)
            camView = lookMobileRM
        } else {
            camRoute.push(posRM)
            camView = lookRM
        }
    }
    else if (path == '/hobbycorner') {
        if (previous == '/home') {
            openDoor.stop()
            openDoor.play()
            camRoute.push(posDoor)
        }
        if (mobile.value) {
            camRoute.push(posMobileHC)
            camView = lookMobileHC
        } else {
            camRoute.push(posHC)
            camView = lookHC
        }
    }

    gsap.to(camera.position, {keyframes: [...camRoute], ease: "power2.inOut"})
    
    //gsap.to(camera.position, {x: valueX, y: valueY, z: valueZ, duration: 2, ease: "power2.inOut"})
    gsap.to(camTarget.position, {...camView, duration: 3, ease: "power2.inOut"})
}

//turn on or off pc
function pcPower(state: boolean) {
    if (state) {
        scene.add(cssObject);
    } else {scene.remove(cssObject)}
}

//Update functions
function updateRender() {
    renderer.setSize(width.value, height.value)
    DOMrenderer.setSize(width.value, height.value)
    // Adjust camera mode to screen size
    if (width.value > 1024) {
        if (!mobile.value) {
            return
        } else {
            mobile.value = false
            goToNextPos(route.path)
        }
    } else {
        if (mobile.value) {
            return
        } else {
            mobile.value = true
            goToNextPos(route.path)
        }
    }
    renderer.render(scene, camera)
    DOMrenderer.render(scene, camera)
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
        renderer.domElement.style.pointerEvents = 'none'
        updateRender();
        container.value.appendChild(renderer.domElement)
    }
}

//Add CSS3D Render
function setCSS3DRenderer() {
  if (container.value) {
    DOMrenderer = new CSS3DRenderer()
    DOMrenderer.setSize(window.innerWidth, window.innerHeight)
    DOMrenderer.domElement.style.position = 'absolute'
    DOMrenderer.domElement.style.top = '0px'
    //controls = new OrbitControls(camera, DOMrenderer.domElement); //<-- comment out for orbit controls
    //controls.target.set(-12, 9.4, -7.4) //<-- comment out for orbit controls
    container.value.appendChild(DOMrenderer.domElement)
  }
}

//create a new div for the CSS3Drenderer
// args: dimensions<width, height> and page 
function createVueComponent(width: string, height: string, page: string): HTMLDivElement {
    // container for the iframe
    const div = document.createElement('div')
    div.style.width = width;
    div.style.height = height;
    div.style.border = '1px solid black'
    div.id = 'toProjects'
    div.style.cursor = 'pointer'

    // iframe to hold the page
    const iframe = document.createElement('iframe')
    
    iframe.width = width
    iframe.height = height      
    iframe.style.width = '100%'
    iframe.style.height = '100%'
    iframe.style.pointerEvents = 'none'
    iframe.src = page
    div.appendChild(iframe)

    div.addEventListener("click", store.toProjects, false)

    return div;
};

init()

// //Check for window resizes because client side render
// window.addEventListener('resize', function() {
//     camera.aspect = this.window.innerWidth / this.window.innerHeight
//     camera.updateProjectionMatrix()
//     renderer.setSize(this.window.innerWidth, this.window.innerHeight)
//     DOMrenderer.setSize(this.window.innerWidth, this.window.innerHeight)
// })

//client side renderer
watch(aspectRatio, () => {
    updateCamera();
    updateRender();
})

watch(() => route.fullPath, () => {
    if (route.path != '/desk') {
        pcPower(false)
    }
    if (router.options.history.state.back) {
        
    }

    goToNextPos(route.path, router.options.history.state.back)
})

onMounted(() => {
    setCSS3DRenderer()
    setRenderer()
    loop()
    //$viewport.breakpointValue('desktop')
})

const loop = () => {
    //controls.update; //<-- comment out for  
    var delta = clock.getDelta()
	if (mixer) mixer.update( delta )
    renderer.render(scene, camera);
    DOMrenderer.render(scene, camera);
    requestAnimationFrame(loop)
    camera.lookAt(camTarget.position)
}
</script>

<style>
.scene-container {
  width: 100%;
  height: 100vh;
  position: relative;
  overflow: hidden;
  pointer-events: all;
}
</style>