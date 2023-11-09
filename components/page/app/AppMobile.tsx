import { HomeOutlined, ShoppingCartOutlined, InboxOutlined, LineChartOutlined } from '@ant-design/icons'
import { PillTabs } from "@/components/layouts/PillTabs"
import Sale from './sale/Sale';
import { useState } from 'react';

const AppMobile = () =>{
  const [isTabActive, setTabActive] = useState<string>('Inicio')

  const pillTabs = [
    {name:"Inicio", icon: <HomeOutlined />, component: 'Inicio'},
    {name:"Venta", icon: <ShoppingCartOutlined />, component: <Sale />},
    {name:"Producto", icon: <InboxOutlined />, component: 'Producto'}, 
    {name:"Reporte", icon: <LineChartOutlined />, component: 'Reporte'}
  ]
  
  const componentActive = (name: string) => {
    return pillTabs.find(obj => obj.name == name)?.component
  }
  

  return (
    <div>
      <div className='pt-[70px] min-h-screen bg-white'>
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