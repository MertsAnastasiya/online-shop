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
        const inputPromoCode = document.querySelector('.promo_code')! as HTMLInputElement;
        let totalAmount: number = 0;
        let totalPrice: number = 0;
        this.productsData.forEach((product) => {
            if (this.selectedProducts.includes(product.id)) {
                let amount = this.selectedProducts.reduce((amount, currentItem) => {
                    if (currentItem === product.id) {
                        amount += 1;
                    }
                    return amount;
                }, 0);
                totalAmount += amount;
                totalPrice += amount * product.price;
                selectedList.appendChild(this.drawCartItem(product, amount));
            }
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

    private drawCartItem(itemData: IProduct, amount: number): Element {
        const selectedItem: Element = document.createElement('div');
        selectedItem.classList.add('selected-item');
        selectedItem.addEventListener('click', () => this.onProductClick(itemData.id))
        const selectedItemImage: HTMLImageElement = document.createElement('img');
        selectedItemImage.classList.add('selected-item__image');
        if (itemData.images[0] !== undefined) {
            selectedItemImage.src = itemData.images[0];
        }
        const selectedItemName: Element = document.createElement('p');
        selectedItemName.classList.add('selected-item__name');
        selectedItemName.textContent = itemData.title;
        const selectedItemPrice: Element = document.createElement('p');
        selectedItemPrice.classList.add('selected-item__price');
        selectedItemPrice.textContent = `${itemData.price}€`;

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
            this.onChangeAmount(event, itemData.id);
        })
        const selectedItemAmountRemove: Element = document.createElement('p');
        selectedItemAmountRemove.classList.add('selected-item__change-amount');
        selectedItemAmountRemove.classList.add('remove-amount');
        selectedItemAmountRemove.textContent = '-';
        selectedItemAmountRemove.addEventListener('click', (event) => {
            this.onChangeAmount(event, itemData.id);
        })

        selectedItem.appendChild(selectedItemImage);
        selectedItem.appendChild(selectedItemName);
        selectedItem.appendChild(selectedItemPrice);
        selectedItemAmountWrapper.appendChild(selectedItemAmountAdd);
        selectedItemAmountWrapper.appendChild(selectedItemAmount);
        selectedItemAmountWrapper.appendChild(selectedItemAmountRemove);
        selectedItem.appendChild(selectedItemAmountWrapper);

        return selectedItem;
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
