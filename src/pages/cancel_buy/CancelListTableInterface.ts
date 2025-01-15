import { BuyModel } from "../../models/BuyModel";

export interface CancelListTableInterface {
    dataSource: BuyModel[];
    loading: boolean;
    reload: () => void;
}
