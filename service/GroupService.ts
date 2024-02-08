import { Api } from "./Api"

const list = async () => {
    let data: Array<IGroup> = []
    const response = await Api.Get(`groups`)

    if (response.success) {
        response.data.forEach((group: any) => {
            data.push({
                description: group.name,
                id: group.id
            })
        })
    }
    
    
    return {
        success: response.success,
        data: data,
        message: response.message
    }
}

const GroupService = {
    list
}

export default GroupService