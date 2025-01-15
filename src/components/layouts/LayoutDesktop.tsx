import React, { useEffect, useState } from "react"
import {
    ArrowLeftOutlined,
    ArrowRightOutlined,
    LayoutOutlined,
    AppstoreOutlined,
    UserOutlined,
    LogoutOutlined,
    LockOutlined
} from '@ant-design/icons'
import { Link, useLocation  } from "react-router-dom";
import { Menu, Dropdown, Select, Spin } from 'antd'
import CashService from "../../service/CashService"
import { cashCurrentStorage } from "../../helpers/LocalStorage";
import AuthService from "../../service/AuthService";
import IconMenu from "../IconMenu"
import Notifications from "./Notifications";
import { useAuthContext } from "../../contexts/auth/AuthContext";

const { Option } = Select

function getItem(
  label: any,
  key?: any,
  icon?: any,
  children?: any,
  type?: any,
) {
  return {
    key,
    icon,
    children,
    label,
    type,
  } ;
}

export default function LayoutDesktop({
    children
}: { children: React.ReactNode }) {
    const [isCollapsed, setIsCollapsed] = useState(false)
    const [isMenus, setMenus] = useState<any>([])
    const [isCashesCurrent, setCashesCurrent] = useState([])
    const [isMenusConfiguration, setMenusConfiguration] = useState<any>([])
    const [isOptionSelect, setOptionSelect] = useState('')
    const [isOptionActive, setOptionActive] = useState('')
    const { getCash, setCash } = cashCurrentStorage()

    const [cashCurrentSelected, setCashCurrentSelected] = useState(getCash())

    const location = useLocation()
    const urlActual = location.pathname

    const { user, company , logout, isRoutesWeb } = useAuthContext()

    const getCashsCurrent =async () => {
        const response =await CashService.listToCurrent()
        verifyCash(response.data)
        setCashesCurrent(response.data)
    }

    // const getAccessList = async () => {
    //     const service = AccessService
    //     await service.list(auth.user.type)
    //     setAccess(service.getAccess())
    //     buildMenus(service.getAccess())
    // }

    const buildMenus = () => {
        const draftMenus: any = []
        isRoutesWeb.forEach(element => {
            if (element.routes != undefined && element.routes.length > 1) {
                const draftMenusChildren:any = []
                element.routes.forEach(obj => {
                    draftMenusChildren.push(
                        getItem(
                            <Link to={obj.resource} >
                                {obj.name}
                            </Link>, obj.id, null
                        )
                    )
                })
                if (draftMenusChildren.length > 0) {
                    draftMenus.push(
                        getItem(element.name, element.id,  <IconMenu menu={element.name} /> , draftMenusChildren)
                    )
                }
            }else{
                draftMenus.push(
                    getItem(
                        <Link to={element.routes[0].resource} >
                            {element.routes[0].name}
                        </Link>, element.routes[0].id,
                        <LayoutOutlined />
                    )
                )
            }
        })
        setMenus(draftMenus)
    }

    const buildMenusConfiguration = () => {
        setMenusConfiguration([
            getItem(
                <Link to={'/company'} >
                    Empresa
                </Link>, 'company', <AppstoreOutlined />
            )
        ])
    }

    const onChangeCash = (value: string) => {
        const draft = isCashesCurrent.find((obj: any) => obj.id == value)
        if (draft) {
            setCash(draft)
            setCashCurrentSelected(draft)
            window.location.reload()
        }
    }

    const verifyCash = (listCashes: any) => {
        const check = listCashes.find((obj: any) => obj.id == cashCurrentSelected?.id)
        if (!check) {
            setCash(null)
            setCashCurrentSelected(null)
        }
    }

    useEffect(() => {
        buildMenus()
    }, [isRoutesWeb])

    useEffect(() => {
        // getAccessList()
        buildMenusConfiguration()
        getCashsCurrent()
        // findCompany()
    }, [])

    useEffect(() => {
        const primeraParte = urlActual;

        isRoutesWeb.forEach(element => {
            if (element.routes != undefined && element.routes.length > 1) {
                element.routes.forEach(obj => {
                    if(obj.resource == `${primeraParte}`){
                        setOptionSelect(String(obj.id))
                        setOptionActive(element.id)
                    }
                });
            }else{
                if(element.routes[0].resource == `${primeraParte}`){
                    setOptionSelect(String(element.routes[0].id))
                    setOptionActive(element.routes[0].id)
                }
            }
        });

    }, [isMenus])

    return (
        <div className="flex flex-wrap min-h-screen ">
            <div className="transition-all duration-500 bg-white" style={{ width: isCollapsed ? "3rem" : "16rem"}}>
                <aside
                    className="transition-all duration-500 h-screen fixed  flex flex-col overflow-hidden z-10 shadow-lg "
                    style={{ width: isCollapsed ? "3rem" : "16rem"}}
                >

                    <div className="flex gap-2 items-center justify-between px-4 py-4 h-16 bg-white border-b shadow-sm">
                        <div className="flex gap-2 w-full h-full">
                            {
                                company.logo
                                    ? (
                                        <div className="flex items-center w-full">
                                            <img src={company.logo} className={`${!isCollapsed ? "w-[50px] h-[50px]" : "w-[40px] h-[20px]"}`} alt="Logo" />
                                            {!isCollapsed && <span className="text-[--color-app-700] font-black ml-2 text-sm">{company.businessName}</span>}
                                        </div>
                                    )
                                    : (
                                        <>
                                            <h1 className='text-3xl font-black !text-[--color-app-600]'>TeVendo<span className='text-emerald-600'>Ya</span></h1>
                                        </>
                                    )
                            }
                        </div>
                    </div>
                    <div className="scroll-bar-menus min-h-64">
                        {!isCollapsed && <div className="px-4 pt-8">
                            <div className="flex gap-2">
                                <div className="bg-[--color-app] p-2 rounded-md"><UserOutlined className="text-2xl text-white" /></div>
                                <div>
                                    <p className="text-[--text-app] font-bold text-sm">{user.name}</p>
                                    <p className="text-[--text-app-muted] text-sm">{user.email}</p>
                                </div>
                            </div>
                        </div>}
                        <div className="pl-7 mt-7 font-bold text-[--text-app]">{!isCollapsed && 'MENÚ'}</div>
                        <Spin tip="Cargando..." className="w-full" spinning={isRoutesWeb.length == 0}>
                            {
                                isOptionActive && (<Menu
                                    style={{ width: isCollapsed ? "3rem" : "16rem" }}
                                    defaultSelectedKeys={[`${isOptionSelect}`,`${isOptionActive}`]}
                                    defaultOpenKeys={[`${isOptionActive}`]}
                                    mode="inline"
                                    theme="light"
                                    inlineCollapsed={isCollapsed}
                                    items={isMenus}
                                />)

                            }
                        </Spin>
                    </div>
                </aside>
            </div>
            <div className="flex-1 transition-all duration-1000 overflow-hidden overflow-y-auto">
                <div className="fixed layout-color-app h-16 shadow-lg z-50" style={{ width: isCollapsed ? "calc(100% - 3rem)" : "calc(100% - 16rem)"}}>
                    <div className="flex gap-6 justify-between items-center h-full pr-5">
                        <div>
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
                        { company.motherCompany == 0 &&
                            <div>
                                <Select
                                    value={cashCurrentSelected ? cashCurrentSelected.id : null}
                                    disabled={!(isCashesCurrent.length > 0)}
                                    onChange={onChangeCash}
                                    placeholder="Seleccione Caja"
                                    className="w-80"
                                >
                                    {
                                        isCashesCurrent.map((obj:any) => <Option key={obj.id} value={obj.id}>{obj.code} - {obj.openingDate} : {obj.user}</Option>)
                                    }
                                </Select>
                            </div>
                        }
                        <div className="flex gap-6 justify-end items-center">
                            <div>
                                <span className={`text-white p-1 rounded font-bold text-sm ${company.demo ? 'bg-amber-500' : 'bg-emerald-600'}`}>{company.demo ? 'Demo' : 'Producción' }</span>
                            </div>
                            <div>
                                <Notifications />
                            </div>
                            <div>
                                <Dropdown menu={
                                    {items: [
                                            {
                                                key: 'password',
                                                disabled: true,
                                                label: <div className="flex gap-2"><LockOutlined /> Cambiar Contraseña</div>,
                                            },
                                            {
                                                key: 'logout',
                                                danger: true,
                                                onClick: async function () {
                                                    const response = await AuthService.logout();
                                                    logout()
                                                    // window.location.reload()
                                                },
                                                label: <div className="flex gap-2"><LogoutOutlined /> Cerrar Sesión</div>,
                                            }
                                        ]
                                    }
                                }>
                                    <div className="bg-white p-2 rounded-md"><UserOutlined className="text-xl text-[--color-app]" /></div>
                                </Dropdown>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-20">
                    {children}
                </div>
            </div>
        </div>
    )
}
