const formatCurrency = (amount, country='es-PE') => {
    const format = new Intl.NumberFormat(country, {
        style: 'currency',
        currency: 'PEN'
    })
    return format.format(amount)
}

const FormatCurrency = {
    formatCurrency
}

export default FormatCurrency
