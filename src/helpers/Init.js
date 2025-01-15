export const TYPES_USER_STORE = [
    {
        value: 'admin',
        label: 'Administrador',
        typeActivity: 'ALL'
    },
    {
        value: 'cashier',
        label: 'Cajero',
        typeActivity: 'ALL'
    },
    {
        value: 'accountant',
        label: 'Contador',
        typeActivity: 'ALL'
    },
    {
        value: 'trader',
        label: 'Vendedor',
        typeActivity: 'ALL'
    },
    {
        value: 'store',
        label: 'Almacen',
        typeActivity: 'ALL'
    },
    {
        value: 'waiter',
        label: 'Mesero',
        typeActivity: 'restaurant'
    },
    {
        value: 'chef',
        label: 'Cocinero',
        typeActivity: 'restaurant'
    }
]

export const STATE_ORDER = [
    {
        state: 'pending',
        name: 'Pendiente',
        user: 'waiter',
        color: 'default'
    },
    {
        state: 'printed',
        name: 'Impreso',
        user: 'waiter',
        color: 'blue'
    },
    {
        state: 'prepared',
        name: 'Preparado',
        user: 'chef',
        color: 'cyan'
    },
    {
        state: 'served',
        name: 'Servido',
        user: 'waiter',
        color: 'green'
    }
]
