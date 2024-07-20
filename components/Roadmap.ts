export interface Roadmap {
    header: string;
    specs: Array<string>;
    active: boolean;
}

export const roadmap: Array<Ref<Roadmap>> = [
    ref({
        header: 'The bureau',
        specs: ['Laptop screen - about me', 'Desktop 1 - School', 'Desktop 2 - Projects'],
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