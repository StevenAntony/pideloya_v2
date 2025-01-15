import { PackageIcon, PlusIcon } from "@components/icons/IconApp";
import FormatCurrency from "@helpers/FormatCurrency";
import { ProductListToSaleModel } from "@models/managment/ProductModel";
import { Button } from "antd";

type Props = {
    product: ProductListToSaleModel
    priceType: string
    handleAddProduct: (product: ProductListToSaleModel) => void
}

export default function ItemProduct ({
    product,
    priceType,
    handleAddProduct
} : Props) {


    const presentation = product.presentations[0]
    const price = priceType === 'public' ? presentation.salePrice : presentation.dealerPrice

    return (
        <div
            key={product.productID}
            className="bg-white rounded-lg shadow-sm overflow-hidden flex items-center gap-1"
        >
            <PackageIcon className="w-10 h-10" />
            <div className="flex-1 p-2">
                <h3 className="text-base font-semibold">{product.name}</h3>
                <div className="flex items-center justify-between">
                    <span className="text-primary-500 font-semibold">{FormatCurrency.formatCurrency(price)}</span>
                    <Button
                        onClick={() => handleAddProduct(product)}
                        className="bg-[--color-app] inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:!bg-[--color-app-500] focus:outline-none focus:ring-2 focus:ring-offset-2">
                        <PlusIcon className="h-5 w-5 text-white" />
                    </Button>
                </div>
            </div>
        </div>
    )
}
