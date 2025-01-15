import { ProviderModel } from "../../models/ProviderModel";

export interface ProviderMaintainerModalProps {
    providerSelected: ProviderModel|null;
    open: boolean;
    setProviderSelected: (e: ProviderModel|null) => void;
    setOpen: (e: boolean) => void;
    getProviderToBuy: (e: string) => void;
}

export interface ProviderListTableProps {
    loading: boolean;
    dataSource: ProviderModel[];
    setProviderSelected: (e: ProviderModel) => void;
    setOpen: (e: boolean) => void;
    providerSelected: ProviderModel|null;
    reload: () => void;
}
