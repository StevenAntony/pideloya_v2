import { CustomerService } from "@services/entity/CustomerService";
import { ProductService } from "@services/management/ProductService";
import { QuotationService } from "@services/sale/QuotationService";

export const QuotationModuleService = {
    listCustomers: CustomerService.listToQuotation,
    listProducts: ProductService.listToQuotation,
    store: QuotationService.store,
    index: QuotationService.listToManagement,
    delete: QuotationService.delete,
    changeStatus: QuotationService.changeStatus,
    update: QuotationService.update,
    show: QuotationService.show,
    mail: QuotationService.sendMail
}
