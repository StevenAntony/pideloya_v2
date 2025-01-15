/**
 * Respuesta al listar cajas en el modulo de cajas
 */
export interface ResponseCashListToManegmentModel {
    list: CashListToManegmentModel[]
    total: number
}

export interface CashListToManegmentModel {
    cashID: number
    userID: number
    openingAmount: string
    userName: string
    status: string
    openingDate: string
    closingDate: string
    cashCode: string
    totalCash: number
    totalReconciliation: number
    reconciliation: string
}

/**
 * Respuesta al listar cajas en el modulo de movimientos
 */
export type ResponseCashListToMovementsModel = CashListToMovementsModel[]

export interface CashListToMovementsModel {
    cashID: number
    userID: number
    openingAmount: string
    userName: string
    status: string
    openingDate: string
    closingDate: string
    cashCode: string
    totalIngress: string
    totalEgress: string
}

/**
 * Body para guardar el cuadre de la caja
 */

export interface BodyReconciliationModel {
    reconciliation: Array<{
        name: string
        type: string
        current: number
        value: number
    }>
    cashID: number
}
