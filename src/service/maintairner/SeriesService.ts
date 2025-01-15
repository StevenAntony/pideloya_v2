import { SeriesModel, SeriesStoreOrUpdatedRequest } from "../../models/SeriesModel";
import { Api } from "../Api";
import { ResponseService } from "./../ResponseService";

export default class SeriesService extends ResponseService {
    private series: SeriesModel[] = []

    constructor(){
        super()
    }

    getSeries ():SeriesModel[]  {
        return this.series
    }

    async listSeries() {
        this.response = await Api.Get(`vouchers/0/series`)
        if (this.response.success) {
            this.series = this.response.data
        }
    }

    async store(params: SeriesStoreOrUpdatedRequest, id: number) {
        this.response = await Api.Post(`vouchers/${id}/series`, params)
    }

    async changeStatus(id: number) {
        this.response = await Api.Delete(`series/${id}`)
    }

}
