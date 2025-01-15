import { Drawer, Spin } from 'antd'
import React from 'react'
import { SalePaymentModel } from '../../../models/SalePaymentModel';
import FormatCurrency from '../../../../helpers/FormatCurrency';
import TagPaymentMethod from '../../../components/app/tag/TagPaymentMethod';

type Props = {
    open: boolean;
    setOpen: (e: boolean) => void;
    saleSelected: any;
    payments: SalePaymentModel[];
    loading: boolean;
}

export default function ViewPaymentHistory({
    open,
    setOpen,
    saleSelected,
    payments,
    loading
}: Props) {
    return (
        <Drawer
            title={"Historial de pagos: " + saleSelected?.document}
            open={open}
            width={500}
            onClose={() => setOpen(false)}
        >
            <Spin spinning={loading} tip="Cargando...">
                {
                    payments.map((payment, index) => (
                        <div className='w-full flex flex-wrap items-center justify-between pb-4 border-b-2 border-gray-400' key={index}>
                            <div>
                                <p className='font-semibold'>{payment.issue}</p>
                                <p>{payment.userName}</p>
                                <p><TagPaymentMethod method={payment.paymentMethodName} /></p>
                            </div>
                            <div>
                                <p className='text-right text-lg font-bold'>{FormatCurrency.formatCurrency(payment.amount)}</p>
                            </div>
                        </div>
                    ))
                }
            </Spin>
        </Drawer>
    )
}
