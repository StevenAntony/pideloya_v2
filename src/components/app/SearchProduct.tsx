import { Button, Input } from 'antd'
import type { InputRef } from 'antd'
import React, { useState, useMemo } from 'react'
import CategoryButton from './button/CategoryButton'
import { ComponentIcon, PackageIcon, PlusIcon } from '../icons/IconApp'
import { ProductModel } from '../../models/ProductModel';
import { useAppContext } from '../../contexts/AppContext';
import FormatCurrency from '../../../helpers/FormatCurrency';
import { CategoryModel } from '../../models/CategoryModel';

type Props = {
    categories: CategoryModel[];
    products: ProductModel[];
    handleAddProduct: (product: ProductModel) => void;
    direction: 'Horizontal' | 'Vertical';
    inputRef: React.LegacyRef<InputRef> | undefined
}

const ItemProduct = ({
    product,
    priceType,
    handleAddProduct
} : {
    product: ProductModel;
    priceType: string;
    handleAddProduct: (product: ProductModel) => void;
}) => {


    const presentation = product.presentations[0]
    const price = priceType === 'public' ? presentation.salePrice : presentation.dealerPrice

    return (
        <div
            key={product.id}
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

export default function SearchProduct({
    categories,
    products,
    handleAddProduct,
    direction = 'Vertical',
    inputRef
}: Props) {
    const [selectedCategory, setSelectedCategory] = useState<string>('')
    const [searchTerm, setSearchTerm] = useState<string>("")

    const { priceTypeApp } = useAppContext()

    const filteredProducts = useMemo(() => {
        return products.filter((product) => {
            if (selectedCategory && product.nameCategory.toLowerCase() !== selectedCategory.toLowerCase()) {
                return false
            }
            if (searchTerm.length > 0 && !product.name.toLowerCase().includes(searchTerm.toLowerCase())) {
                return false
            }
            return true
        })
    }, [selectedCategory, searchTerm])

    const handleCategoryClick = (category) => {
        setSelectedCategory(category)
    }

    const handleSearch = (e) => {
        setSearchTerm(e.target.value)
    }

    return (
        <div className={`flex ${direction === 'Horizontal' ? 'flex-row' : 'flex-col'} p-6`}>
            <div
                className={`bg-white rounded-lg shadow-sm overflow-x-auto ${direction === 'Horizontal' ? 'w-[300px] h-[480px]' : 'mb-4'} overflow-y-auto mr-2`}
            >
                <div
                    style={{ width: direction === 'Horizontal' ? '' : `${98 * categories.length}px` }}
                    className={`flex ${direction === 'Horizontal' ? 'flex-wrap' : 'flex-row'}`}
                >
                    <CategoryButton
                        icon={<PackageIcon className="w-6 h-6 mb-2" />}
                        name='Todos'
                        selected={selectedCategory === ''}
                        key={'all'}
                        onClick={() => handleCategoryClick('')}
                    />
                    {categories.map((category, index) => (
                        <CategoryButton
                            icon={<ComponentIcon className="w-6 h-6 mb-2" />}
                            name={category.name}
                            selected={selectedCategory === category.name}
                            key={index}
                            onClick={() => handleCategoryClick(category.name)}
                        />
                    ))}
                </div>
            </div>
            <div className='flex-1'>
                <div className="mb-4">
                    <Input
                        type="search"
                        ref={inputRef}
                        placeholder="Buscar producto..."
                        value={searchTerm}
                        onChange={handleSearch}
                        className="w-full bg-white rounded-md border border-gray-400 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    />
                </div>
                <div className="h-[380px] gap-4 overflow-y-auto">
                    {filteredProducts.slice(0, 20).map((product, index) => (
                        <ItemProduct
                            product={product}
                            priceType={priceTypeApp}
                            handleAddProduct={handleAddProduct}
                            key={index}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}
