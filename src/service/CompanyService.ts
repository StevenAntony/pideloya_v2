import { CompanyModel, ConfigUpdateModel } from "../models/CompanyModel"
import { CompanyConfigurationModel } from "../models/ConfigurationModel"
import { Api } from "./Api"
import { ResponseService } from "./ResponseService"

class _CompanyService extends ResponseService {
    private company:CompanyModel
    private companies:CompanyModel[]
    private configurations: CompanyConfigurationModel

    constructor(){
        super()
    }

    getCompany ():CompanyModel  {
        return this.company
    }

    getCompanies ():CompanyModel[]  {
        return this.companies
    }

    getConfigurations ():CompanyConfigurationModel  {
        return this.configurations
    }

    async find() {
        this.response = await Api.Get(`companies`)
        if (this.response.success) {
            this.company = this.response.data
        }
    }

    async list() {
        this.response = await Api.Get(`companies`)
        if (this.response.success) {
            this.companies = this.response.data
        }
    }

    async show(id: number) {
        this.response = await Api.Get(`companies/${id}`)
        if (this.response.success) {
            this.configurations = this.response.data
        }
    }

    async store(params: CompanyModel) {
        this.response = await Api.Post(`companies`, params)
    }

    async update(params: CompanyModel, id: number = 0) {
        this.response = await Api.Put(`companies/${id}`, params)
    }

    async changeStatus(id:number) {
        this.response = await Api.Delete(`companies/${id}`)
    }

    async updateConfig(params: ConfigUpdateModel) {
        this.response = await Api.Put(`company/config`, params)
    }

    async updateConfigaLL(params: any) {
        this.response = await Api.Put(`company/config-all`, params)
    }

    async generateToken(companyID: number) {
        this.response = await Api.Post(`company/generate-token`, {
            companyID
        })
    }
}

export const CompanyService = new _CompanyService()
