export interface Supermarket {
    id?: string;
    brand: string;
    name: string;
    city: string;
    products?: { [id: string]: boolean }
}