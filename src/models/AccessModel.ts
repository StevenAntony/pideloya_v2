export interface AccessModel {
    name: string;
    url: string;
    id: number;
    icon?: any;
    children: Child[];
}

interface Child {
    name: string;
    url: string;
    id: number;
    icon?: any;
}
