<template>
    <div>
        <div ref="container" class="scene-container"></div>
    </div>
</template>

<script setup lang="ts">
import { AmbientLight, Color, PerspectiveCamera, Scene, WebGLRenderer, AnimationMixer, Clock, PointLight, Vector3, HemisphereLight, DirectionalLight, Object3D, MeshPhongMaterial, NoBlending, BoxGeometry, Mesh, Group, DoubleSide, MeshBasicMaterial, PlaneGeometry, BasicShadowMap, PCFSoftShadowMap, CameraHelper, PCFShadowMap, CullFaceBack } from 'three';
import { useWindowSize } from '@vueuse/core';
import { OrbitControls, GLTFLoader, type GLTF, CSS3DRenderer, CSS3DObject } from 'three/examples/jsm/Addons.js';
import content from '../pages/laptop_screen.vue'
import { texture } from 'three/examples/jsm/nodes/Nodes.js';
import gsap from 'gsap';
import { pageOrder } from './pageOrder';

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
let camera: PerspectiveCamera
let scene: Scene
let container: Ref<HTMLCanvasElement | null>
let clock: Clock
let camTarget: Object3D
let cssObject: CSS3DObject
let mobile: Ref<boolean | null>

//Expose functions to parant component
// defineExpose({
//     goToNextPos
// })

//camera positions
// x- = pc, z- = window
//----- Home ---------
const posHome = {x: 30, y: 30, z: 50}
const lookHome = {x: -24, y: -4, z: 0}

//----- Mobile Home --
const posMobileHome = {x: 94, y: 50, z: 72}
const lookMobileHome = {x: -22, y: 18, z: -16}

//----- The Desk -----
const posPC = {x: -4.5, y: 12, z: -10}
const lookPC = {x: -14, y: 9.7, z: -10}

//----- Mobile Desk --
const posMobilePC = {x: 4, y: 12, z: -10.4}
const lookMobilePC = {x: -14, y: 10, z: -10.4}

//----- Roadmap ------
const posRM = {x: 8, y: 18, z: -6}
const lookRM = {x: 8, y: 15, z: -7}

//----- Mobile Roadmap ------
const posMobileRM = {x: 10, y: 20, z: -8}
const lookMobileRM = {x: 10, y: 8, z: -9.5}

//----- Hobby corner ------
const posHC = {x: 0, y: 16, z: 0}
const lookHC = {x: 0, y: 10, z: 20}

//----- Mobile Hobby corner ------
const posMobileHC = {x: 0, y: 16, z: -12}
const lookMobileHC = {x: 0, y: 1, z: 20}

//aspect ratio for adjusting scenes
const { width, height } = useWindowSize()
const aspectRatio = computed(() => width.value / height.value)
if (width.value > 1024) {
    console.log(width.value)
    mobile = ref(false)
} else {
    mobile = ref(true)
}
//store the route
const route = useRoute()
const router = useRouter()

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
    camera = new PerspectiveCamera(55, aspectRatio.value, 0.1, 1000)
    camera.position.set(30, 30, 50)
    camTarget.position.set(-24, -4, 0)
    camera.lookAt(camTarget.position)
    scene.add(camera)

    //Add Light 
    //----- Directional light for shadows and sun effect ------
    const directionalLight = new DirectionalLight( 0xffffff, 3 );
    directionalLight.position.set(18, 29, -45)
    directionalLight.target.position.set(0, 0, 0)
    directionalLight.castShadow = true
    directionalLight.shadow.camera.top = 40
    directionalLight.shadow.camera.bottom = -40
    directionalLight.shadow.camera.left = 40
    directionalLight.shadow.camera.right = -40
    directionalLight.shadow.camera.near = 5
    directionalLight.shadow.camera.far = 100
    directionalLight.shadow.bias = -0.004
    directionalLight.shadow.mapSize.width = 1024
    directionalLight.shadow.mapSize.height = 1024
    directionalLight.shadow.radius = 3
    directionalLight.shadow.blurSamples = 10
    //----- AmbientLight for lighting up unlit faces ------
    const ambientLight = new AmbientLight(404040, 1.5);
    //----- PointLight for indoor lightbulb ------
    const pointLight = new PointLight(0xffffbb, 400)
    pointLight.position.x = 4
    pointLight.position.y = 20
    pointLight.position.z = 3
    //----- Add lights to the scene ------
    scene.add(ambientLight, directionalLight, pointLight);

    //Guide for seeing the effective range of the shadow
    var shadowHelper = new CameraHelper( directionalLight.shadow.camera );
    //scene.add( shadowHelper );

    //Load the models
    const loader = new GLTFLoader();
    //----- Load the room ------
    loader.load( 'models/room.glb', async function ( room ) {
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

        // Set timeout of 500ms to move to desired position only after the model has loaded
        await new Promise(f => setTimeout(f, 500));
        goToNextPos(route.path)
    })

    //----- Load the duck ------
    loader.load( 'models/duckkie.glb', function ( gltf ) {
        duck = gltf
        duck.scene.position.set(11, 12.2, -10.7)
        duck.scene.lookAt(0, 12.2, 3)
        duck.scene.scale.set(0.4, 0.4, 0.4)
        scene.add(duck.scene)

        mixer = new AnimationMixer(duck.scene)
        const walk = mixer.clipAction(duck.animations[5])
        const idle = mixer.clipAction(duck.animations[3])
        idle.play()

        var delta = clock.getDelta()
        mixer.update( delta )

    }, undefined, function ( error ) {
        console.error( error );
    });

    // Create the laptop screen, scene add is on request in function pcPower
    const vueComponent = createVueComponent('1088px', '624px', '/aboutme');
    cssObject = new CSS3DObject(vueComponent);
    cssObject.position.set(-12.58, 8.69, -10.12);
    cssObject.rotateY(Math.PI / 2)
    cssObject.rotateX(-Math.PI / 16)
    cssObject.scale.set(0.0033, 0.0033, 0.0033)
}

//Called from parant component to move 
function goToNextPos(path: string) {
    console.log(path)
    if (path == '/home') {
        let posH, lookH
        if (mobile.value) {
            posH = posMobileHome
            lookH = lookMobileHome
        } else {
            posH = posHome
            lookH = lookHome
        }
        valueX = posH.x
        valueY = posH.y
        valueZ = posH.z
        targetX = lookH.x
        targetY = lookH.y
        targetZ = lookH.z
    }
    else if (path == '/desk') {
        let posD, lookD
        if (mobile.value) {
            posD = posMobilePC
            lookD = lookMobilePC
        } else {
            posD = posPC
            lookD = lookPC
        }
        valueX = posD.x
        valueY = posD.y
        valueZ = posD.z
        targetX = lookD.x
        targetY = lookD.y
        targetZ = lookD.z
        pcPower(true)
    }
    else if (path == '/roadmap') {
        let posR, lookR
        if (mobile.value) {
            posR = posMobileRM
            lookR = lookMobileRM
        } else {
            posR = posRM
            lookR = lookRM
        }
        valueX = posR.x
        valueY = posR.y
        valueZ = posR.z
        targetX = lookR.x
        targetY = lookR.y
        targetZ = lookR.z
    }
    else if (path == '/hobbycorner') {
        let posHobby, lookHobby
        if (mobile.value) {
            posHobby = posMobileHC
            lookHobby = lookMobileHC
        } else {
            posHobby = posHC
            lookHobby = lookHC
        }
        valueX = posHobby.x
        valueY = posHobby.y
        valueZ = posHobby.z
        targetX = lookHobby.x
        targetY = lookHobby.y
        targetZ = lookHobby.z
    }
    gsap.to(camera.position, {x: valueX, y: valueY, z: valueZ, duration: 2, ease: "power2.inOut"})
    gsap.to(camTarget.position, {x: targetX, y: targetY, z: targetZ, duration: 2, ease: "power2.inOut"})
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
        renderer.shadowMap.enabled = true
        renderer.shadowMap.type = PCFSoftShadowMap
        renderer.setPixelRatio( window.devicePixelRatio );
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

    // iframe to hold the page
    const iframe = document.createElement('iframe')
    iframe.width = width
    iframe.height = height      
    iframe.style.width = '100%'
    iframe.style.height = '100%'
    iframe.src = page
    div.appendChild(iframe)

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
    goToNextPos(route.path)
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
}
</style>