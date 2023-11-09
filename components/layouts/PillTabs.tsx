
import { HomeOutlined, ShoppingCartOutlined, InboxOutlined, LineChartOutlined } from '@ant-design/icons'
import { useState } from "react";
import { MagicTabSelect } from "react-magic-motion"
 
// const pillTabs = [
//   {name:"Inicio", icon: <HomeOutlined />},
//   {name:"Venta", icon: <ShoppingCartOutlined />},
//   {name:"Producto", icon: <InboxOutlined />}, 
//   {name:"Reporte", icon: <LineChartOutlined />}];
 
export function PillTabs({
  isTabActive,
  setTabActive,
  pillTabs
}:{
  isTabActive: string;
  setTabActive: (c: string) => void;
  pillTabs: any
}) {
 
  const tabsComponents = pillTabs.map((obj:any) => {
    return (
      <button
        key={obj.name}
        onClick={() => setTabActive(obj.name)}
        className="bg-white relative px-3 py-2 flex-1 min-w-[90px] text-slate-700"
      >
        {isTabActive === obj.name && (
          <MagicTabSelect
            id="pillTabs"
            transition={{ type: "spring", bounce: 0.35 }}
          >
            <span
              className="top-0 left-0 right-0 bottom-0 z-10 bg-[--color-app-500] absolute flex justify-center items-center
              text-white border-t border-[--color-app-500]"
            >
              <div>
                <div>
                  {obj.icon}
                </div>
                <div className='text-sm'>
                  {obj.name}
                </div>
              </div> 
            </span>
          </MagicTabSelect>
        )}
        <div>
          <div>
            {obj.icon}
          </div>
          <div className='text-sm'>
            {obj.name}
          </div>
        </div> 
      </button>
    );
  });
 
  return (
    <div className="flex w-full fixed bottom-0 box-shadow-app overflow-x-auto pilltab-layout">
      {tabsComponents}
    </div>
  );
}