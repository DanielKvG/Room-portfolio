<template>
  <div id="hobby-content">
    <h1>Coming soon</h1>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: 'mainpage'
})

async function loadContent() {
    await new Promise(f => setTimeout(f, 2000));
    document.getElementById('hobby-content')?.setAttribute("style", "opacity: 1;")
}
onMounted(() => {
    loadContent()
})
</script>

<style>
#hobby-content {
    opacity: 0;
    align-self: stretch;
    margin: 80px auto;
    transition: opacity 300ms ease-in;
}
</style>