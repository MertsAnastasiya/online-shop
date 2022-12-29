import { productsData } from '../data';
import { GlobalFilters } from '../filters/globalFilters';
import { FilterResult } from '../filters/result';
import { FilterType, SliderType, SliderValue } from '../interfaces/customTypes';
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
                currentSliders: Map<SliderType, SliderValue>
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
        const startSliders: Map<SliderType, SliderValue> = this.globalFiltres.getCurrentSliders();
        this.updateResult(startFilters, startSliders);
    }

    public updateResult(
        currentFilters: Map<FilterType, Set<string>>,
        slidersValue: Map<SliderType, SliderValue>
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

//     public getQueryParam(param: string): Object {
//         const params =  new URLSearchParams(window.location.search);
//         return Object.fromEntries(params)[];
//     }
//
//     private setQueryParam(param: string, value: string): void {
//         const params =  new URLSearchParams(window.location.search);
//         params.set(param, value);
//     }

}

export function updateQueryParam(param: string, value: string, isAdded: boolean) {
    const params: URLSearchParams =  new URLSearchParams(window.location.search);
    // const paramsObject: Object = Object.fromEntries(params);
    let currentParams: string = params.get(param) || '';
    if(isAdded) {
        if(currentParams) {
            currentParams += `|${value}`;
        } else {
            currentParams += `${value}`;
        }
        console.log(currentParams);
    } else {
        currentParams.
    }
    console.log('llllll');
    // let newUrl = ${window.location.href} + params.toString(
    window.history.pushState('index', 'title1', `${window.location.pathname}?${params.toString()}`);
}
