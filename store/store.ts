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
        page.value.subject = item.name
        page.value.open = true
    }

    function setHighlighted(item: Object3D) {
        highlighted.value = item
    }

    function closePage() {
        page.value.subject = ''
        page.value.open = false
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
        setHighlighted,
        closePage,
    }
})