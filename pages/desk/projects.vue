<template>
    <h1>Welcome to my project page!</h1>
    <button @click="router.back">Go back</button>
</template>

<script setup lang="ts">
const router = useRouter()
</script>