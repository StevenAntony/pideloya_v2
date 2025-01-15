import { Button } from 'antd'
import React from 'react'
import busyTable from '../../../img/busyTable.png'
import freeTable from '../../../img/freeTable.png'

type Props = {
    isTables: any[];
    getOrderByTable: (id: number) => void;
}

export default function LevelTable({
    isTables,
    getOrderByTable
}: Props) {
    const viewOrderList = (id: number) => {
        getOrderByTable(id)
    }

    return (
        <div className='flex flex-wrap'>
            {
                isTables.map(obj => {
                    return (
                        <div key={obj.id} className='w-1/2 sm:w-1/5 p-2 relative'>
                            <div className='relative h-[170px]'>
                                <img src={obj.state == 'Libre' ? freeTable : busyTable} className='absolute h-full w-full' />
                                <Button
                                    type='default'
                                    onClick={() => viewOrderList(obj.id)}
                                    className={`w-full h-full border-none !bg-transparent`}
                                >
                                    <div>
                                        <div
                                            className={`font-bold text-center`}
                                        >
                                            <span className='text-xl px-3 py-1 rounded-md font-black bg-white text-rose-600'>{obj.description}</span>
                                            <br />
                                            {obj.state != 'Libre' &&
                                                <span className='text-ellipsis px-3 rounded-md py-1 bg-white text-rose-600 w-full overflow-hidden'>
                                                    {obj.nameUser}
                                                </span>
                                            }
                                        </div>
                                    </div>
                                </Button>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}
