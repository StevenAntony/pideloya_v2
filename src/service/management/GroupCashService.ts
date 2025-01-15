import { Api } from "@services/Api";
import { ResponseModel } from "@models/ResponseModel";
export default class GroupCashService {


    static async listToManagement (): Promise<ResponseModel<any>>
    {
        return await new Promise((resolve, reject) => {
            resolve({
                success: true,
                code: 200,
                message: 'Operación exitosa',
                data: [
                    { id: 1, name: 'Caja 1' },
                    { id: 2, name: 'Caja 2' },
                    { id: 3, name: 'Caja 3' },
                    { id: 4, name: 'Caja 4' },
                    { id: 5, name: 'Caja 5' },
                    { id: 6, name: 'Caja 6' },
                    { id: 7, name: 'Caja 7' },
                    { id: 8, name: 'Caja 8' },
                    { id: 9, name: 'Caja 9' },
                ],
            });
        });
    }
}
