<template>
    <div id="index-menu">
        <div class="intro">
            <span><p>I’m an &nbsp; </p><h3>Industrial design Engineer</h3><p>&nbsp; with</p></span>
            <span><p>passion for &nbsp;</p><h3>UX</h3><p>&nbsp; - digital and physical.</p></span>
        </div>
        <div class="menu">
            <div class="menu-item" @click="NextView('/home')">
                <div class="menu-iconframe">
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
                        <path d="M15 11.25V25M25 15V28.75M25.8385 34.5807L33.9635 30.5182C34.5987 30.2006 35 29.5514 35 28.8412V8.03381C35 6.63997 33.5332 5.73342 32.2865 6.35676L25.8385 9.58074C25.3107 9.84467 24.6893 9.84467 24.1615 9.58074L15.8385 5.41926C15.3107 5.15533 14.6893 5.15533 14.1615 5.41926L6.03647 9.48176C5.40125 9.79937 5 10.4486 5 11.1588V31.9662C5 33.36 6.46684 34.2666 7.71352 33.6432L14.1615 30.4193C14.6893 30.1553 15.3107 30.1553 15.8385 30.4193L24.1615 34.5807C24.6893 34.8447 25.3107 34.8447 25.8385 34.5807Z" stroke="#EEF6FF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </div>
                <h1>Roadmap</h1>
            </div>
            <div class="menu-item" @click="NextView('/desk')">
                <div class="menu-iconframe">
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
                        <path d="M15 28.75V30.4289C15 31.755 14.4732 33.0268 13.5355 33.9645L12.5 35H27.5L26.4645 33.9645C25.5268 33.0268 25 31.755 25 30.4289V28.75M35 8.75V25C35 27.0711 33.3211 28.75 31.25 28.75H8.75C6.67893 28.75 5 27.0711 5 25V8.75M35 8.75C35 6.67893 33.3211 5 31.25 5H8.75C6.67893 5 5 6.67893 5 8.75M35 8.75V20C35 22.0711 33.3211 23.75 31.25 23.75H8.75C6.67893 23.75 5 22.0711 5 20V8.75" stroke="#EEF6FF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </div>
                <h1>The desk</h1>
            </div>
            <div class="menu-item">
                <div class="menu-iconframe">
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
                        <path d="M15 11.25V25M25 15V28.75M25.8385 34.5807L33.9635 30.5182C34.5987 30.2006 35 29.5514 35 28.8412V8.03381C35 6.63997 33.5332 5.73342 32.2865 6.35676L25.8385 9.58074C25.3107 9.84467 24.6893 9.84467 24.1615 9.58074L15.8385 5.41926C15.3107 5.15533 14.6893 5.15533 14.1615 5.41926L6.03647 9.48176C5.40125 9.79937 5 10.4486 5 11.1588V31.9662C5 33.36 6.46684 34.2666 7.71352 33.6432L14.1615 30.4193C14.6893 30.1553 15.3107 30.1553 15.8385 30.4193L24.1615 34.5807C24.6893 34.8447 25.3107 34.8447 25.8385 34.5807Z" stroke="#EEF6FF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </div>
                <h1>Hobby corner</h1>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">

const router = useRouter()

definePageMeta({
  layout: 'mainpage'
})

function NextView(route: string) {
    // if (threeScene.value) {
    //     threeScene.value.goToNextPos('burea')
    // } else {
    //     console.log('error')
    // }
    // console.log('clicked in parent')
    router.push({ path: route })
}


</script>

<style lang="scss">
#index-menu {
    display: flex;
    flex-direction: column;
    gap: 40px;
}

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

.menu {
    display: flex;
    width: 366px;
    flex-direction: column;
    align-items: flex-start;
    gap: 40px;

    .menu-item {
        display: flex;
        align-items: center;
        gap: 16px;
        cursor: pointer;
        

        &:hover h1, &:hover path {
            color: #0CDB84;
            stroke: #0CDB84;
            transition: all 200ms ease-in-out;
        }

        .menu-iconframe {
            display: flex;
            padding: 16px;
            align-items: center;

            border-radius: 16px;
            background: rgba(217, 233, 255, 0.21);
        }
    }
}
</style>