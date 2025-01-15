import React, { useEffect, useState } from 'react'
import { Alert, Modal } from 'antd'
import { useCashContext } from '../hooks/useCashContext'
import CurrencyItem from './square_cash/CurrencyItem'
import { Square } from '../model/CashModuleModel'
import FormatCurrency from '@helpers/FormatCurrency'
import { BodyReconciliationModel } from '@models/managment/CashModel'
import { useAuthContext } from '@contexts/auth/AuthContext'

type Props = {}

const initialSquare: Square[] = [
    { name: '0.10', value: 0.10, current: 0, type: 'money' },
    { name: '0.20', value: 0.20, current: 0, type: 'money' },
    { name: '0.50', value: 0.50, current: 0, type: 'money' },
    { name: '1', value: 1, current: 0, type: 'money' },
    { name: '2', value: 2, current: 0, type: 'money' },
    { name: '5', value: 5, current: 0, type: 'money' },
    { name: '10', value: 10, current: 0, type: 'billet' },
    { name: '20', value: 20, current: 0, type: 'billet' },
    { name: '50', value: 50, current: 0, type: 'billet' },
    { name: '100', value: 100, current: 0, type: 'billet' },
    { name: '200', value: 200, current: 0, type: 'billet' },
]

export default function SquareCashModal({ }: Props) {
    const { openSquareModal, setOpenSquareModal, selectedCash, saveReconciliation } = useCashContext()
    const { user } = useAuthContext()
    const [squares, setSquares] = useState<Square[]>(initialSquare)

    const handleSquareChange = (name: string, value: number) => {
        if (selectedCash?.status != 'APERTURADO' || user.id != selectedCash?.userID) return
        const newSquares = squares.map(square => {
            if (square.name === name) {
                return { ...square, current: value }
            }
            return square
        })
        setSquares(newSquares);
    }

    const totalCounted = squares.reduce((a, b) => a + (b.current * b.value), 0)
    const totalDiference = totalCounted - (selectedCash?.totalCash ?? 0)

    useEffect(() => {
        if (selectedCash) {
            setSquares(selectedCash.reconciliation ? JSON.parse(selectedCash.reconciliation) : initialSquare)
        }
    }, [selectedCash])

    return (
        <Modal
            open={openSquareModal}
            centered={true}
            cancelText="Cancelar"
            okText="Guardar"
            maskClosable={false}
            title={`Cuadrar Caja ${selectedCash?.openingDate} - ${selectedCash?.userName}`}
            okButtonProps={{ disabled: (selectedCash?.status != 'APERTURADO' || user.id != selectedCash?.userID) }}
            onOk={() => {
                if (!selectedCash) {
                    return
                }
                const body: BodyReconciliationModel = {
                    reconciliation: squares.map(square => {
                        return {
                            ...square,
                        }
                    }),
                    cashID: selectedCash.cashID
                }
                saveReconciliation(body)
            }}
            onCancel={() => setOpenSquareModal(false)}
        >
            {
                selectedCash?.status != 'APERTURADO' ?
                    <Alert
                        message={"La caja ya se encuantra cerrada y no se puede cuadrar"}
                        type="warning"
                        showIcon
                    /> : (
                        (user.id != selectedCash?.userID) && <Alert
                            message={"Solo el usuario que abrio la caja puede cuadrar"}
                            type='warning'
                            showIcon
                        />
                    )

            }
            <div className='grid grid-cols-3 py-4'>
                <div className='text-center'>
                    <p>Total Sistema</p>
                    <p>{FormatCurrency.formatCurrency(selectedCash?.totalCash)}</p>
                </div>
                <div className='text-center'>
                    <p>Total Contado</p>
                    <p> {FormatCurrency.formatCurrency(totalCounted)} </p>
                </div>
                <div className='text-center'>
                    <p className={totalDiference != 0 ? 'text-red-500' : 'text-green-500'}>
                        {totalDiference < 0 ? 'Falta' : (totalDiference > 0 ? 'Sobra' : 'Cuadrado')}
                    </p>
                    <p className={totalDiference != 0 ? 'text-red-500' : 'text-green-500'}>{FormatCurrency.formatCurrency(totalDiference)}</p>
                </div>
            </div>
            <div className='grid grid-cols-3 text-center'>
                <div className='w-32 font-bold'>Moneda & Billete</div>
                <div className='font-bold'>Cantidad</div>
                <div className='font-bold'>Total</div>
            </div>
            {
                squares.map((square, index) => (
                    <CurrencyItem key={index} square={square} handleSquareChange={handleSquareChange} />
                ))
            }
        </Modal>
    )
}
