import { InputNumber , Input, Select, Button, Switch } from 'antd'
import { useEffect, useRef, useState } from 'react'
import FormatCurrency from '../../../../helpers/FormatCurrency'
import ItemDetailSale from '../../../components/list/ItemDetailSale'
import { useAuthContext } from '../../../contexts/AuthContext'
import { useAppContext } from '../../../contexts/AppContext'
import SearchProduct from '../../../components/app/SearchProduct'

const DetailSale = ({
    isProducts,
    detailsSale,
    setDetailsSale,
    typeSale,
    categories
}) => {
    const inputRef = useRef(null)
    const [searchByBarCode, setSearchByBarCode] = useState(true)
    const [textSearchBarCode, setTextSearchBarCode] = useState('')

    const { auth } = useAuthContext()
    const { priceTypeApp } = useAppContext()

    const onEnterBarCode = (e) => {
        const product = isProducts.find(product => product.barcode == e.target.value)
        if(!product) return ;
        const presentations = product?.presentations == undefined ? [] : product?.presentations
        const priceFirst = priceTypeApp === 'public' ? presentations[0].salePrice : presentations[0].dealerPrice
        buildNewOrder({
            idPresentation: presentations && presentations[0].id,
            amount: presentations ? priceFirst : 0,
            note: '',
            quantity: 1,
            description: product != null ? product.description : ''
        })
        setTextSearchBarCode('')
    }

    const addInOrder = (product) => {
        const presentation = product.presentations[0]
        const price = priceTypeApp === 'public' ? presentation.salePrice : presentation.dealerPrice
        const newOrder = {
            action: 'new',
            amount: price,
            description: product.name,
            id: 0,
            idPresentation: presentation.id,
            idStore: 1,
            originalQuantity: 1,
            quantity: 1,
            note: '',
            presentations: product.presentations
        }

        const detailsSaleDraft = [...detailsSale]
        const posIndex = detailsSaleDraft.findIndex(obj =>
                obj.idPresentation === newOrder.idPresentation &&
                obj.amount === newOrder.amount &&
                obj.note === newOrder.note
            )

        if(posIndex !== -1){
            detailsSaleDraft[posIndex].quantity += 1
            setDetailsSale([...detailsSaleDraft])
        }else{
            setDetailsSale([newOrder, ...detailsSaleDraft])
        }
        inputRef.current.focus({
            cursor: 'start'
        })
    }

    const subtractQuantityDetail = (index) => {
        const draftDetails = [...detailsSale]
        draftDetails[index].quantity = draftDetails[index].quantity - 1 == 0 ? 1 : (draftDetails[index].quantity - 1)

        setDetailsSale([...draftDetails])
    }

    const addQuantityDetail = (index) => {
        if (typeSale == 'Table') return;
        const draftDetails = [...detailsSale]
        draftDetails[index].quantity = draftDetails[index].quantity + 1

        setDetailsSale([...draftDetails])
    }

    const removeToDetail = (index) => {
        const draftDetails = [...detailsSale]
        draftDetails.splice(index, 1)
        setDetailsSale(draftDetails)
    }

    const changeDetailSale = (index, field, value) => {
        const draftDetails = [...detailsSale]
        draftDetails[index][field] = value
        setDetailsSale([...draftDetails])
    }

    useEffect(() => {
        setSearchByBarCode(auth.config.searchByBarCode != 0 ?? false)
        if (searchByBarCode || auth.config.searchByBarCode != 0) {
            setTimeout(() => {
                inputRef.current.focus({
                    cursor: 'start'
                })
            }, 1000)
        }
    }, [])

    return (
        <div className='flex flex-wrap relative'>
            { typeSale == 'Table' && <div className='absolute top-0 left-0 w-full h-full z-10 opacity-30 bg-white cursor-not-allowed'></div> }
            <div className='w-6/12 bg-white relative'>
                <SearchProduct
                    categories={categories}
                    products={isProducts}
                    handleAddProduct={addInOrder}
                    direction='Horizontal'
                    inputRef={inputRef}
                />
            </div>
            <div className='w-6/12 py-0 px-5'>
                <div className='h-[480px] overflow-y-auto scroll-app'>
                    {
                        detailsSale.map((order, index) => {
                            return <ItemDetailSale
                                    key={`${order.id}${index}`}
                                    order={order}
                                    index={index}
                                    subtractQuantityDetail={subtractQuantityDetail}
                                    addQuantityDetail={addQuantityDetail}
                                    removeToDetail={removeToDetail}
                                    changeDetail={changeDetailSale}
                                    priceType={priceTypeApp}
                                />
                        })
                    }
                </div>
                <div>
                    <p className='text-base'>
                        Tienes
                        <strong className='text-lg mx-1'>{ detailsSale.length }</strong>
                        producto{ detailsSale.length > 1 ? 's' : '' } con total
                        <strong className='text-lg mx-1'>{ FormatCurrency.formatCurrency(detailsSale.reduce((total, order) => total + order.amount * order.quantity, 0)) }</strong>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default DetailSale
