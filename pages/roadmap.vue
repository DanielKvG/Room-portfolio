<template>
    <div id="roadmap">
        <h2 style="margin-bottom: 16px;">Roadmap</h2>
        <div class="roadmap-item" :class="{ active: item.value.active }" v-for="(item, index) in roadmap" :key="item.value.header">
            <div class="item-header" @click="ToggleActiveItem(index)">
                <div class="item-header-number">
                    <h1>{{ index+1 }}</h1>
                </div>
                <h3 style="width: 100%;">{{ item.value.header }}</h3>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" :class="{rotate: item.value.active}">
                    <path d="M4.5 15.75L12 8.25L19.5 15.75" stroke="#183590" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </div>
            <div class="item-specs">
                <ul>
                    <li v-for="spec in item.value.specs" :key="spec"><p>{{ spec }}</p></li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { roadmapData as roadmap } from "../components/RoadmapData";

const router = useRouter()

definePageMeta({
  layout: 'mainpage'
})

function ToggleActiveItem( item: number ) {
    for (let i=0; i<roadmap.length; i++) {
        if (i == item) {
            roadmap[i].value.active = !roadmap[i].value.active
            console.log('huts')
        }
        else roadmap[i].value.active = false
    }
}

async function loadContent() {
    await new Promise(f => setTimeout(f, 2000));
    document.getElementById('roadmap')?.setAttribute("style", "opacity: 1;")
}
onMounted(() => {
    loadContent()
})
</script>

<style scoped lang="scss">
#roadmap {
    opacity: 0;
    align-self: stretch;
    margin: 0 auto;
    transition: opacity 300ms ease-in;
}

.roadmap-item {
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
    margin-top: 16px;
    max-height: 40px;
    overflow: hidden;
    max-width: 328px;
    cursor: pointer;

    border-radius: 8px;
    background: var(--secondary-300, #D9E9FF);
    border: 4px solid var(--primary-900, #183590);
    color: #183590;
    transition: max-height 500ms ease-in-out, background 500ms;

    &.active {
        max-height: 140px; 
        background: var(--secondary-300, #78FDC4);
    }

    .item-header {
        display: flex;
        align-items: center;
        align-self: stretch;

        .item-header-number {
            display: flex;
            width: 56px;
            flex-direction: column;
            justify-content: center;
            align-items: center;

            h1 {
                font-size: 24px;
                line-height: 40px;
            }
        }

        svg {
            margin-right: 16px;
            transform: rotate(180deg);
            transition: transform 500ms;

            &.rotate {
                transform: rotate(0deg);
            }
        }
    }

    .item-specs {
        display: flex;
        align-self: stretch;
        background: white;
        align-items: start;
        border-radius: 0 0 6px 6px;

        ul {
            margin: 8px 0 0 0;
        }
    }
}

/* Vertical Styles */
@media (max-width: 1024px) {
    #roadmap {
        margin-top: 120px;
        pointer-events: all;
    }
}

</style>