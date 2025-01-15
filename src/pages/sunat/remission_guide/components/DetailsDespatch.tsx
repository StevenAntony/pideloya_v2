import React from 'react'
import AddNewProduct from '../../../../components/app/forms/AddNewProduct'
import ItemDetailSale from '../../../../components/list/ItemDetailSale';

type Props = {
    products: any[];
    details: {
        detailsDespatch: any[];
        setDetailsDespatch: (e: any) => void;
    };
}

export default function DetailsDespatch({
    products,
    details
}: Props) {
    const { detailsDespatch, setDetailsDespatch } = details

    const subtractQuantityDetail = (index) => {
        const draftDetails = [...detailsDespatch]
        draftDetails[index].quantity = draftDetails[index].quantity - 1 == 0 ? 1 : (draftDetails[index].quantity - 1)
        setDetailsDespatch([...draftDetails])
    }

    const addQuantityDetail = (index) => {
        const draftDetails = [...detailsDespatch]
        draftDetails[index].quantity = draftDetails[index].quantity + 1
        setDetailsDespatch([...draftDetails])
    }

    const removeToDetail = (index) => {
        const draftDetails = [...detailsDespatch]
        draftDetails.splice(index, 1)
        setDetailsDespatch(draftDetails)
    }

    return (
        <div className='flex'>
            <div className='w-2/6'>
                <AddNewProduct
                    showPrice={false}
                    products={products}
                    details={detailsDespatch}
                    setDetails={setDetailsDespatch}
                />
            </div>
            <div className='w-4/6 px-5'>
                <div className='h-[400px] overflow-y-auto scroll-app'>
                    {
                        detailsDespatch.map((order, index) => {
                            return <ItemDetailSale
                                    key={`${order.id}${index}`}
                                    order={order}
                                    index={index}
                                    subtractQuantityDetail={subtractQuantityDetail}
                                    addQuantityDetail={addQuantityDetail}
                                    removeToDetail={removeToDetail}
                                    showPrice={false}
                                />
                        })
                    }
                </div>
            </div>
        </div>
    )
}
