import { RemissionGuideModel, RemissionGuideStoreModel } from '../../models/RemissionGuideModel';
import { Api } from '../Api';
import { ResponseService } from '../ResponseService';
export class RemissionGuideService extends ResponseService {
    private remissionGuides: RemissionGuideModel[] = []
    private remissionGuide: RemissionGuideModel|null = null

    public getRemissionGuides(): RemissionGuideModel[] {
        return this.remissionGuides
    }

    public getRemissionGuide(): RemissionGuideModel|null {
        return this.remissionGuide
    }

    public async index()
    {
        this.response = await Api.Get(`remission-guides`)
        this.remissionGuides = this.response.data.list
    }

    public async show(id: number)
    {
        this.response = await Api.Get(`remission-guides/${id}`)
        if(this.response.success){
            this.remissionGuide = this.response.data
        }
    }

    public async edit(id: number, params: RemissionGuideStoreModel)
    {
        this.response = await Api.Put(`remission-guides/${id}`, params)
    }

    public async store(params: RemissionGuideStoreModel)
    {
        this.response = await Api.Post(`remission-guides`, params)
    }

    public async changeStatus(id: number)
    {
        this.response = await Api.Delete(`remission-guides/${id}`)
    }

    public async emitSunat(id: number)
    {
        this.response = await Api.Post(`emit/remission-guide`, {remissionGuideID: id})
    }
}
