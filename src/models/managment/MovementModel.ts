/**
 * Parametros a enviar para registrar movimiento
 */
type Type = 'Ingress'|'Egress'

export interface MovementFormModel {
    type: Type
    description: string
    amount: number
    cashID: number
}

/**
 * Respuesta a listar movimientos al modulo de movimientos
 */

export interface ResponseMovementListToManegmentModel {
    list: MovementListToManegmentModel[]
    total: number
}

export interface MovementListToManegmentModel {
    movementID: number
    userID: number
    description: string
    amount: string
    userName: string
    status: number
    type: string
    issue: string
}
