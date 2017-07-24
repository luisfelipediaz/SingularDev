
import { Supermarket } from "./supermarket";
import { Product } from "./product";

export interface Market {
    date: Date;
    supermarket: Supermarket;
    products: Array<{
        product: Product,
        price: number;
        count: number;
    }>;
    total: number
}