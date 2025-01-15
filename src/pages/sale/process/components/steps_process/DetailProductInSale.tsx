import React, { useEffect, useRef, useState } from 'react'
import { ProductListToSaleModel } from '@models/managment/ProductModel'
import { CategoryListToSaleModel } from '@models/managment/CategoryModel'
import { useAuthContext } from '@contexts/auth/AuthContext'
import { useAppContext } from '@contexts/AppContext'
import SearchProduct from '@pages/sale/process/components/select_products/SearchProduct'
import ItemProductInSale from '@pages/sale/process/components/select_products/ItemProductInSale'
import { IProductInSale } from '@pages/sale/process/components/select_products/ISelectProducts'
import { uuid } from '@helpers/uuid'
import FormatCurrency from '@helpers/FormatCurrency'
import { useSaleContext } from '@pages/sale/process/hooks/useSaleContext'

type Props = {
    typeSale: 'Ordinary' | 'Table'
}

export default function DetailProductInSale ({
    typeSale
}: Props) {

    const { productsInSale, setProductsInSale, isProducts, isCategories } = useSaleContext()

    const inputRef = useRef(null)
    const [searchByBarCode, setSearchByBarCode] = useState(true)
    const [textSearchBarCode, setTextSearchBarCode] = useState('')

    const { config } = useAuthContext()
    const { priceTypeApp } = useAppContext()

    const onEnterBarCode = (e: React.ChangeEvent<HTMLInputElement>) => {
        const product = isProducts.find(product => product.barcode == e.target.value)
        if(!product) return ;
        const presentations = product?.presentations == undefined ? [] : product?.presentations
        const priceFirst = priceTypeApp === 'public' ? presentations[0].salePrice : presentations[0].dealerPrice
        // buildNewOrder({
        //     idPresentation: presentations && presentations[0].id,
        //     amount: presentations ? priceFirst : 0,
        //     note: '',
        //     quantity: 1,
        //     description: product != null ? product.description : ''
        // })
        setTextSearchBarCode('')
    }

    const addProductInSale = (product: ProductListToSaleModel) => {
        const presentation = product.presentations[0]
        const price = priceTypeApp === 'public' ? presentation.salePrice : presentation.dealerPrice
        const productToAdd: IProductInSale = {
            action: 'new',
            price,
            description: product.name,
            id: uuid(),
            presentationID: presentation.presentationID,
            storeID: 1,
            // originalQuantity: 1,
            quantity: 1,
            note: '',
            presentations: product.presentations
        }

        const productsInSaleDraft = [...productsInSale]
        const positionIndex = productsInSaleDraft.findIndex(obj =>
            obj.presentarionID === productToAdd.presentarionID &&
            obj.price === productToAdd.price &&
            obj.note === productToAdd.note
        )

        if(positionIndex !== -1){
            productsInSaleDraft[positionIndex].quantity += 1
            setProductsInSale([...productsInSaleDraft])
        }else{
            setProductsInSale([productToAdd, ...productsInSaleDraft])
        }
        // inputRef?.current?.focus({
        //     cursor: 'start'
        // })
    }

    const subtractQuantity = (index: number) => {
        const productsInSaleDraft = [...productsInSale]
        productsInSaleDraft[index].quantity = productsInSaleDraft[index].quantity - 1 == 0 ? 1 : (productsInSaleDraft[index].quantity - 1)

        setProductsInSale([...productsInSaleDraft])
    }

    const addQuantity = (index: number) => {
        if (typeSale == 'Table') return;
        const productsInSaleDraft = [...productsInSale]
        productsInSaleDraft[index].quantity = productsInSaleDraft[index].quantity + 1
        setProductsInSale([...productsInSaleDraft])
    }

    const removeProductInSale = (index: number) => {
        const productsInSaleDraft = [...productsInSale]
        productsInSaleDraft.splice(index, 1)
        setProductsInSale(productsInSaleDraft)
    }

    const onChangeProductInSale = (index: number, field: string, value: any) => {
        const productsInSaleDraft = [...productsInSale]
        productsInSaleDraft[index][field] = value
        setProductsInSale([...productsInSaleDraft])
    }

    useEffect(() => {
        setSearchByBarCode(config.searchByBarCode)
        // if (searchByBarCode || config.searchByBarCode) {
        //     setTimeout(() => {
        //         inputRef.current.focus({
        //             cursor: 'start'
        //         })
        //     }, 1000)
        // }
    }, [])

    return (
        <div className='flex flex-wrap relative'>
            { typeSale == 'Table' && <div className='absolute top-0 left-0 w-full h-full z-10 opacity-30 bg-white cursor-not-allowed'></div> }
            <div className='w-6/12 bg-white relative'>
                <SearchProduct
                    categories={isCategories}
                    products={isProducts}
                    handleAddProduct={addProductInSale}
                    direction='Horizontal'
                    inputRef={inputRef}
                />
            </div>
            <div className='w-6/12 py-0 px-5'>
                <div className='h-[480px] overflow-y-auto scroll-app'>
                    {
                        productsInSale.map((product, index) => {
                            return <ItemProductInSale
                                    key={`${product.id}${index}`}
                                    productInSale={product}
                                    index={index}
                                    subtractQuantity={subtractQuantity}
                                    addQuantity={addQuantity}
                                    removeProductInSale={removeProductInSale}
                                    onChangeProductInSale={onChangeProductInSale}
                                    priceType={priceTypeApp}
                                />
                        })
                    }
                </div>
                <div>
                    <p className='text-base'>
                        Tienes
                        <strong className='text-lg mx-1'>{ productsInSale.length }</strong>
                        producto{ productsInSale.length > 1 ? 's' : '' } con total
                        <strong className='text-lg mx-1'>{ FormatCurrency.formatCurrency(productsInSale.reduce((total, product) => total + product.price * product.quantity, 0)) }</strong>
                    </p>
                </div>
            </div>
        </div>
    )
}
