import { defineStore } from 'pinia'
import { type GLTF } from 'three/examples/jsm/Addons.js';

export const useProjectStore = defineStore('useProjectStore', () => {
  const currentProject = ref(0)
  const projects = [
    {
        gltf: <GLTF | undefined> undefined,
        url: "/models/basicRoom.glb"
    },
    {
        gltf: <GLTF | undefined> undefined,
        url: "/models/duckkie.glb"
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
