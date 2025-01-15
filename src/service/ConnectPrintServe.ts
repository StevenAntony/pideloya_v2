interface OrderResponse {
    success: boolean;
    message: string;
}

interface OrderBody {
    printer: Printer;
    nameTable: string;
    waiterName: string;
    dateOrder: Date;
    details: Detail[];
}
interface Detail {
    description: string;
    quantity: number;
    price: number;
    note: string;
}

interface DetailInvoice {
    description: string;
    quantity: number;
    price: number;
    note: string;
    unit: string;
}

export interface InvoiceBody {
    printer: Printer;
    logo: string;
    ruc: string;
    businessName: string;
    tradename: string;
    address: string;
    phone: string;
    email: string;
    issue: Date;
    typeDocument: string;
    serie: string;
    correlative: number;
    customerDocumentType: string;
    customerDocument: string;
    customerName: string;
    customerAddress: string;
    expiration: Date|null;
    methodPayment: string;
    totalString: string;
    totalTypeAfeIGV: any[];
    totalIGV: number;
    total: number;
    detail: DetailInvoice[];
}

interface Printer {
    controller: string;
    name: string;
}


class _ConnectPrintServe {
    async printOrder(params: OrderBody, url: string): Promise<OrderResponse> {
        const myHeaders = new Headers()
        myHeaders.append("Content-Type", "application/json")

        const raw = JSON.stringify(params)

        const response: any = await fetch(url, {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        })

        const json = await response.json()

        return {
            message: json.message,
            success: json.success
        }
    }

    async printTicket(params: InvoiceBody, url: string): Promise<OrderResponse> {
        const myHeaders = new Headers()
        myHeaders.append("Content-Type", "application/json")

        const raw = JSON.stringify(params)

        const response: any = await fetch(url, {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        })

        const json = await response.json()

        return {
            message: json.message,
            success: json.success
        }
    }
}

export const ConnectPrintServe = new _ConnectPrintServe()
