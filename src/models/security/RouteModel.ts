export interface RouteModel {
    id: string
    name: string
    routes: WebRoute[]
}

export interface WebRoute {
    action: string
    name: string
    description: any
    location: string
    apiRoute: ApiRoute[]
}

export interface ApiRoute {
    action: string
    name: string
    description: any
    location: string
}

export interface RouteToWebModel {
    id: string
    name: string
    routes: Route[]
}

interface Route {
    id: string
    name: string
    resource: string
}
