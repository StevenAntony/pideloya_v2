import React from 'react'
import { Typography, Button } from 'antd'

export default function SendSalesReceiptHead({ beta } : { beta: boolean}) {
  return (
    <>
        <div className="px-8 flex justify-between ">
            <Typography.Title level={3}>Enviar Comprobante a Sunat</Typography.Title>
            <div>
                <span className={`text-white p-1 rounded font-bold text-sm ${beta ? 'bg-amber-500' : 'bg-emerald-600'}`}>{beta ? 'Beta' : 'Producción'}</span>
            </div>
        </div>
    </>
  )
}
