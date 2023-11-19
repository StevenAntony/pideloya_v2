interface ISeries {
    id: string;
    name: string;
    correlative: number;
}

interface IVoucher {
    id: string;
    type: string;
    series?: Array<ISeries>
}