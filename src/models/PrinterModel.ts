export interface PrinterModel {
    id: number;
    name: string;
    printer: string;
    controller: 'usb' | 'network';
    resource: 'ALL' | 'VOUCHER' | 'COMMAND';
    active: boolean;
}

export interface PrinterToProductModel extends Omit<PrinterModel, 'printer' | 'controller' | 'resource' | 'active'> {}

export interface PrinterStoreOrUpdatedRequest extends Omit<PrinterModel, 'id' | 'active'> {}
