import { Api } from "./Api"
import { ResponseService } from "./ResponseService"

export class MailService extends ResponseService {

    constructor(){
        super()
    }

    async sendInvoice(saleID: string) {
        this.response = await Api.Post(`mail/invoice-receipt`, {saleID})
    }
}
