import { ProductInMarket } from './product-in-market';
import { firestore } from 'firebase';

export interface Market {
    date: firestore.Timestamp;
    user: string;
    products: ProductInMarket[];
    total: number;
}
