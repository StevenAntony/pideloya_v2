export interface Response {
    success: boolean;
    message: string;
    code: number;
    data: Data;
}

interface Data {
    total: number;
    list: any[];
}

export interface ResponseModel<T> {
    success: boolean;
    message: string;
    code: number;
    data: T;
}
