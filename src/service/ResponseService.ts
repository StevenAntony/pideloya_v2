import { Response } from "../models/ResponseModel";

export class ResponseService {
    protected response: Response|any

    getResponse(): Response|any {
        return this.response
    }
}
