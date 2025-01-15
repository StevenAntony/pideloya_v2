import { Api } from "./Api"

const getProductForSale = async () => {
    const response = await Api.Get(`products?filter=sale`)
    let data = []

    if (response.success) {
        response.data.forEach((element) => {
            if (element.presentation) {
                const presentations = element.presentation.split('|').map((obj) => {return JSON.parse(obj)} )
                const printers = element.printers ? element.printers.split('|').map((obj) => {return JSON.parse(obj)}) : null

                data.push({
                    description: element.name,
                    id: element.id,
                    brand: element.brand,
                    barcode: element.barcode,
                    category:{
                        id: element.nameCategory,
                        description: element.nameCategory
                    },
                    presentations: presentations.map((obj) => {
                        const { unit, salePrice, purchasePrice, dealerPrice , id, unitSunat  } = obj
                        return {unitName: unit, salePrice, purchasePrice, dealerPrice, id, unitSunat  }
                    }),
                    printers: printers
                })
            }
        });
    }

    return {
        success: true,
        data: data,
        message: response.message
    }
}

const list = async () => {
    const response = await Api.Get(`products?filter=maintainer`)
    let data= []

    if (response.success) {
        response.data.forEach((element) => {
            const presentations = element.presentation ? element.presentation.split('|').map((obj) => {return JSON.parse(obj)} ) : []

            data.push({
                name: element.name,
                brand: element.brand,
                category: element.nameCategory,
                prices: presentations.map((obj) => {
                    const { salePrice } = obj
                    return `${salePrice}`
                }),
                dealers: presentations.map((obj) => {
                    const { dealerPrice } = obj
                    return `${dealerPrice}`
                }),
                purchases: presentations.map((obj) => {
                    const { purchasePrice } = obj
                    return `${purchasePrice}`
                }),
                units: presentations.map((obj) => {
                    const { unit } = obj
                    return `${unit}`
                }),
                barcode: element.barcode,
                key: element.id,
                service: element.service,
                active: element.active === 1,
                type: element.type,
                idCategory: element.idCategory,
                idGroup: element.idGroup,
                afeIGV: element.type_afe_igv,
                printers: element.printer ? element.printer.split(','): []
            })
        });
    }

    return {
        success: response.success,
        data: data,
        message: response.message
    }
}

const store = async (params) => {
    const response = await Api.Post(`products`, params)

    return {
        success: response.success,
        data: response.data,
        message: response.message
    }
}

const update = async (params, id) => {
    const response = await Api.Put(`products/${id}`, params)

    return {
        success: response.success,
        data: response.data,
        message: response.message
    }
}

const updateActive = async (id) => await Api.Delete(`products/${id}`)

const presentations = async (id) => await Api.Get(`products/${id}/presentations`)

const presentationUpdated = async (params, id) => await Api.Put(`presentations/${id}`, params)

const presentationStore = async (params, id) => await Api.Post(`products/${id}/presentations`, params)

const presentationsDelete = async (id) => await Api.Delete(`presentations/${id}`)

const checkRequirements = async () => await Api.Post('products/check-requirements', {})

const downloadTemplate = async () => await Api.Post('products/download/template', {})

const importExcel = async (file) => await Api.File('products/import', file)

const ProductService = {
    getProductForSale,
    list,
    store,
    update,
    updateActive,
    presentations,
    presentationUpdated,
    presentationStore,
    checkRequirements,
    downloadTemplate,
    importExcel,
    presentationsDelete
}

export default ProductService
