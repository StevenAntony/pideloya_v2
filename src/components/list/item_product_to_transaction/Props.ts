export type Props = {
    item: Item
    increaseQuantity: () => void
    decreaseQuantity: () => void
    changeQuantity: (value: number) => void
    changePrice: (value: number) => void
    removeItem: () => void
}

interface Item {
    name: string
    brand?: string
    price: number
    unitName?: string
    quantity: number
}
