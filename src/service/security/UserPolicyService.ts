import { Api } from "../Api";
import { ResponseService } from "./../ResponseService";

export default class UserPolicyService extends ResponseService {

    constructor(){
        super()
    }

    async store( body: any ) {
        this.response = await Api.Post(`userpolicy`, body)
    }

}
