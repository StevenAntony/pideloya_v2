import { ResponseModel } from "../../models/ResponseModel";
import { UserListModel } from "../../models/security/UserModel";
import { Api } from "../Api";

export default class UserService {

    async listToMaintainer( ) : Promise<ResponseModel<UserListModel[]>>
    {
        return await Api.Get(`users`)
    }

}
