import { productsData } from '../data';
import { GlobalFilters } from '../filters/globalFilters';
import { FilterResult } from '../filters/result';
import { FilterType, FilterTypeSliders, SliderValue } from '../interfaces/customTypes';
import { IProduct } from '../interfaces/product.interface';
import { ProductList } from '../product/productList';
import { Cart } from '../cart';

export class App {
    private productList: ProductList;
    private globalFiltres: GlobalFilters;
    private cart: Cart;

    constructor() {
        this.globalFiltres = new GlobalFilters(
            (
                currentFilters: Map<FilterType, Set<string>>,
                currentSliders: Map<FilterTypeSliders, SliderValue>
            ) => this.updateResult(currentFilters, currentSliders)
        );
        const products: Element = document.querySelector('.products')!; // ???
        this.productList = new ProductList(
            products,
            (id: number, isAdded: boolean) =>
                this.onProductItemSelected(id, isAdded)
        );
        const header: Element = document.querySelector('.header__container')!; //???

        this.cart = new Cart(header);
    }

    public start(): void {
        this.cart.drawCart();
        this.cart.setCurrentValues('0', '0');
        this.cart.resetBtn(); // will be remove at the end
        this.globalFiltres.createFilters(productsData);
        this.globalFiltres.createSliders();

        const startFilters: Map<FilterType, Set<string>> = this.globalFiltres.getCurrentFilters();
        const startSliders: Map<FilterTypeSliders, SliderValue> = this.globalFiltres.getCurrentSliders();
        this.updateResult(startFilters, startSliders);
    }

    public updateResult(
        currentFilters: Map<FilterType, Set<string>>,
        slidersValue: Map<FilterTypeSliders, SliderValue>
    ): void {
        const array: IProduct[] = FilterResult.getFilterResult(
            currentFilters,
            slidersValue
        );
        this.productList.drawProductList(array);
        this.setFoundProducts(array.length);
    }

    private setFoundProducts(count: number): void {
        const found: Element = document.querySelector('.filters__result')!;
        found.innerHTML = `Found: ${count}`;
    }

    public onProductItemSelected(productId: number, isAdded: boolean) {
        const product = productsData.filter(
            (product) => product.id === productId
        )[0]!;
        let currentCount: number = Number(this.getCount());
        let currentSum: number = Number(this.getSum());
        currentCount += isAdded ? 1 : -1;
        currentSum += isAdded ? product.price : -product.price;
        this.setCount(String(currentCount));
        this.setSum(String(currentSum));
        this.cart.setCurrentValues(String(currentSum), String(currentCount));
    }

    public getSum(): string {
        if (localStorage.getItem('sum')) {
            return localStorage.getItem('sum')!;
        } else {
            return '0';
        }
    }

    public getCount(): string {
        if (localStorage.getItem('count')) {
            return localStorage.getItem('count')!;
        } else {
            return '0';
        }
    }

    private setSum(sum: string): void {
        localStorage.setItem('sum', sum);
    }

    private setCount(amount: string): void {
        localStorage.setItem('count', amount);
    }
}
