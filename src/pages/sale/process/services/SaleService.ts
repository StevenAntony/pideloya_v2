import { CustomerService } from "@services/entity/CustomerService"
import { ProductService } from "@services/management/ProductService"
import { SaleService as SaleServiceOrigin } from "@services/sale/SaleService"

export const SaleService = {
    listOrdinary: SaleServiceOrigin.listToOrdinary,
    information: SaleServiceOrigin.getInformationToSale,
    listCustomers: CustomerService.listToSale,
    listProducts: ProductService.listToSale,
    create: SaleServiceOrigin.create
}
