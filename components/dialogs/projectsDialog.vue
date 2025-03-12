<template>
    <USlideover v-model="store.projectsDialog" side="bottom" :ui="{ wrapper: 'justify-center', base: 'w-full max-w-6xl', rounded: 'rounded-t-2xl', height: 'max-h-[624px]' }">
        <div class="w-48 h-96 bg-white rounded-lg">
            hi
        </div>
    </USlideover>
</template>

<script setup lang="ts">
import { useStore } from '~/store/store';


const store = useStore()

</script>