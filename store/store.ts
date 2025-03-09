import { defineStore } from "pinia";

export const useStore = defineStore('store', () => {
    const router = useRouter()

    function navTo(route: string) {
        router.push(route)
    }

    function toProjects() {
        console.log('ive been pushed')
        router.push('/desk/projects')
        
    }

    function back() {
        router.back()
    }

    return {
        navTo,
        toProjects,
        back,
    }
})