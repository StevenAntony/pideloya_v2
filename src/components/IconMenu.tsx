import React from 'react'
import {
    MedicineBoxOutlined,
    AppstoreOutlined,
    LaptopOutlined,
    ShoppingOutlined,
    UserOutlined,
    InboxOutlined,
    ApartmentOutlined,
    FolderOutlined,
    AreaChartOutlined
} from '@ant-design/icons'

export default function IconMenu({
    menu = 'Caja'
}: {
    menu: string
}) {

    const icons = {
        Caja: <MedicineBoxOutlined />,
        Ventas: <LaptopOutlined />,
        Compras: <ShoppingOutlined />,
        Usuario: <UserOutlined />,
        Mantenedor: <InboxOutlined />,
        Almacen: <ApartmentOutlined />,
        Sunat: <FolderOutlined />,
        Reportes: <AreaChartOutlined />
    }

    return icons[menu] ?? <AppstoreOutlined />
}
