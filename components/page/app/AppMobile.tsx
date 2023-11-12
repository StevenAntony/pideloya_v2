import { HomeOutlined, ShoppingCartOutlined, InboxOutlined, LineChartOutlined } from '@ant-design/icons'
import { PillTabs } from "@/components/layouts/PillTabs"
import Sale from './sale/Sale';
import { useState } from 'react';
import NotAvailable from '@/components/NotAvailable';

const AppMobile = () =>{
  const [isTabActive, setTabActive] = useState<string>('Inicio')

  const pillTabs = [
    {name:"Inicio", icon: <HomeOutlined />, component: <NotAvailable />},
    {name:"Venta", icon: <ShoppingCartOutlined />, component: <Sale />},
    {name:"Producto", icon: <InboxOutlined />, component: <NotAvailable />}, 
    {name:"Reporte", icon: <LineChartOutlined />, component: <NotAvailable />}
  ]
  
  const componentActive = (name: string) => {
    return pillTabs.find(obj => obj.name == name)?.component
  }
  

  return (
    <div>
      <div className='pt-[70px] min-h-screen bg-white pb-[100px]'>
        {componentActive(isTabActive)}
      </div>
      <PillTabs 
        isTabActive={isTabActive}
        setTabActive={setTabActive}
        pillTabs={pillTabs}
      />
    </div>  
  )
}

export default AppMobile 