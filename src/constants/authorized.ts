export const MESSAGE_UNAUTHORIZED : { [key: string]: string } = {
    "api:ListCash": "No autorizado para visualizar la lista de cajas",
    "api:OpenCash": "No autorizado para este recurso",
    "api:CloseCash": "No autorizado para cerrar cajas",
}

/**
 * Acciones para modulo de caja
 */
export const CASH_ACTIONS = {
    list: 'api:ListCash',
    open: 'api:OpenCash',
    close: 'api:CloseCash'
}

/**
 * Acciones para modulo de movimientos
 */
export const MOVEMENT_ACTIONS = {
    list: 'api:ListMovement',
    create: 'api:CreateMovement',
    update: 'api:UpdateMovement', // No encontrado en la documentacion
    changeStatus: 'api:ChangeStatusMovement'
}

/**
 * Acciones para modulo de ventas
 */
export const SALE_ACTIONS = {
    listOrdinary: 'api:ListSaleOrdinary',
    listCollect: 'api:ListSaleCollect',
    listDelete: 'api:ListSaleDelete',
    createOrdinary: 'api:CreateSaleOrdinary',
    collect: 'api:CollectSale',
    deleteSale: 'api:DeleteSale',
}

/**
 * Acciones para modulo de cotización
 */
export const QUOTATION_ACTIONS = {
    list: 'api:ListQuotation',
    create: 'api:CreateQuotation',
    update: 'api:UpdateQuotation',
    delete: 'api:DeleteQuotation',
    changeStatus: 'api:ChangeStatusQuotation',
    sendMail: 'api:SendMailQuotation'
}
