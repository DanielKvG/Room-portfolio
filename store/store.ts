import { defineStore } from "pinia";
import { Object3D } from "three";

export const useStore = defineStore('store', () => {
    const router = useRouter()
    const projectsDialog = ref(false)
    const menuDialog = ref(false)
    const page = ref({
        open: false,
        subject: ''
    })
    const selected = ref<any>()
    const highlighted = ref<any>()


    function navTo(route: string) {
        router.push(route)
    }

    function toProjects() {
        projectsDialog.value = true
    }

    function back() {
        router.back()
    }

    function setSelected(item: Object3D) {
        selected.value = item
    }

    function setHighlighted(item: Object3D) {
        highlighted.value = item
    }

    return {
        projectsDialog,
        menuDialog,
        selected,
        highlighted,
        page,
        navTo,
        toProjects,
        back,
        setSelected,
        setHighlighted
    }
})