'use client'
import { useEffect, useState } from "react"
import { MagicMotion } from "react-magic-motion"
import { ArrowLeftOutlined, ArrowRightOutlined, LayoutOutlined, AppstoreOutlined } from '@ant-design/icons'
import type { CollapseProps, MenuProps } from 'antd'
import { Collapse, theme, Menu } from 'antd'
import data from "@/service/data/Access.json"
import Link from "next/link"
import { usePathname } from 'next/navigation'

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group',
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

export default function LayoutDesktop({
    children
}: {
    children: React.ReactNode
}) {
    const [isCollapsed, setIsCollapsed] = useState(false)
    const [isMenus, setMenus] = useState<MenuProps['items']>([])
    const [isOptionActive, setOptionActive] = useState<string>('41')

    const pathname  = usePathname()

    const buildMenus = () => {
        const draftMenus:MenuProps['items'] = []
        
        data.forEach(element => {
            if (element.children != undefined) {
                const draftMenusChildren:MenuProps['items'] = []
                element.children.forEach(obj => {
                    draftMenusChildren.push(
                        getItem(
                            <a href={obj.url} rel="noopener noreferrer">
                                {obj.name}
                            </a>, obj.id, null
                        )
                    )
                })
                draftMenus.push(
                    getItem(element.name, element.id, <AppstoreOutlined />, draftMenusChildren)
                )
            }else{
                draftMenus.push( 
                    getItem(
                        <a href={element.url} rel="noopener noreferrer">
                            {element.name}
                        </a>, element.id, <AppstoreOutlined />
                    )
                )
            }
        })

        setMenus(draftMenus)
    }
    
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

    useEffect(() => {
        buildMenus()
    }, [])

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
            <div className="transition-all duration-500" style={{ width: isCollapsed ? "3rem" : "15rem"}}>
                <aside
                    className="bg-[--color-app-500] transition-all duration-500 h-screen fixed py-4 border border-[--color-app-500] flex flex-col gap-4 overflow-hidden z-10 shadow-lg"
                    style={{ width: isCollapsed ? "3rem" : "15rem"}}
                >
                    
                    <div className="flex gap-2 items-center justify-between px-4">
                        {!isCollapsed && <h4 className="m-0 text-white">{process.env.NEXT_PUBLIC_APP_NAME}</h4>}
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
                    <Menu
                        onClick={() => {}}
                        style={{ width: isCollapsed ? "3rem" : "15rem" }}
                        defaultSelectedKeys={[isOptionActive,'4']}
                        defaultOpenKeys={['4']}
                        mode="inline"
                        theme="light"
                        inlineCollapsed={isCollapsed}
                        items={isMenus}
                    />
                    
                </aside>
            </div>
            <div className="flex-1 transition-all duration-1000">
                {children}
            </div>
        </div>
    )
}