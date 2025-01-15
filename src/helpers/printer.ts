import { ConnectPrintServe, InvoiceBody } from './../service/ConnectPrintServe';
const ticket = async (companyID: string, saleID: string, data: any, serverPrint: string) => {

    window.open(`/pdf/sale_ticket/${companyID}/${saleID}`, '_blank')
    if(serverPrint){
        const responsePrint = await ConnectPrintServe.printTicket(data, `${serverPrint}/api/print/ticket`)
        console.log(responsePrint);

    }
}

const printer = {
    ticket
}

export default printer
