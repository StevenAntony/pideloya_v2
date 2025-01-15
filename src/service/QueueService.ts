import { Api } from "./Api"
import { ResponseService } from "./ResponseService"

export class QueueService extends ResponseService {

    constructor(){
        super()
    }

    async show(queueID: string) {
        this.response = await Api.Get(`queue/${queueID}`)
    }
}
