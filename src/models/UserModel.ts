export type typeUser = 'admin'|'waiter'|'cashier'|'accountant'|'trader'|'store'
export interface UserModel {
    key: number;
    id: number;
    name: string;
    email: string;
    access: Array<string|number>;
    status: number;
    typeOrigin: string;
    type: typeUser;
}

export interface UserStoreModel {
    type: string;
    name: string;
    email: string;
    password: string;
}

export interface UserEditModel {
    type: string;
    name: string;
}
