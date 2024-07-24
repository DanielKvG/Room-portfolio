export interface pageParams {
    id: number,
    route: string,
}

export const pageOrder: Array<pageParams> = [
    {
        id: 0,
        route: '/home'
    },
    {
        id: 1,
        route: '/desk'
    },
    {
        id: 2,
        route: '/roadmap'
    },
    {
        id: 3,
        route: '/hobbycorner'
    },
]