<template>

    <div class="page">
        <ClientOnly class="threeJS">
            <ThreeScene ref="threeScene"/>
        </ClientOnly>
        <div class="html-pagina">
            <div class="name">
                <h1>Dani&euml;l KvG</h1>
                <h2>Kooyman van Guldener</h2>
            </div>
            <slot></slot> <!-- route -->
        </div>
        <div class="achtergrond">
            <div id="intro-column"></div>
            <div id="controls-column"></div>
        </div>
        <div class="controlls">
            <h2 style="margin-bottom: 16px">Controlls</h2>
            <div class="keys">
                <div class="vertical-keys">
                    <div class="key">
                        <div class="keyframe" style="padding: 0px 4px 16px 12px;">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="23" viewBox="0 0 24 23" fill="none">
                                <path d="M17.25 7.25L21 11M21 11L17.25 14.75M21 11H3" stroke="#F8F8F8" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </div>
                        <p>Enter room / Next scene</p>
                    </div>
                    <div class="key">
                        <div class="keyframe" style="padding: 0px 12px 16px 4px;">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="23" viewBox="0 0 24 23" fill="none">
                                <path d="M6.75 14.75L3 11M3 11L6.75 7.25M3 11H21" stroke="#F8F8F8" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </div>
                        <p>Previous scene</p>
                    </div>
                </div>
                <div class="vertical-keys">
                    <div class="key">
                        <div class="keyframe" style="padding: 2px 8px 18px 4px;">
                            <p style="color: white;">Esc</p>
                        </div>
                        <p>Exit room</p>
                    </div>
                    <!-- <div class="key">
                        <div class="keyframe" style="padding: 0px 7px 0px 7px; background: none; border: 1.5px solid transparent">
                            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="40" viewBox="0 0 26 40" fill="none">
                                <path d="M6 37.5867L2 33.7858L0.5 29.5626V10.9804L2.5 5.49018L6.5 1.68927L12.5 0.422302L21 2.53392L25 8.86876V29.5626L22.5 35.4751L17.5 39.276H10L6 37.5867Z" fill="#8DC3FF"/>
                                <path d="M13 16.8929H1V9.71338L3 5.49015L7 1.26693L13 0.844604V16.8929Z" fill="#57A1FF"/>
                                <path d="M21.8897 35.8899L21.8898 35.8898C23.7724 34.0075 24.9431 31.4082 24.9431 28.5486V17.9683V17.4683H24.4431H1.55688H1.05688V17.9683V28.5486C1.05688 31.4082 2.22763 34.0075 4.1102 35.8898C5.99271 37.772 8.59315 38.9434 11.4525 38.9434H14.5475C17.4069 38.9434 20.0065 37.772 21.8897 35.8899ZM24.4431 16.9117H24.9431V16.4117V11.4507C24.9431 8.59173 23.7723 5.99249 21.8899 4.1095L21.8897 4.10935C20.0064 2.22718 17.4068 1.05663 14.5475 1.05663H13.5H13H12.5H11.4525C8.59324 1.05663 5.99278 2.22714 4.1102 4.10943L4.11012 4.1095C2.22765 5.99249 1.05688 8.59173 1.05688 11.4507V16.4117V16.9117H1.55688H12.5H13H13.5H24.4431ZM13 6.34305L13.4767 6.3653C13.791 6.37997 14.1132 6.56736 14.3721 6.89703C14.6309 7.22655 14.7807 7.64374 14.7807 8.00796V11.3078C14.7807 11.6763 14.6279 12.125 14.3644 12.4785C14.0986 12.8352 13.7853 13.0143 13.5 13.0143H13H12.5C12.2141 13.0143 11.9009 12.8355 11.6354 12.4797C11.3722 12.127 11.2193 11.6785 11.2193 11.3078V8.00796C11.2193 7.64153 11.3692 7.22448 11.6277 6.89579C11.8863 6.567 12.2084 6.38 12.5233 6.3653L13 6.34305ZM3.71706 3.71671L3.7172 3.71658C5.7025 1.73085 8.44173 0.5 11.4525 0.5H14.5475C17.5583 0.5 20.2975 1.73085 22.2828 3.71658L22.2829 3.71671C24.269 5.70169 25.5 8.44045 25.5 11.4507V28.5486C25.5 31.5595 24.269 34.2975 22.2829 36.2834L22.2828 36.2834C20.2975 38.2691 17.5583 39.5 14.5475 39.5H11.4525C8.44173 39.5 5.7025 38.2691 3.7172 36.2834L3.71713 36.2834C1.73099 34.2975 0.5 31.5595 0.5 28.5486V11.4507C0.5 8.44045 1.73102 5.70169 3.71706 3.71671Z" fill="#3D3D3D" stroke="#F8F8F8"/>
                            </svg>
                        </div>
                        <p>Click</p>
                    </div> -->
                </div>
            </div>
        </div>
    </div>

</template>

<script setup lang="ts">

let threeScene: Ref = ref(null)
const router = useRouter()

</script>

<style lang="scss">
.threeJS {
    pointer-events: none;
    
}

.html-pagina {
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 10;
    padding: 24px 48px;
    gap: 48px;
    color: #fefefe;

    .name {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        //gap: 8px;

        h1 {
            font-size: 56px;
            line-height: 105%;
        }
    }
}

.achtergrond {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: -1;
    display: grid;
    grid-template-columns: auto auto auto auto auto auto auto;
    column-gap: 0px;

    #intro-column {
        background: #12072B;
        grid-column: 1 / span 4;
    }
    #controls-column {
        background: #D9E9FF;
        grid-column: 5 / span 3;
    }
}

.next-page-button {
    position: absolute;
    top: 0;
    bottom: 0;
    right: 40px;
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
}

.controlls {
    position: absolute;
    bottom: 16px;
    right: 32px;
    padding: 24px;
    background: rgba(217, 233, 255, 0.50);

    .keys {
        display: flex;
        flex-direction: column;
        gap: 24px;

        .vertical-keys {
            display: flex;
            flex-direction: column;
            gap: 24px;

            .key {
                display: flex;
                align-items: center;
                gap: 16px;
                width: 176px;

                p {
                    margin: 0;
                }

                .keyframe {
                    display: flex;
                    justify-content: flex-end;
                    align-items: center;

                    border-radius: 8px;
                    border: 1.5px solid var(--grey-50, #F8F8F8);
                    background: var(--primary-400, #57A1FF);
                }
            }
        }
    }
}

/* Vertical Styles */
@media (max-width: 1024px) {
    .html-pagina {
        padding: 24px 16px;
    }
    .name {
        h1 {
            font-size: 40px;
        }
        h2 {
            font-size: 20px;
        }
    }
    
    .controlls {
        display: none;
    }

    .achtergrond {
        grid-auto-rows: auto;

        #intro-column {
            grid-column: 1 / span 7;
            grid-row: 1 / span 5;
        }
        #controls-column {
            grid-column: 1 / span 7;
            grid-row: 6 / span 2;
        }
    }
}

</style>