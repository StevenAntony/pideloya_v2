export type StatusQuotationKey = 'PENDING' | 'APPROVED' | 'DONE' | 'REJECTED';

export const statusQuation : Record<StatusQuotationKey, { name: string; color: string }> = {
    PENDING: {
        name: 'Pendiente',
        color: '#f97316'
    },
    APPROVED: {
        name: 'Aprobada',
        color: '#06b6d4'
    },
    DONE: {
        name: 'Listo',
        color: '#22c55e'
    },
    REJECTED: {
        name: 'Rechazada',
        color: '#ef4444'
    },
}
