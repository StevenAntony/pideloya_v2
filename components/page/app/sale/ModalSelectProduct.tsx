import { Modal, Select } from "antd"
import { useEffect, useState } from "react";

const ModalSelectProduct = ({
    closeOpenModalSelectProduct,
    isOpenModalSelectProduct,
    isProducts
}:{
    closeOpenModalSelectProduct: () => void;
    isOpenModalSelectProduct: boolean;
    isProducts: Array<IProductForSale>
}) => {
    const [isOptions, setOptions] = useState<Array<any>>([])

    useEffect(() => {
        setOptions(isProducts.map(obj => { return {
            label: obj.description,
            value: obj.id
        } }))
    }, [isProducts])
    return (
        <Modal
            open={isOpenModalSelectProduct}
            onCancel={closeOpenModalSelectProduct}
            maskClosable={false}
        >
            <div className="w-full py-10">
                <Select
                    className="w-full"
                    showSearch
                    placeholder="Select a person"
                    optionFilterProp="children"
                    onChange={() => {}}
                    onSearch={() => {}}
                    options={isOptions}
                />
            </div>
        </Modal>
    )
}

export default ModalSelectProduct