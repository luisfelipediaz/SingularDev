import { Supermarket } from './supermarket';

export interface Product {
    id: string;
    name: string;
    brand: string;
    price: number;
    supermarket: Supermarket;
}