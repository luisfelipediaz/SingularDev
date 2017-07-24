import { Supermarket } from './supermarket';

export interface Product {
    id: string;
    title: string;    
    price: number;
    supermarket: Supermarket;
}