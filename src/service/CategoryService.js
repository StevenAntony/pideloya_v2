import { Api } from "./Api"

const list = async (id) => {
    let data = []
    const response = await Api.Get(`groups/${id}/categories`)

    if (response.success) {
        response.data.forEach((category) => {
            data.push({
                description: category.name,
                id: category.id
            })
        })
    }


    return {
        success: response.success,
        data: data,
        message: response.message
    }
}

const CategoryService = {
    list
}

export default CategoryService
