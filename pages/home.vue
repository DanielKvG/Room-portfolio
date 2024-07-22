<template>
    <div id="index-menu">
        <div class="intro">
            <span><p>I’m an &nbsp; </p><h3>Industrial design Engineer</h3><p>&nbsp; with</p></span>
            <span><p>passion for &nbsp;</p><h3>UX</h3><p>&nbsp; - digital and physical.</p></span>
        </div>
        <div class="menu">
            <div class="menu-item" @click="NextView('/desk')">
                <div class="menu-iconframe">
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
                        <path d="M15 28.75V30.4289C15 31.755 14.4732 33.0268 13.5355 33.9645L12.5 35H27.5L26.4645 33.9645C25.5268 33.0268 25 31.755 25 30.4289V28.75M35 8.75V25C35 27.0711 33.3211 28.75 31.25 28.75H8.75C6.67893 28.75 5 27.0711 5 25V8.75M35 8.75C35 6.67893 33.3211 5 31.25 5H8.75C6.67893 5 5 6.67893 5 8.75M35 8.75V20C35 22.0711 33.3211 23.75 31.25 23.75H8.75C6.67893 23.75 5 22.0711 5 20V8.75" stroke="#EEF6FF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <h1>The desk</h1>
                </div>
            </div>
            <div class="menu-item" @click="NextView('/roadmap')">
                <div class="menu-iconframe">
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
                        <path d="M15 11.25V25M25 15V28.75M25.8385 34.5807L33.9635 30.5182C34.5987 30.2006 35 29.5514 35 28.8412V8.03381C35 6.63997 33.5332 5.73342 32.2865 6.35676L25.8385 9.58074C25.3107 9.84467 24.6893 9.84467 24.1615 9.58074L15.8385 5.41926C15.3107 5.15533 14.6893 5.15533 14.1615 5.41926L6.03647 9.48176C5.40125 9.79937 5 10.4486 5 11.1588V31.9662C5 33.36 6.46684 34.2666 7.71352 33.6432L14.1615 30.4193C14.6893 30.1553 15.3107 30.1553 15.8385 30.4193L24.1615 34.5807C24.6893 34.8447 25.3107 34.8447 25.8385 34.5807Z" stroke="#EEF6FF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <h1>Roadmap</h1>
                </div>
            </div>
            <div class="menu-item" @click="NextView('/hobbycorner')">
                <div class="menu-iconframe">
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
                        <path d="M23.75 10.1449C23.75 9.55297 24.0601 9.01794 24.4187 8.547C24.7868 8.0635 25 7.49 25 6.875C25 5.14911 23.3211 3.75 21.25 3.75C19.1789 3.75 17.5 5.14911 17.5 6.875C17.5 7.49 17.7132 8.0635 18.0813 8.547C18.4399 9.01794 18.75 9.55297 18.75 10.1449V10.1449C18.75 10.747 18.2569 11.2333 17.655 11.2159C15.3156 11.1486 13.0014 10.9807 10.7165 10.7167C11.0271 13.4046 11.2045 16.1331 11.2419 18.8955C11.2501 19.5054 10.7549 19.9999 10.1449 20V20C9.55297 20 9.01794 19.6899 8.547 19.3313C8.0635 18.9632 7.49 18.75 6.875 18.75C5.14911 18.75 3.75 20.4289 3.75 22.5C3.75 24.5711 5.14911 26.25 6.875 26.25C7.49 26.25 8.0635 26.0368 8.547 25.6687C9.01794 25.3101 9.55297 25 10.1449 25V25C10.6602 25 11.0693 25.4346 11.0315 25.9486C10.8218 28.8019 10.4624 31.6137 9.96113 34.376C12.491 34.6928 15.0575 34.8914 17.6551 34.9662C18.2571 34.9835 18.7502 34.4972 18.7502 33.895V33.895C18.7502 33.303 18.4401 32.768 18.0815 32.2971C17.7134 31.8136 17.5002 31.2401 17.5002 30.6251C17.5002 28.8992 19.1791 27.5001 21.2502 27.5001C23.3213 27.5001 25.0002 28.8992 25.0002 30.6251C25.0002 31.2401 24.787 31.8136 24.4189 32.2971C24.0603 32.768 23.7502 33.303 23.7502 33.895V33.895C23.7502 34.4498 24.2136 34.8928 24.7674 34.8602C27.8321 34.6802 30.8503 34.3275 33.8127 33.812C34.2618 31.2316 34.5872 28.6087 34.7827 25.9497C34.8205 25.4352 34.411 25.0001 33.8951 25.0001V25.0001C33.3032 25.0001 32.7681 25.3102 32.2972 25.6688C31.8137 26.0369 31.2402 26.2501 30.6252 26.2501C28.8993 26.2501 27.5002 24.5711 27.5002 22.5001C27.5002 20.429 28.8993 18.7501 30.6252 18.7501C31.2402 18.7501 31.8137 18.9633 32.2972 19.3314C32.7681 19.69 33.3032 20.0001 33.8951 20.0001V20.0001C34.5056 20.0001 35.0014 19.5051 34.9931 18.8946C34.9522 15.8736 34.7438 12.8929 34.3769 9.96163C31.2338 10.5319 28.0267 10.9186 24.7671 11.1101C24.2133 11.1426 23.75 10.6997 23.75 10.1449V10.1449Z" stroke="#EEF6FF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <h1>Hobby corner</h1>
                </div>
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

        &:hover .menu-iconframe {
            max-width: 300px;
            background: rgba(217, 233, 255, 0.3);
            transition: all 300ms ease-in-out;
        }

        .menu-iconframe {
            display: flex;
            flex-direction: row;
            gap: 32px;
            padding: 16px;
            align-items: center;
            max-width: 40px;
            height: 40px;
            overflow: visible;

            border-radius: 16px;
            background: rgba(217, 233, 255, 0.21);
            transition: all 300ms ease-in-out;

            svg {
                min-width: 40px;

                path {
                    transition: all 200ms ease-in-out;
                }
            }

            h1 {
                white-space: nowrap;
                line-height: 40px;
                transition: all 200ms ease-in-out;
                padding: 16px 0;
            }
        }
    }
}

/* vertical Styles */
@media (max-width: 1024px) {
    .intro {
        p {
            font-size: 14px;
        }
        h3 {
            font-size: 18px;
        }
    }

    .menu {
        display: none;
    }
}
</style>