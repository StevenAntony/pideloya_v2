import { List } from 'antd'
import React, { useEffect, useState } from 'react'
import {
    CalendarOutlined
} from '@ant-design/icons'
import { LicenseService } from '../../service/LicenseService'
import { LicenseModel } from '../../models/LicenseModel'

export default function License() {

    const [isLicenses, setLicenses] = useState<LicenseModel[]>([])

    const getLicenses = async () => {
        const service = LicenseService
        await service.list()
        setLicenses(service.getLicenses())
    }

    useEffect(() => {
        getLicenses()
    }, [])

    return (
        <div>
            <List
                itemLayout="horizontal"
                dataSource={isLicenses}
                renderItem={(item, index) => (
                    <List.Item>
                        <List.Item.Meta
                            avatar={<CalendarOutlined />}
                            title={<a href="#">{item.start} - {item.end}</a>}
                            description={item.active ? 'Activo' : 'Desactivado'}
                        />
                    </List.Item>
                )}
            />
        </div>
    )
}
