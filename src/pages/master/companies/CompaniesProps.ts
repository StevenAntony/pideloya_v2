import { CompanyModel } from "../../../models/CompanyModel";

export interface CompaniesMaintainerModalProps {
    companySelected: CompanyModel|null;
    open: boolean;
    setCompanySelected: (e: CompanyModel|null) => void;
    setOpen: (e: boolean) => void;
    reload: () => void;
}

export interface CompaniesLicenseModalProps {
    companySelected: CompanyModel;
    open: boolean;
    setOpen: (e: boolean) => void;
    reload: () => void;
}

export interface ComapiesListTableProps {
    loading: boolean;
    dataSource: CompanyModel[];
    setCompanySelected: (e: CompanyModel) => void;
    setOpen: (e: boolean) => void;
    companySelected: CompanyModel|null;
    reload: () => void;
    setOpenLicense: (e: boolean) => void;
    setOpenConfigurations: (e: boolean) => void;
}

export interface CompaniesConfigurationsProps {
    companySelected: CompanyModel;
    openConfigurations: boolean;
    setOpenConfigurations: (e: boolean) => void;
}
