import { ResponseModel } from "@models/ResponseModel";
import { BodyQuotationCreateModel, ResponseQuotationFindModel, ResponseQuotationListModel } from "@models/sale/QuotationModel";
import { Api } from "@services/Api";

export class QuotationService {

    /**
     * Listar todas las cotizaciones para la gesti n
     * @returns Promesa con el listado de cotizaciones
     */
    static async listToManagement (): Promise<ResponseModel<ResponseQuotationListModel>>
    {
        return await Api.Get(`quotations?to=management`);
    }

    /**
     * Informaci n de una cotizaci n
     * @param quotationID ID de la cotizaci n
     * @returns Promesa con la informaci n de la cotizaci n
     */
    static async show (quotationID: number): Promise<ResponseModel<ResponseQuotationFindModel>>
    {
        return await Api.Get(`quotations/${quotationID}`)
    }

    /**
     * Crear una nueva cotizaci n
     * @param body Informaci n para crear la cotizaci n
     * @returns Promesa con la respuesta de la peticion
     */
    static async store (body: BodyQuotationCreateModel): Promise<ResponseModel<null>>
    {
        return await Api.Post(`quotations`, body)
    }

    /**
     * Actualizar una cotizaci n
     * @param quotationID ID de la cotizaci n
     * @param body Informaci n para actualizar la cotizaci n
     * @returns Promesa con la respuesta de la peticion
     */
    static async update (quotationID: number, body: BodyQuotationCreateModel): Promise<ResponseModel<null>>
    {
        return await Api.Put(`quotations/${quotationID}`, { update: 'model', ...body });
    }

    /**
     * Eliminar una cotizaci n
     * @param quotationID ID de la cotizaci n
     * @returns Promesa con la respuesta de la peticion
     */
    static async delete (quotationID: number): Promise<ResponseModel<null>>
    {
        return await Api.Delete(`quotations/${quotationID}`)
    }

    /**
     * Cambiar el estado de una cotizaci n
     * @param quotationID ID de la cotizaci n
     * @param status Nuevo estado de la cotizaci n
     * @returns Promesa con la respuesta de la peticion
     */
    static async changeStatus (quotationID: number, status: string): Promise<ResponseModel<null>>
    {
        const body = { update: 'status', status }

        return await Api.Put(`quotations/${quotationID}`, body);
    }

    static async sendMail (code: string): Promise<ResponseModel<null>>
    {
        return await Api.Post(`mail/quotation`, {code});
    }

}
