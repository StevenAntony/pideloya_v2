import { CashService } from '@services/management/CashService';
import GroupCashService from '@services/management/GroupCashService';

export const CashModuleService = {
    list: CashService.listToManagement,
    open: CashService.open,
    close: CashService.close,
    saveReconciliation:  CashService.saveReconciliation,
    listGroupCash: GroupCashService.listToManagement,
}
