<template>
    <div class="absolute top-0 left-0 right-0 bottom-0 flex flex-col p-16 justify-center gap-12 h-full w-full bg-white">
        <!-- ICONS -->
        <div class="flex flex-row gap-8">
            <svg xmlns="http://www.w3.org/2000/svg" width="92" height="92" viewBox="0 0 46 46" fill="none">
                <path d="M4.3125 30.1875L14.2006 20.2994C15.8847 18.6153 18.6153 18.6153 20.2994 20.2994L30.1875 30.1875M27.3125 27.3125L30.0131 24.6119C31.6972 22.9278 34.4278 22.9278 36.1119 24.6119L41.6875 30.1875M7.1875 37.375H38.8125C40.4003 37.375 41.6875 36.0878 41.6875 34.5V11.5C41.6875 9.91218 40.4003 8.625 38.8125 8.625H7.1875C5.59968 8.625 4.3125 9.91218 4.3125 11.5V34.5C4.3125 36.0878 5.59968 37.375 7.1875 37.375ZM27.3125 15.8125H27.3269V15.8269H27.3125V15.8125ZM28.0312 15.8125C28.0312 16.2095 27.7095 16.5312 27.3125 16.5312C26.9155 16.5312 26.5938 16.2095 26.5938 15.8125C26.5938 15.4155 26.9155 15.0938 27.3125 15.0938C27.7095 15.0938 28.0312 15.4155 28.0312 15.8125Z" stroke="#0F172A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" width="92" height="92" viewBox="0 0 46 46" fill="none">
                <path d="M27.3125 18.6875L31.625 23L27.3125 27.3125M18.6875 27.3125L14.375 23L18.6875 18.6875M11.5 38.8125H34.5C36.8817 38.8125 38.8125 36.8817 38.8125 34.5V11.5C38.8125 9.11827 36.8817 7.1875 34.5 7.1875H11.5C9.11827 7.1875 7.1875 9.11827 7.1875 11.5V34.5C7.1875 36.8817 9.11827 38.8125 11.5 38.8125Z" stroke="#0F172A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" width="92" height="92" viewBox="0 0 46 46" fill="none">
                <path d="M21.8871 29.0746L33.0625 40.25C35.0473 42.2348 38.2652 42.2348 40.25 40.25C42.2348 38.2652 42.2348 35.0473 40.25 33.0625L28.9863 21.7988M21.8871 29.0746L26.6713 23.2652C27.277 22.5297 28.0872 22.067 28.9863 21.7988M21.8871 29.0746L12.9649 39.9086C12.0374 41.035 10.6547 41.6875 9.19556 41.6875C6.49872 41.6875 4.3125 39.5013 4.3125 36.8044C4.3125 35.3453 4.96502 33.9626 6.09136 33.0351L19.1947 22.2441M28.9863 21.7988C30.0393 21.4847 31.2144 21.4375 32.3263 21.5315C32.569 21.552 32.8145 21.5625 33.0625 21.5625C37.826 21.5625 41.6875 17.701 41.6875 12.9375C41.6875 11.672 41.4149 10.4701 40.9253 9.38743L34.646 15.6668C32.5076 15.1759 30.8244 13.4926 30.3335 11.3543L36.6129 5.07483C35.5301 4.58511 34.3282 4.3125 33.0625 4.3125C28.299 4.3125 24.4375 8.17404 24.4375 12.9375C24.4375 13.1855 24.448 13.431 24.4685 13.6737C24.6427 15.735 24.3317 18.0136 22.7348 19.3287L22.5392 19.4898M19.1947 22.2441L11.3256 14.375H8.625L4.3125 7.1875L7.1875 4.3125L14.375 8.625V11.3256L22.5392 19.4898M19.1947 22.2441L22.5392 19.4898M35.2188 35.2188L30.1875 30.1875M9.32886 36.6563H9.34324V36.6707H9.32886V36.6563Z" stroke="#0F172A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </div>

        <div id="project-selector" class="absolute left-0 right-0 bottom-0 flex flex-row justify-center bg-blue-500">
            <svg xmlns="http://www.w3.org/2000/svg" width="114" height="114" viewBox="0 0 57 57" fill="none">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M42.094 36.4533C41.2431 37.2715 39.8899 37.245 39.0717 36.394L28.5 25.1714L17.9283 36.394C17.1101 37.245 15.7569 37.2715 14.906 36.4533C14.055 35.635 14.0285 34.2819 14.8467 33.431L26.9592 20.606C27.3622 20.1868 27.9186 19.95 28.5 19.95C29.0814 19.95 29.6378 20.1868 30.0408 20.606L42.1533 33.431C42.9715 34.2819 42.945 35.635 42.094 36.4533Z" fill="#0F172A"/>
            </svg>
        </div>
        
        <!-- Text -->
        <h2 id="toProjects" class="text-[96px] w-full">View projects</h2>
        <!-- CAROUSEL -->
        <!-- <h1 style="font-size: 88px;" @click="doFlip">Projects</h1>
        <div id="project-carousel">
            <div class="project-item" v-for="category in categories" :key="category"><h3>{{ category }}</h3></div>
        </div>
        <div id="top"></div>
        <div id="bottom"></div> -->
    </div>
</template>

<script setup lang="ts">
import { useStore } from '~/store/store';

// CAROUSEL
// import gsap from 'gsap';
// import Flip from 'gsap/Flip';

// const categories: Array<string> = ['3D moddeling', 'Other', 'Beunen', 'Graphic design', 'Programming', '3D moddeling', 'Other', 'Beunen', 'Graphic design', 'Programming']
// let catElements: Array<Element>

// gsap.registerPlugin(Flip);

// onMounted(() => {
    
// })


// function doFlip() {
//     catElements = gsap.utils.toArray(".project-item");
//     // Get the initial state
//     const state = Flip.getState(catElements);
    
//     // Make DOM or styling changes (swap the squares in our case)
//     swap(catElements);
    
//     // Animate from the initial state to the end state
//     Flip.from(state, {duration: 1, ease: "power1.inOut", scale: true});
// }

// // Given an Array of two siblings, append the one that's first so it's last (swap)
// function swap([a, b, c, d, e, f, g, h, i, j]: Array<Element>) {
//     if (a.parentNode) {
//         a.parentNode.children[0] === a ? a.parentNode.appendChild(a) : a.parentNode.appendChild(j);
//     }
// }

</script>

<style scoped lang="scss">
// .projectpage {
//     position: absolute;
//     display: grid;
//     grid-template-columns: 1fr 1fr;
//     top: 0;
//     left: 0;
//     right: 0;
//     bottom: 0;
//     background: #fefefee0;
//     pointer-events: all;
    
//     h1 {
//         margin: auto 56px;
//         padding-bottom: 16px;
//         line-height: 140%;
//         cursor: pointer;
//     }

//     #project-carousel {
//         display: flex;
//         flex-direction: column;
//         align-items: center;
//         justify-content: center;
//         gap: 24px;
//         padding-right: 40px;

//         div {
//             display: flex;
//             flex-direction: row;
//             justify-content: center;
//         }
//         // first target even and odd childs
//         div:nth-child(2n) {
//             h3{
//                 font-size: 56px;
//                 line-height: 120%;
//                 font-weight: 400;      
//             }
//         }
//         div:nth-child(2n + 1) {
//             h3{
//                 font-size: 40px;
//                 line-height: 120%;
//                 font-weight: 400;
//             }
//         }
//         // then target middle child
//         div:nth-child(5) {
//             h3 {
//                 font-size: 72px;
//                 line-height: 150%;
//                 font-weight: 500;     
//             }
//         }
//         // then target outer childs
//         div:nth-child(2), div:nth-child(8) {
//             h3 {
//                 //opacity: 0;
//                 font-size: 1px;
//                 font-weight: 400;  
//             }
            
//         }
//         // then target first and last
//         div:first-child, div:nth-last-child(-n + 2) {
//             display: none;
//         }
//     }
// }

// #top {
//     position: absolute;
//     top: 0;
//     left: 0;
//     right: 0;
//     height: 220px;
//     background: linear-gradient(0deg, rgba(112, 112, 112, 0.00) 0%, rgba(112, 112, 112, 0.50) 46.1%, #707070 100%);
// }

// #bottom {
//     position: absolute;
//     bottom: 0;
//     left: 0;
//     right: 0;
//     height: 220px;
//     background: linear-gradient(180deg, rgba(112, 112, 112, 0.00) 0%, rgba(112, 112, 112, 0.50) 46.1%, #707070 100%);
// }

</style>