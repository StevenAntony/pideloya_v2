'use client'
import ProductHead from "@/components/page/app/product/ProductHead"
import ProductListTable from "@/components/page/app/product/ProductListTable"
import ProductRegisterDrawer from "@/components/page/app/product/ProductMaintainerDrawer"
import ProductPresentationModal from "@/components/page/app/product/ProductPresentationModal"
import GroupService from "@/service/GroupService"
import ProductService from "@/service/ProductService"
import { useEffect, useState } from "react"

const ProductPage = () => {
    const [loadingListProduct, setLoadingListProduct] = useState<boolean>(false)

    const [openRegisterDrawer, setOpenRegisterDrawer] = useState<boolean>(false)
    const [openPresentationModal, setOpenPresentationModal] = useState<boolean>(false)
    const [editMaintainerDrawer, setEditMaintainerDrawer] = useState<boolean>(false)
    const [isGroups, setGroups] = useState<IGroup[]>([])
    const [isProducts, setProducts] = useState<IProductTable[]>([])
    const [selectProduct, setSelectProduct] = useState<IProductTable|null>(null)

    const getGroups = async () => {
        const response = await GroupService.list()
        setGroups(response.data)
    }

    const getProducts = async () => {
        setLoadingListProduct(true)
        const response = await ProductService.list()
        setLoadingListProduct(false)
        setProducts(response.data)
    }

    useEffect(() => {
        getGroups()
        getProducts()
    }, [])

    return (
        <div className='sm:pt-0 pt-[70px]'>
            <div>
                <ProductHead 
                    setOpen={setOpenRegisterDrawer}
                    setEditMaintainerDrawer={setEditMaintainerDrawer}
                />
            </div>
            <div>
                <ProductListTable                 
                    products={isProducts}
                    setEdit={setEditMaintainerDrawer}
                    setSelectProduct={setSelectProduct}
                    setOpenRegisterDrawer={setOpenRegisterDrawer}
                    setOpenPresentationModal={setOpenPresentationModal}
                    loadingListProduct={loadingListProduct}
                />
            </div>
            <ProductRegisterDrawer 
                open={openRegisterDrawer}
                setOpen={setOpenRegisterDrawer}
                edit={editMaintainerDrawer}
                groups={isGroups}
                product={selectProduct}
                getProducts={getProducts}
                setEdit={setEditMaintainerDrawer}
            />
            <ProductPresentationModal 
                open={openPresentationModal}
                product={selectProduct}
            />
        </div>
    )
}

export default ProductPage