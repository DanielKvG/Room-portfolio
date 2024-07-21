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
    {
        //Add home as last element to create loop
        id: 4,
        route: '/home'
    },
]