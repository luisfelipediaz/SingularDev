
export interface Product {
    $key: string;
    name: string;
    brand: string;
    supermarkets: { [id: string]: number };
}