import { defineStore } from 'pinia'
import { type GLTF } from 'three/examples/jsm/Addons.js';

export const useProjectStore = defineStore('useProjectStore', () => {
  const currentProject = ref(0)
  const projects = [
    {
        gltf: <GLTF | undefined> undefined,
        url: "/models/basicRoom.glb",
        title: 'My student room in 3D',
        text: [
          'Made as a navigation tool for my website, now it is a seperate project and acts as a symbol for the first building brick starting this website.',
          'The original use for the room was discarded, but a lot of usefull skills were learned along the way about using 3D models in web.'
        ],
        topics: [
          'Blender', 'ThreeJS'
        ]
    },
    {
        gltf: <GLTF | undefined> undefined,
        url: "/models/duckkie.glb",
        title: 'Animated duck',
        text: [
          'This was my first project using blender. Next to regular modelling, I learned to animate the duck.',
          'Mesh modelling and animating are now skills which I find very helpful throughout the whole design process from problem till solution.'
        ],
        topics: [
          'Blender', 'Animating'
        ]
    },
  ]

  const projectLength = projects.length

  function nextProject() {
    if (currentProject.value + 1 == projectLength) {
      currentProject.value = 0
    }
    else currentProject.value++
  }

  function getProject() {
    return projects[currentProject.value]
  }

  function getNextProject() {
    if (currentProject.value + 1 == projectLength) {
      return projects[0]
    }
    else return projects[currentProject.value + 1]
  }

  return {
    currentProject,
    projects,
    nextProject,
    getProject,
    getNextProject,
  }
})
