import { ProductSupermarket } from "./product-supermarket";


export interface Product {
    id: string;
    name: string;
    brand: string;
    supermarkets?: { [id: string]: ProductSupermarket };
}