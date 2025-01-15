export interface UserListModel {
    id: number
    name: string
    email: string
    access: number[]
    active: number
    type: Type
    policies: string
}

interface Type {
    name: string
    color: string
    value: string
}
