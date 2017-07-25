
import { Supermarket } from "../interfaces/supermarket";
import { Product } from "../interfaces/product";

export class Market {
    date: Date;
    supermarket: Supermarket;
    products: Array<{
        product: Product,
        price: number;
        count: number;
    }>;
    total: number;

    constructor() {
        this.products = [];
        this.date = new Date();
    }

    public add(product: Product): void {
        let index = this.products.findIndex(item => item.product.id === product.id);
        if (index === -1) {
            this.products.push({
                product: product,
                price: product.price,
                count: 1
            });
        } else {
            this.products[index].count++;
            this.products[index].price = this.products[index].count * this.products[index].product.price;
        }
        this.calculateTotal();
    }

    public delete(product: Product): void {
        var indexDel = -1;
        for (var index = 0; index < this.products.length; index++) {
            var element = this.products[index];
            if (product.id === element.product.id) {
                indexDel = index;
                break;
            }
        }

        if (indexDel > -1){
            this.products.splice(indexDel, 1);
            this.calculateTotal();
        }
    }

    public calculateTotal(): void {
        this.total = 0;
        for (var index = 0; index < this.products.length; index++) {
            this.total += this.products[index].price;
        }
    }
}