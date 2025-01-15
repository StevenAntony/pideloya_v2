import { useEffect, useState } from "react"
import SaleService from "../../service/SaleService"
import { cashCurrentStorage } from "../../../helpers/LocalStorage"
import EmitSaleDrawer from "./EmitSaleDrawer"
import ProductService from "../../service/ProductService"
import { Alert } from "antd"
import SaleTypeOrdinary from "./type/SaleTypeOrdinary"
import { _ProductService } from "../../service/_ProductService"
import { _CategorySevice } from "../../service/_CategoryService"

const SalePage = () => {

    const [isSales, setSales] = useState([])
    const [isInformation, setInformation] = useState(null)
    const [isProducts, setProducts] = useState([])
    const [isCategories, setCategories] = useState([])

    const [openModal, setOpenModal] = useState(false)
    const [loadingList, setLoadingList] = useState(false)

    const [isCheckRequirements, setCheckRequirements] = useState(null)

    const { getCash } = cashCurrentStorage()

    const getSales =async () => {
        if (getCash()) {
            setLoadingList(true)
            const response =await SaleService.listOrdinary(getCash().id)
            setSales(response.data)
            setLoadingList(false)
        }
    }

    const getProducts = async () => {
        const service = new _ProductService()
        await service.getToSale()
        setProducts(service.isProducts)
    }

    const getCategories = async () => {
        const service = new _CategorySevice()
        await service.index()
        setCategories(service.isCategories)
    }

    const getInformation = async () => {
        const { data } = await SaleService.getInformationForSale()
        setInformation(data)
    }

    const getCheckRequirements = async () => {
        const response = await SaleService.checkRequirements()
        const { data } = response
        if (!getCash()) {
            data.push('Se requiere que seleccione una caja')
        }
        setCheckRequirements(response.data)
    }

    useEffect(() => {
        getSales()
        getProducts()
        getCategories()
        getInformation()
        getCheckRequirements()
    }, [])

    return (
        <div className="mx-8 my-8 shadow-md bg-white">
            <div className="px-8 pt-4">
                {
                    isCheckRequirements && isCheckRequirements.map((obj, index) => <Alert key={index} message={obj} className="my-1" type="warning" showIcon />)
                }
            </div>
            <SaleTypeOrdinary
                isCheckRequirements={isCheckRequirements}
                isSales={isSales}
                loadingList={loadingList}
                setOpenModal={setOpenModal}
            />
            { openModal && <EmitSaleDrawer
                open={openModal}
                products={isProducts}
                categories={isCategories}
                information={isInformation}
                setOpen={setOpenModal}
                getSales={getSales}
                typeSale={'Ordinary'}
            /> }
        </div>
    )
}

export default SalePage
