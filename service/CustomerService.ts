import { Api } from "./Api"

const getForSale = async (search: string) => {
    const response = await Api.Get(`customers?search=${search}`)
    let data: Array<ICustomer> = []
    if (response.success) {
       data = response.data
    }
    
    return {
        success: response.success,
        data: data,
        message: response.message
    }
}

const CustomerService = {
    getForSale
}

export default CustomerService