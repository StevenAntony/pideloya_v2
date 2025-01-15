export interface UnitModel {
    id: number;
    name: string;
    valueInUnit: number;
    abbreviation: string;
    status?: boolean;
}

export interface UnitStoreModel {
    name: string;
    valueInUnit: number;
    abbreviation: string;
}
