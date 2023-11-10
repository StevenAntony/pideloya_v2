import { useState } from "react"
import { MagicMotion } from "react-magic-motion"
import { ArrowLeftOutlined, ArrowRightOutlined, LayoutOutlined } from '@ant-design/icons'
import type { CollapseProps } from 'antd'
import { Collapse, theme } from 'antd'
import data from "@/service/data/Access.json"
import Link from "next/link"

export default function Layout({
    children
}: {
    children: React.ReactNode
}) {
    const [isCollapsed, setIsCollapsed] = useState(false)
    
    const buildOption = (element: any) => {

        const items:CollapseProps['items'] = []
 
        items.push({
            key: element.id,
            label: <div>
                <LayoutOutlined className="text-white text-2xl" />
                <span className="text-white ml-2">{element.name}</span>
            </div>,
            className:'p-0',
            children: contentOption(element.children)
        })
        return <Collapse
                    bordered={false}
                    expandIconPosition={'end'}
                    className="w-full menu-option-main border-t border-white"
                    defaultActiveKey={['1']}
                    items={items}
                />
    }

    function contentOption (obj: any) {
        return (
            <div>
                {
                    obj.map( (e:any) => {
                        return <ul key={e.id}>
                            {
                                e.children != undefined ? buildOption(e)
                                : (
                                    <li className="flex gap-4 items-center w-full">
                                        <Link href={e.url} className="w-full">
                                            <LayoutOutlined className="text-white text-2xl" />
                                            <span className="text-white ml-2">{e.name}</span>
                                        </Link>
                                    </li>
                                )
                            }
                        </ul>
                    })
                }
            </div>
        )
    }

    return (
        <div className="flex flex-wrap h-full ">
            <div className="transition-all duration-500" style={{ width: isCollapsed ? "3.4rem" : "15rem" }}>
                    <aside
                        className="bg-[--color-app-500] transition-all duration-500 h-screen fixed p-4 flex flex-col gap-4 overflow-hidden z-10 shadow-lg"
                        style={{ width: isCollapsed ? "3.4rem" : "15rem" }}
                    >
                        <div className="flex gap-2 items-center justify-between">
                            {!isCollapsed && <h4 className="m-0 text-white">{process.env.NODE_ENV}</h4>}
                            <button className="cursor-pointer p-0 border-0"
                                onClick={() => setIsCollapsed(!isCollapsed)}
                            >
                                {
                                    isCollapsed
                                        ? <ArrowRightOutlined className="text-white text-2xl" />
                                        : <ArrowLeftOutlined className="text-2xl text-white" />
                                }
                            </button>
                        </div>

                        <ul className={`flex flex-col gap-4 m-0 p-0 ${isCollapsed ? 'hidden' : ''}`}>
                            {
                                data.map(obj => {

                                    return (
                                        <li className="flex gap-4 items-center w-full" key={obj.id}>
                                            {
                                                obj.children != undefined
                                                ? buildOption(obj)
                                                : (
                                                    <Link href={obj.url} className="w-full">
                                                        <LayoutOutlined className="text-white text-2xl" />
                                                        <span className="text-white ml-2">{obj.name}</span>
                                                    </Link>
                                                )
                                            }
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </aside>
            </div>
            <div className="flex-1 transition-all duration-1000">
                {children}
            </div>
        </div>
    )
}