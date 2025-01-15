import { useEffect } from "react"
import DocumentSale from "@pages/sale/process/components/document/DocumentSale"
import PaymentSale from "@pages/sale/process/components/document/PaymentSale"
import FormatCurrency from "@helpers/FormatCurrency"
import { useSaleContext } from "@pages/sale/process/hooks/useSaleContext"
import ItemPaymentSale from "@components/list/ItemPaymentSale"

type Props = {
}

export default function DocumentAndPaymentSale({ }: Props) {

    const {
        isInformation,
        informationInSale,
        setInformationInSale,
        totalPayment,
        totalProductsInSale,
        listCustomers
    } = useSaleContext()

    const removeToPayment = (index: number) => {
        const draftPayments = [...informationInSale.payments]
        draftPayments.splice(index, 1)
        setInformationInSale('payments', draftPayments)
    }

    useEffect(() => {
        setInformationInSale('serieID', isInformation.vouchersSeries[0].id)
        listCustomers('S0000001')
    }, [])

    return (
        <>
            <div className="flex flex-wrap py-10">
                <div className="w-7/12 px-10 modal-select-product">
                    <div className="bg-white p-5 h-full">
                        <DocumentSale />
                        <PaymentSale />
                    </div>
                </div>
                <div className="w-5/12 px-10">
                    <div className="w-full text-center py-5">
                        <p className="text-4xl font-black">{FormatCurrency.formatCurrency(totalProductsInSale)}</p>
                    </div>
                    <div className="flex flex-wrap gap-y-4">
                        <div className="w-full">
                            {
                                informationInSale.payments.map((obj, index) => (
                                    <ItemPaymentSale
                                        payment={obj}
                                        index={index}
                                        key={index}
                                        removeToPayment={removeToPayment}
                                    />
                                ))
                            }
                        </div>
                        <div className={`
                            ${totalPayment - totalProductsInSale < 0 ? 'bg-rose-500' : (
                                totalPayment - totalProductsInSale == 0 ? 'bg-blue-600' : 'bg-emerald-600'
                            )}
                            px-4 py-1 w-full flex rounded text-white font-bold justify-between
                        `}>
                            <span>Debe:</span> <span>{FormatCurrency.formatCurrency(totalProductsInSale - totalPayment)}</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
