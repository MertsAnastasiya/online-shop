import { productsData } from '../data';
import { GlobalFilters } from '../filters/globalFilters';
import { FilterResult } from '../filters/result';
import {
    FilterType,
    PageButtons,
    SliderType,
    SliderValue,
} from '../interfaces/customTypes';
import { IProduct } from '../interfaces/product.interface';
import { ProductList } from '../productList';
import { Cart } from '../cart';
import { SearchParams } from '../searchParams';
import { Button } from '../button';
import { ProductPage } from '../productPage';
import { PaymentForm } from '../paymentForm';
import { CartPage } from '../cartPage';
import { defaultProduct, requiresNonNullOrDefault } from '../utils';

const mainContainer: Element = document.querySelector('.main__container')!;
const headerContainer: Element = document.querySelector('.header__container')!;
const productListContainer: Element = document.querySelector('.products')!;

export class App {
    private readonly productList: ProductList;
    private readonly globalFiltres: GlobalFilters;
    private readonly cart: Cart;
    private readonly searchParams: SearchParams;

    constructor() {
        this.searchParams = new SearchParams();
        this.globalFiltres = new GlobalFilters(
            (
                currentFilters: Map<FilterType, Set<string>>,
                currentSliders: Map<SliderType, SliderValue>,
                searchValue: string,
                sort: string
            ) =>
                this.updateResult(
                    currentFilters,
                    currentSliders,
                    searchValue,
                    sort
                ),

            (param: string, value: string, isAdd: boolean) =>
                this.searchParams.updateSearchParamByCheckbox(
                    param,
                    value,
                    isAdd
                ),
            (param: string, min: string, max: string) =>
                this.searchParams.updateSearchParamBySlider(param, min, max),
            (param: string, value: string) =>
                this.searchParams.updateSearchParamBySearch(param, value),
            (value: string) => this.searchParams.updateSearchParamBySort(value)
        );

        this.productList = new ProductList(
            productListContainer,
            (event: Event, id: number) =>
                this.onButtonClickAddToCart(event, id),
            (id: number) => this.onProductClick(id),
            (id: number) => this.checkButtonStatus(id)
        );

        this.cart = new Cart(headerContainer, () => this.onClickCart());
    }

    public start(): void {
        this.cart.drawCart();
        this.cart.setCurrentValues(
            String(this.getSum()),
            String(this.getCount())
        );

        this.drawPageByUrl(window.location.href, window.location.search);
    }

    private drawPageByUrl(url: string, search: string): void {
        if (url.includes('id')) {
            const id: number = Number(url.split('=').pop());
            this.drawProductPage(id);
            return;
        }

        if (url.includes('cart')) {
            this.drawCartPage();
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
            searchParams['search'] || '',
            searchParams['sort'] || ''
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
        const productView: ProductPage = new ProductPage(
            mainContainer,
            id,
            (event: Event, id: number) =>
                this.onButtonClickAddToCart(event, id),
            this.onButtonClick
        );
        productView.drawProductPage(this.getSelectedProducts());
    }

    private drawCartPage(): void {
        const cartView: CartPage = new CartPage(
            mainContainer,
            productsData,
            this.getSelectedProducts(),
            (event: Event, id: number) => this.onChangeAmount(event, id),
            (id: number) => this.onProductClick(id),
            (type: PageButtons) => this.onButtonClick(type)
        );
        cartView.drawCartPage();
    }

    public onChangeAmount(event: Event, id: number): void {
        const target: Element = event.target as Element;
        if (target.classList.value.includes('remove-amount')) {
            this.setSelectedProducts(id, false);
        }
        if (target.classList.value.includes('add-amount')) {
            this.setSelectedProducts(id, true);
        }
        this.cart.setCurrentValues(
            String(this.getSum()),
            String(this.getCount())
        );
        this.drawCartPage();
    }

    private createButtons(): void {
        const buttonCopy: Button = new Button(
            document.querySelector('.buttons__wrapper')!,
            (type: PageButtons) => this.onButtonClick(type)
        );
        buttonCopy.drawButton(PageButtons.Copy);

        const buttonReset: Button = new Button(
            document.querySelector('.buttons__wrapper')!,
            (type: PageButtons) => this.onButtonClick(type)
        );
        buttonReset.drawButton(PageButtons.Reset);
    }

    public updateResult(
        currentFilters: Map<FilterType, Set<string>>,
        slidersValue: Map<SliderType, SliderValue>,
        searchValue: string,
        sort: string
    ): void {
        const productsResult: IProduct[] = FilterResult.getFilterResult(
            currentFilters,
            slidersValue,
            searchValue,
            sort
        );

        this.redrawPage(productsResult);
    }

    private redrawPage(productsList: IProduct[]) {
        this.productList.drawProductList(productsList);
        this.setFoundProducts(productsList.length);
    }

    private setFoundProducts(count: number): void {
        const found: Element = document.querySelector('.filters__result')!;
        found.innerHTML = `Found: ${count}`;
    }

    public onButtonClickAddToCart(event: Event, productId: number): void {
        let isAdded: boolean;
        const target: Element = event.target as Element;
        target.classList.toggle('add-to-cart');
        target.classList.toggle('remove-from-cart');
        if (target.classList.contains('remove-from-cart')) {
            target.innerHTML = 'Remove from cart';
            isAdded = true;
        } else {
            target.innerHTML = 'Add to cart';
            isAdded = false;
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

    public onClickCart(): void {
        window.location.href = `${window.location.origin}?cart`;
        this.drawCartPage();
    }

    public getSum(): number {
        return this.getSelectedProducts()
            .map((id) => this.getProductPrice(id))
            .reduce((acc, current) => acc + current, 0);
    }

    private getProductPrice(id: number): number {
        return requiresNonNullOrDefault(
            productsData.filter((product) => product.id === id)[0],
            defaultProduct
        ).price;
    }

    public getCount(): number {
        const array: number[] = this.getSelectedProducts();
        return array.length;
    }

    private setSelectedProducts(id: number, isAdded: boolean): void {
        const arraySelectedProducts: number[] = this.getSelectedProducts();
        if (!isAdded) {
            const firstIndexOfId: number = arraySelectedProducts.indexOf(id);
            const newData: number[] = arraySelectedProducts.filter(
                (item, index) => item !== id || index !== firstIndexOfId
            );
            localStorage.setItem('selected', JSON.stringify(newData));
            return;
        }
        // if (isAdded) {
        arraySelectedProducts.push(id);
        localStorage.setItem('selected', JSON.stringify(arraySelectedProducts));
        // } else {
        //     const firstIndexOfId: number = arraySelectedProducts.indexOf(id);
        //     const newData: number[] = arraySelectedProducts.filter(
        //         (item, index) => item !== id || index !== firstIndexOfId
        //     );
        //     localStorage.setItem('selected', JSON.stringify(newData));
        // }
    }

    private getSelectedProducts(): number[] {
        const localStorageData: string | null =
            localStorage.getItem('selected');
        return localStorageData ? JSON.parse(localStorageData) : [];
    }

    private onButtonClick(type: PageButtons) {
        switch (type) {
            case PageButtons.Copy: {
                const temp: HTMLInputElement = document.createElement('input');
                document.body.appendChild(temp);
                temp.value = window.location.href;
                temp.select();
                document.execCommand('copy');
                document.body.removeChild(temp);
                break;
            }
            case PageButtons.Reset: {
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
            case PageButtons.Buy: {
                new PaymentForm(mainContainer, this.onButtonClick).drawForm();
                break;
            }
            case PageButtons.Pay: {
                document.querySelector(
                    '.modal-window'
                )!.innerHTML = `<p class="message">The order accepted!</p>`;
                setTimeout(
                    () => (window.location.href = window.location.origin),
                    3000
                );
                break;
            }
            default:
                throw new Error('Something went wrong');
        }
    }
}
