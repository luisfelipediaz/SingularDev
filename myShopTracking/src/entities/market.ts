
import { Supermarket } from "../interfaces/supermarket";
import { Product } from "../interfaces/product";
import { AppConfig } from "../app/app.config";
import { MarketServiceProvider } from "../providers/market-service/market-service";
import { ProductMarket } from "../interfaces/product-market";

export class Market {
    date: number;
    supermarket: Supermarket;
    products: Array<ProductMarket>;
    total: number;

    constructor(private marketServiceProvider: MarketServiceProvider) {
        this.products = [];
        this.date = Date.now();

        if (!!AppConfig.user) {
            marketServiceProvider.pushMarket(this);
        }
    }

    public add(product: Product): void {
        let index = this.products.findIndex(item => item.product.$key === product.$key);
        if (index === -1) {
            let newProduct = {
                product: product,
                price: product.supermarkets[this.supermarket.$key],
                count: 1
            };
            this.products.push(newProduct);
            if (!!AppConfig.user) {
                this.marketServiceProvider.pushProduct(this, newProduct);
            }
        } else {
            this.products[index].count++;
            this.products[index].price = this.products[index].count * this.products[index].product.supermarkets[this.supermarket.$key];
            if (!!AppConfig.user) {
                this.marketServiceProvider.updateProduct(this, this.products[index]);
            }
        }
        this.calculateTotal();
    }

    public more(product: ProductMarket): void {
        product.count++;
        product.price = product.count * product.product.supermarkets[this.supermarket.$key];
        this.calculateTotal();
        if (!!AppConfig.user) {
            this.marketServiceProvider.updateProduct(this, product);
        }
    }

    public minus(product: ProductMarket): void {
        product.count--;
        product.price = product.count * product.product.supermarkets[this.supermarket.$key];
        this.calculateTotal();
        if (!!AppConfig.user) {
            this.marketServiceProvider.updateProduct(this, product);
        }
    }

    public delete(product: Product): void {
        var indexDel = -1;
        for (var index = 0; index < this.products.length; index++) {
            if (product.$key === this.products[index].product.$key) {
                indexDel = index;
                break;
            }
        }

        if (indexDel > -1) {
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