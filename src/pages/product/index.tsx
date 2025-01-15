import GroupService from "../../service/GroupService"
import ProductService from "../../service/ProductService"
import ProductHead from "./ProductHead"
import ProductListTable from "./ProductListTable"
import ProductPresentationModal from "./ProductPresentationModal"
import ProductMaintainerDrawer from "./ProductMaintainerDrawer"
import { useEffect, useState } from "react"
import { Alert, Input } from "antd"
import PrinterService from "../../service/PrinterService"

const { Search } = Input
const ProductPage = () => {
    const [loadingListProduct, setLoadingListProduct] = useState(false)

    const [openRegisterDrawer, setOpenRegisterDrawer] = useState(false)
    const [openPresentationModal, setOpenPresentationModal] = useState(false)
    const [editMaintainerDrawer, setEditMaintainerDrawer] = useState(false)
    const [isGroups, setGroups] = useState([])
    const [isProducts, setProducts] = useState([])
    const [isPrinters, setPrinters] = useState([])
    const [selectProduct, setSelectProduct] = useState(null)
    const [filterSearch, setFilterSearch] = useState('')

    const [isCheckRequirements, setCheckRequirements] = useState(null)

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

    const getPrinters = async () => {
        const service = new PrinterService()
        await service.available()
        setPrinters(service.getPrintersToProduct())
    }

    const getCheckRequirements = async () => {
        const response = await ProductService.checkRequirements()
        setCheckRequirements(response.data)
    }

    useEffect(() => {
        getGroups()
        getCheckRequirements()
        getProducts()
        getPrinters()
    }, [])

    return (
        <div className="mx-8 my-8 shadow-md bg-white">
            <div className="px-8 pt-4">
                {
                    isCheckRequirements && isCheckRequirements.map((obj, index) => <Alert key={index} message={obj} className="my-1" type="warning" showIcon />)
                }
            </div>
            <div>
                <ProductHead
                    setOpen={setOpenRegisterDrawer}
                    reload={getProducts}
                    setEditMaintainerDrawer={setEditMaintainerDrawer}
                    disableButton={isCheckRequirements ? isCheckRequirements.length != 0 : true}
                />
            </div>
            <div className="px-8 text-right pb-2">
                <Search
                    placeholder="Buscar producto"
                    allowClear
                    enterButton
                    className='w-80'
                    size="middle"
                    onSearch={(value) => {
                        setFilterSearch(value)
                    }}
                />
            </div>
            <div>
                <ProductListTable
                    products={filterSearch
                        ? isProducts.filter(obj => obj.name.toLowerCase().includes(filterSearch.toLowerCase()))
                        : isProducts
                    }
                    setEdit={setEditMaintainerDrawer}
                    setSelectProduct={setSelectProduct}
                    setOpenRegisterDrawer={setOpenRegisterDrawer}
                    setOpenPresentationModal={setOpenPresentationModal}
                    loadingListProduct={loadingListProduct}
                    product={selectProduct}
                    getProducts={getProducts}
                    checkRequirements={isCheckRequirements ? isCheckRequirements.length == 0 : true}
                />
            </div>
            {openRegisterDrawer && <ProductMaintainerDrawer
                open={openRegisterDrawer}
                setOpen={setOpenRegisterDrawer}
                edit={editMaintainerDrawer}
                groups={isGroups}
                product={selectProduct}
                getProducts={getProducts}
                setEdit={setEditMaintainerDrawer}
                isPrinters={isPrinters}
            />}
            <ProductPresentationModal
                open={openPresentationModal}
                product={selectProduct}
                setOpen={setOpenPresentationModal}
                getProducts={getProducts}
            />
        </div>
    )
}

export default ProductPage
