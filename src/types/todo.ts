// ITodo의 배열이 가질 수 있는 각각의 타입
export interface ITodo {
    id: string
    text: string
    completed: boolean
}

// FiltersType이 가질 수 있는 타입의 종류(?)
export type FiltersType = 'all' | 'active' | 'completed'