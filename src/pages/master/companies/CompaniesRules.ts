export const companiesRules = {
    ruc: [
        { required: true, message: 'Ruc requerido' },
        { max: 11, message: 'Ruc son 11 digitos' },
        { min: 11, message: 'Ruc son 11 digitos' }
    ],
    businessName: [
        { required: true, message: 'Razón social requerido' }
    ],
    tradename: [
        { required: true, message: 'Nombre comercial requerido' }
    ],
    address: [
        { required: true, message: 'Dirección requerido' }
    ],
    email: [
        { pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ , message: 'Formato incorrecto' }
    ]
}
