export interface DriverModel {
    documentType: string;
    document: string;
    name: string;
    lastName: string;
    license: string;
    principal: boolean;
}

export interface VehiclePlate {
    plate: string;
    principal: boolean;
}

interface Detail {
    presentationID: number;
    quantity: number;
    description: string;
    note: null|string;
    unit: string;
}

interface AnswerSunat {
    code: number;
    description: string;
    observations: string;
    XML: string;
    CDR: string;
}

export interface RemissionGuideModel {
    id: number;
    transferReason: string;
    transferMode: string;
    transferDate: string;
    issue: string;
    pesoTotal: number;
    ubigeoDeparture: string;
    addressDeparture: string;
    ubigeoArrival: string;
    addressArrival: string;
    transportistDocumentType: string;
    transportistDocument: string;
    transportistName: string;
    transportistRegistrationNumber:string;
    drivers: DriverModel[];
    vehiclePlates: VehiclePlate[];
    details: Detail[];
    active: boolean;
    document: string;
    customerDocument: string;
    customerName: string;
    customerID: number;
    answersSunat: AnswerSunat[];
}

export interface RemissionGuideStoreModel extends Omit<RemissionGuideModel ,
    'id' | 'active' | 'document' | 'customerDocument' | 'customerName' | 'answersSunat' > {
    saleID: number|null;
    serieID: number;
}
