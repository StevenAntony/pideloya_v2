export const current = () : {
    month: string;
    year: number;
} => {
    const dateCurrent = new Date()
    const monthCurrent = dateCurrent.getMonth() + 1;
    const yearCurrent = dateCurrent.getFullYear()

    return {
        month: `${monthCurrent}`,
        year: yearCurrent
    }
}

export const formatDate = (dateToFormat: string, type: 'string') : string => {
    const monthText = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre']
    const date = new Date(dateToFormat)

    const day = date.getDate()
    const month = monthText[date.getMonth()]
    const year = date.getFullYear()

    if (type === 'string') {
        return `${day} de ${month} del ${year}`
    }

    return ''
}
