export interface SeriesModel {
    id: number;
    nameSeries: string;
    correlative: number;
    nameVaucher: string;
    destination: string;
    active: boolean;
}

export interface SeriesStoreOrUpdatedRequest extends Omit<SeriesModel, 'id' | 'nameVaucher' | 'destination' | 'active' >{}
