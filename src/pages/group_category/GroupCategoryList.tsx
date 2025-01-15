import React, { useEffect, useState } from 'react';
import { Tree, Button, Popconfirm } from 'antd';
import type { GetProps, TreeDataNode } from 'antd';
import { GroupAllModel } from '../../models/GroupModel';
import { PlusOutlined, EditOutlined, DeleteOutlined, CheckOutlined } from '@ant-design/icons'
import { ISelectedRow } from '.';

type DirectoryTreeProps = GetProps<typeof Tree.DirectoryTree>;

const { DirectoryTree } = Tree;
type typeMaintainer = 'Grupo'|'Categoria';

const GroupCategoryList = ({
    dataSource,
    newCategory,
    editSelectRow,
    changeStatus
}: {
    dataSource: GroupAllModel[];
    newCategory: (e:ISelectedRow) => void;
    editSelectRow: (e:ISelectedRow) => void;
    changeStatus: (id:number, type:typeMaintainer) => void;
}) => {

    const [treeData, setTreeData] = useState<TreeDataNode[]>([])

    const TitleGroup = ({ data }) => {
        return (
            <div className='flex justify-between'>
                <p>{data.name}</p>
                <div className='flex'>
                    <Popconfirm
                        title={`${data.active ? 'Desactivar Grupo' : 'Activar Grupo'}`}
                        description="El cambio influira al registrar un producto"
                        onConfirm={() => changeStatus(data.id,'Grupo')}
                        onCancel={() => {}}
                        okText="SI"
                        cancelText="No"
                    >
                        <Button
                            className={`${data.active ? '!bg-rose-500' : '!bg-green-500'} !text-white`}
                            size='small'
                            icon={ data.active ? <DeleteOutlined /> : <CheckOutlined />}
                        />
                    </Popconfirm>
                    <Button
                        onClick={() => editSelectRow({
                            id: data.id,
                            name: data.name,
                            type: 'Grupo'
                        })}
                        className='!bg-yellow-500 !text-white'
                        size='small'
                        icon={<EditOutlined />}
                    />
                    <Button
                        onClick={() => newCategory({
                            id: data.id,
                            name: data.name,
                            type: 'Grupo'
                        })}
                        className='!bg-cyan-600 !text-white'
                        size='small'
                        icon={<PlusOutlined />}
                    />
                </div>
            </div>
        )
    }

    const TitleCategory = ({ data }) => {
        return (
            <div className='flex justify-between'>
                <p>{data.name}</p>
                <div className='flex'>
                    <Popconfirm
                        title={`${data.active ? 'Desactivar Categoria' : 'Activar Categoria'}`}
                        description="El cambio influira al registrar un producto"
                        onConfirm={() => changeStatus(data.id,'Categoria')}
                        onCancel={() => {}}
                        okText="SI"
                        cancelText="No"
                    >
                        <Button
                            className={`${data.active ? '!bg-rose-500' : '!bg-green-500'} !text-white`}
                            size='small'
                            icon={ data.active ? <DeleteOutlined /> : <CheckOutlined />}
                        />
                    </Popconfirm>
                    <Button
                        onClick={() => editSelectRow({
                            id: data.id,
                            name: data.name,
                            type: 'Categoria'
                        })}
                        className='!bg-yellow-500 !text-white'
                        size='small'
                        icon={<EditOutlined />}
                    />
                </div>
            </div>
        )
    }

    const buildTreeData = () => {
        const treeDataDraft:TreeDataNode[] = []
        dataSource.forEach(data => {
            const children:TreeDataNode[] = []
            data.categories.forEach(category => {
                children.push({
                    key: `${data.id}-${category.id}`,
                    title: <TitleCategory data={category} />
                })
            })
            treeDataDraft.push({
                key: data.id,
                title: <TitleGroup data={data} />,
                children: children
            })
        })

        setTreeData(treeDataDraft)
    }

    useEffect(() => {
        if(dataSource){
            buildTreeData()
        }
    }, [dataSource])

    return (
        <DirectoryTree
            defaultExpandAll
            expandedKeys={dataSource.map(obj => obj.id)}
            treeData={treeData}
        />
    );
};

export default GroupCategoryList;
