const tableToSaleAdapter = (data) => {
    const adapter: any[] = []
    data.forEach(table => {
        adapter.push({
            description: table.name,
            id: table.id,
            nameUser: table.cashOrder ? table.cashOrder.user.name : '',
            state: table.cashOrder ? 'Ocupado' : 'Libre',
            time: table.cashOrder && table.cashOrder.busyTime,
            level: table.level
        })
    })

    return adapter
}

export default tableToSaleAdapter
