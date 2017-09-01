export interface Supermarket {
    $key?: string;
    brand: string;
    name: string;
    city: string;
    products?: { [id: string]: boolean }
}