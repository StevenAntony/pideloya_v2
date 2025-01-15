import { Api } from "./Api";
import { ResponseService } from "./ResponseService";

export class _CustomerService extends ResponseService {

    constructor(){
        super()
    }

    async consultReniec(dni: string) {

        this.response = await Api.URL(`https://billing.stevendev.nom.pe/api/consult/dni`, 'POST' , {
            dni
        })
    }

    async consultSunat(ruc: string) {

        this.response = await Api.URL(`https://billing.stevendev.nom.pe/api/consult/ruc`, 'POST' , {
            ruc
        })
    }
}
