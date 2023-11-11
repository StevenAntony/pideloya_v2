interface ITable {
    id: number;
    nameUser: string;
    state: 'Libre'|'Ocupado';
    description: string;
    time: number|null;
}
