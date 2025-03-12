import { defineStore } from "pinia";

export const useStore = defineStore('store', () => {
    const router = useRouter()
    const projectsDialog = ref(false)
    const menuDialog = ref(false)

    function navTo(route: string) {
        router.push(route)
    }

    function toProjects() {
        projectsDialog.value = true
    }

    function back() {
        router.back()
    }

    return {
        projectsDialog,
        menuDialog,
        navTo,
        toProjects,
        back,
    }
})