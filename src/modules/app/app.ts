import { productsData } from '../data';
import { GlobalFilters } from '../filters/globalFilters';
import { FilterResult } from '../filters/result';
import { FilterType, SliderType, SliderValue } from '../interfaces/customTypes';
import { IProduct } from '../interfaces/product.interface';
import { ProductList } from '../productList';
import { Cart } from '../cart';
import { SearchParams } from '../searchParams';
import { Button } from '../button';
import { ProductPage } from '../productPage';
import { PaymentForm } from '../paymentForm';

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
            (event: Event, id: number) => this.onButtonClickAddToCart(event, id),
            (id: number) => this.onProductClick(id),
            (id: number) => this.checkButtonStatus(id)
        );

        this.cart = new Cart(HEADER_CONTAINER);
    }

    public start(): void {
        this.cart.drawCart();
        this.cart.setCurrentValues(String(this.getSum()), String(this.getCount()));

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

        if (search !== '') {
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
        const productView: ProductPage = new ProductPage(MAIN_CONTAINER, id, (event: Event, id: number) =>
            this.onButtonClickAddToCart(event, id), this.onButtonClick);
        productView.drawProductPage(this.getSelectedProducts());
    }

    private createButtons(): void {
        const buttonCopy: Button = new Button(
            document.querySelector('.buttons__wrapper')!,
            (type: string) => this.onButtonClick(type)
        );
        buttonCopy.drawButton('copy');

        const buttonReset: Button = new Button(
            document.querySelector('.buttons__wrapper')!,
            (type: string) => this.onButtonClick(type)
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

    public onButtonClickAddToCart(event: Event, productId: number): void {
        let isAdded: boolean;
        const target = event.target as Element;
        target.classList.toggle('add-to-cart');
        target.classList.toggle('remove-from-cart');
        if (target.classList.contains('remove-from-cart')) {
            target.innerHTML = 'Remove from cart';
            isAdded = true;
        } else {
            target.innerHTML = 'Add to cart';
            isAdded = false ;
        }
        this.setSelectedProducts(productId, isAdded);
        let currentCount: number = Number(this.getCount());
        let currentSum: number = Number(this.getSum());

        this.cart.setCurrentValues(String(currentSum), String(currentCount));
    }

    public checkButtonStatus(id: number): boolean {
        const arraySelectedProducts: number[] = this.getSelectedProducts();
        return arraySelectedProducts.includes(id);
    }

    public onProductClick(id: number) {
        window.open(`${window.location.origin}?id=${id}`, '_blank');
    }

    public getSum(): number {
        const array: number[] = this.getSelectedProducts();
        let sum: number = 0;
        productsData.forEach((item) => {
            if(array.includes(item.id)) {
                sum += item.price;
            }
        });
        return sum;
    }

    public getCount(): number {
        const array: number[]= this.getSelectedProducts();
        return array.length;
    }

    private setSelectedProducts(id: number, isAdded: boolean): void {
        const arraySelectedProducts: number[] = this.getSelectedProducts();
        if(isAdded) {
            arraySelectedProducts.push(id);
            localStorage.setItem('selected',JSON.stringify(arraySelectedProducts));
        } else {
            const newData: number[] = arraySelectedProducts.filter((item) => item !== id);
            localStorage.setItem('selected',JSON.stringify(newData));
        }
    }

    private getSelectedProducts(): number[] {
        const localStorageData: string | null = localStorage.getItem('selected');
        return localStorageData ? JSON.parse(localStorageData) : [];
    }

    private onButtonClick(type: string) {
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
            case 'buy': {
                new PaymentForm(MAIN_CONTAINER, this.onButtonClick).drawForm();
                break;
            }
            case 'pay': {
                document.querySelector('.modal-window')!.innerHTML = `<p class="message">The order accepted!</p>`;
                setTimeout(this.goToMainPage, 3000);
                break;
            }
            default:
                throw new Error('Something went wrong');
        }
    }

    private goToMainPage(): void {
        window.location.href = window.location.origin;
    }
}
