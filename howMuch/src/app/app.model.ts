export interface Product {
    id: string;
    name: string;
    brand: string;
}

export interface ProductInMarket extends Product {
    price: number;
    units: number;
    total: number;
}
