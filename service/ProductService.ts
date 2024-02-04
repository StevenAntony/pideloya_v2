import { Api } from "./Api"

const getProductForSale = async () => {
    const response = await Api.Get(`products`)
    let data: Array<IProductForSale> = []

    if (response.success) {
        response.data.forEach((element: any) => {
            if (element.presentation) {
                const presentations = element.presentation.split('|').map((obj: any) => {return JSON.parse(obj)} )
                
                data.push({
                    description: element.name,
                    id: element.id,
                    brand: element.brand,
                    category:{
                        id: element.category,
                        description: element.category
                    },
                    presentations: presentations.map((obj: any) => { 
                        const { unit, salePrice , id  } = obj
                        return {unitName: unit, salePrice, id  }
                    })
                })
            }
        });
    }
    
    return {
        success: true,
        data: data,
        message: 'Datos obtenidos'
    }
}

const ProductService = {
    getProductForSale
}

export default ProductService