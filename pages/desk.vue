<template>
  <div class="absolute-frame">
    <button @click="NextView" class="next-page">
        <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64" fill="none">
            <path d="M36 12L56 32M56 32L36 52M56 32H8" stroke="#EEF6FF" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
    </button>
    <button @click="NextView" class="prevous-page">
        <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64" fill="none">
            <path d="M36 12L56 32M56 32L36 52M56 32H8" stroke="#EEF6FF" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
    </button>
  </div>
</template>

<script lang="ts" setup>
const router = useRouter()

definePageMeta({
  layout: 'mainpage'
})

function NextView() {
    router.push({ path: '/' })
}
</script>

<style lang="scss">

button {
    position: absolute;
    top: 0;
    bottom: 0;
    margin: auto 0;
    height: 112px;
    border: none;
    display: inline-flex;
    padding: 24px;
    align-items: center;
    gap: 10px;
    cursor: pointer;

    border-radius: 32px;
    background: rgba(0, 0, 0, 0.46);

    &.next-page {
      right: 40px;
    }

    &.prevous-page {
      left: 40px;
      transform: rotate(180deg);
    }
}
</style>