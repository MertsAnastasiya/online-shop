'use strict';
import { OnButtonClick, OnProductClick } from './interfaces/customTypes';
import { IProduct } from './interfaces/product.interface';

type OnChangeAmount = (event: Event, id: number) => void;

export class CartPage {
    private parent: Element;
    private cartDataLayout: string;
    private productsData: IProduct[];
    private selectedProducts: number[];
    private onChangeAmount: OnChangeAmount;
    private onProductClick: OnProductClick;
    private onButtonClick: OnButtonClick;

    constructor(
        parent: Element,
        productsData: IProduct[],
        selectedProducts: number[],
        onChangeAmount: OnChangeAmount,
        onProductClick: OnProductClick,
        onButtonClick: OnButtonClick
    ) {
        this.productsData = productsData;
        this.parent = parent;
        this.selectedProducts = selectedProducts;
        this.onChangeAmount = onChangeAmount;
        this.onProductClick = onProductClick;
        this.onButtonClick = onButtonClick;

        this.cartDataLayout = `
            <div class="cart-page_wrapper">
                <div class="selected-list">
                    <h2 class="h2">Bag</h2>
                </div>
                <div class="summary">
                    <h3 class="h3 summary__header"></h3>
                    <input class="input promo_code" type="text" placeholder="Promo code">
                    <p class="summary__total-price"></p>
                    <button type="submit" class="button button_buy">Buy</button>
                </div>
            </div>
            <div class="disabled-area hidden"></div>`;
    }

    public drawCartPage() {
        this.parent.innerHTML = this.cartDataLayout;
        const selectedList: Element = document.querySelector('.selected-list')!;
        const summaryHeader: Element = document.querySelector('.summary__header')!;
        const totalPriceContainer: Element = document.querySelector('.summary__total-price')!;
        const inputPromoCode: HTMLInputElement = document.querySelector('.promo_code')! as HTMLInputElement;
        let totalAmount: number = 0;
        let totalPrice: number = 0;

        this.productsData
            .filter(product => this.selectedProducts.includes(product.id))
            .forEach((product) => {
                    let amount = this.selectedProducts.reduce((totalAmount, currentItem) => {
                        if (currentItem === product.id) {
                            totalAmount += 1;
                        }
                        return totalAmount;
                    }, 0);
                    totalAmount += amount;
                    totalPrice += amount * product.price;
                    selectedList.appendChild(this.drawCartItem(product, amount));
            });

        inputPromoCode.addEventListener('input', () => {
            totalPrice = this.checkPromo(inputPromoCode, totalPrice, totalPriceContainer);
        });
        summaryHeader.innerHTML = `<span>Summary</span> <span>[${totalAmount} items]</span>`;
        totalPrice = this.checkPromo(inputPromoCode, totalPrice, totalPriceContainer);
        totalPriceContainer.innerHTML = `<span>Total</span> <span>€‎${totalPrice}</span>`;

        const buyButton: Element = document.querySelector('.button_buy')! as HTMLButtonElement;
        buyButton.addEventListener('click', () => this.onButtonClick('buy'));
    }

    private drawCartItem(product: IProduct, amount: number): Element {
        const selectedItem: Element = document.createElement('div');
        selectedItem.classList.add('selected-item');
        selectedItem.addEventListener('click', () => this.onProductClick(product.id));

        selectedItem.appendChild(this.createItemImage(product.images));
        selectedItem.appendChild(this.createItemName(product.title));
        selectedItem.appendChild(this.createItemPrice(product.price));
        selectedItem.appendChild(this.createChangeAmount(product.id, amount));

        return selectedItem;
    }

    private createItemImage(images: string[]): Element {
        const selectedItemImage: HTMLImageElement = document.createElement('img');
        selectedItemImage.classList.add('selected-item__image');
        if (images[0] !== undefined) {
            selectedItemImage.src = images[0];
        }
        return selectedItemImage;
    }

    private createItemName(name: string): Element {
        const selectedItemName: Element = document.createElement('p');
        selectedItemName.classList.add('selected-item__name');
        selectedItemName.textContent = name;
        return selectedItemName;
    }

    private createItemPrice(price: number): Element {
        const selectedItemPrice: Element = document.createElement('p');
        selectedItemPrice.classList.add('selected-item__price');
        selectedItemPrice.textContent = `${price}€`;
        return selectedItemPrice;
    }

    private createChangeAmount(id: number, amount: number): Element {
        const selectedItemAmountWrapper: Element = document.createElement('div');
        selectedItemAmountWrapper.classList.add('selected-item__amount__wrapper');

        const selectedItemAmount: Element = document.createElement('p');
        selectedItemAmount.classList.add('selected-item__amount');
        selectedItemAmount.textContent = String(amount);

        const selectedItemAmountAdd: Element = document.createElement('p');
        selectedItemAmountAdd.classList.add('selected-item__change-amount');
        selectedItemAmountAdd.classList.add('add-amount');
        selectedItemAmountAdd.textContent = '+';
        selectedItemAmountAdd.addEventListener('click', (event) => {
            this.onChangeAmount(event, id);
        });

        const selectedItemAmountRemove: Element = document.createElement('p');
        selectedItemAmountRemove.classList.add('selected-item__change-amount');
        selectedItemAmountRemove.classList.add('remove-amount');
        selectedItemAmountRemove.textContent = '-';
        selectedItemAmountRemove.addEventListener('click', (event) => {
            this.onChangeAmount(event, id);
        });

        selectedItemAmountWrapper.appendChild(selectedItemAmountAdd);
        selectedItemAmountWrapper.appendChild(selectedItemAmount);
        selectedItemAmountWrapper.appendChild(selectedItemAmountRemove);
        return selectedItemAmountWrapper;

    }

    private checkPromo(inputPromoCode: HTMLInputElement, totalPrice: number, totalPriceContainer: Element): number {
        const value = inputPromoCode.value;
        if (value.toLowerCase() === 'promo') {
            totalPrice -= 0.1 * totalPrice;
            totalPriceContainer.innerHTML = `<span>Total</span> <span>€‎${totalPrice}</span>`;
        }
        return totalPrice;
    }
}
