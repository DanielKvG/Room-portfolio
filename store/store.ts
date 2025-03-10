import { defineStore } from "pinia";

export const useStore = defineStore('store', () => {
    const router = useRouter()
    const projectsDialog = ref(false)

    function navTo(route: string) {
        router.push(route)
    }

    function toProjects() {
        console.log('ive been pushed')
        //router.push('/desk/projects')
        projectsDialog.value = true
    }

    function back() {
        router.back()
    }

    return {
        projectsDialog,
        navTo,
        toProjects,
        back,
    }
})