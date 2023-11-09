interface ITable {
    id: string;
    nameUser: string;
    state: 'Libre'|'Ocupado';
    description: string;
    time: number|null;
}