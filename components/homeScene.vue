<template>
    <div id="dragfield" class="absolute left-0 right-0 top-0 bottom-0 flex flex-col justify-center items-center pointer-events-auto">
        <div 
            class="h-96 max-w-[760px] transition-all duration-800 ease-in-out touch-none" 
            :class="{'h-full w-full': !store.page.open}" 
            ref="container"
            >
        </div>
    </div>
</template>

<script lang="ts" setup>
import { AmbientLight, PerspectiveCamera, Scene, WebGLRenderer, Clock, HemisphereLight, DirectionalLight, Object3D, Raycaster, Vector2, Mesh, MeshBasicMaterial, MeshPhongMaterial, Material, Color, Quaternion, Vector3, Euler } from 'three';
import { useElementSize, useWindowSize, invoke, until } from '@vueuse/core';
import { useTemplateRef, onMounted } from 'vue'
import { useStore } from '~/store/store';
import { useProjectStore} from '~/store/projectStore';
import { OrbitControls, GLTFLoader, type GLTF, CSS3DRenderer, CSS3DObject, TransformControls } from 'three/examples/jsm/Addons.js';
import { gsap } from 'gsap';
import { Draggable } from 'gsap/Draggable';
import { toRaw } from "vue";

let renderer: WebGLRenderer
let orbit: OrbitControls
let basicRoom: GLTF
let camera: PerspectiveCamera
let hiddenCamera: PerspectiveCamera
let scene: Scene
let clock: Clock
let camTarget: Object3D
let down: boolean
let matBuffer: Array<Material> = []
let dragger: Draggable
let transformControl: TransformControls

type projectVis = {
    gltf: GLTF | undefined
    url: string
    title: string
    text: Array<string>
    topics: Array<string>
}

//const raycaster = new Raycaster()
const store = useStore()
const projectsStore = useProjectStore()
const loader = new GLTFLoader()
const highlighted = computed(() => store.highlighted)
const pages = ['bureau', 'statafel', 'piano']

const container = ref(null)
const size = reactive(useElementSize(container, {width: 0, height: 0}))
const aspectRatio = computed(() => size.width / size.height)
const mobile = computed(() => useWindowSize().width.value < 1024)

const currentProject = computed(() => projectsStore.getProject())
const nextProject = computed(() => projectsStore.getNextProject())
const lastProject = computed(() => projectsStore.getLastProject())

const projects: Array<any> = toRaw(projectsStore.projects)
let requestedProjects: Array<number> = []
const loadedProjects: Array<any> = []
let lastloaded = -1

//Setup function
function init() {
    //Initialize clock for animations
    clock = new Clock()

    //Initialize a new 3D object for the camera to look at
    camTarget = new Object3D()

    //Create scene
    scene = new Scene();

    //Initialize container & dragfield
    //container = ref(null)

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

    //----- Load the first and second project ------
    requestedProjects.push(projectsStore.currentProject, projectsStore.currentProject + 1)

    loadProjects()

    //----- Load the room ------
    //loadFirst(projects[projectsStore.currentProject])

    //----- Load next item -----
    //loadNext(nextProject.value)
}

async function loadProjects() {
    let last = requestedProjects[requestedProjects.length - 1]

    // prevent last to be lower than lastloaded
    if (last < lastloaded) {last = last + lastloaded + 1}

    // load the projects
    for (let i = lastloaded+1; i <= last; i++) {
        await loadNext(projects[i])

        if (i == projects.length-1) {
            lastloaded = -1
        } else lastloaded = i
    }

    // remove old projects
    for (let i = 0; i < loadedProjects.length-2; i++) {
        gsap.to(
            loadedProjects[i].gltf.scene.position, 
            {
                x: 20, y: -2, z: 0, 
                onComplete: removeModel, 
                onCompleteParams: [loadedProjects[i].gltf.scene], 
                duration: 2, 
                ease: "power2.inOut"
            }
        )
        loadedProjects.shift()
    }

    // move current project into view
    if (loadedProjects.length >= 2) {
        gsap.to(loadedProjects[loadedProjects.length-2].gltf.scene.position, {x: 0, y: -2, z: 0, duration: 2, ease: "power2.inOut"})
    }
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

async function loadNext(model: projectVis) {
    [model.gltf] = await Promise.all([loader.loadAsync(model.url)])
    model.gltf.scene.position.set(-20, -2, 0)
    //transformControl.attach(model.gltf.scene)
    scene.add(model.gltf.scene)
    loadedProjects.push(model)
}

function removeModel(model: Object3D) {
    scene.remove(model)
    console.log('removed' + model)
    //loadNext(nextProject.value)
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
    } else console.log(container.value)
}

//Add orbit controls
function setOrbitControls() {
    orbit = new OrbitControls( hiddenCamera, renderer.domElement)
    orbit.enableDamping = true
    orbit.maxPolarAngle = Math.PI / 2;
    orbit.enableZoom = true
    orbit.zoomSpeed = 4
    orbit.enablePan = true
    orbit.autoRotate = true
    orbit.enableZoom = true
}

//Add animations
function animate() {
    // Handle rotation of the object
    orbit.update()
 
    // check if the active project can be reached
    if (loadedProjects[loadedProjects.length-2]) {
        // get the angles for rotating the 3D model
        var polar = orbit.getPolarAngle() - Math.PI / 3
        var azimuth = orbit.getAzimuthalAngle() * -1

        // get the zoom for scaling the 3D model NOT FINISHED
        var zoom = orbit.target.distanceTo( orbit.object.position )

        var q = new Quaternion()
        var axis = new Vector3(0, 1, 0)

        q.setFromAxisAngle(axis, azimuth)
        q.setFromEuler(new Euler(polar, azimuth, 0))

        loadedProjects[loadedProjects.length-2].gltf.scene.quaternion.copy( q )
    }
    
    // render scene according to the camera
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
    console.log(currentProject.value)
    let last = projects.length - 1
    let requested = projectsStore.currentProject
    if (requested == last) {
        requestedProjects.push(0)
    } else if (requested < last) {
        requestedProjects.push(requested + 1)
    } else {
        requestedProjects = [1, 2]
    }

    loadProjects()
})

onMounted(() => {
    setRenderer()
    setOrbitControls()
    renderer.setAnimationLoop(animate)
})

</script>

<style>

</style>