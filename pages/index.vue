<template>
    <div id="index-menu">
        <div class="intro">
            <span><p>I’m an &nbsp; </p><h3>Industrial design Engineer</h3><p>&nbsp; with</p></span>
            <span><p>passion for &nbsp;</p><h3>UX</h3><p>&nbsp;- graphic and physical.</p></span>
        </div>
        <RoadmapComp/>
    </div>
</template>

<script setup lang="ts">


definePageMeta({
  layout: 'mainpage'
})


</script>

<style lang="scss">
.intro {
    //padding: 24px 24px 16px 24px;
    margin-bottom: 56px;
    justify-content: center;
    align-items: center;

    border-radius: 8px;
    //border: 2px solid var(--primary-900, #183590);
    //background: rgba(187, 218, 255, 0.50);

    span {
        display: flex; 
        flex-direction: row; 
        align-items: baseline;
    }

    h3 {
        font-size: 20px;
        line-height: 120%;
        color: #8DC3FF;
    }
}
</style>