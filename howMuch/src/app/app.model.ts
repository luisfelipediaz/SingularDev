export interface Product {
    id: string;
    name: string;
    brand: string;
    isCustom: boolean;
    supermarkets?: { [id: string]: ProductSupermarket };
}

export interface ProductInMarket extends Product {
    price: number;
    units: number;
    total: number;
}

export interface Supermarket {
    id: string;
    brand: string;
    name: string;
    city: string;
    products?: { [id: string]: boolean };
}

export interface ProductSupermarket {
    id?: string;
    name?: string;
    brand?: string;
    price: number;
    discount?: number;
}

export type TypeWithOrder<T> = { payload: T; oldIndex: number; newIndex: number };
