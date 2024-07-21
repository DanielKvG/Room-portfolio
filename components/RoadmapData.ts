export interface Roadmap {
    header: string;
    specs: Array<string>;
    active: boolean;
}

export const roadmapData: Array<Ref<Roadmap>> = [
    ref({
        header: 'The Desk',
        specs: ['configure screens', 'fix lag issue'],
        active: true,
    }),
    ref({
        header: 'The hobby corner',
        specs: ['Sports - gear area', 'Music - keyboard', 'Games - cabinet'],
        active: false,
    }),
    ref({
        header: 'The home cinema',
        specs: ['Video edits - cinema screen', 'Music genres - stereo'],
        active: false,
    }),
]