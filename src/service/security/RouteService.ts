import { ResponseModel } from "../../models/ResponseModel";
import { RouteModel, RouteToWebModel } from "../../models/security/RouteModel";
import { Api } from "../Api";
import { ResponseService } from "./../ResponseService";

export default class RouteService extends ResponseService {
    private routes: RouteModel[] = []

    constructor(){
        super()
    }

    getRoutes ():RouteModel[]  {
        return this.routes
    }

    async listToPolicy() {
        this.response = await Api.Get(`routes?to=policy`)
        if (this.response.success) {
            this.routes = this.response.data
        }
    }

    async listToWeb() : Promise<ResponseModel<RouteToWebModel[]>>
    {
        return await Api.Get(`routes?to=web`)
    }

}
