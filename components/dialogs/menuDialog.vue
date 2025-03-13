<template>
    <USlideover v-model="store.menuDialog" side="bottom" :ui="{ wrapper: 'justify-center', base: 'w-full max-w-6xl', rounded: 'rounded-t-2xl', height: '' }">
        <UCard class="divide-none h-[624px]">
            <template #header>
                <div class="flex items-center justify-end">
                    <UButton variant="ghost" icon="i-heroicons-x-mark-20-solid" size="xl" @click="[ store.menuDialog = false ]"></UButton>
                </div>
            </template>
            <div class="flex flex-col items-center px-8 divide-y divide-primary-400">
                <h1 @click="navTo('/home')" class="cursor-pointer text-primary-950 w-full leading-[80px]">Home</h1>
                <h1 @click="navTo('/desk')" class="cursor-pointer text-primary-950 w-full leading-[80px]">Desk</h1>
                <h1 @click="navTo('/roadmap')" class="cursor-pointer text-primary-950 w-full leading-[80px]">Roadmap</h1>
                <h1 @click="navTo('/hobbycorner')" class="cursor-pointer text-primary-950 w-full leading-[80px]">Hobbies</h1>
            </div>
        </UCard>
    </USlideover>
</template>

<script setup lang="ts">
import { useStore } from '~/store/store';

const router = useRouter()
const store = useStore()

function navTo(route: string) {
    store.menuDialog = false
    router.push(route)
}


</script>