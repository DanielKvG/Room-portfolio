<template>
    <div class="projectpage">
        <h1 style="font-size: 88px;" @click="doFlip">Projects</h1>
        <div id="project-carousel">
            <div class="project-item" v-for="category in categories" :key="category"><h3>{{ category }}</h3></div>
        </div>
        <div id="top"></div>
        <div id="bottom"></div>
    </div>
</template>

<script setup lang="ts">
import gsap from 'gsap';
import Flip from 'gsap/Flip';

const categories: Array<string> = ['3D moddeling', 'Other', 'Beunen', 'Graphic design', 'Programming', '3D moddeling', 'Other', 'Beunen', 'Graphic design', 'Programming']
let catElements: Array<Element>

gsap.registerPlugin(Flip);

onMounted(() => {
    
})


function doFlip() {
    catElements = gsap.utils.toArray(".project-item");
    // Get the initial state
    const state = Flip.getState(catElements);
    
    // Make DOM or styling changes (swap the squares in our case)
    swap(catElements);
    
    // Animate from the initial state to the end state
    Flip.from(state, {duration: 1, ease: "power1.inOut", scale: true});
}

// Given an Array of two siblings, append the one that's first so it's last (swap)
function swap([a, b, c, d, e, f, g, h, i, j]: Array<Element>) {
    if (a.parentNode) {
        a.parentNode.children[0] === a ? a.parentNode.appendChild(a) : a.parentNode.appendChild(j);
    }
}

</script>

<style scoped lang="scss">
.projectpage {
    position: absolute;
    display: grid;
    grid-template-columns: 1fr 1fr;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: #fefefee0;
    pointer-events: all;
    
    h1 {
        margin: auto 56px;
        padding-bottom: 16px;
        line-height: 140%;
        cursor: pointer;
    }

    #project-carousel {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 24px;
        padding-right: 40px;

        div {
            display: flex;
            flex-direction: row;
            justify-content: center;
        }
        // first target even and odd childs
        div:nth-child(2n) {
            h3{
                font-size: 56px;
                line-height: 120%;
                font-weight: 400;      
            }
        }
        div:nth-child(2n + 1) {
            h3{
                font-size: 40px;
                line-height: 120%;
                font-weight: 400;
            }
        }
        // then target middle child
        div:nth-child(5) {
            h3 {
                font-size: 72px;
                line-height: 150%;
                font-weight: 500;     
            }
        }
        // then target outer childs
        div:nth-child(2), div:nth-child(8) {
            h3 {
                //opacity: 0;
                font-size: 1px;
                font-weight: 400;  
            }
            
        }
        // then target first and last
        div:first-child, div:nth-last-child(-n + 2) {
            display: none;
        }
    }
}

#top {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 220px;
    background: linear-gradient(0deg, rgba(112, 112, 112, 0.00) 0%, rgba(112, 112, 112, 0.50) 46.1%, #707070 100%);
}

#bottom {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 220px;
    background: linear-gradient(180deg, rgba(112, 112, 112, 0.00) 0%, rgba(112, 112, 112, 0.50) 46.1%, #707070 100%);
}

</style>