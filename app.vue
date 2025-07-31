<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <!-- Dialogs -->
    <projectsDialog />
    <menuDialog />
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'DanielKvG',
  meta: [{ name: 'description', content: 'Portfolio website van Daniël' }],
  link: [
    { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    { rel: 'stylesheet', type: 'text/css', href:"https://cdn.jsdelivr.net/npm/@phosphor-icons/web@2.1.1/src/regular/style.css"}
  ],
  htmlAttrs: { lang: 'nl' },
})
</script>


<style>
body {
  margin: 0;
  overflow: hidden;
}

h1 {
  font-family: K2D;
  font-size: 32px;
  font-style: normal;
  font-weight: 700;
  line-height: 48px; /* 75% */
  letter-spacing: 2.56px;
  margin: 0;
}

h2 {
  font-family: K2D;
  font-size: 24px;
  font-style: normal;
  font-weight: 300;
  line-height: 32px; /* 133.333% */
  letter-spacing: 0.96px;
  margin: 0;
}

h3 {
  font-family: Arial ,sans-serif; 
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: 24px; /* 133.333% */
  margin: 0;
}

p {
  font-family: Arial ,sans-serif; 
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px; /* 125% */
  letter-spacing: 0.5px;
  margin: 0;
  margin-bottom: 8px;
  white-space: normal;
}

a {
  font-family: Arial ,sans-serif; 
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px;
  letter-spacing: 0.64px;
  text-decoration-line: underline;
  margin: 0;
}
</style>
