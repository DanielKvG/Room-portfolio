<template>
    <UModal v-model="store.projectsDialog">
        <div class="w-48 h-48 bg-white rounded-lg">
            hi
        </div>
    </UModal>
</template>

<script setup lang="ts">
import { useStore } from '~/store/store';


const store = useStore()

</script>