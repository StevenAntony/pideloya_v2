export interface CompanyConfigurationModel {
    ruc: string;
    id: number;
    business_name: string;
    configurations: Configuration[];
  }

interface Configuration {
    key: string;
    value: string;
}
