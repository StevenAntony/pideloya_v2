import { Tabs } from 'antd';
import React from 'react'
import Information from './Information';
import Plan from './Plan';
import License from './License';
import Configurations from './Configurations';

export default function CompanyPage() {

    const tabsCompany = [
        {
            label: `Información`,
            key: 'information',
            children: <Information />,
        },
        {
            label: `Mi Plan`,
            key: 'plan',
            children: <Plan />,
            disabled: true
        },
        {
            label: `Licencia`,
            key: 'license',
            children: <License />
        },
        {
            label: `Configuraciones`,
            key: 'configurations',
            children: <Configurations />,
        }
    ]

    return (
        <div className="mx-8 my-8 py-10 min-h-[500px] shadow-md bg-white">
            <Tabs
                tabPosition='left'
                items={tabsCompany}
            />
        </div>
    )
}
