import { productsData } from '../data';
import { GlobalFilters } from '../filters/globalFilters';
import { FilterResult } from '../filters/result';
import { FilterType, SliderType, SliderValue } from '../interfaces/customTypes';
import { IProduct } from '../interfaces/product.interface';
import { ProductList } from '../product/productList';
import { Cart } from '../cart';
import { SearchParams } from '../searchParams';
import { Button } from '../button';
import { ProductPage } from '../productPage';

const MAIN_CONTAINER: Element = document.querySelector('.main__container')!;
const HEADER_CONTAINER: Element = document.querySelector('.header__container')!;
const PRODUCTS_LIST_CONTAINER: Element = document.querySelector('.products')!;

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
            (param: string, min: string, max: string) =>
                this.searchParams.updateSearchParamBySlider(param, min, max),
            (param: string, value: string) =>
                this.searchParams.updateSearchParamBySearch(param, value)
        );

        this.productList = new ProductList(
            PRODUCTS_LIST_CONTAINER,
            (id: number, isAdded: boolean) =>
                this.onProductItemSelected(id, isAdded),
            (id: number) => this.onProductClick(id)
        );

        this.cart = new Cart(HEADER_CONTAINER);
    }

    public start(): void {
        this.cart.drawCart();
        this.cart.setCurrentValues(this.getSum(), this.getCount());
        this.cart.resetBtn(); // will be remove at the end

        this.drawPageByUrl(window.location.href, window.location.search);
    }

    private drawPageByUrl(url: string, search: string): void {
        if (url.includes('id')) {
            const id: number = Number(url.split('=').pop());
            this.drawProductPage(id);
            return;
        }

        this.globalFiltres.createFilters(productsData);
        const searchParams = Object.fromEntries(new URLSearchParams(search));

        if (search) {
            this.setStartFilters(searchParams);
        }

        this.updateResult(
            this.globalFiltres.getCurrentFilters(),
            this.globalFiltres.getCurrentSliders(),
            searchParams['search'] || ''
        );

        this.createButtons();
    }

    private setStartFilters(searchParams: { [x: string]: string }) {
        for (const key in searchParams) {
            if (key === 'price' || key === 'stock') {
                const objectMinMax: SliderValue = {
                    min: Number(searchParams[key]!.split('/')[0]),
                    max: Number(searchParams[key]!.split('/')[1]),
                };
                this.globalFiltres.setCurrentSliders(
                    key as SliderType,
                    objectMinMax
                );
            }
            if (key === 'category' || key === 'brand') {
                searchParams[key]!.split('|').forEach((item) => {
                    const checkbox = document.getElementById(
                        item!
                    )! as HTMLInputElement;
                    checkbox.checked = true;
                    this.globalFiltres.setCurrentFilters(
                        key as FilterType,
                        item
                    );
                });
            }
        }
    }

    private drawProductPage(id: number): void {
        const productView: ProductPage = new ProductPage(MAIN_CONTAINER, id);
        productView.drawProductPage();
    }

    private createButtons(): void {
        const buttonCopy: Button = new Button(
            document.querySelector('.buttons__wrapper')!,
            (type: string) => this.onClickButton(type)
        );
        buttonCopy.drawButton('copy');

        const buttonReset: Button = new Button(
            document.querySelector('.buttons__wrapper')!,
            (type: string) => this.onClickButton(type)
        );
        buttonReset.drawButton('reset');
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
        const product: IProduct = productsData.filter(
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
        window.open(`${window.location.origin}?id=${id}`, '_blank');
    }

    public getSum(): string {
        return localStorage.getItem('sum')
            ? localStorage.getItem('sum')!
            : '0';
    }

    public getCount(): string {
        return localStorage.getItem('count')
            ? localStorage.getItem('count')!
            : '0';
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
                const allCheckbox: NodeListOf<HTMLInputElement> =
                    document.querySelectorAll('.checkbox');
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
        }
    }
}
