import { CategoryModel } from "./CategoryModel";

export interface GroupModel {
    id: number;
    name: string;
    active?: boolean;
}

export interface GroupStoreModel {
    name: string;
}

export interface GroupAllModel extends GroupModel {
    categories: Array<CategoryModel>
}
