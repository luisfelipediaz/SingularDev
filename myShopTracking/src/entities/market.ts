
import { Supermarket } from "../interfaces/supermarket";
import { Product } from "../interfaces/product";
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
    }

    public add(product: Product): void {
        if (this.products.length === 0) this.marketServiceProvider.pushMarket(this);;
        let index = this.products.findIndex(item => item.product.id === product.id);
        if (index === -1) {
            let newProduct = {
                product: product,
                price: product.supermarkets[this.supermarket.id].price,
                count: 1
            };
            this.products.push(newProduct);
            this.marketServiceProvider.pushProduct(this, newProduct);
        } else {
            this.products[index].count++;
            this.products[index].price = this.products[index].count * this.products[index].product.supermarkets[this.supermarket.id].price;
            this.marketServiceProvider.updateProduct(this, this.products[index]);
        }
        this.calculateTotal();
    }

    public more(product: ProductMarket): void {
        product.count++;
        product.price = product.count * product.product.supermarkets[this.supermarket.id].price;
        this.calculateTotal();
        this.marketServiceProvider.updateProduct(this, product);
    }

    public minus(product: ProductMarket): void {
        product.count--;
        product.price = product.count * product.product.supermarkets[this.supermarket.id].price;
        this.calculateTotal();
        this.marketServiceProvider.updateProduct(this, product);
    }

    public delete(product: Product): void {
        let indexDel = -1;
        let productToDelete: ProductMarket;
        for (let index = 0; index < this.products.length; index++) {
            if (product.id === this.products[index].product.id) {
                productToDelete = this.products[index];
                indexDel = index;
                break;
            }
        }

        if (indexDel > -1) {
            this.products.splice(indexDel, 1);
            this.calculateTotal();
        }

        this.marketServiceProvider.deleteProduct(this, productToDelete);
    }

    public calculateTotal(): void {
        this.total = 0;
        for (let index = 0; index < this.products.length; index++) {
            this.total += this.products[index].price;
        }
    }
}