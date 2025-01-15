import { OrderModel } from "../../models/OrderModel";
import { Api } from "../Api";
import { ResponseService } from "./../ResponseService";

export default class OrderService extends ResponseService {
    private orders: OrderModel[] = []

    constructor(){
        super()
    }

    getOrders():OrderModel[]  {
        return this.orders
    }

    async list() {
        this.response = await Api.Get(`orders?origin=waiter`)
        if (this.response.success) {
            this.orders = this.response.data.map(obj => {
                return {...obj, quantity: Number(obj.quantity) - Number(obj.quantityCharged)}
            })
        }
    }

    async listKichen() {
        this.response = await Api.Get(`orders?origin=kitchen`)
        if (this.response.success) {
            this.orders = this.response.data.map(obj => {
                return {...obj, quantity: Number(obj.quantity) - Number(obj.quantityCharged)}
            })
        }
    }

    async updateState(id: number, state: string) {
        this.response = await Api.Put(`orders/${id}`, {state})
    }
}
