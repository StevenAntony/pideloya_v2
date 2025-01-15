import React from 'react'
import { Button, Typography } from 'antd'
import { FilePdfOutlined, FileExcelOutlined, BarChartOutlined } from '@ant-design/icons'

const { Title } = Typography

const ActionType = (props : {
    actions?: any;
    children: any;
}) => {
    const { actions, children } = props

    if (actions) {
        if(actions.type === 'url') {
            return <a href={actions.url}>{children}</a>
        }
    }

    return children
}
const ResourceReport = ({
    name,
    actions
} : {
    name: string;
    actions?:any;
}) => {
    const resource = {
        pdf: <Button type="default" className='bg-red-500 text-white' icon={<FilePdfOutlined />} />,
        excel: <ActionType actions={actions ? actions.excel : null}> <Button type="default" className='bg-green-700 text-white' icon={<FileExcelOutlined />} /></ActionType>,
        graphic: <Button onClick={actions ? actions.graphic : null} type="primary" icon={<BarChartOutlined />} />
    }

    return resource[name] ?? null
}
export default function ReportList({
    title,
    description,
    resource,
    renderFilters,
    actions
}: {
    title: string;
    description: string;
    resource: string[];
    renderFilters?: any;
    actions?: any;
}) {

    return (
        <div className='border border-orange-200 bg-orange-50 px-4 py-2 rounded-md flex flex-wrap items-center'>
            <div className='flex-1'>
                <Title level={5} className='!m-0'>{title}</Title>
                <p className='text-sm'>{description}</p>
                {renderFilters}
            </div>
            <div className='flex flex-wrap gap-2'>
                { resource.map((obj, index) => <ResourceReport key={index} name={obj} actions={actions} />) }
            </div>
        </div>
    )
}
