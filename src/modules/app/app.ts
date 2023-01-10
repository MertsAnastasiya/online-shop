import { productsData } from '../data';
import { GlobalFilters } from '../filters/globalFilters';
import { FilterResult } from '../filters/result';
import { FilterType, SliderType, SliderValue } from '../interfaces/customTypes';
import { IProduct } from '../interfaces/product.interface';
import { ProductList } from '../product/productList';
import { Cart } from '../cart';
import { SearchParams } from '../searchParams';
import { Button } from '../filters/button';
import { ProductPage } from '../../productPage';

export class App {
    private productList: ProductList;
    private globalFiltres: GlobalFilters;
    private cart: Cart;
    private searchParams: SearchParams;

    constructor() {
        this.searchParams = new SearchParams();
        this.globalFiltres = new GlobalFilters(
            (
                currentFilters: Map<FilterType, Set<string>>,
                currentSliders: Map<SliderType, SliderValue>,
                searchValue: string
            ) => this.updateResult(currentFilters, currentSliders, searchValue),

            (param: string, value: string, isAdd: boolean) =>
                this.searchParams.updateSearchParamByCheckbox(
                    param,
                    value,
                    isAdd
                ),
            (param: string, min: string, max: string) => this.searchParams.updateSearchParamBySlider(param, min, max),
            (param: string, value: string) => this.searchParams.updateSearchParamBySearch(param, value)
        );
        const products: Element = document.querySelector('.products')!; // ???
        this.productList = new ProductList(
            products,
            (id: number, isAdded: boolean) =>
                this.onProductItemSelected(id, isAdded),
            (id: number) => this.onProductClick(id)
        );
        const header: Element = document.querySelector('.header__container')!; //???

        this.cart = new Cart(header);
    }

    public start(): void {
        this.cart.drawCart();
        this.cart.setCurrentValues(this.getSum(), this.getCount());
        this.cart.resetBtn(); // will be remove at the end

        const searchParams = Object.fromEntries(new URLSearchParams(window.location.search));

        if (Object.keys(searchParams).includes('id')) {
            const productView = new ProductPage(document.querySelector('.main__container')!, Number(searchParams.id));
            productView.drawProductPage();
        } else {
            this.globalFiltres.createFilters(productsData);
            if (Object.keys(searchParams).length !== 0) {
                for(const key in searchParams) {
                    if (key === 'price' || key === 'stock') {
                        const objectMinMax: SliderValue = {min: Number(searchParams[key]!.split('/')[0]), max: Number(searchParams[key]!.split('/')[1])};
                        this.globalFiltres.setCurrentSliders(key as SliderType, objectMinMax);
                    } else if (key === 'category' || key === 'brand') {
                        searchParams[key]!.split('|').forEach((item) => {
                            const checkbox =  document.getElementById(item!)! as HTMLInputElement;
                            checkbox.checked = true;
                            this.globalFiltres.setCurrentFilters(key as FilterType, item);
                        })
                    }
                }
            }
            this.updateResult(this.globalFiltres.getCurrentFilters(), this.globalFiltres.getCurrentSliders(), searchParams['search'] || '');
            const button = new Button(
                document.querySelector('.buttons__wrapper')!,
                (type: string) => this.onClickButton(type)
            );
            button.drawButton('copy');
            button.drawButton('reset');
        }
    }

    public updateResult(
        currentFilters: Map<FilterType, Set<string>>,
        slidersValue: Map<SliderType, SliderValue>,
        searchValue: string
    ): void {
        const array: IProduct[] = FilterResult.getFilterResult(
            currentFilters,
            slidersValue,
            searchValue
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

    public onProductClick(id: number) {
        window.open(
            `${window.location.origin}?id=${id}`,
            '_blank'
        );
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

    private onClickButton(type: string) {
        switch (type) {
            case 'copy': {
                const temp: HTMLInputElement = document.createElement('input');
                document.body.appendChild(temp);
                temp.value = window.location.href;
                temp.select();
                document.execCommand('copy');
                document.body.removeChild(temp);
                break;
            }
            case 'reset': {
                const allCheckbox: NodeListOf<HTMLInputElement> = document.querySelectorAll('.checkbox');
                allCheckbox.forEach((checkbox) => {
                    if (checkbox.checked) {
                        checkbox.checked = false;
                    }
                });
                this.searchParams.clearUrl();
                this.globalFiltres.clearFilters();
            }
            default:
                throw new Error('Something went wrong');
                break;
        }
    }
}
